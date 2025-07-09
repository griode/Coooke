import "@/app/style/globals.css";
import "@/app/style/scroll-style.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import { Metadata } from "next";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Coooker",
  description: "Coooker is your go-to app for discovering, creating, and sharing delicious recipes. Explore a wide variety of dishes, manage your favorites, and get inspired to cook something new every day.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${nunito.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={'system'}
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
