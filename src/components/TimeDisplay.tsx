"use client";

import { TimeEntry } from "@/db/schema";
import { format } from "date-fns-tz";
import { Period } from "./PeriodToggle";
import { getTimeZone } from "@/lib/timeConfig";
import { differenceInMinutes, differenceInSeconds } from "date-fns";

type Props = {
    entry: TimeEntry;
    period: Period;
    showDate?: boolean;
};

const formatTime = (date: Date, timeZone: string, formatStr: string) => {
    return format(date, formatStr, { timeZone });
};

export function EntryTimeCells({ entry, period, showDate = true }: Props) {
    const timeZone = getTimeZone();

    const getDateDisplay = (date: Date) => {
        const formats = {
            week: "EEEE",
            month: "d",
            year: "MMM d",
            day: "h:mma",
        };

        return formatTime(date, timeZone, formats[period]);
    };

    const getTimeDisplay = (date: Date | null) => {
        if (!date) return "--";
        return formatTime(date, timeZone, "h:mma");
    };

    const getDurationDisplay = (startTime: Date, endTime: Date | null) => {
        if (!startTime) return "--";

        const end = endTime || new Date();
        const minutes = differenceInMinutes(end, startTime);

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

    return (
        <>
            {showDate && period !== "day" && (
                <td className="bg-card whitespace-nowrap border-t border-border p-4 pl-6 text-sm text-foreground w-[90px] rounded-l">
                    {getDateDisplay(entry.endTime || entry.startTime)}
                </td>
            )}
            <td className="bg-card whitespace-nowrap border-t border-border p-4 pl-6 text-sm text-foreground w-[90px]">
                {getTimeDisplay(entry.startTime)}
            </td>
            <td className="bg-card whitespace-nowrap border-t border-border p-4 text-sm text-foreground w-[90px]">
                {getTimeDisplay(entry.endTime)}
            </td>
            <td className="bg-card whitespace-nowrap border-t border-border p-4 text-sm text-foreground w-[90px]">
                {getDurationDisplay(entry.startTime, entry.endTime)}
            </td>
        </>
    );
}
