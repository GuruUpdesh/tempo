import React from "react";

import EntriesTable from "../../components/timeEntry/EntriesTable";
import SignIn from "@/components/dialogs/SignIn";
import { auth } from "@/auth";
import { getEntries } from "@/actions/entry";
import { TimezoneHandler } from "@/components/TimezoneHandler";
import { toast } from "sonner";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function History() {
    const session = await auth();
    const period = "year";

    const results = await getEntries(period, true);
    if (results.error !== null) {
        toast.error(results.error);
        return null;
    }

    const entries = session?.user?.id ? results.data : [];

    return (
        <div className="font-[family-name:var(--font-sans)]">
            <TimezoneHandler />
            {!session && <SignIn />}
            <main className="flex flex-col items-center mx-auto h-full">
                <section className="w-[900px] flex flex-col px-2">
                    <header className="flex justify-between items-center w-full sticky top-0 bg-background py-2 z-10">
                        <Button variant="ghost" asChild>
                            <Link href="/" >
                                <ArrowLeftIcon />
                                Back
                            </Link>
                        </Button>
                        <h1 className="text-lg font-bold flex items-center gap-2">
                            Archived Entries
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Archives last 30 days
                        </p>
                    </header>
                    <EntriesTable entries={entries} period={period} />
                </section>
            </main>
        </div>
    );
}
