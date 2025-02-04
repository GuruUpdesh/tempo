import React from "react";
import { auth } from "@/auth";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserActions from "./UserActions";
import { DefaultTooltip } from "../ui/tooltip";

const User = async () => {
    const session = await auth();
    if (!session || !session.user) return null;
    return (
        <DropdownMenu>
                <DefaultTooltip title={session.user.name}>
                    <DropdownMenuTrigger asChild>
                        <div className="p-1 rounded-full hover:bg-accent data-[state=open]:bg-accent">
                            {session.user.image && (
                                <Image
                                    src={session.user.image}
                                    width={30}
                                    height={30}
                                    alt="Profile Image"
                                    className="rounded-full"
                                />
                            )}
                        </div>
                    </DropdownMenuTrigger>
                </DefaultTooltip>
                <UserActions />
            </DropdownMenu>
    );
};

export default User;
