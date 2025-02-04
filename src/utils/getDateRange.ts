import {
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    sub,
    subDays,
    subWeeks,
    subMonths,
    subYears,
} from "date-fns";
import { tz } from "@date-fns/tz";

export const getDateRange = (period: string, timeZone: string, index: number = 0) => {
    const tzOption = { in: tz(timeZone) };
    const today = startOfDay(new Date(), tzOption);

    switch (period) {
        case "day": {
            const start = subDays(today, index);
            const end = endOfDay(subDays(today, index), tzOption);
            return { start, end };
        }
        case "week": {
            const start = startOfWeek(subWeeks(today, index), { weekStartsOn: 0, ...tzOption });
            const end = endOfWeek(subWeeks(today, index), { weekStartsOn: 0, ...tzOption });
            return { start, end };
        }
        case "month": {
            const start = startOfMonth(subMonths(today, index), tzOption);
            const end = endOfMonth(subMonths(today, index), tzOption);
            return { start, end };
        }
        case "year": {
            const start = sub(subYears(today, index), { years: 1, ...tzOption });
            const end = endOfDay(subYears(today, index), tzOption);
            return { start, end };
        }
        default:
            return {start: today, end: today}
    }
};