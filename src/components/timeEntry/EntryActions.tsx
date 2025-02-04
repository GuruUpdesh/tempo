"use client";

import React, { useTransition } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PauseIcon, VerticalDotsIcon } from "../Icons";
import { Button } from "../ui/button";
import { deleteEntry, restoreEntry } from "@/actions/entry";
import { Trash2Icon, Loader } from "lucide-react";
import { TimeEntry } from "@/db/schema";
import { handlePause } from "@/actions/timer";
import { toast } from "sonner";
import { DefaultTooltip } from "../ui/tooltip";
import { addDays, formatDistanceToNow } from "date-fns";

type Props = {
    entry: TimeEntry;
    isFirst: boolean;
};

const EntryActions = ({ entry, isFirst }: Props) => {
    const [isPausing, startPauseTransition] = useTransition();
    const [isDeleting, startDeleteTransition] = useTransition();
    const [isRestoring, startRestoreTransition] = useTransition();

    const clickPause = () => {
        startPauseTransition(async () => {
            const result = await handlePause();
            if (result.error) {
                toast.error(result.error);
            }
        });
    };

    const clickRestore = () =>  {
        startRestoreTransition(async () =>  {
            await restoreEntry(entry.id);
            toast("Time Entry Restored")
        })
    }

    const clickDelete = (hard=false) => {
        startDeleteTransition(async () => {
            await deleteEntry(entry.id, hard);
            if (!hard) {
                toast("Time Entry Deleted", {
                    action: {
                        label: "Undo",
                        onClick: () => {
                            startRestoreTransition(async () => {
                                await restoreEntry(entry.id);
                                toast("Time Entry Restored");
                            });
                        }
                    }
                });
            } else {
                toast("Time Entry Permanently Deleted");
            }
        });
    };

    if (entry.deletedAt) {
        return (
            <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                    Deletes {formatDistanceToNow(addDays(entry.deletedAt, 30), { addSuffix: true })}
                </p>
                <Button
                    onClick={clickRestore}
                    className="rounded-full bg-transparent"
                    variant="outline"
                    disabled={isRestoring || isDeleting}
                >
                    Restore
                </Button>
                <DefaultTooltip title="Delete Forever">
                    <Button
                        onClick={() => clickDelete(true)}
                        size="icon"
                        className="rounded-full bg-transparent"
                        variant="outline"
                        disabled={isRestoring || isDeleting}
                    >
                        <Trash2Icon className="w-4 h-4" />
                    </Button>
                </DefaultTooltip>
            </div>
        );
    }

    if (!isFirst) return null;

    return (
        <div className="flex items-center gap-2">
            {!entry.endTime && (
                <Button
                    onClick={clickPause}
                    size="icon"
                    className="rounded-full bg-transparent"
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
                        onSelect={() => clickDelete()}
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
