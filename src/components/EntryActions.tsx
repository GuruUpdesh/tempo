"use client";

import React, { useTransition } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PauseIcon, VerticalDotsIcon } from "./Icons";
import { Button } from "./ui/button";
import { deleteEntry } from "@/actions/entry";
import { Trash2Icon, Loader } from "lucide-react";
import { TimeEntry } from "@/db/schema";
import { handlePause } from "@/actions/timer";

type Props = {
    entry: TimeEntry;
};

const EntryActions = ({ entry }: Props) => {
    const [isPausing, startPauseTransition] = useTransition();
    const [isDeleting, startDeleteTransition] = useTransition();

    const handleClick = () => {
        startPauseTransition(async () => {
            const result = await handlePause();
            if (result.error) {
                console.error(result.error);
            }
        });
    };

    const handleDelete = () => {
        startDeleteTransition(async () => {
            await deleteEntry(entry.id);
        });
    };

    return (
        <div className="flex items-center gap-2">
            {!entry.endTime && (
                <Button
                    onClick={handleClick}
                    size="icon"
                    className="rounded-full bg-accent border-border"
                    variant="outline"
                    disabled={isPausing}
                >
                    {isPausing ? (
                        <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                        <PauseIcon />
                    )}
                </Button>
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full"
                    >
                        <VerticalDotsIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                    <DropdownMenuItem
                        onSelect={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                            <Trash2Icon className="w-4 h-4" />
                        )}
                        Delete Entry
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default EntryActions;
