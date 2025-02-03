import { format } from "date-fns";
import { tz } from "@date-fns/tz";
import { cache } from "react";

export const getNow = cache(() => new Date());

export const getTimeZone = cache(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone
);

export const formatTime = (date: Date, timeZone: string, formatStr: string) => {
    return format(date, formatStr, { in: tz(timeZone) });
};
