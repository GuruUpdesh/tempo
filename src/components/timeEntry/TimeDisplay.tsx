"use client";

import { TimeEntry } from "@/db/schema";
import { tz } from "@date-fns/tz";
import { getTimeZone } from "@/lib/timeConfig";
import { differenceInMinutes, differenceInSeconds, format } from "date-fns";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Period } from "@/lib/types";

type Props = {
    entry: TimeEntry;
    period: Period;
    showDate?: boolean;
};

const formatTime = (date: Date, timeZone: string, formatStr: string) => {
    return format(date, formatStr, { in: tz(timeZone) });
};

export function EntryTimeCells({ entry, period, showDate = true }: Props) {
    const timeZone = getTimeZone();

    const getDateDisplay = (date: Date) => {
        const formats = {
            week: "E io",
            month: "E, MMM io",
            year: "MMM io",
            day: "h:mma",
        };

        return formatTime(date, timeZone, formats[period]);
    };

    const getTimeDisplay = (date: Date | null) => {
        if (!date) return "--:--";
        return formatTime(date, timeZone, "hh:mm");
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
                <td className="bg-card group-hover:bg-card-foreground whitespace-nowrap border-t border-border py-4 pr-2 pl-6 text-sm text-muted-foreground rounded-l">
                    {getDateDisplay(entry.endTime || entry.startTime)}
                </td>
            )}
            <td className={cn("bg-card group-hover:bg-card-foreground whitespace-nowrap border-t border-border py-4 text-sm text", {
                "rounded-l pl-6": period === "day"
            }, "tabular-nums")}>
                {getTimeDisplay(entry.startTime)}
            </td>
            <td className="bg-card group-hover:bg-card-foreground whitespace-nowrap border-t border-border py-4 px-2 text-sm text-foreground">
                <ArrowRight className="h-4 w-4"/>
            </td>
            <td className="bg-card group-hover:bg-card-foreground whitespace-nowrap border-t border-border py-4 text-sm text-foreground tabular-nums">
                {getTimeDisplay(entry.endTime)}
            </td>
            <td className="bg-card group-hover:bg-card-foreground whitespace-nowrap border-t border-border py-4 pl-2 pr-3 text-sm text-muted-foreground">
                {getDurationDisplay(entry.startTime, entry.endTime)}
            </td>
        </>
    );
}
