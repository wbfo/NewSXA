import type { Metadata } from "next";
import "@/app/globals.css";
import { AuthProvider } from "@/components/auth-context";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Sovereign X Command Center",
  description: "Command center for audits, pipeline, Hermes workflows, and operator approvals."
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
