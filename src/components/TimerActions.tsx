"use client";

import React, { useTransition } from "react";
import { PauseIcon, PlayIcon } from "@/components/Icons";
import { Loader } from "lucide-react";
import { TimeEntry } from "@/db/schema";
import { handlePause, handleStart } from "@/actions/timer";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Props = {
    activeEntry: TimeEntry | undefined;
};

const TimerActions = ({ activeEntry }: Props) => {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            if (activeEntry) {
                const result = await handlePause();
                if (result.error) {
                    toast.error(result.error);
                }
            } else {
                const result = await handleStart();
                if (result.error) {
                    toast.error(result.error);
                }
            }
        });
    };

    return (
        <div className="flex gap-4 mb-12">
            <Button
                onClick={handleClick}
                aria-label={activeEntry ? "stop" : "start"}
                className={cn("rounded-full", {
                    "bg-primary text-foreground hover:bg-foreground hover:text-primary": !activeEntry
                })}
                variant="secondary"
                size="lg"
                disabled={isPending}
            >
                {isPending ? (
                    <Loader className="w-4 h-4 animate-spin" />
                ) : activeEntry ? (
                    <PauseIcon />
                ) : (
                    <PlayIcon />
                )}
            </Button>
        </div>
    );
};

export default TimerActions;
