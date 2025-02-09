"use client";

import { useEffect, useState } from "react";
import { TimeEntry } from "@/db/schema";
import Timer from "../timer/Timer";
import { Button } from "../ui/button";
import { PauseIcon, PlayIcon } from "../Icons";
import { cn } from "@/lib/utils";

export function ScrollTimer() {
    const [entry, setEntry] = useState<TimeEntry | undefined>(undefined);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition >= 200) {
                if (!entry) {
                    setEntry({
                        id: 0,
                        deletedAt: null,
                        description: "Your Task",
                        endTime: null,
                        startTime: new Date(),
                        userId: "1",
                    });
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [entry]);

    const handleToggle = () => {
        setEntry((prev) =>
            prev
                ? undefined
                : {
                      id: 0,
                      deletedAt: null,
                      description: "Your Task",
                      endTime: null,
                      startTime: new Date(),
                      userId: "1",
                  }
        );
    };

    return (
        <>
            <Timer activeEntry={entry} />
            <div className="flex gap-4 py-12">
                <Button
                    onClick={handleToggle}
                    className={cn(
                        "rounded-full border-t border-border bg-card",
                        {
                            "bg-primary text-foreground hover:bg-foreground hover:text-primary border-primary-foreground":
                                !entry,
                        }
                    )}
                    variant="secondary"
                    size="lg"
                >
                    {entry ? <PauseIcon /> : <PlayIcon />}
                </Button>
            </div>
        </>
    );
}
