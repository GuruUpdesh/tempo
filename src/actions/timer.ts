"use server";

import { db } from "@/db";
import { timeEntries } from "@/db/schema";
import { desc, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function handlePause() {
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

export async function handleStart() {
    const activeEntry = await db.query.timeEntries.findFirst({
        where: isNull(timeEntries.endTime),
        orderBy: [desc(timeEntries.startTime)],
    });

    if (activeEntry) {
        return { error: "An active entry already exists", data: null };
    }

    await db.insert(timeEntries).values({
        description: "Work",
        startTime: new Date()
    });

    revalidatePath("/");

    return { error: null, data: true };
}