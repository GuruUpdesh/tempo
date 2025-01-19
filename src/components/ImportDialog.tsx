"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { importTimeEntries } from "@/actions/import";
import { useDialogStore } from "@/store/dialog";
import { toast } from "sonner";
import { AlertCircle, FileIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const KEY = 'import';

type ImportState = {
    status: 'idle' | 'importing' | 'error';
    error?: string;
};

const ImportDialog = () => {
    const isOpen = useDialogStore((state) => state.dialogs[KEY] ?? false);
    const close = useDialogStore((state) => state.close);
    const [importState, setImportState] = useState<ImportState>({ status: 'idle' });
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            await handleImport(file);
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await handleImport(file);
        }
    };

    const handleImport = async (file: File) => {
        if (!file.name.endsWith('.csv')) {
            setImportState({ 
                status: 'error', 
                error: 'Please upload a CSV file' 
            });
            return;
        }

        setImportState({ status: 'importing' });
        const formData = new FormData();
        formData.append('file', file);

        try {
            const result = await importTimeEntries(formData);
            if (result.error) {
                setImportState({ 
                    status: 'error', 
                    error: result.error 
                });
                return;
            }
            
            const { rows, skippedRows } = result.data!;
            toast.success(
                `Imported ${rows} entries${skippedRows > 0 ? ` (${skippedRows} skipped)` : ''}`
            );
            close(KEY);
        } catch {
            setImportState({ 
                status: 'error', 
                error: 'Failed to import CSV file' 
            });
        }
    };

    const handleDialogClose = () => {
        setImportState({ status: 'idle' });
        close(KEY);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleDialogClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Import CSV</DialogTitle>
                </DialogHeader>
                <div
                    className={cn(
                        "mt-4 p-8 border-2 border-dashed rounded-lg transition-all",
                        "relative flex flex-col items-center justify-center gap-2",
                        dragActive && "border-primary/50 bg-primary/5",
                        !dragActive && "border-border",
                        importState.status === 'importing' && "opacity-50 pointer-events-none",
                        importState.status === 'error' && "border-destructive/50 bg-destructive/5"
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    {importState.status === 'error' ? (
                        <>
                            <AlertCircle className="h-8 w-8 text-destructive" />
                            <p className="text-sm text-destructive font-medium">
                                {importState.error}
                            </p>
                            <button
                                onClick={() => setImportState({ status: 'idle' })}
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                Try again
                            </button>
                        </>
                    ) : importState.status === 'importing' ? (
                        <>
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">
                                Importing your data...
                            </p>
                        </>
                    ) : (
                        <>
                            <FileIcon className="h-8 w-8 text-muted-foreground" />
                            <div className="text-center">
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    accept=".csv"
                                    onChange={handleFileSelect}
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer text-primary hover:text-primary/80"
                                >
                                    Choose a file
                                </label>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    or drag and drop your CSV file here
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ImportDialog;