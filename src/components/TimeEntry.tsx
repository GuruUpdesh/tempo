import React from "react";
import { TimeEntry as TimeEntryType } from "@/db/schema";
import DescriptionForm from "./DescriptionForm";
import EntryActions from "./EntryActions";
import { Period } from "./PeriodToggle";
import { EntryTimeCells } from "./TimeDisplay";

type Props = {
    entry: TimeEntryType;
    index: number;
    period: Period;
};

const TimeEntry = ({ entry, index, period }: Props) => {
    return (
        <tr className="shadow group">
            <EntryTimeCells entry={entry} period={period} showDate={period !== "day"}/>
            <td className="bg-card group-hover:bg-card-foreground whitespace-nowrap border-t border-border p-4 w-full">
                <DescriptionForm entry={entry} index={index} />
            </td>
            <td className="bg-card group-hover:bg-card-foreground whitespace-nowrap border-t border-border p-2 pr-4 w-full rounded-r">
                {index === 0 && <EntryActions entry={entry} />}
            </td>
        </tr>
    );
};

export default TimeEntry;
