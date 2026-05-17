"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, log to an error reporting service here.
    console.error("[SXA Error Boundary]", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#040404", color: "#d0c8b8", fontFamily: "monospace", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ maxWidth: 520, padding: "32px 24px", border: "1px solid #141414", background: "#0a0a0a" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 12 }}>
            System Error
          </div>
          <div style={{ fontSize: 20, marginBottom: 16 }}>Something went wrong</div>
          <div style={{ color: "#888273", fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>
            {error.message ?? "An unexpected error occurred in the command center."}
            {error.digest ? (
              <span style={{ display: "block", marginTop: 8, fontSize: 11 }}>
                Error ID: {error.digest}
              </span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={reset}
            style={{
              border: "1px solid #c8a96e",
              background: "#c8a96e",
              color: "#040404",
              padding: "10px 18px",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
