"use client";
import { logout } from "@/actions/auth";
import { importTimeEntries } from "@/actions/import";
import {
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ImportIcon, LogOutIcon } from "lucide-react";

import React, { useRef } from "react";

const UserActions = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = (e: Event) => {
        e.preventDefault();
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('File change:', e.target.files);
        if (!e.target.files?.[0]) return;
        
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        
        try {
            await importTimeEntries(formData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DropdownMenuContent align="start" className="w-[160px]">
            <DropdownMenuItem onSelect={handleImportClick}>
                <ImportIcon className="w-4 h-4" />
                Import CSV
                <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={logout}>
                <LogOutIcon className="w-4 h-4 -scale-x-100" />
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
};

export default UserActions;
