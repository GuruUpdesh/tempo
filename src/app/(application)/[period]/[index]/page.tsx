import React from "react";

import EntriesTable from "@/components/timeEntry/EntriesTable";
import TimerActions from "@/components/timer/TimerActions";
import Timer from "@/components/timer/Timer";
import { SummaryButton } from "@/components/SummaryButton";
import SignIn from "@/components/dialogs/SignIn";
import { auth } from "@/auth";
import { getEntries } from "@/actions/entry";
import { TimezoneHandler } from "@/components/TimezoneHandler";
import { cookies } from "next/headers";
import { toast } from "sonner";
import { Period } from "@/lib/types";
import PeriodToggle from "@/components/PeriodToggle";
import { SearchInput } from "@/components/SearchInput";
import getTotalTime from "@/utils/getTotalTime";

type Props = {
    params: Promise<{ 
        period: Period;
        index: string;
    }>;
};

export default async function Home({ params }: Props) {
    const session = await auth();

    const pageParams = await params;
    const { period } = pageParams;
    const index = parseInt(pageParams.index || "0");

    const results = await getEntries(period, index);
    if (results.error !== null) {
        toast.error(results.error);
        return null;
    }

    const entries = session?.user?.id ? results.data : [];
    const activeEntry = entries.find((entry) => !entry.endTime);

    const cookieStore = await cookies()
    const timer = cookieStore.get("timer")?.value

    const totalTime = getTotalTime(entries);

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

                <section className="w-[1100px] flex flex-col px-2 pt-16">
                    <header className="flex justify-between items-center w-full sticky top-[69px] bg-background py-2 z-10">
                        <div className="flex items-center gap-4">
                            <PeriodToggle currentPeriod={period} currentIndex={index} />
                            <SummaryButton entries={entries} />
                        </div>
                        <div className="flex items-center gap-4">
                            <SearchInput entries={entries}/>
                            <p>
                                {totalTime}
                            </p>
                        </div>
                    </header>
                    <EntriesTable entries={entries} period={period} />
                </section>
            </main>
        </div>
    );
}
