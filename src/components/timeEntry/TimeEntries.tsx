import React from "react";
import { TimeEntry as TimeEntryType } from "@/db/schema";
import TimeEntry from "./TimeEntry";
import { Period } from "@/lib/types";

type Props = {
    entries: TimeEntryType[];
    period: Period;
};

const TimeEntries = async ({ entries, period }: Props) => {
    return (
        <table className="w-full rounded-xl overflow-clip bg-card shadow mb-2">
            <tbody className="">
                {entries.map((entry, index) => (
                    <TimeEntry
                        key={entry.id}
                        entry={entry}
                        index={index}
                        period={period}
                    />
                ))}
                {entries.length === 0 && (
                    <tr className="shadow">
                        <td
                            className="bg-card text-center border-t border-border p-4 text-sm text-muted-foreground rounded-l rounded-r"
                            colSpan={period === "day" ? 5 : 6}
                        >
                            No time entries for this period
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TimeEntries;
