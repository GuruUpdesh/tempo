import { Logo } from "@/components/Icons";
import User from "@/components/nav/User";
import Dialogs from "@/components/dialogs/Dialogs";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import VectorSearchInput from "@/components/VectorSearchInput";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <nav className="p-4 flex justify-center w-full z-50">
                <div className="max-w-[1100px] w-full flex justify-between items-center">
                    <Link href="/">
                        <Logo />
                    </Link>
                    <VectorSearchInput />
                    <User />
                </div>
            </nav>
            <Dialogs />
            <Toaster />
            {children}
        </>
    );
}
