"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { timeEntries } from "@/db/schema";
import { ActionResponse } from "@/lib/types";
import { and, desc, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function handlePause(): ActionResponse<boolean> {
    const session = await auth();
    if (!session || !session.user?.id) {
        return { error: "Session not found", data: null };
    }

    const activeEntry = await db.query.timeEntries.findFirst({
        where: isNull(timeEntries.endTime),
        orderBy: [desc(timeEntries.startTime)],
    });

    if (!activeEntry) {
        return { error: "No active entry found", data: null };
    }

    await db
        .update(timeEntries)
        .set({
            endTime: new Date()
        })
        .where(eq(timeEntries.id, activeEntry.id));

    revalidatePath("/");

    return { error: null, data: true };
}

export async function handleStart(): ActionResponse<boolean> {
    const session = await auth();
    if (!session || !session.user?.id) {
        return { error: "Session not found", data: null };
    }

    const activeEntry = await db.query.timeEntries.findFirst({
        where: and(isNull(timeEntries.endTime), isNull(timeEntries.deletedAt)),
        orderBy: [desc(timeEntries.startTime)],
    });

    if (activeEntry) {
        return { error: "An active entry already exists", data: null };
    }

    await db.insert(timeEntries).values({
        userId: session.user.id,
        startTime: new Date()
    });

    revalidatePath("/");

    return { error: null, data: true };
}