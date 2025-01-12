import React from "react";
import { TimeEntry as TimeEntryType } from "@/db/schema";
import TimeEntry from "./TimeEntry";

type Props = {
    entries: TimeEntryType[];
}

const TimeEntries = async ({entries}: Props) => {

    return (
        <table className="space-y-2 w-full border-separate border-spacing-y-2">
            <tbody className="space-y-2">
            {entries.map((entry, index) => (
                    <TimeEntry key={entry.id} entry={entry} index={index} />
                ))}
            </tbody>
        </table>
    );
};

export default TimeEntries;
