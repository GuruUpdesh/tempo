"use server";

import { auth } from "@/auth";
import { Period } from "@/components/PeriodToggle";
import { db } from "@/db";
import { timeEntries, TimeEntry } from "@/db/schema";
import {
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    sub,
} from "date-fns";
import { tz, TZDate  } from "@date-fns/tz";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const getDateRange = (period: string, timeZone: string) => {
    const tzOption = { in: tz(timeZone) };
    const today = startOfDay(new Date(), tzOption);

    switch (period) {
        case "day": {
            const start = today;
            const end = endOfDay(today, tzOption);
            return { start, end };
        }
        case "week": {
            const start = startOfWeek(today, { weekStartsOn: 0, ...tzOption });
            const end = endOfWeek(today, { weekStartsOn: 0, ...tzOption });
            return { start, end };
        }
        case "month": {
            const start = startOfMonth(today, tzOption);
            const end = endOfMonth(today, tzOption);
            return { start, end };
        }
        case "year": {
            const start = sub(today, { years: 1, ...tzOption });
            const end = endOfDay(today, tzOption);
            return { start, end };
        }
        default:
            return {start: today, end: today}
    }
};

type GetEntriesSuccess = {
    error: null;
    data: TimeEntry[];
};

type GetEntriesError = {
    error: string;
    data: null;
};

type GetEntriesResult = GetEntriesSuccess | GetEntriesError;

export async function getEntries(period: Period): Promise<GetEntriesResult> {
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
                lte(timeEntries.startTime, end)
            )
        )
        .orderBy(desc(timeEntries.startTime));

    return {error: null, data: entries };
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
