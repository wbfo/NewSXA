import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voice Agent Services — Sovereign X Audits",
  description:
    "ElevenLabs-powered voice agents for law firms, dental practices, med spas, and any business losing revenue to missed after-hours calls. Setup from $1,500.",
  alternates: { canonical: "https://sxaudits.com/voice-agents" },
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
    <main style={{ background: "#020617", color: "#e7e0d2", minHeight: "100vh" }}>
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.4em", color: "#d3ad64", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          Voice Agent Services
        </p>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.15, marginBottom: "1.5rem", color: "#e7e0d2" }}>
          Your Business Is Losing Revenue<br />
          To Missed After-Hours Calls.
        </h1>
        <p style={{ fontSize: "1.125rem", color: "#b0a592", fontFamily: "Georgia, serif", lineHeight: 1.7, marginBottom: "3rem", maxWidth: 640 }}>
          We deploy ElevenLabs-powered voice agents that handle calls, capture leads, and route inquiries
          around the clock — so your business never goes dark. Businesses typically recover the setup cost
          within the first 90 days.
        </p>

        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#d3ad64", marginBottom: "1.5rem" }}>Pricing</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
          {TIERS.map((tier) => (
            <div key={tier.name} style={{ border: "1px solid rgba(211,173,100,0.2)", padding: "1.5rem", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.3em", color: "#d3ad64", textTransform: "uppercase", marginBottom: "0.75rem" }}>{tier.name}</div>
              <div style={{ fontFamily: "monospace", fontSize: "1.5rem", color: "#d3ad64", marginBottom: "0.125rem" }}>{tier.setup} setup</div>
              <div style={{ fontFamily: "monospace", fontSize: "1rem", color: "#b0a592", marginBottom: "1rem" }}>+ {tier.monthly}</div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: "#b0a592", lineHeight: 1.6 }}>{tier.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#d3ad64", marginBottom: "1rem" }}>Who It&apos;s Built For</h2>
        <div style={{ display: "grid", gap: "1rem", marginBottom: "3rem" }}>
          {USE_CASES.map((uc) => (
            <div key={uc.industry} style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "1.25rem 1.5rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#d3ad64", textTransform: "uppercase", letterSpacing: "0.15em", whiteSpace: "nowrap", paddingTop: "0.125rem" }}>{uc.industry}</span>
              <span style={{ fontFamily: "Georgia, serif", color: "#b0a592", lineHeight: 1.6, fontSize: "0.95rem" }}>{uc.detail}</span>
            </div>
          ))}
        </div>

        <a
          href="/intake"
          style={{
            display: "inline-block", background: "#d3ad64", color: "#020617",
            padding: "1rem 2rem", fontFamily: "monospace", fontSize: "0.8rem",
            letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Get Your Voice Agent →
        </a>
      </section>
    </main>
  );
}
