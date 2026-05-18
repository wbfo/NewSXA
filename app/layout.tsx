import type { Metadata } from "next";
import "@/app/globals.css";
import { AuthProvider } from "@/components/auth-context";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://sxaudits.com"),
  title: {
    default: "Sovereign X Audits",
    template: "%s | Sovereign X Audits"
  },
  description: "Business, brand, image, and voice-agent audits delivered in 72 hours by BlackFur Capital Group LLC.",
  alternates: {
    canonical: "https://sxaudits.com"
  },
  openGraph: {
    title: "Sovereign X Audits",
    description: "We audit your business, your brand, and your image — and show you exactly what it's costing you.",
    url: "https://sxaudits.com",
    siteName: "Sovereign X Audits",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
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
