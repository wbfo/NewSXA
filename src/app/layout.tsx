import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-montserrat",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Sovereign X Audits — Digital Infrastructure Examination Authority",
    description:
        "Sovereign X conducts structured digital infrastructure examinations for founders and capital operators.",
};

import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${montserrat.variable} ${inter.variable} font-inter bg-black text-white antialiased`}
                suppressHydrationWarning
            >
                <LayoutWrapper>
                    <main className="pt-16 md:pt-20">
                        {children}
                    </main>
                </LayoutWrapper>
            </body>
        </html>
    );
}
