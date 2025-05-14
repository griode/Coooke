"use client";
import "@/app/style/globals.css";
import "@/app/style/scroll-style.css";
import { Analytics } from "@vercel/analytics/react";
import { Montserrat} from "next/font/google";
import React from "react";

const montserrat = Montserrat({
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
        className={`${montserrat.className} antialiased bg-white text-slate-800`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
