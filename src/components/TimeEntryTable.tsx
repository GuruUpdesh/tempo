import React from "react";
import TimeEntries from "./timeEntry/TimeEntries";
import { SummaryButton } from "./SummaryButton";
import PeriodToggle from "./PeriodToggle";
import TotalTimeForPeriod from "./TotalTimeForPeriod";
import { TimeEntry } from "@/db/schema";

type Props = {
    initialEntries: TimeEntry[];
};

const TimeEntryTable = async ({ initialEntries }: Props) => {
    const period = "year";
    const entries = initialEntries;

    return (
        <section className="w-[900px] flex flex-col px-2">
            <header className="flex justify-between items-center w-full sticky top-0 bg-background py-2 z-10">
                <div className="flex items-center gap-4">
                    <PeriodToggle currentPeriod={period} />
                    <SummaryButton entries={entries} />
                </div>
                <div className="flex items-center gap-4">
                    <TotalTimeForPeriod period={period} entries={entries} />
                </div>
            </header>
            <TimeEntries entries={entries} period={period} />
        </section>
    );
};

export default TimeEntryTable;
