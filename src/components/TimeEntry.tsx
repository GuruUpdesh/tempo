import React from "react";
import { format, differenceInMinutes } from "date-fns";
import { TimeEntry as TimeEntryType } from "@/db/schema";
import DescriptionForm from "./DescriptionForm";
import EntryActions from "./EntryActions";

type Props = {
    entry: TimeEntryType;
    index: number;
};

const TimeEntry = ({ entry, index }: Props) => {
    const startFormatted = entry.startTime
        ? format(entry.startTime, "h:mma")
        : "--";

    const endFormatted = entry.endTime ? format(entry.endTime, "h:mma") : "--";

    const getDuration = () => {
        if (!entry.startTime || !entry.endTime) return "--";

        const minutes = differenceInMinutes(entry.endTime, entry.startTime);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return hours > 0
            ? `${hours}h ${remainingMinutes}m`
            : `${remainingMinutes}m`;
    };

    return (
        <tr className="shadow">
            <td className="bg-card whitespace-nowrap border-t border-border p-4 pl-6 text-sm text-foreground w-[90px] rounded-l">
                {startFormatted}
            </td>
            <td className="bg-card whitespace-nowrap border-t border-border p-4 text-sm text-foreground w-[90px]">
                {endFormatted}
            </td>
            <td className="bg-card whitespace-nowrap border-t border-border p-4 text-sm text-foreground w-[90px]">
                {getDuration()}
            </td>
            <td className="bg-card whitespace-nowrap border-t border-border p-4 w-full">
                <DescriptionForm entry={entry} index={index} />
            </td>
            <td className="bg-card whitespace-nowrap border-t border-border p-2 pr-4 w-full rounded-r">
                {index === 0 && <EntryActions entry={entry} />}
            </td>
        </tr>
    );
};

export default TimeEntry;
