import {
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    sub,
} from "date-fns";
import { tz } from "@date-fns/tz";

export const getDateRange = (period: string, timeZone: string) => {
    const tzOption = { in: tz(timeZone) };
    const today = startOfDay(new Date(), tzOption);

    switch (period) {
        case "day": {
            const start = today;
            const end = endOfDay(today, tzOption);
            return { start, end };
        }
        case "week": {
            const start = startOfWeek(today, { weekStartsOn: 0, ...tzOption });
            const end = endOfWeek(today, { weekStartsOn: 0, ...tzOption });
            return { start, end };
        }
        case "month": {
            const start = startOfMonth(today, tzOption);
            const end = endOfMonth(today, tzOption);
            return { start, end };
        }
        case "year": {
            const start = sub(today, { years: 1, ...tzOption });
            const end = endOfDay(today, tzOption);
            return { start, end };
        }
        default:
            return {start: today, end: today}
    }
};