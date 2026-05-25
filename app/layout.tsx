import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amara — The Agency Operating Layer",
  description:
    "One agent leads. Twenty deliver. Amara helps marketing agencies deliver better ROI for their clients by automating every channel and optimising them 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body className="bg-ink text-cream antialiased min-h-screen">
        <Sidebar />
        <div className="pl-[244px] min-h-screen flex flex-col">
          <TopBar />
          <main className="flex-1 px-8 py-8 max-w-[1480px] w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
