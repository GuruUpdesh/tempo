import React from "react";

import SignIn from "@/components/dialogs/SignIn";
import { auth } from "@/auth";
import { semanticSearch } from "@/actions/entry";
import { TimezoneHandler } from "@/components/TimezoneHandler";
import EntriesTable from "@/components/timeEntry/EntriesTable";
import { BackButton } from "@/components/BackButton";
import { toast } from "sonner";
import getTotalTime from "@/utils/getTotalTime";
import { getEntryRange } from "@/utils/getDateRange";
import { ArrowRight } from "lucide-react";

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
    const entryRange = getEntryRange(entries);

    return (
        <div className="font-[family-name:var(--font-sans)]">
            <TimezoneHandler />
            {!session && <SignIn />}
            <main className="flex flex-col items-center mx-auto h-full">
                <section className="w-[1100px] flex flex-col px-2">
                    <header className="flex justify-between items-center w-full sticky top-0 bg-background py-2 z-10">
                        <BackButton />
                        <p></p>
                    </header>
                    <h1 className="text-3xl mb-6">Search Results</h1>
                    <div className="grid grid-cols-3 gap-5 mb-6">
                        <div className="flex flex-col gap-2 p-6 rounded-lg bg-card border-t border-border">
                            <p>Period</p>
                            <h2 className="text-lg flex items-center gap-2">
                                {entryRange[0]}
                                <ArrowRight className="w-4 h-5"/>
                                {entryRange[1]}
                            </h2>
                        </div>
                        <div className="flex flex-col gap-2 p-6 rounded-lg bg-card border-t border-border">
                            <p>Entries</p>
                            <h2 className="text-lg">{entries.length}</h2>
                        </div>
                        <div className="flex flex-col gap-2 p-6 rounded-lg bg-card border-t border-border">
                            <p>Total Time</p>
                            <h2 className="text-lg">{totalTime}</h2>
                        </div>
                    </div>
                    <EntriesTable entries={entries} period="year" />
                </section>
            </main>
        </div>
    );
}
