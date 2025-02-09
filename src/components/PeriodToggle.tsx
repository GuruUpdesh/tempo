import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Period } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PeriodCalendar } from "./PeriodCalendar";
import { DefaultTooltip } from "./ui/tooltip";

const PERIODS: { label: string; value: Period }[] = [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
];

type Props = {
    currentPeriod?: Period;
    currentIndex: number;
};

const PeriodToggle = ({ currentPeriod, currentIndex }: Props) => {
    return (
        <div className="flex gap-1">
            <div className="flex gap-1 rounded-md bg-card border-t border-border p-1">
                <DefaultTooltip title={`Previous ${currentPeriod}`}>
                    <Link
                        href={`/${currentPeriod}/${currentIndex + 1}`}
                        prefetch={true}
                        className="flex items-center px-1.5 py-1.5 text-muted-foreground transition-all hover:bg-accent hover:text-foreground rounded"
                    >
                        <ChevronLeft size={20} />
                    </Link>
                </DefaultTooltip>
                {PERIODS.map(({ label, value }) => (
                    <Link
                    key={value}
                    href={`/${value}/0`}
                    prefetch={true}
                    className={cn(
                        "flex items-center px-3 py-1.5 text-sm font-medium rounded-md border-b border-transparent text-muted-foreground transition-all hover:bg-accent hover:text-foreground",
                        {
                            "bg-accent text-foreground":
                            currentPeriod === value,
                        }
                    )}
                    >
                        {label}
                    </Link>
                ))}
                <PeriodCalendar
                    period={currentPeriod || "day"}
                    currentIndex={currentIndex}
                />
                <DefaultTooltip
                    title={
                        currentIndex === 0
                            ? `Current ${currentPeriod}`
                            : `Next ${currentPeriod}`
                    }
                >
                    <Link
                        href={`/${currentPeriod}/${currentIndex - 1}`}
                        prefetch={true}
                        className={cn(
                            "flex items-center px-1.5 py-1.5 text-muted-foreground transition-all rounded",
                            currentIndex > 0
                                ? "hover:bg-accent hover:text-foreground"
                                : "opacity-50 cursor-not-allowed pointer-events-none"
                        )}
                    >
                        <ChevronRight size={20} />
                    </Link>
                </DefaultTooltip>
            </div>
        </div>
    );
};

export default PeriodToggle;
