import type { Metadata } from "next";
import { Bebas_Neue, Montserrat, Inter } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "@/components/auth-context";
import { ThemeProvider } from "@/components/theme-provider";
import { getPublicUrl } from "@/lib/config/public-url";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const publicUrl = getPublicUrl();

export const metadata: Metadata = {
  metadataBase: new URL(publicUrl),
  title: {
    default: "Sovereign X Audits — Digital & Image Intelligence Reports",
    template: "%s | Sovereign X Audits",
  },
  description:
    "A complete audit of your business, your brand, or your image — delivered in 72 hours. Revenue leaks identified. Dollar figures attached. AICC Verified. BlackFur Capital Group LLC.",
  keywords: [
    "digital audit service",
    "business intelligence audit",
    "personal brand audit",
    "image audit",
    "voice agent service",
    "website audit",
    "revenue leak audit",
    "AI readiness audit",
    "personal image consultant",
    "voice agent for law firm",
    "voice agent for dental practice",
  ],
  authors: [{ name: "Ola Olaitan", url: "https://aicouncilconductor.com" }],
  creator: "BlackFur Capital Group LLC",
  publisher: "Sovereign X Audits",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Sovereign X Audits — Digital & Image Intelligence Reports",
    description:
      "We audit your business, your brand, and your image — and show you exactly what it's costing you. Delivered in 72 hours.",
    type: "website",
    locale: "en_US",
    url: `${publicUrl}/intake`,
    siteName: "Sovereign X Audits",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sovereign X Audits" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sovereign X Audits",
    description: "We audit your business, your brand, and your image — and show you exactly what it's costing you.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: `${publicUrl}/intake` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${montserrat.variable} ${inter.variable}`}
      style={{
        ["--font-ibm-plex-mono" as string]: '"IBM Plex Mono", "SFMono-Regular", "Menlo", "Consolas", monospace',
        ["--font-display" as string]: 'Georgia, "Iowan Old Style", "Source Serif Pro", "Times New Roman", serif'
      }}

      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
