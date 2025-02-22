"use client";
import React from "react";
import { logout } from "@/actions/auth";
import {
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDialogStore } from "@/store/dialog";
import { HistoryIcon, ImportIcon, InfoIcon, LogOutIcon } from "lucide-react";

import { KEY } from "../dialogs/ImportDialog";
import Link from "next/link";
import { Separator } from "../ui/separator";

const UserActions = () => {
    const openDialog = useDialogStore((state) => state.open);

    return (
        <DropdownMenuContent align="center" className="w-[160px]">
            <DropdownMenuItem onSelect={() => openDialog(KEY)}>
                <ImportIcon className="w-4 h-4" />
                Import CSV
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/archive">
                    <HistoryIcon className="w-4 h-4" />
                    Archived Entries
                </Link>
            </DropdownMenuItem>
            <Separator className="my-1"/>
            <DropdownMenuItem asChild>
                <Link href="/info/privacy">
                    <InfoIcon className="w-4 h-4" />
                    Privacy Policy
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={logout}>
                <LogOutIcon className="w-4 h-4 -scale-x-100" />
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
};

export default UserActions;
