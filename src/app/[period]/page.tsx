import React from "react";

import TimeEntries from "../../components/timeEntry/TimeEntries";
import { TimeEntry } from "@/db/schema";
import TimerActions from "@/components/timer/TimerActions";
import Timer from "@/components/timer/Timer";
import { differenceInMinutes } from "date-fns";
import { SummaryButton } from "@/components/SummaryButton";
import SignIn from "@/components/dialogs/SignIn";
import { auth } from "@/auth";
import { getEntries } from "@/actions/entry";
import { TimezoneHandler } from "@/components/TimezoneHandler";
import { cookies } from "next/headers";
import { toast } from "sonner";
import { Period } from "@/lib/types";
import PeriodToggle from "@/components/PeriodToggle";

type Props = {
    params: Promise<{ period: Period }>;
};

export default async function Home({ params }: Props) {
    const session = await auth();
    const { period } = await params;

    const results = await getEntries(period);
    if (results.error !== null) {
        toast.error(results.error);
        return null;
    }

    const entries = session?.user?.id ? results.data : [];
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

    const cookieStore = await cookies()
    const timer = cookieStore.get("timer")?.value

    const allTimeTotal = calculateTotalTime(entries);

    return (
        <div className="font-[family-name:var(--font-sans)]">
            <TimezoneHandler />
            {!session && <SignIn />}
            <main className="flex flex-col items-center mx-auto h-full">
                <div className="flex flex-col text-center my-12 items-center">
                    <div className="min-h-[33px] mb-4">
                        {activeEntry?.description && (
                            <p className="rounded-md bg-card border-t border-border px-4 py-1 w-fit">
                                {activeEntry.description}
                            </p>
                        )}
                    </div>
                    <Timer activeEntry={activeEntry} initialTime={timer} />
                </div>
                <TimerActions activeEntry={activeEntry} />

                <section className="w-[900px] flex flex-col px-2">
                    <header className="flex justify-between items-center w-full sticky top-0 bg-background py-2 z-10">
                        <div className="flex items-center gap-4">
                            <PeriodToggle currentPeriod={period} />
                            <SummaryButton entries={entries} />
                        </div>
                        <div className="flex items-center gap-4">
                            <p>
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
