import React from "react";
import { TimeEntry as TimeEntryType } from "@/db/schema";
import { TimeCells } from "./TimeCells";
import DescriptionForm from "./DescriptionForm";
import EntryActions from "./EntryActions";
import { cn } from "@/lib/utils";
import { Period } from "@/lib/types";
import { EntryRow } from "../ui/table";

type Props = {
    entry: TimeEntryType;
    index: number;
    period: Period;
    day: string;
};

const Entry = ({ entry, index, period, day }: Props) => {
    const activeEntry = !entry.endTime && index === 0
    return (
        <EntryRow entryId={entry.id} day={day} className={cn("group relative z-0 even:bg-card-darker hover:bg-card-foreground", {
            "sticky top-[58px] z-10": activeEntry
        })}>
            <td className={cn("absolute -left-8 bg-primary w-4 h-4 top-[50%] translate-y-[-50%] rounded-full",
                {
                    "opacity-0": !activeEntry
                }
            )}/>
            <TimeCells entry={entry} period={period} day={day} showDate={period !== "day"}/>
            <td className="whitespace-nowrap py-4 px-1 w-full">
                <DescriptionForm entry={entry} index={index} />
            </td>
            <td className="whitespace-nowrap p-2 pr-4 w-full">
                <EntryActions entry={entry} isFirst={index === 0} />
            </td>
        </EntryRow>
    );
};

export default Entry;
