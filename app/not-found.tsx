import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#040404",
        color: "#d0c8b8",
        fontFamily: "monospace"
      }}
    >
      <div style={{ maxWidth: 480, padding: "32px 24px", border: "1px solid #141414", background: "#0a0a0a", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 12 }}>
          404
        </div>
        <div style={{ fontSize: 20, marginBottom: 12 }}>Page not found</div>
        <div style={{ color: "#888273", fontSize: 13, lineHeight: 1.7, marginBottom: 24 }}>
          The page you requested could not be found.
        </div>
        <Link
          href="/"
          style={{
            display: "inline-block",
            border: "1px solid #c8a96e",
            background: "transparent",
            color: "#c8a96e",
            padding: "10px 18px",
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            fontSize: 11,
            textDecoration: "none"
          }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
