"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { InvoiceIcon } from "./Icons";
import { TimeEntry } from "@/db/schema";
import { generateSummary } from "@/actions/ai-summary";
import { toast } from "sonner";
import { useSummaryStore } from "@/store/summary";
import { DefaultTooltip } from "./ui/tooltip";

type Props = {
    entries: TimeEntry[];
};

export function SummaryButton({ entries }: Props) {
    const [isPending, startTransition] = useTransition();
    const { summary, setSummary } = useSummaryStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleGenerateSummary = (regenerate = false) => {
        if (summary && !regenerate) {
            setIsDialogOpen(true);
            return;
        }

        startTransition(async () => {
            const result = await generateSummary(entries);
            if (result.data) {
                setSummary(result.data);
                setIsDialogOpen(true);
            } else {
                toast.error(result.error);
            }
        });
    };

    const handleCopy = async () => {
        if (summary) {
            await navigator.clipboard.writeText(summary);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1000);
        }
    };

    return (
        <>
            <DefaultTooltip title="Summarize Period">
                <button
                    onClick={() => handleGenerateSummary()}
                    disabled={isPending}
                    aria-label="Generate summary"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    {isPending ? (
                        <Loader className="h-6 w-6 animate-spin" />
                    ) : (
                        <InvoiceIcon />
                    )}
                </button>
            </DefaultTooltip>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90%]">
                    <DialogHeader>
                        <DialogTitle className="flex gap-2 items-center">
                            <InvoiceIcon />
                            Summary
                        </DialogTitle>
                    </DialogHeader>

                    <div className="relative">
                        <pre className="mt-2 rounded-lg bg-background p-4 whitespace-pre-wrap font-mono text-sm max-h-[600px] overflow-y-auto">
                            {summary}
                        </pre>

                        <Button
                            onClick={handleCopy}
                            variant="secondary"
                            size="sm"
                            className="absolute top-4 right-2"
                        >
                            {isCopied ? "Copied!" : "Copy"}
                        </Button>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={() => handleGenerateSummary(true)}
                            disabled={isPending}
                            variant="secondary"
                        >
                            {isPending ? (
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Regenerate
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
