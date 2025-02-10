import React from "react";

import SignIn from "@/components/dialogs/SignIn";
import { auth } from "@/auth";
import { semanticSearch } from "@/actions/entry";
import { TimezoneHandler } from "@/components/TimezoneHandler";
import EntriesTable from "@/components/timeEntry/EntriesTable";
import { BackButton } from "@/components/BackButton";
import { toast } from "sonner";
import getTotalTime from "@/utils/getTotalTime";

type Props = {
    params: Promise<{
        query: string;
    }>;
};

export default async function SearchResults({ params }: Props) {
    const session = await auth();
    const { query } = await params;
    const decodedQuery = decodeURIComponent(query);
    const results = await semanticSearch(decodedQuery);
    if (results.error !== null) {
        toast.error(results.error);
        return null;
    }

    const entries = session?.user?.id ? results.data : [];
    const totalTime = getTotalTime(entries);

    return (
        <div className="font-[family-name:var(--font-sans)]">
            <TimezoneHandler />
            {!session && <SignIn />}
            <main className="flex flex-col items-center mx-auto h-full">
                <section className="w-[1100px] flex flex-col px-2">
                    <header className="flex justify-between items-center w-full sticky top-0 bg-background py-2 z-10">
                        <BackButton />
                        <h1 className="text-lg font-bold flex items-center gap-2">
                            Results
                        </h1>
                        <p>{totalTime}</p>
                    </header>
                    <EntriesTable entries={entries} period="year" />
                </section>
            </main>
        </div>
    );
}
