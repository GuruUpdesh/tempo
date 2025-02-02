import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Logo } from "@/components/Icons";
import User from "@/components/nav/User";
import Dialogs from "@/components/dialogs/Dialogs";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { Analytics } from '@vercel/analytics/next';

const  MontserratSans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tempo",
  description: "A simple, modern, and fast hours log",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/vnd",
        media: "(prefers-color-scheme: light)",
        url: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/vnd",
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-dark.ico",
      }
    ]
  }
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
            <Link href="/">
              <Logo />
            </Link>
            <User />
          </div>
        </nav>
        <Dialogs />
        <Toaster />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
