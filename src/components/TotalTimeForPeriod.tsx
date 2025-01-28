import React from "react";
import { Period } from "@/lib/types";
import { TimeEntry } from "@/db/schema";
import { formatDuration } from "@/utils/formatDuration";
import { getDateRange } from "@/utils/getDateRange";
import { cookies } from "next/headers";

type Props = {
    period: Period;
    entries: TimeEntry[];
};

const TotalTimeForPeriod = async ({ period, entries }: Props) => {
    const cookieStore = await cookies();
    const timezone = cookieStore.get("timezone")?.value || "UTC";
    const { start } = getDateRange(period, timezone);

    const totalMinutes = entries
        .filter((entry) => entry.endTime && entry.startTime >= start)
        .reduce((total, entry) => {
            const duration =
                (entry.endTime!.getTime() - entry.startTime.getTime()) /
                1000 /
                60;
            return total + duration;
        }, 0);
    return <>{formatDuration(Math.round(totalMinutes))}</>;
};

export default TotalTimeForPeriod;
