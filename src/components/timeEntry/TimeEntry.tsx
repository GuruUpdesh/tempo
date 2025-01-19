import React from "react";
import { TimeEntry as TimeEntryType } from "@/db/schema";
import DescriptionForm from "./DescriptionForm";
import EntryActions from "./EntryActions";
import { Period } from "./PeriodToggle";
import { EntryTimeCells } from "./TimeDisplay";
import { cn } from "@/lib/utils";

type Props = {
    entry: TimeEntryType;
    index: number;
    period: Period;
};

const TimeEntry = ({ entry, index, period }: Props) => {
    const activeEntry = !entry.endTime && index === 0
    return (
        <tr className={cn("shadow group relative z-0", {
            "sticky top-[58px] z-10 border-b border-b-background": activeEntry
        })}>
            <td className={cn("absolute -left-8 bg-primary w-4 h-4 top-[50%] translate-y-[-50%] rounded-full",
                {
                    "opacity-0": !activeEntry
                }
            )}/>
            <EntryTimeCells entry={entry} period={period} showDate={period !== "day"}/>
            <td className="bg-card group-hover:bg-card-foreground whitespace-nowrap border-t border-border py-4 px-1 w-full">
                <DescriptionForm entry={entry} index={index} />
            </td>
            <td className="bg-card group-hover:bg-card-foreground whitespace-nowrap border-t border-border p-2 pr-4 w-full rounded-r">
                {index === 0 && <EntryActions entry={entry} />}
            </td>
        </tr>
    );
};

export default TimeEntry;
