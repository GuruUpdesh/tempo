"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { timeEntries, TimeEntry } from "@/db/schema";
import { TZDate } from "@date-fns/tz";
import {
    and,
    cosineDistance,
    desc,
    eq,
    gt,
    gte,
    isNotNull,
    isNull,
    lte,
    sql,
} from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getDateRange } from "@/utils/getDateRange";
import { ActionResponse, Period } from "@/lib/types";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function getEntries(
    period: Period,
    index: number,
    showDeleted = false
): ActionResponse<TimeEntry[]> {
    const session = await auth();
    if (!session || !session.user?.id) {
        return { error: null, data: [] };
    }

    const cookieStore = await cookies();
    const timezone = cookieStore.get("timezone")?.value || "UTC";

    const { start: localStart, end: localEnd } = getDateRange(
        period,
        timezone,
        index
    );
    const start = new TZDate(localStart, "UTC");
    const end = new TZDate(localEnd, "UTC");

    const entries = await db
        .select({
            id: timeEntries.id,
            userId: timeEntries.userId,
            description: timeEntries.description,
            startTime: timeEntries.startTime,
            endTime: timeEntries.endTime,
            deletedAt: timeEntries.deletedAt,
        })
        .from(timeEntries)
        .where(
            and(
                eq(timeEntries.userId, session.user.id),
                gte(timeEntries.startTime, start),
                lte(timeEntries.startTime, end),
                showDeleted
                    ? isNotNull(timeEntries.deletedAt)
                    : isNull(timeEntries.deletedAt)
            )
        )
        .orderBy(desc(timeEntries.startTime));

    return { error: null, data: entries };
}

export async function updateDescription(id: number, description: string) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return { error: "Session not found", data: null };
    }
    const input = description.replaceAll("\n", " ");
    const { data } = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input,
        encoding_format: "float",
    });
    await db
        .update(timeEntries)
        .set({ description, embedding: data[0].embedding })
        .where(
            and(eq(timeEntries.id, id), eq(timeEntries.userId, session.user.id))
        );

    revalidatePath("/");
}

export async function deleteEntry(id: number, hard = false) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return { error: "Session not found", data: null };
    }
    if (hard) {
        await db
            .delete(timeEntries)
            .where(
                and(
                    eq(timeEntries.id, id),
                    eq(timeEntries.userId, session.user.id)
                )
            );
    } else {
        await db
            .update(timeEntries)
            .set({ deletedAt: new Date() })
            .where(
                and(
                    eq(timeEntries.id, id),
                    eq(timeEntries.userId, session.user.id)
                )
            );
    }
    revalidatePath("/");
}

export async function restoreEntry(id: number) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return { error: "Session not found", data: null };
    }
    await db
        .update(timeEntries)
        .set({ deletedAt: null })
        .where(
            and(eq(timeEntries.id, id), eq(timeEntries.userId, session.user.id))
        );
    revalidatePath("/");
}

export async function semanticSearch(query: string): ActionResponse<TimeEntry[]> {
    try {
        const session = await auth();
        if (!session || !session.user?.id) {
            return { error: "Session not found", data: null };
        }
    
        const input = query.replaceAll("\n", " ");
        console.log("Search", input);
        const { data } = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input,
            encoding_format: "float",
        });
        const queryEmbedding = data[0].embedding;
    
        const similarity = sql<number>`1 - (${cosineDistance(
            timeEntries.embedding,
            queryEmbedding
        )})`;
    
        const results = await db
            .select({
                id: timeEntries.id,
                userId: timeEntries.userId,
                description: timeEntries.description,
                startTime: timeEntries.startTime,
                endTime: timeEntries.endTime,
                deletedAt: timeEntries.deletedAt,
            })
            .from(timeEntries)
            .where(
                and(eq(timeEntries.userId, session.user.id), gt(similarity, 0.4))
            )
            .orderBy(desc(similarity));
    
        return { error: null, data: results };
    }
    catch (error) {
        console.error(error);
        return { error: "Something happened", data: null };
    }
}
