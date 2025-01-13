"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { timeEntries } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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

export async function deleteEntry(id: number) {
    const session = await auth();
    if (!session || !session.user?.id) {
        return { error: "Session not found", data: null };
    }
    await db
        .delete(timeEntries)
        .where(
            and(eq(timeEntries.id, id), eq(timeEntries.userId, session.user.id))
        );
    revalidatePath("/");
}
