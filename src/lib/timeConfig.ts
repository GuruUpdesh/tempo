import { cache } from "react";

export const getNow = cache(() => new Date());

export const getTimeZone = cache(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone
);
