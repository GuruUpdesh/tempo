import User from "@/components/nav/User";
import Dialogs from "@/components/dialogs/Dialogs";
import { Toaster } from "@/components/ui/sonner";
import VectorSearchInput from "@/components/VectorSearchInput";
import NavigationBar from "@/components/landing/NavigationBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavigationBar>
                <div className="flex items-center gap-4">
                    <VectorSearchInput />
                    <User />
                </div>
            </NavigationBar>
            <Dialogs />
            <Toaster />
            {children}
        </>
    );
}
