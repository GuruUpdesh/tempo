import React from "react";

import TimeEntries from "../../components/TimeEntries";
import { db } from "@/db";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { timeEntries, TimeEntry } from "@/db/schema";
import TimerActions from "@/components/TimerActions";
import Timer from "@/components/Timer";
import {
    differenceInMinutes,
    endOfDay,
    endOfMonth,
    endOfWeek,
    isToday,
    startOfDay,
    startOfMonth,
    startOfWeek,
    sub,
} from "date-fns";
import { SummaryButton } from "@/components/SummaryButton";
import SignIn from "@/components/SignIn";
import { auth } from "@/auth";
import PeriodToggle, { Period } from "@/components/PeriodToggle";

const getDateRange = (period: Period) => {
    const now = new Date();
    switch (period) {
        case "day":
            return {
                start: startOfDay(now),
                end: endOfDay(now),
            };
        case "week":
            return {
                start: startOfWeek(now, { weekStartsOn: 0 }),
                end: endOfWeek(now, { weekStartsOn: 0 }),
            };
        case "month":
            return {
                start: startOfMonth(now),
                end: endOfMonth(now),
            };
        case "year":
            return {
                start: sub(now, { years: 1 }),
                end: now,
            };
    }
};

type Props = {
    params: Promise<{ period: Period }>;
};

export default async function Home({ params }: Props) {
    const session = await auth();
    const { period } = await params;
    const { start, end } = getDateRange(period);

    const entries = session?.user?.id
        ? await db
              .select()
              .from(timeEntries)
              .where(
                  and(
                      eq(timeEntries.userId, session.user.id),
                      gte(timeEntries.startTime, start),
                      lte(timeEntries.startTime, end)
                  )
              )
              .orderBy(desc(timeEntries.startTime))
        : [];
    const activeEntry = entries.find((entry) => !entry.endTime);

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return hours > 0
            ? `${hours}h ${remainingMinutes}m`
            : `${remainingMinutes}m`;
    };

    const calculateTotalTime = (
        entries: TimeEntry[],
        filterFn?: (entry: TimeEntry) => boolean
    ) => {
        return entries
            .filter((entry) => entry.endTime && (!filterFn || filterFn(entry)))
            .reduce((total, entry) => {
                return (
                    total + differenceInMinutes(entry.endTime!, entry.startTime)
                );
            }, 0);
    };

    const todayTotal = calculateTotalTime(entries, (entry) =>
        isToday(entry.startTime)
    );

    const allTimeTotal = calculateTotalTime(entries);

    return (
        <div className="h-[calc(100vh-62px)] overflow-hidden font-[family-name:var(--font-sans)]">
            {!session && <SignIn />}
            <main className="flex flex-col items-center mx-auto h-full">
                <div className="text-center my-12">
                    <Timer activeEntry={activeEntry} />
                    <p className="mt-4">
                        Total time tracked today: {formatDuration(todayTotal)}
                    </p>
                </div>
                <TimerActions activeEntry={activeEntry} />

                <section className="w-[900px] flex flex-col overflow-y-auto flex-1 px-2">
                    <header className="flex justify-between items-center w-full sticky top-0 bg-background pb-2">
                        <div className="flex items-center gap-4">
                            <PeriodToggle currentPeriod={period} />
                            <SummaryButton entries={entries} />
                        </div>
                        <div className="flex items-center gap-4">
                            <p>
                                <span className="text-muted-foreground">
                                    Total:
                                </span>{" "}
                                {formatDuration(allTimeTotal)}
                            </p>
                        </div>
                    </header>
                    <TimeEntries entries={entries} period={period} />
                </section>
            </main>
        </div>
    );
}
