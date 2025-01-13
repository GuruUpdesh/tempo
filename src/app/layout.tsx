import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Logo } from "@/components/Icons";
import User from "@/components/User";

const  MontserratSans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tempo",
  description: "A simple, modern, and fast hours log",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${MontserratSans.variable} antialiased bg-background text-foreground`}
      >
        <nav className="p-4 flex justify-center w-full">
          <div className="max-w-[900px] w-full flex justify-between items-center">
            <Logo />
            <User />
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
