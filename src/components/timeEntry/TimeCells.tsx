"use client";

import { TimeEntry } from "@/db/schema";
import { formatTime, getTimeZone } from "@/lib/timeConfig";
import { differenceInMinutes, differenceInSeconds } from "date-fns";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Period } from "@/lib/types";
import { EntryCell } from "../ui/table";

type Props = {
    entry: TimeEntry;
    period: Period;
    day: string;
    showDate?: boolean;
};

export function TimeCells({ entry, period, day, showDate = true }: Props) {
    const timeZone = getTimeZone();

    const getDateDisplay = (date: Date) => {
        const formats = {
            week: "E d",
            month: "MMM d",
            year: "MMM d, y",
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
                <EntryCell day={day} className="whitespace-nowrap py-4 pr-2 pl-6 text-sm text-muted-foreground transition-colors">
                    {getDateDisplay(entry.endTime || entry.startTime)}
                </EntryCell>
            )}
            <td className={cn("whitespace-nowrap py-4 text-sm text", {
                "pl-6": period === "day"
            }, "tabular-nums")}>
                {getTimeDisplay(entry.startTime)}
            </td>
            <td className="whitespace-nowrap py-4 px-2 text-sm text-foreground">
                <ArrowRight className="h-4 w-4"/>
            </td>
            <td className="whitespace-nowrap py-4 text-sm text-foreground tabular-nums">
                {getTimeDisplay(entry.endTime)}
            </td>
            <td className="whitespace-nowrap py-4 pl-2 pr-3 text-sm text-muted-foreground">
                {getDurationDisplay(entry.startTime, entry.endTime)}
            </td>
        </>
    );
}
