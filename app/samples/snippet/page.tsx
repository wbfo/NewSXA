import { SovereignSnippet } from "@/components/sovereign-snippet";

export const metadata = {
  title: "Sample Intelligence Snippet — Sovereign X Audits",
  description:
    "See what a Sovereign X Intelligence Snippet looks like before you commit to a full audit.",
};

export default function SampleSnippetPage() {
  return (
    <main style={{ background: "#060606", minHeight: "100vh" }}>
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p
          className="font-mono text-xs uppercase mb-4"
          style={{ color: "#C8A96E", letterSpacing: "4px" }}
        >
          Sample Document · Sovereign X Audits
        </p>
        <h1
          className="text-3xl font-serif mb-4"
          style={{ color: "#D0C8B8", fontFamily: "var(--font-display)" }}
        >
          The Sovereign Intelligence Snippet
        </h1>
        <p
          className="max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ color: "#777", fontSize: "15px" }}
        >
          This is what a prospect receives before paying a dollar. 3 verified findings.
          Dollar figures attached. No pitch. No strings. The full audit contains 14–21
          findings.
        </p>
      </div>

      {/* The snippet */}
      <div className="max-w-5xl mx-auto px-6 pb-24 overflow-x-auto">
        <SovereignSnippet />
      </div>

      {/* CTA below */}
      <div className="text-center pb-24">
        <p
          className="font-mono text-xs uppercase mb-6"
          style={{ color: "#555", letterSpacing: "4px" }}
        >
          Ready to see what we find in your business?
        </p>
        <a
          href="/intake"
          className="inline-block px-10 py-4 font-mono text-sm uppercase font-bold transition-opacity hover:opacity-90"
          style={{
            background: "#C8A96E",
            color: "#060606",
            letterSpacing: "0.1em",
          }}
        >
          Get Your Audit →
        </a>
      </div>
    </main>
  );
}
