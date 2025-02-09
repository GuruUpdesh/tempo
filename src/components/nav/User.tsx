import React from "react";
import { auth } from "@/auth";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserActions from "./UserActions";
import { DefaultTooltip } from "../ui/tooltip";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
    landingPage?: boolean;
};

const User = async ({ landingPage = false }: Props) => {
    const session = await auth();
    if (!session || !session.user) {
        return (
            <div className="flex items-center gap-2">
                <Button
                    className="bg-transparent"
                    variant="secondary"
                    size="sm"
                    type="button"
                    aria-label="Login to Tempo"
                    asChild
                >
                    <Link href="/day/0">Login</Link>
                </Button>
                <Button
                    className="hover:bg-primary border-t border-transparent hover:border-t-primary-foreground focus:border-primary-foreground focus:bg-primary hover:text-foreground focus:text-foreground"
                    variant="secondary"
                    size="sm"
                    type="button"
                    aria-label="Sign Up to Tempo"
                    asChild
                >
                    <Link href="/day/0">Sign Up</Link>
                </Button>
            </div>
        );
    }
    return (
        <div className="flex items-center gap-2">
            {landingPage && (
                <Button
                    className="rounded-full hover:bg-primary border-t border-transparent hover:border-t-primary-foreground focus:border-primary-foreground focus:bg-primary hover:text-foreground focus:text-foreground"
                    variant="secondary"
                    size="sm"
                    type="button"
                    asChild
                >
                    <Link href="/day/0">Timesheet</Link>
                </Button>
            )}
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
        </div>
    );
};

export default User;
