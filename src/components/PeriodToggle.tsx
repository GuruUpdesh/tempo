import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Period } from "@/lib/types";

const PERIODS: { label: string; value: Period }[] = [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
];

type Props = {
    currentPeriod: Period;
};

const PeriodToggle = ({ currentPeriod }: Props) => {
    return (
        <div className="flex gap-1 rounded-md bg-card border-t border-border p-1">
            {PERIODS.map(({ label, value }) => (
                <Link
                    key={value}
                    href={`/${value}`}
                    className={cn(
                        "px-3 py-1.5 text-sm font-medium rounded-md border-b border-transparent text-muted-foreground transition-all hover:bg-accent hover:text-foreground",
                        {"bg-accent border-primary text-foreground" : currentPeriod === value}
                    )}
                >
                    {label}
                </Link>
            ))}
        </div>
    );
};

export default PeriodToggle;
