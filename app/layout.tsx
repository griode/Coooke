"use client"
import localFont from "next/font/local";
import "./globals.css";
import "./scroll-style.css";
import { Analytics } from "@vercel/analytics/react";
import { UserProviderContext } from "@/app/hooks/use_user_provider";
import { RecipeProviderContext } from "./hooks/recipe_context";

const geistSans = localFont({
    src: "./assets/fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./assets/fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-800`}>
                <UserProviderContext>
                    <RecipeProviderContext>
                        {children}
                    </RecipeProviderContext>
                </UserProviderContext>
                <Analytics />
            </body>
        </html>
    );
}
