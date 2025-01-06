"use client"
import "./globals.css";
import "./scroll-style.css";
import { Analytics } from "@vercel/analytics/react";
import { UserProviderContext } from "@/hooks/use_current_user";
import { RecipeProviderContext } from "@/hooks/use_recipes";
import { Poppins} from "next/font/google";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    fallback: ['sans-serif'],
})


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.className} antialiased bg-white text-slate-800`}>
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
