import React from "react";

export function SovereignSnippet() {
  return (
    <div
      className="sample-report sample-report-snippet"
      style={{
        width: "100%",
        maxWidth: "900px",
        fontFamily: "var(--font-inter), sans-serif",
        color: "#FFFFFF",
        margin: "0 auto",
      }}
    >
      {/* SECTION 1 — HEADER BAR */}
      <div
        className="snippet-header-bar"
        style={{
          backgroundColor: "transparent",
          padding: "20px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ color: "#FFFFFF", fontSize: "12px", fontWeight: 600 }}>
            Sovereign X Audits
          </span>
          <span style={{ color: "#C8A96E", fontSize: "11px" }}>
            BlackFur Capital Group LLC
          </span>
        </div>
        <div style={{ textAlign: "center", position: "relative" }}>
          <h1
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: "36px",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>SOVEREIGN INTELLIGENCE </span>
            <span style={{ color: "#F5C518" }}>SNIPPET</span>
          </h1>
          <div
            style={{
              color: "#38BDF8",
              fontSize: "12px",
              marginTop: "8px",
              fontWeight: 500,
            }}
          >
            Multi-Location Healthcare Group · New York, NY · Multi-Location DSO · May
            2026
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "10px",
              marginTop: "4px",
              opacity: 0.8,
            }}
          >
            Sovereign X Audits · BlackFur Capital Group LLC
          </div>
        </div>
        <div>
          <div
            style={{
              border: "1px solid #C8A96E",
              color: "#C8A96E",
              fontFamily: "monospace",
              fontSize: "10px",
              letterSpacing: "0.05em",
              borderRadius: "4px",
              padding: "4px 10px",
              textTransform: "uppercase",
            }}
          >
            AICC Verified
          </div>
        </div>
      </div>

      {/* SECTION 2 — PARTIAL DISCLOSURE BAR */}
      <div
        className="snippet-disclosure-bar"
        style={{
          backgroundColor: "transparent",
          padding: "14px 28px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div style={{ color: "#D97706", fontSize: "20px" }}>⚠️</div>
        <div style={{ color: "#92400E", fontSize: "13px", lineHeight: 1.5 }}>
          <strong>PARTIAL DISCLOSURE: </strong>
          This document contains 3 of 14 findings identified in a full intelligence review
          of Multi-Location Healthcare Group's digital footprint — not just the corporate
          brand and multi-location network. A complete Sovereign Audit is available upon
          request.
        </div>
      </div>

      {/* SECTION 3 — PERSONAL ADDRESS BLOCK */}
      <div
        className="snippet-address-block"
        style={{
          backgroundColor: "transparent",
          padding: "20px 28px",
          display: "flex",
          gap: "16px",
          alignItems: "flex-start",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            backgroundColor: "transparent",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {/* Simple avatar svg */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div>
          <div style={{ color: "#FFFFFF", fontSize: "14px", lineHeight: 1.6 }}>
            <span style={{ fontWeight: "bold", fontSize: "16px", marginRight: "6px" }}>
              [CLIENT NAME],
            </span>
            Before reaching out, I spent time reviewing your digital footprint — not just
            the corporate site, but across several of your NYC locations. I found three
            things I believe you should know about. Each one is costing you patients and
            revenue right now, independent of your clinical quality or your team's effort.
          </div>
          <div
            style={{
              color: "#C8A96E",
              fontWeight: "bold",
              fontSize: "14px",
              marginTop: "8px",
            }}
          >
            These findings are yours. No pitch. No strings.
          </div>
        </div>
      </div>

      {/* SECTION 4 — THREE FINDING CARDS */}
      <div
        style={{
          backgroundColor: "transparent",
          padding: "20px 28px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {/* CARD 01 */}
        <div
          style={{
            backgroundColor: "transparent",
            borderRadius: "8px",
            padding: "20px",
            borderTop: "4px solid #E63946",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                01
              </div>
              <div
                style={{
                  color: "#E63946",
                  fontWeight: "bold",
                  fontSize: "11px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                FINDING 01
              </div>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E63946"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <h2
            style={{
              color: "#E63946",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 800,
              textTransform: "uppercase",
              fontSize: "15px",
              lineHeight: 1.3,
              margin: "12px 0",
            }}
          >
            THIS BUSINESS IS INVISIBLE IN AI SEARCH — WHERE PATIENTS ARE NOW LOOKING
          </h2>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["ChatGPT", "Perplexity", "Google AI Overview"].map((pill) => (
              <span
                key={pill}
                style={{
                  border: "1px solid #E5E7EB",
                  borderRadius: "20px",
                  padding: "4px 10px",
                  fontSize: "10px",
                  color: "#374151",
                }}
              >
                {pill}
              </span>
            ))}
          </div>

          <ul
            style={{
              marginTop: "16px",
              padding: 0,
              margin: "16px 0",
              listStyle: "none",
              fontSize: "12px",
              color: "#374151",
              lineHeight: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {[
              "Searched for top providers in this category across NYC — this business did not appear in a single AI-generated response.",
              "The business did not appear in a single AI-generated response. Competitors did.",
              "No schema markup connecting your multi-location network.",
              "To AI systems, your locations are unrelated businesses with no brand relationship.",
            ].map((text, i) => (
              <li key={i} style={{ display: "flex", gap: "6px" }}>
                <span style={{ color: "#E63946", flexShrink: 0 }}>✗</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "auto",
              backgroundColor: "transparent",
              borderRadius: "6px",
              padding: "14px",
              borderLeft: "3px solid #E63946",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "4px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: "1px solid #E63946",
                  color: "#E63946",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                }}
              >
                $
              </div>
              <span
                style={{
                  fontWeight: "bold",
                  color: "#374151",
                  fontSize: "11px",
                  textTransform: "uppercase",
                }}
              >
                WHAT THIS COSTS:
              </span>
            </div>
            <div
              style={{
                color: "#E63946",
                fontWeight: "bold",
                fontSize: "24px",
                fontFamily: "var(--font-bebas), sans-serif",
                lineHeight: 1.1,
              }}
            >
              $180,000–$240,000
            </div>
            <div style={{ color: "#6B7280", fontSize: "11px", marginTop: "2px" }}>
              in annual patient revenue across the NYC multi-location network.
            </div>
            <div
              style={{
                color: "#E63946",
                fontSize: "11px",
                fontStyle: "italic",
                marginTop: "8px",
              }}
            >
              This figure compounds with each new location added to the network.
            </div>
          </div>
        </div>

        {/* CARD 02 */}
        <div
          style={{
            backgroundColor: "transparent",
            borderRadius: "8px",
            padding: "20px",
            borderTop: "4px solid #2563EB",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                02
              </div>
              <div
                style={{
                  color: "#2563EB",
                  fontWeight: "bold",
                  fontSize: "11px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                FINDING 02
              </div>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>

          <h2
            style={{
              color: "#2563EB",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 800,
              textTransform: "uppercase",
              fontSize: "15px",
              lineHeight: 1.3,
              margin: "12px 0",
            }}
          >
            THOUSANDS OF REVIEWS ARE GENERATING ZERO NEW PATIENTS
          </h2>

          <div
            style={{
              backgroundColor: "transparent",
              borderRadius: "6px",
              padding: "12px",
              display: "flex",
              gap: "12px",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ color: "#2563EB", fontWeight: "bold", fontSize: "16px" }}>
                Thousands
              </div>
              <div style={{ color: "#2563EB", fontSize: "11px" }}>of reviews</div>
              <div style={{ color: "#6B7280", fontSize: "9px", fontStyle: "italic" }}>
                (closed review platform)
              </div>
            </div>
            <div style={{ width: "1px", backgroundColor: "transparent" }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: "#374151", fontWeight: "bold", fontSize: "16px" }}>
                19 reviews
              </div>
              <div style={{ color: "#6B7280", fontSize: "11px" }}>Yelp</div>
            </div>
          </div>

          <ul
            style={{
              padding: 0,
              margin: "16px 0",
              listStyle: "none",
              fontSize: "12px",
              color: "#374151",
              lineHeight: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {[
              "Thousands of reviews sit in a closed review platform — they do not feed Yelp, and do not impact local search ranking.",
              "Competitors with far fewer reviews outrank this location in local search.",
              "If a significant portion of your locations have meaningful review volume trapped in closed systems, the network-wide review equity being lost to platforms that don't matter in search is substantial.",
            ].map((text, i) => (
              <li key={i} style={{ display: "flex", gap: "6px" }}>
                <span style={{ color: "#2563EB", flexShrink: 0 }}>•</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "auto",
              backgroundColor: "transparent",
              borderRadius: "6px",
              padding: "14px",
              borderLeft: "3px solid #2563EB",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "4px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: "1px solid #2563EB",
                  color: "#2563EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                }}
              >
                $
              </div>
              <span
                style={{
                  fontWeight: "bold",
                  color: "#374151",
                  fontSize: "11px",
                  textTransform: "uppercase",
                }}
              >
                WHAT THIS COSTS:
              </span>
            </div>
            <div
              style={{
                color: "#2563EB",
                fontWeight: "bold",
                fontSize: "24px",
                fontFamily: "var(--font-bebas), sans-serif",
                lineHeight: 1.1,
              }}
            >
              $200,000–$300,000
            </div>
            <div style={{ color: "#6B7280", fontSize: "11px", marginTop: "2px" }}>
              in annual patient revenue network-wide.
            </div>
            <div
              style={{
                color: "#2563EB",
                fontSize: "11px",
                fontStyle: "italic",
                marginTop: "8px",
              }}
            >
              Each location operating below 80 Google reviews is underperforming its local
              search potential regardless of clinical excellence.
            </div>
          </div>
        </div>

        {/* CARD 03 */}
        <div
          style={{
            backgroundColor: "transparent",
            borderRadius: "8px",
            padding: "20px",
            borderTop: "4px solid #F97316",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                03
              </div>
              <div
                style={{
                  color: "#F97316",
                  fontWeight: "bold",
                  fontSize: "11px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                FINDING 03
              </div>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F97316"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>

          <h2
            style={{
              color: "#F97316",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 800,
              textTransform: "uppercase",
              fontSize: "15px",
              lineHeight: 1.3,
              margin: "12px 0",
            }}
          >
            YOUR MANHATTAN LOCATION IS LOSING SATURDAY WALK-INS EVERY WEEK — RIGHT NOW
          </h2>

          <div
            style={{
              backgroundColor: "transparent",
              border: "1px solid #E5E7EB",
              borderRadius: "4px",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: "transparent",
                color: "#FFFFFF",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              *
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#6B7280", fontSize: "10px" }}>Lists Saturday as</div>
              <div style={{ color: "#111827", fontSize: "12px", fontWeight: "bold" }}>
                CLOSED on Yelp
              </div>
            </div>
            <div
              style={{
                backgroundColor: "transparent",
                border: "1px solid #FECACA",
                borderRadius: "4px",
                padding: "4px 8px",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#EF4444", fontSize: "9px", fontWeight: "bold" }}>
                SAT
              </div>
              <div style={{ color: "#EF4444", fontSize: "11px", fontWeight: "bold" }}>
                CLOSED
              </div>
            </div>
          </div>

          <ul
            style={{
              padding: 0,
              margin: "16px 0",
              listStyle: "none",
              fontSize: "12px",
              color: "#374151",
              lineHeight: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {[
              "Patient searches '[service category] open' Saturday Manhattan — one of the highest-intent local searches in NYC — will not find this location even if it is actually open.",
              <>
                <span style={{ fontWeight: "bold" }}>This is happening every Saturday.</span>
              </>,
              "Unlike schema or review issues, this one costs you revenue this weekend.",
              <>
                <span style={{ fontWeight: "bold" }}>The fix takes under 10 minutes.</span>
              </>,
            ].map((text, i) => (
              <li key={i} style={{ display: "flex", gap: "6px" }}>
                <span style={{ color: "#F97316", flexShrink: 0 }}>•</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "auto",
              backgroundColor: "transparent",
              borderRadius: "6px",
              padding: "14px",
              borderLeft: "3px solid #F97316",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "4px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: "1px solid #F97316",
                  color: "#F97316",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                }}
              >
                $
              </div>
              <span
                style={{
                  fontWeight: "bold",
                  color: "#374151",
                  fontSize: "11px",
                  textTransform: "uppercase",
                }}
              >
                WHAT THIS COSTS:
              </span>
            </div>
            <div
              style={{
                color: "#F97316",
                fontWeight: "bold",
                fontSize: "24px",
                fontFamily: "var(--font-bebas), sans-serif",
                lineHeight: 1.1,
              }}
            >
              $80,000–$120,000
            </div>
            <div style={{ color: "#6B7280", fontSize: "11px", marginTop: "2px" }}>
              in annual revenue from lost Saturday and evening walk-in traffic.
            </div>
            <div
              style={{
                color: "#F97316",
                fontSize: "11px",
                fontStyle: "italic",
                marginTop: "8px",
              }}
            >
              The Manhattan location alone represents a recoverable revenue leak that starts
              the moment the Yelp hours are corrected.
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5 — TOTAL IMPACT BAR */}
      <div
        className="snippet-impact-grid"
        style={{
          backgroundColor: "transparent",
          padding: "24px 28px",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr",
          gap: "24px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E63946"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 18 23 18 23 12"></polyline>
            </svg>
            <span
              style={{
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "13px",
                letterSpacing: "0.1em",
              }}
            >
              TOTAL REVENUE IMPACT
            </span>
          </div>
          <div
            style={{
              color: "#E63946",
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: "42px",
              lineHeight: 1.1,
              marginTop: "4px",
            }}
          >
            $680,000–$970,000
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: "14px",
              letterSpacing: "0.1em",
            }}
          >
            PER YEAR
          </div>
        </div>

        <div>
          <div style={{ color: "#16A34A", fontWeight: "bold", fontSize: "12px", marginBottom: "8px" }}>
            NOT CAUSED BY:
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ color: "#FFFFFF", fontSize: "13px", display: "flex", gap: "8px" }}>
              <span style={{ color: "#16A34A" }}>✓</span> Clinical quality
            </div>
            <div style={{ color: "#FFFFFF", fontSize: "13px", display: "flex", gap: "8px" }}>
              <span style={{ color: "#16A34A" }}>✓</span> Staff performance
            </div>
            <div style={{ color: "#FFFFFF", fontSize: "13px", display: "flex", gap: "8px" }}>
              <span style={{ color: "#16A34A" }}>✓</span> Team dedication
            </div>
          </div>
        </div>

        <div>
          <div style={{ color: "#E63946", fontWeight: "bold", fontSize: "12px", marginBottom: "8px" }}>
            CAUSED BY:
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ color: "#FFFFFF", fontSize: "13px", display: "flex", gap: "8px" }}>
              <span style={{ color: "#E63946" }}>✗</span> Visibility gaps
            </div>
            <div style={{ color: "#FFFFFF", fontSize: "13px", display: "flex", gap: "8px" }}>
              <span style={{ color: "#E63946" }}>✗</span> System misalignment
            </div>
            <div style={{ color: "#FFFFFF", fontSize: "13px", display: "flex", gap: "8px" }}>
              <span style={{ color: "#E63946" }}>✗</span> Infrastructure failures
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6 — BOTTOM SECTION */}
      <div
        style={{
          backgroundColor: "transparent",
          padding: "24px 28px",
          display: "flex",
          gap: "32px",
        }}
      >
        <div style={{ width: "38%" }}>
          <div style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "14px" }}>
            THESE ARE 3 OF 14 FINDINGS.
          </div>
          <div style={{ color: "#9CA3AF", fontSize: "12px", fontStyle: "italic", marginBottom: "16px" }}>
            The full Sovereign X Audit covers:
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { icon: "🌐", text: "Website & Technical — schema, speed, mobile optimization, location architecture" },
              { icon: "⭐", text: "Brand Identity & Consistency — acquisition naming audit, cross-platform NAP alignment" },
              { icon: "📱", text: "Social Media Infrastructure — location-level presence, content cadence, engagement signals" },
              { icon: "🔍", text: "Local SEO & AI Visibility — per-location GBP audit, hours accuracy, competitor positioning" },
              { icon: "⚙️", text: "Systems, Automation & Revenue Leaks — review equity, intake, deployment, funnels, referral systems" },
              { icon: "🤖", text: "AI Workforce Deployment — specific roles and processes where AI agents reduce cost and increase output" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", fontSize: "11px", color: "#9CA3AF", lineHeight: 1.4 }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: "62%" }}>
          <div
            style={{
              color: "#FFFFFF",
              fontWeight: "bold",
              fontSize: "14px",
              letterSpacing: "0.1em",
              marginBottom: "16px",
            }}
          >
            AUDIT OPTIONS
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            {/* CARD LEFT */}
            <div
              style={{
                flex: 1,
                backgroundColor: "transparent",
                borderRadius: "8px",
                padding: "16px",
                border: "1px solid rgba(37,99,235,0.4)",
              }}
            >
              <div style={{ color: "#38BDF8", marginBottom: "8px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
              </div>
              <div style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "11px", marginBottom: "8px" }}>
                SOVEREIGN X DIGITAL AUDIT — DEEP
              </div>
              <div style={{ color: "#38BDF8", fontWeight: "bold", fontSize: "15px", marginBottom: "12px" }}>
                $1,500 PROMO / $2,000 REGULAR
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {["Corporate brand", "21 sections", "Revenue leak estimates", "Priority sequence", "Delivered in 72 hours"].map(item => (
                  <div key={item} style={{ color: "#9CA3AF", fontSize: "10px", display: "flex", gap: "6px" }}>
                    <span style={{ color: "#38BDF8" }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* CARD RIGHT */}
            <div
              style={{
                flex: 1,
                backgroundColor: "transparent",
                borderRadius: "8px",
                padding: "16px",
                border: "1px solid rgba(124,58,237,0.4)",
              }}
            >
              <div style={{ color: "#A78BFA", marginBottom: "8px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"></path><path d="M3 9h18"></path><path d="M3 15h18"></path><path d="M9 3v18"></path><path d="M15 3v18"></path></svg>
              </div>
              <div style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "11px", marginBottom: "8px" }}>
                SOVEREIGN X DIGITAL AUDIT — ENTERPRISE
              </div>
              <div style={{ color: "#A78BFA", fontWeight: "bold", fontSize: "20px" }}>
                $200 / LOCATION
              </div>
              <div style={{ color: "#A78BFA", fontSize: "11px", marginBottom: "12px" }}>
                + $2,000 BRAND AUDIT
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                {["Per-location intelligence", "90-day roadmap", "AI workforce analysis"].map(item => (
                  <div key={item} style={{ color: "#9CA3AF", fontSize: "10px", display: "flex", gap: "6px" }}>
                    <span style={{ color: "#A78BFA" }}>✓</span> {item}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ backgroundColor: "transparent", borderRadius: "4px", color: "#A78BFA", fontSize: "9px", padding: "4px 8px", fontWeight: "bold" }}>
                  FULL 140-LOCATION AUDIT: $35,000
                </div>
                <div style={{ backgroundColor: "transparent", borderRadius: "4px", color: "#A78BFA", fontSize: "9px", padding: "4px 8px", fontWeight: "bold" }}>
                  PILOT 10 LOCATIONS AT $3,500
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 7 — FOOTER CTA BAR */}
      <div
        className="snippet-footer-grid"
        style={{
          backgroundColor: "transparent",
          padding: "20px 28px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "24px",
        }}
      >
        <div>
          <div style={{ color: "#C8A96E", marginBottom: "8px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <div style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: "12px", marginBottom: "4px" }}>
            THE NEXT STEP IS A 30-MINUTE CONVERSATION.
          </div>
          <div style={{ color: "#9CA3AF", fontSize: "10px", lineHeight: 1.5 }}>
            No commitment, no pressure — just the full picture of what the data shows and
            what the priority sequence looks like to fix it.
          </div>
        </div>

        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div style={{ color: "#16A34A", marginBottom: "4px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </div>
          <div style={{ color: "#9CA3AF", fontSize: "10px", fontWeight: "bold" }}>
            THIS CONVERSATION COSTS:
          </div>
          <div style={{ color: "#16A34A", fontFamily: "var(--font-bebas), sans-serif", fontSize: "32px", lineHeight: 1 }}>
            $0
          </div>
        </div>

        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <div style={{ color: "#E63946", marginBottom: "4px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </div>
          <div style={{ color: "#9CA3AF", fontSize: "10px", fontWeight: "bold" }}>
            THE STATUS QUO COSTS:
          </div>
          <div style={{ color: "#E63946", fontFamily: "var(--font-bebas), sans-serif", fontSize: "24px", lineHeight: 1 }}>
            $680,000–$970,000
          </div>
          <div style={{ color: "#E63946", fontSize: "11px", fontWeight: "bold", marginTop: "2px" }}>
            PER YEAR
          </div>
        </div>
      </div>

      {/* SECTION 8 — SIGNATURE BAR */}
      <div
        style={{
          backgroundColor: "transparent",
          padding: "14px 28px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "transparent" }}></div>
          <div>
            <div style={{ color: "#FFFFFF", fontSize: "11px", fontWeight: 500 }}>
              Ola · Strategic Co-Architect
            </div>
            <div style={{ color: "#9CA3AF", fontSize: "10px" }}>
              Sovereign X Audits · BlackFur Capital Group LLC
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-end", color: "#9CA3AF", fontSize: "11px", fontWeight: 500 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            SAMPLE DOCUMENT — SOVEREIGN X AUDITS
          </div>
          <div style={{ color: "#6B7280", fontSize: "10px", marginTop: "2px" }}>
            Proprietary. For Authorized Review Only.
          </div>
        </div>
      </div>
    </div>
  );
}
