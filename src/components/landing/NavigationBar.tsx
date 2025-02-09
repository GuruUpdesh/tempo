"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "../Icons";
import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
};

export default function NavigationBar({ children }: Props) {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "px-4 pt-4 pb-3 flex justify-center w-full z-50 sticky top-0 transition-all",
                {
                    "bg-gradient-to-t from-transparent to-[#06080a]":
                        isSticky,
                }
            )}
        >
            <div className="max-w-[1100px] w-full flex justify-between items-center">
                <Link href="/" aria-label="Return to Tempo homepage">
                    <Logo />
                </Link>
                {children}
            </div>
        </nav>
    );
}
