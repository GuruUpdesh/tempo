"use client";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "@/components/Icons";
import { useRouter } from "next/navigation";
import { 
    differenceInDays, 
    differenceInWeeks, 
    differenceInMonths, 
    differenceInYears, 
    startOfDay,
    startOfWeek,
    startOfMonth,
    startOfYear,
    addDays,
    addWeeks,
    addMonths,
    addYears,
    format
} from "date-fns";
import { useState } from "react";
import { Period } from "@/lib/types";
import { DefaultTooltip } from "./ui/tooltip";

type Props = {
    period: Period;
    currentIndex: number;
};

export function PeriodCalendar({ period, currentIndex }: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const today = startOfDay(new Date());
    let currentDate = startOfDay(new Date());

    // Calculate current view date
    switch (period) {
        case "day":
            currentDate = addDays(today, -currentIndex);
            break;
        case "week":
            currentDate = startOfWeek(addWeeks(today, -currentIndex));
            break;
        case "month":
            currentDate = startOfMonth(addMonths(today, -currentIndex));
            break;
        case "year":
            currentDate = startOfYear(addYears(today, -currentIndex));
            break;
    }

    const handleSelect = (date: Date | undefined) => {
        if (!date) return;
        
        // Prevent future dates
        if (date > today) {
            return;
        }

        const selectedDate = startOfDay(date);
        let newIndex = 0;

        switch (period) {
            case "day":
                newIndex = Math.max(0, differenceInDays(today, selectedDate));
                break;
            case "week":
                const selectedWeekStart = startOfWeek(selectedDate);
                const currentWeekStart = startOfWeek(today);
                newIndex = Math.max(0, differenceInWeeks(currentWeekStart, selectedWeekStart));
                break;
            case "month":
                const selectedMonthStart = startOfMonth(selectedDate);
                const currentMonthStart = startOfMonth(today);
                newIndex = Math.max(0, differenceInMonths(currentMonthStart, selectedMonthStart));
                break;
            case "year":
                const selectedYearStart = startOfYear(selectedDate);
                const currentYearStart = startOfYear(today);
                newIndex = Math.max(0, differenceInYears(currentYearStart, selectedYearStart));
                break;
        }

        router.push(`/${period}/${newIndex}`);
        setOpen(false);
    };

    const getDateLabel = () => {
        if (currentIndex === 0) return null;

        switch (period) {
            case "day":
                return format(currentDate, "MMM d, yyyy");
            case "week":
                const weekEnd = addDays(currentDate, 6);
                return `${format(currentDate, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`;
            case "month":
                return format(currentDate, "MMMM yyyy");
            case "year":
                return format(currentDate, "yyyy");
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <DefaultTooltip title="Custom Period">
                <PopoverTrigger className="flex items-center gap-1 px-1.5 py-1 text-muted-foreground transition-all hover:bg-accent hover:text-foreground data-[state=open]:text-foreground rounded">
                    <CalendarIcon />
                    {currentIndex > 0 && (
                        <span className="text-sm text-muted-foreground">
                            {getDateLabel()}
                        </span>
                    )}
                </PopoverTrigger>
            </DefaultTooltip>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={currentDate}
                    onSelect={handleSelect}
                    disabled={[{ after: today }]}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
