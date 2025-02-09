import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
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
        <Analytics />
        {children}
      </body>
    </html>
  );
}
