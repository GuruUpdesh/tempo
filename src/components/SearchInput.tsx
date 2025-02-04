"use client";

import React, { useEffect, useRef, useState } from "react";
import { TimeEntry } from "@/db/schema";
import { useSearchStore } from "@/store/search";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useDebouncedCallback } from 'use-debounce';

interface SearchInputProps {
    entries: TimeEntry[];
}

export function SearchInput({ entries }: SearchInputProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { searchQuery, setSearchQuery, searchEntries } = useSearchStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const query = searchParams.get("q") || "";
        setSearchQuery(query);
        searchEntries(entries);
        if (query && inputRef.current) {
            setIsExpanded(true);
            inputRef.current.focus();
        }
    }, [searchParams, entries, searchEntries, setSearchQuery]);

    const updateSearchParams = useDebouncedCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set("q", value);
        } else {
            params.delete("q");
        }
        router.push(`?${params.toString()}`);
        searchEntries(entries);
    }, 300);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        updateSearchParams(value);
    };

    return (
        <div className="relative flex items-center">
            <div
                className={`flex items-center transition-all duration-200 ease-in-out ${
                    isExpanded ? "w-64" : "w-8"
                }`}
            >
                <div className="absolute left-2 text-muted-foreground">
                    <Search size={20} />
                </div>
                <input
                    ref={inputRef}
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setIsExpanded(true)}
                    onBlur={() => {
                        if (!searchQuery) {
                            setIsExpanded(false);
                        }
                    }}
                    className={`
                    w-full pl-8 pr-3 py-1 bg-transparent border rounded-md
                    border-input ring-offset-background 
                    placeholder:text-muted-foreground text-foreground
                    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                    disabled:cursor-not-allowed disabled:opacity-50
                    transition-all duration-200 ease-in-out
                    ${isExpanded ? "opacity-100" : "opacity-0"}
                `}
                />
            </div>
            {!isExpanded && (
                <button
                    onClick={() => {
                        setIsExpanded(true);
                        inputRef.current?.focus();
                    }}
                    className="absolute p-1.5 rounded-md text-muted-foreground bg-background hover:text-foreground transition-colors"
                    aria-label="Open search"
                >
                    <Search size={20} />
                </button>
            )}
        </div>
    );
}
