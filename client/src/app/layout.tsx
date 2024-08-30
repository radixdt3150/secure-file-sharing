import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript, Flowbite } from "flowbite-react";
import clsx from "clsx";
import "./globals.css";

import { Header } from "./components/organisms/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Secure File Sharing",
    description: "A sample application for secure file sharing example",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <ThemeModeScript />
            </head>

            <body className={clsx([inter.className, 'bg-white dark:bg-gray-900'])}>
                <Flowbite>
                    <Header />
                    {children}
                </Flowbite>
            </body>
        </html>
    );
}
