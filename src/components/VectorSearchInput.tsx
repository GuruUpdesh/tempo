"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const VectorSearchInput = () => {
    const [value, setValue] = useState("");
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        if (params.query) {
            setValue(decodeURIComponent(params.query as string));
        } else {
            setValue("");
        }
    }, [params.query]);

    function handleCancel() {
        setValue("");
        router.push("/day/0");
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        console.log("Submitting search query");
        e.preventDefault();
        if (!value.trim()) {
            console.log("No search query provided");
            return;
        }

        // Encode the query for URL safety
        const encodedQuery = encodeURIComponent(value.trim());
        router.push(`/search/${encodedQuery}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="group relative pl-4 flex items-center bg-card border-t border-border rounded-full"
        >
            <SearchIcon className="w-5 h-5 left-4 text-muted-foreground group-focus-within:text-foreground" />
            {!value && (
                <p className="absolute left-12 text-transparent bg-gradient-to-l to-muted-foreground from-primary bg-clip-text pointer-events-none">
                    Ask a question about your data...
                </p>
            )}
            {value && (
                <button
                    onClick={handleCancel}
                    type="button"
                    className="absolute right-4"
                >
                    <XIcon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-color" />
                </button>
            )}
            <input
                value={value}
                onChange={handleChange}
                className="text-foreground bg-transparent py-2 pl-3 pr-4 outline-none w-[450px]"
            />
        </form>
    );
};

export default VectorSearchInput;
