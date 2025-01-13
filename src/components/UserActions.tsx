"use client";
import { logout } from "@/actions/auth";
import {
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";

import React from "react";

const UserActions = () => {
    return (
        <DropdownMenuContent align="start">
            <DropdownMenuItem onSelect={logout}>
                <LogOutIcon className="w-4 h-4 -scale-x-100" />
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
};

export default UserActions;
