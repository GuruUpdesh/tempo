import React from "react";
import { TimeEntry as TimeEntryType } from "@/db/schema";
import { EntryTimeCells } from "./TimeDisplay";
import DescriptionForm from "./DescriptionForm";
import EntryActions from "./EntryActions";
import { cn } from "@/lib/utils";
import { Period } from "@/lib/types";

type Props = {
    entry: TimeEntryType;
    index: number;
    period: Period;
};

const TimeEntry = ({ entry, index, period }: Props) => {
    const activeEntry = !entry.endTime && index === 0
    return (
        <tr className={cn("group relative z-0 even:bg-card-darker", {
            "sticky top-[58px] z-10": activeEntry
        })}>
            <td className={cn("absolute -left-8 bg-primary w-4 h-4 top-[50%] translate-y-[-50%] rounded-full",
                {
                    "opacity-0": !activeEntry
                }
            )}/>
            <EntryTimeCells entry={entry} period={period} showDate={period !== "day"}/>
            <td className="group-hover:bg-card-foreground whitespace-nowrap py-4 px-1 w-full">
                <DescriptionForm entry={entry} index={index} />
            </td>
            <td className="group-hover:bg-card-foreground whitespace-nowrap p-2 pr-4 w-full">
                {index === 0 && <EntryActions entry={entry} />}
            </td>
        </tr>
    );
};

export default TimeEntry;
