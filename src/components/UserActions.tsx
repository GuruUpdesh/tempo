"use client";
import React from "react";
import { logout } from "@/actions/auth";
import {
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDialogStore } from "@/store/dialog";
import { ImportIcon, LogOutIcon } from "lucide-react";

import { KEY } from "./ImportDialog";

const UserActions = () => {
    const openDialog = useDialogStore((state) => state.open);

    return (
        <DropdownMenuContent align="start" className="w-[160px]">
            <DropdownMenuItem onSelect={() => openDialog(KEY)}>
                <ImportIcon className="w-4 h-4" />
                Import CSV
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={logout}>
                <LogOutIcon className="w-4 h-4 -scale-x-100" />
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
};

export default UserActions;
