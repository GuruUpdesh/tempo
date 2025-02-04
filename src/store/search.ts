import { create } from "zustand";
import Fuse from "fuse.js";
import { TimeEntry } from "@/db/schema";

interface SearchResult {
    score: number;
    index: number;
}

interface SearchState {
    searchQuery: string;
    searchResults: Map<number, SearchResult>;
    setSearchQuery: (query: string) => void;
    searchEntries: (entries: TimeEntry[]) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    searchQuery: "",
    searchResults: new Map(),
    setSearchQuery: (query: string) => {
        set({ searchQuery: query });
    },
    searchEntries: (entries: TimeEntry[]) => {
        const fuse = new Fuse(entries, {
            keys: ["description"],
            threshold: 0.2,
            includeScore: true,
        });

        if (!entries.length) {
            set({ searchResults: new Map() });
            return;
        }

        const searchState = useSearchStore.getState();
        if (!searchState.searchQuery) {
            const results = new Map(
                entries.map((entry) => [entry.id, { score: 1, index: 0 }])
            );
            set({ searchResults: results });
            return;
        }

        const results = fuse.search(searchState.searchQuery);
        const searchResults = new Map(
            results.map((result, index) => [
                result.item.id,
                {
                    score: result.score ? 1 - result.score : 1,
                    index,
                },
            ])
        );

        set({ searchResults });
    },
}));
