import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your Sovereign X Audit order has been received and is now in the command queue.",
  robots: { index: false, follow: false },
};

export default function IntakeSuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg, #0a0a0a)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: 560,
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>⌁</div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.6rem, 4vw, 2.25rem)",
            color: "var(--fg, #f5f5f5)",
            margin: 0,
          }}
        >
          Order confirmed.
        </h1>

        <p
          style={{
            color: "var(--subtle, #999)",
            fontSize: "1rem",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Your payment was received and your audit is now in the command queue.
          You will receive a confirmation email with next steps and your Google Drive
          upload link within the next few minutes.
        </p>

        <div
          style={{
            background: "var(--surface, #111)",
            border: "1px solid var(--border, #222)",
            borderRadius: 8,
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            textAlign: "left",
          }}
        >
          <div style={{ color: "var(--neon-amber, #f0a500)", fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.1em" }}>
            WHAT HAPPENS NEXT
          </div>
          <ol style={{ color: "var(--subtle, #999)", fontSize: "0.9rem", lineHeight: 1.8, margin: 0, paddingLeft: "1.25rem" }}>
            <li>Confirmation email with your Google Drive upload link</li>
            <li>Our team reviews your intake details within 24 hours</li>
            <li>Audit delivery within 72 hours of intake confirmation</li>
          </ol>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/portal"
            style={{
              background: "var(--neon-blue, #00b4d8)",
              color: "#000",
              padding: "0.65rem 1.5rem",
              borderRadius: 6,
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            View your portal →
          </Link>
          <Link
            href="/"
            style={{
              color: "var(--subtle, #999)",
              padding: "0.65rem 1.5rem",
              borderRadius: 6,
              border: "1px solid var(--border, #333)",
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Back to home
          </Link>
        </div>

        <p style={{ color: "var(--subtle, #777)", fontSize: "0.75rem", margin: 0 }}>
          Questions? Email{" "}
          <a href="mailto:sxa@sxaudits.com" style={{ color: "inherit" }}>
            sxa@sxaudits.com
          </a>
        </p>
      </div>
    </main>
  );
}
