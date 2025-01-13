import React from "react";
import { format, differenceInMinutes, differenceInSeconds } from "date-fns";
import { TimeEntry as TimeEntryType } from "@/db/schema";
import DescriptionForm from "./DescriptionForm";
import EntryActions from "./EntryActions";
import { Period } from "./PeriodToggle";
import { cn } from "@/lib/utils";

type Props = {
    entry: TimeEntryType;
    index: number;
    period: Period;
};

const getDateDisplay = (entry: TimeEntryType, period: Period) => {
    const time = entry.endTime ? entry.endTime : entry.startTime;

    switch (period) {
        case "week":
            return format(time, "EEEE");
        case "month":
            return format(time, "d");
        case "year":
            return format(time, "MMM d");
        default:
            return format(time, "h:mma");
    }
};

const getTimeDisplay = (
    time: TimeEntryType["endTime"] | TimeEntryType["startTime"]
) => {
    if (!time) {
        return "--";
    }

    return format(time, "h:mma");
};

const getDurationDisplay = (
    startTime: TimeEntryType["startTime"],
    endTime: TimeEntryType["endTime"]
) => {
    if (!startTime) return "--";

    const end = endTime || new Date();
    const minutes = differenceInMinutes(end, startTime);

    // If less than 1 minute, show seconds
    if (minutes < 1) {
        const diffInSeconds = differenceInSeconds(end, startTime);
        if (diffInSeconds < 1) return "0s";
        return `${diffInSeconds}s`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return hours > 0
        ? `${hours}h ${remainingMinutes}m`
        : `${remainingMinutes}m`;
};

const TimeEntry = ({ entry, index, period }: Props) => {
    return (
        <tr className="shadow">
            {period !== "day" && (
                <td className="bg-card whitespace-nowrap border-t border-border p-4 pl-6 text-sm text-foreground w-[90px] rounded-l">
                    {getDateDisplay(entry, period)}
                </td>
            )}
            <td
                className={cn(
                    "bg-card whitespace-nowrap border-t border-border p-4 pl-6 text-sm text-foreground w-[90px]",
                    {
                        "rounded-l": period === "day",
                    }
                )}
            >
                {getTimeDisplay(entry.startTime)}
            </td>
            <td className="bg-card whitespace-nowrap border-t border-border p-4 text-sm text-foreground w-[90px]">
                {getTimeDisplay(entry.endTime)}
            </td>
            <td className="bg-card whitespace-nowrap border-t border-border p-4 text-sm text-foreground w-[90px]">
                {getDurationDisplay(entry.startTime, entry.endTime)}
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
