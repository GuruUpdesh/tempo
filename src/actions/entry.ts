"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { timeEntries, TimeEntry } from "@/db/schema";
import { TZDate } from "@date-fns/tz";
import { and, desc, eq, gte, isNotNull, isNull, lte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getDateRange } from "@/utils/getDateRange";
import { ActionResponse, Period } from "@/lib/types";

export async function getEntries(
    period: Period,
    showDeleted = false
): ActionResponse<TimeEntry[]> {
    const session = await auth();
    if (!session || !session.user?.id) {
        return { error: null, data: [] };
    }

    const cookieStore = await cookies();
    const timezone = cookieStore.get("timezone")?.value || "UTC";

    const { start: localStart, end: localEnd } = getDateRange(period, timezone);
    const start = new TZDate(localStart, "UTC");
    const end = new TZDate(localEnd, "UTC");

    const entries = await db
        .select()
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
    await db
        .update(timeEntries)
        .set({ description })
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
