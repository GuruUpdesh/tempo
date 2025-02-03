"use client";
import { updateDescription } from "@/actions/entry";
import { TimeEntry } from "@/db/schema";
import { LetterText } from "lucide-react";
import React from "react";

type Props = {
    entry: TimeEntry;
    index: number;
};

const DescriptionForm = ({ entry, index }: Props) => {

    async function handleSubmit(formData: FormData) {
        const description = formData.get('description') as string;
        if (entry.description === description) return;
        await updateDescription(entry.id, description);
    }

    return (
        <form
            action={handleSubmit}
            onBlur={(e) => {
                const form = e.currentTarget;
                const formData = new FormData(form);
                handleSubmit(formData);
            }}
            className="flex items-center gap-2"
        >
            <LetterText className="w-4 h-4"/>
            <input
                type="text"
                name="description"
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
                placeholder="Add description..."
                defaultValue={entry.description || ""}
                autoFocus={index === 0}
            />
        </form>
    );
};

export default DescriptionForm;
