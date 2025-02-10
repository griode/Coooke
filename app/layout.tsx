"use client";
import "@/app/style/globals.css";
import "@/app/style/scroll-style.css";
import { Analytics } from "@vercel/analytics/react";
import { UserProviderContext } from "@/app/hooks/use_current_user";
import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-white text-slate-800`}
      >
        <UserProviderContext>{children}</UserProviderContext>
        <Analytics />
      </body>
    </html>
  );
}
