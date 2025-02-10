import React from "react";
import { TimeEntry as TimeEntryType } from "@/db/schema";
import Entry from "./Entry";
import { Period } from "@/lib/types";
import { formatTime, getTimeZone } from "@/lib/timeConfig";
import { EntryTable } from "../ui/table";

type Props = {
    entries: TimeEntryType[];
    period: Period;
};

type TimeEntryWithOrder = TimeEntryType & {order: number}

type GroupedTimeEntries = Record<string, TimeEntryWithOrder[]>;

const EntriesTable = async ({ entries, period }: Props) => {
    let entryOrder = 0;
    const groupedEntries = entries.reduce((groups: GroupedTimeEntries, entry) => {
        const day = formatTime(entry.startTime, getTimeZone(), "M/d/y");
        groups[day] = groups[day] || []
        groups[day].push({...entry, order: entryOrder});
        entryOrder += 1;
        return groups;
    }, {} as GroupedTimeEntries)

    return (
        <EntryTable className="w-full rounded-xl overflow-clip bg-card shadow mb-2">
            <tbody className="">
                {Object.entries(groupedEntries).map(([day, entries]) => (
                    <React.Fragment key={day}>
                        {entries.map((entry) => (
                            <Entry
                                key={entry.id}
                                entry={entry}
                                index={entry.order}
                                period={period}
                                day={day}
                            />
                        ))}
                    </React.Fragment>
                ))}
                {entries.length === 0 && (
                    <tr className="shadow">
                        <td
                            className="bg-card text-center border-b border-border p-4 text-sm text-muted-foreground rounded-l rounded-r"
                            colSpan={period === "day" ? 5 : 6}
                        >
                            No entries to show
                        </td>
                    </tr>
                )}
            </tbody>
        </EntryTable>
    );
};

export default EntriesTable;
