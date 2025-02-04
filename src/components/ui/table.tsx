"use client";

import React from "react";
import { useTableStore } from "@/store/table";
import { cn } from "@/lib/utils";
import { useSearchStore } from "@/store/search";
import { TimeEntry } from "@/db/schema";

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    children: React.ReactNode;
    entry: TimeEntry;
    day: string;
}

export const EntryRow = React.forwardRef<HTMLTableRowElement, RowProps>(
    ({ children, entry, day, ...props }, ref) => {
        const setDay = useTableStore((state) => state.setDay);
        const { searchResults } = useSearchStore();

        function setCurrentDay() {
            setDay(day);
        }

        const result = searchResults.get(entry.id);
        
        if (!result && !entry.deletedAt) {
            return null;
        }

        return (
            <tr ref={ref} onMouseEnter={setCurrentDay} {...props}>
                {children}
            </tr>
        );
    }
);

EntryRow.displayName = "TableRow";

interface CellProps extends React.HTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
    day: string;
}

export const EntryCell = React.forwardRef<HTMLTableCellElement, CellProps>(
    ({ children, className, day, ...props }, ref) => {
        const selectedDay = useTableStore((state) => state.day);

        const isActive = selectedDay === day;
        return (
            <td
                ref={ref}
                {...props}
                className={cn(className, {
                    "text-foreground": isActive,
                })}
            >
                {children}
            </td>
        );
    }
);

EntryCell.displayName = "TableRow";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    children: React.ReactNode;
}

export const EntryTable = React.forwardRef<HTMLTableElement, TableProps>(
    ({ children, ...props }, ref) => {
        const setDay = useTableStore((state) => state.setDay);

        function unsetCurrentDay() {
            setDay(null);
        }


        return (
            <table
                ref={ref}
                onMouseLeave={unsetCurrentDay}
                {...props}
            >
                {children}
            </table>
        );
    }
);

EntryTable.displayName = "Table";
