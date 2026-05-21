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

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sovereign X Audits",
    url: "https://sxaudits.com",
    description: "Digital Infrastructure Examination Authority. Sovereign X conducts structured digital infrastructure examinations for founders and capital operators.",
    makesOffer: [
        {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: "Sovereign X Digital Audit",
                description: "Structural examination of digital infrastructure including website, search presence, AI discoverability, listings, automation, and ownership structure."
            }
        },
        {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: "Sovereign X Image Audit",
                description: "Comprehensive image and visibility analysis including body type analysis, wardrobe blueprint, photography session, and social visibility."
            }
        },
        {
            "@type": "Offer",
            itemOffered: {
                "@type": "Service",
                name: "Sovereign X Voice Agent",
                description: "Inbound call process examination and automation for businesses."
            }
        }
    ]
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
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
