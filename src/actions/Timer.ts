"use server";

import { db } from "@/db";
import { timeEntries } from "@/db/schema";
import { desc, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function handlePause() {
    // get the current entry
    const activeEntry = await db.query.timeEntries.findFirst({
        where: isNull(timeEntries.endTime),
        orderBy: [desc(timeEntries.startTime)],
    });

    // if there is no active entry there is an error
    if (!activeEntry) {
        return { error: "No active entry found", data: null };
    }

    // update the active entry
    await db
        .update(timeEntries)
        .set({ endTime: new Date() })
        .where(eq(timeEntries.id, activeEntry.id));

    revalidatePath("/");

    return { error: null, data: true };
}

export async function handleStart() {
    // get the current entry
    const activeEntry = await db.query.timeEntries.findFirst({
        where: isNull(timeEntries.endTime),
        orderBy: [desc(timeEntries.startTime)],
    });

    // if there is an active entry there is an error
    if (activeEntry) {
        return { error: "An active entry already exists", data: null };
    }

    // create a new entry
    await db.insert(timeEntries).values({
        startTime: new Date(),
    })

    revalidatePath("/");

    return { error: null, data: true };
}


