import { TimeEntry } from "@/db/schema";
import { differenceInMinutes } from "date-fns";
import { formatDuration } from "./formatDuration";

function getTotalTime(entries: TimeEntry[]) {
    const calculateTotalTime = (
        entries: TimeEntry[],
        filterFn?: (entry: TimeEntry) => boolean
    ) => {
        return entries
            .filter((entry) => entry.endTime && (!filterFn || filterFn(entry)))
            .reduce((total, entry) => {
                return (
                    total + differenceInMinutes(entry.endTime!, entry.startTime)
                );
            }, 0);
    };

    return formatDuration(calculateTotalTime(entries));
}

export default getTotalTime;
