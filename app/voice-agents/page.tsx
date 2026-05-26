import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/sections/site-nav";

export const metadata: Metadata = {
  title: {
    absolute: "Voice Agent Services — Sovereign X Audits",
  },
  description:
    "ElevenLabs-powered voice agents for law firms, dental practices, med spas, and any business losing revenue to missed after-hours calls. Setup from $1,500.",
  alternates: { canonical: "https://sxaudits.com/voice-agents" },
  openGraph: {
    title: "Voice Agent Services — Sovereign X Audits",
    description:
      "AI voice agents that handle calls, capture leads, and route inquiries 24/7. Businesses typically recover the setup cost within 90 days.",
    url: "https://sxaudits.com/voice-agents",
    siteName: "Sovereign X Audits",
    images: [
      {
        url: "https://sxaudits.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Voice Agent Services — Sovereign X Audits",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice Agent Services — Sovereign X Audits",
    description:
      "AI voice agents that handle calls, capture leads, and route inquiries 24/7.",
    images: ["https://sxaudits.com/og-image.png"],
  },
};

const TIERS = [
  {
    name: "Starter",
    setup: "$1,500",
    monthly: "$200/mo",
    desc: "Core voice agent deployment. Handles after-hours calls, captures leads, routes inquiries.",
  },
  {
    name: "Standard",
    setup: "$2,500",
    monthly: "$350/mo",
    desc: "Full deployment with custom voice, advanced routing, CRM integration, and monthly reporting.",
  },
  {
    name: "Advanced",
    setup: "$4,000–$5,000",
    monthly: "$500/mo",
    desc: "Enterprise-grade deployment with multi-location support, custom workflows, and dedicated management.",
  },
];

const USE_CASES = [
  { industry: "Law Firms", detail: "Never miss a potential client call after hours. Every inquiry captured and routed." },
  { industry: "Dental Practices", detail: "Appointment scheduling and patient inquiries handled 24/7 without staff overhead." },
  { industry: "Med Spas", detail: "Consultation bookings, service inquiries, and lead capture around the clock." },
  { industry: "Real Estate", detail: "Property inquiries, showing requests, and lead qualification at any hour." },
];

export default function VoiceAgentsPage() {
  return (
    <div className="sx-intake">
      <SiteNav />

      <main style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "8rem 1.5rem 4rem" }}>

          {/* Back */}
          <div style={{ marginBottom: "32px" }}>
            <Link
              href="/"
              style={{
                color: "var(--subtle)",
                fontFamily: "monospace",
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              ← Back to Home
            </Link>
          </div>

          <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.4em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Voice Agent Services
          </p>

          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "1.5rem", color: "var(--text)" }}>
            Your Business Is Losing Revenue<br />
            To Missed After-Hours Calls.
          </h1>

          <p style={{ fontSize: "1.125rem", color: "var(--subtle)", fontFamily: "Georgia, serif", lineHeight: 1.7, marginBottom: "3rem", maxWidth: 640 }}>
            We deploy ElevenLabs-powered voice agents that handle calls, capture leads, and route inquiries
            around the clock — so your business never goes dark. Businesses typically recover the setup cost
            within the first 90 days.
          </p>

          {/* Pricing */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "var(--gold)", marginBottom: "1.5rem" }}>Pricing</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
            {TIERS.map((tier) => (
              <div key={tier.name} style={{ border: "1px solid var(--gold-glow)", padding: "1.5rem", background: "var(--surface)" }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "0.75rem" }}>{tier.name}</div>
                <div style={{ fontFamily: "monospace", fontSize: "1.5rem", color: "var(--text)", marginBottom: "0.125rem" }}>{tier.setup} setup</div>
                <div style={{ fontFamily: "monospace", fontSize: "1rem", color: "var(--subtle)", marginBottom: "1rem" }}>+ {tier.monthly}</div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: "var(--subtle)", lineHeight: 1.6 }}>{tier.desc}</p>
              </div>
            ))}
          </div>

          {/* Who it's for */}
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "var(--gold)", marginBottom: "1rem" }}>Who It&apos;s Built For</h2>
          <div style={{ display: "grid", gap: "1rem", marginBottom: "3rem" }}>
            {USE_CASES.map((uc) => (
              <div key={uc.industry} style={{ border: "1px solid var(--border)", padding: "1.25rem 1.5rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.15em", whiteSpace: "nowrap", paddingTop: "0.125rem" }}>{uc.industry}</span>
                <span style={{ fontFamily: "Georgia, serif", color: "var(--subtle)", lineHeight: 1.6, fontSize: "0.95rem" }}>{uc.detail}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/intake"
            style={{
              display: "inline-block", background: "var(--gold)", color: "var(--bg)",
              padding: "1rem 2rem", fontFamily: "monospace", fontSize: "0.8rem",
              letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Get Your Voice Agent →
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg)",
        padding: "48px 24px",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "32px" }}>
          <div>
            <div style={{ color: "var(--gold)", fontFamily: "monospace", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "8px" }}>
              Sovereign X Audits
            </div>
            <div style={{ color: "var(--dim)", fontFamily: "monospace", fontSize: "10px", letterSpacing: "2px" }}>
              BlackFur Capital Group LLC
            </div>
          </div>
          <nav style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {([
              { href: "/", label: "Home" },
              { href: "/#services", label: "Services" },
              { href: "/blog", label: "Intelligence" },
              { href: "/samples", label: "Samples" },
              { href: "/voice-agents", label: "Voice Agents" },
              { href: "/intake", label: "Start Audit" },
            ] as const).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{ color: "var(--subtle)", fontFamily: "monospace", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", textDecoration: "none" }}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div style={{ color: "var(--dim)", fontFamily: "monospace", fontSize: "10px", letterSpacing: "1px" }}>
            © {new Date().getFullYear()} BlackFur Capital Group LLC
          </div>
        </div>
      </footer>
    </div>
  );
}
