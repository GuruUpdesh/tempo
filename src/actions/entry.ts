"use server"

import { db } from "@/db";
import { timeEntries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateDescription(id: number, description: string) {
    await db
        .update(timeEntries)
        .set({ description })
        .where(eq(timeEntries.id, id));
    
    revalidatePath("/");
}

export async function deleteEntry(id: number) {
    await db.delete(timeEntries).where(eq(timeEntries.id, id));
    revalidatePath("/");
}

