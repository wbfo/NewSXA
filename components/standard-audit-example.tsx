import React from "react";

export function StandardAuditExample() {
  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        border: "1px solid #141414",
        borderRadius: "6px",
        overflow: "hidden",
        fontFamily: "var(--font-inter), sans-serif",
        color: "#D0C8B8",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* 1. AUDIT HEADER BLOCK */}
      <div
        style={{
          backgroundColor: "#0D0D0D",
          padding: "32px 40px",
          borderBottom: "1px solid #1A1A1A",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {/* Left Column */}
          <div style={{ flex: "1 1 500px" }}>
            <div
              style={{
                color: "#C8A96E",
                fontFamily: "var(--font-bebas), monospace",
                fontSize: "13px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              SOVEREIGN X DIGITAL AUDIT
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#FFFFFF",
                fontFamily: "var(--font-montserrat), sans-serif",
                margin: "0 0 6px 0",
              }}
            >
              [Sample Client]
            </h3>
            <div style={{ color: "#777", fontSize: "13px", lineHeight: "1.5" }}>
              Staten Island, NY &nbsp;·&nbsp; Professional Services &nbsp;·&nbsp; May 2026
            </div>
          </div>

          {/* Right Column (Score Badge) */}
          <div
            style={{
              border: "1px solid rgba(200, 169, 110, 0.2)",
              padding: "16px 24px",
              borderRadius: "4px",
              minWidth: "180px",
              textAlign: "center",
              backgroundColor: "rgba(200, 169, 110, 0.02)",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#C8A96E",
                fontFamily: "var(--font-bebas), monospace",
                lineHeight: "1",
                marginBottom: "4px",
              }}
            >
              42 / 100
            </div>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "2px",
                fontWeight: "bold",
                color: "#C62828",
                fontFamily: "monospace",
              }}
            >
              NEEDS ALIGNMENT
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div
          style={{
            marginTop: "20px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.03)",
            fontSize: "11px",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          Prepared by: Ola &nbsp;·&nbsp; Sovereign X Audits &nbsp;·&nbsp; BlackFur Capital Group LLC &nbsp;·&nbsp; AICC Verified
        </div>
      </div>

      {/* 2. SOVEREIGNTY SCORECARD TABLE */}
      <div style={{ padding: "40px" }}>
        <div
          style={{
            color: "#C8A96E",
            fontFamily: "monospace",
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            borderBottom: "1px solid rgba(200, 169, 110, 0.15)",
            paddingBottom: "8px",
            marginBottom: "20px",
          }}
        >
          17 / THE SOVEREIGNTY SCORECARD
        </div>

        <div style={{ overflowX: "auto", marginBottom: "40px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "13px",
              minWidth: "700px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#0D0D0D" }}>
                <th style={{ padding: "14px 16px", color: "#C8A96E", fontWeight: 600, width: "60px" }}></th>
                <th style={{ padding: "14px 16px", color: "#C8A96E", fontWeight: 600, width: "220px" }}>Dimension</th>
                <th style={{ padding: "14px 16px", color: "#C8A96E", fontWeight: 600, width: "100px" }}>Score</th>
                <th style={{ padding: "14px 16px", color: "#C8A96E", fontWeight: 600 }}>Core Finding</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr style={{ borderBottom: "1px solid #141414" }}>
                <td style={{ padding: "16px", fontSize: "16px", textAlign: "center" }}>🌐</td>
                <td style={{ padding: "16px", fontWeight: "bold", color: "#FFFFFF" }}>Website & Domain</td>
                <td style={{ padding: "16px" }}>
                  <span style={{ color: "#C62828", fontWeight: "bold" }}>3/10</span>
                </td>
                <td style={{ padding: "16px", color: "#999" }}>
                  No domain security. Shared hosting. PageSpeed: 38/100 desktop.
                </td>
              </tr>
              {/* Row 2 */}
              <tr style={{ borderBottom: "1px solid #141414", backgroundColor: "#080808" }}>
                <td style={{ padding: "16px", fontSize: "16px", textAlign: "center" }}>🎨</td>
                <td style={{ padding: "16px", fontWeight: "bold", color: "#FFFFFF" }}>Brand Identity</td>
                <td style={{ padding: "16px" }}>
                  <span style={{ color: "#C62828", fontWeight: "bold" }}>4/10</span>
                </td>
                <td style={{ padding: "16px", color: "#999" }}>
                  NAP inconsistent across 6 directories. Two phone numbers indexed.
                </td>
              </tr>
              {/* Row 3 */}
              <tr style={{ borderBottom: "1px solid #141414" }}>
                <td style={{ padding: "16px", fontSize: "16px", textAlign: "center" }}>📱</td>
                <td style={{ padding: "16px", fontWeight: "bold", color: "#FFFFFF" }}>Social Media</td>
                <td style={{ padding: "16px" }}>
                  <span style={{ color: "#C62828", fontWeight: "bold" }}>2/10</span>
                </td>
                <td style={{ padding: "16px", color: "#999" }}>
                  Instagram: 312 followers. Last post 4 months ago. Facebook: unclaimed.
                </td>
              </tr>
              {/* Row 4 */}
              <tr style={{ borderBottom: "1px solid #141414", backgroundColor: "#080808" }}>
                <td style={{ padding: "16px", fontSize: "16px", textAlign: "center" }}>🔍</td>
                <td style={{ padding: "16px", fontWeight: "bold", color: "#FFFFFF" }}>Local SEO / GEO</td>
                <td style={{ padding: "16px" }}>
                  <span style={{ color: "#C62828", fontWeight: "bold" }}>3/10</span>
                </td>
                <td style={{ padding: "16px", color: "#999" }}>
                  GBP unclaimed. Invisible in AI search. No schema markup.
                </td>
              </tr>
              {/* Row 5 */}
              <tr style={{ borderBottom: "1px solid #141414" }}>
                <td style={{ padding: "16px", fontSize: "16px", textAlign: "center" }}>⚙️</td>
                <td style={{ padding: "16px", fontWeight: "bold", color: "#FFFFFF" }}>Systems & Revenue</td>
                <td style={{ padding: "16px" }}>
                  <span style={{ color: "#C62828", fontWeight: "bold" }}>4/10</span>
                </td>
                <td style={{ padding: "16px", color: "#999" }}>
                  No intake form. No email list. No after-hours coverage.
                </td>
              </tr>
              {/* Row 6 */}
              <tr style={{ borderBottom: "1px solid #141414", backgroundColor: "#080808" }}>
                <td style={{ padding: "16px", fontSize: "16px", textAlign: "center" }}>🤖</td>
                <td style={{ padding: "16px", fontWeight: "bold", color: "#FFFFFF" }}>AI Readiness</td>
                <td style={{ padding: "16px" }}>
                  <span style={{ color: "#C62828", fontWeight: "bold" }}>2/10</span>
                </td>
                <td style={{ padding: "16px", color: "#999" }}>
                  Not found in ChatGPT, Perplexity, or Google AI Overview for any target query.
                </td>
              </tr>
              {/* Total Row */}
              <tr style={{ backgroundColor: "#0D0D0D", color: "#C8A96E", fontWeight: "bold" }}>
                <td style={{ padding: "16px", textAlign: "center" }}>⚡</td>
                <td style={{ padding: "16px" }}>OVERALL</td>
                <td style={{ padding: "16px", color: "#C62828" }}>42/100</td>
                <td style={{ padding: "16px" }}>
                  Real business. Invisible infrastructure. Gap is fixable.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3. THREE FINDING EXCERPTS */}
        <div style={{ marginBottom: "40px" }}>
          {/* Finding 01 */}
          <div
            style={{
              border: "1px solid #141414",
              borderLeft: "3px solid #C8A96E",
              backgroundColor: "#0D0D0D",
              padding: "24px 28px",
              borderRadius: "0 4px 4px 0",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                color: "#C8A96E",
                fontFamily: "monospace",
                fontSize: "10px",
                letterSpacing: "3px",
                marginBottom: "8px",
              }}
            >
              05 / WEBSITE & CONVERSION ARCHITECTURE
            </div>
            <h4
              style={{
                fontSize: "20px",
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "#FFFFFF",
                margin: "0 0 12px 0",
                lineHeight: "1.3",
              }}
            >
              The website is losing visitors before they can become clients.
            </h4>
            <p
              style={{
                color: "#999",
                fontSize: "14px",
                lineHeight: "1.6",
                margin: "0 0 16px 0",
              }}
            >
              The homepage loads in 6.8 seconds on mobile — industry benchmark for professional
              services is under 2.5 seconds. At current mobile traffic levels, this single issue
              is responsible for an estimated 58% of visitors leaving before the page fully renders.
              The contact form requires 5 fields with no autofill support and no progress indicator.
              There is no call to action above the fold on any device.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <span
                style={{
                  color: "#1B5E20",
                  backgroundColor: "rgba(27, 94, 32, 0.15)",
                  fontFamily: "monospace",
                  fontSize: "10px",
                  padding: "4px 8px",
                  borderRadius: "2px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                CONFIRMED
              </span>
              <div
                style={{
                  color: "#C8A96E",
                  fontSize: "13px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                }}
              >
                Estimated monthly revenue impact: $1,800–$3,200
              </div>
            </div>
          </div>

          {/* Finding 02 */}
          <div
            style={{
              border: "1px solid #141414",
              borderLeft: "3px solid #C62828",
              backgroundColor: "#0D0D0D",
              padding: "24px 28px",
              borderRadius: "0 4px 4px 0",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                color: "#C8A96E",
                fontFamily: "monospace",
                fontSize: "10px",
                letterSpacing: "3px",
                marginBottom: "8px",
              }}
            >
              07 / THE IDENTITY PROBLEM — NAP CONSISTENCY
            </div>
            <h4
              style={{
                fontSize: "20px",
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "#FFFFFF",
                margin: "0 0 12px 0",
                lineHeight: "1.3",
              }}
            >
              Two phone numbers. Two addresses. Google treats them as two different businesses.
            </h4>
            <p
              style={{
                color: "#999",
                fontSize: "14px",
                lineHeight: "1.6",
                margin: "0 0 16px 0",
              }}
            >
              Google Maps shows 718-555-0142. Yelp shows 917-555-0189. The business address appears
              as both &apos;Suite 4B&apos; and &apos;Unit 4&apos; across active listings — a minor
              variation that Google&apos;s local algorithm reads as inconsistent signals. This NAP
              fragmentation is suppressing local rankings and causing the Google Business Profile
              to underperform despite 34 reviews.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <span
                style={{
                  color: "#1B5E20",
                  backgroundColor: "rgba(27, 94, 32, 0.15)",
                  fontFamily: "monospace",
                  fontSize: "10px",
                  padding: "4px 8px",
                  borderRadius: "2px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                CONFIRMED
              </span>
              <div
                style={{
                  color: "#C8A96E",
                  fontSize: "13px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                }}
              >
                Estimated monthly revenue impact: $900–$1,600
              </div>
            </div>
          </div>

          {/* Finding 03 */}
          <div
            style={{
              border: "1px solid #141414",
              borderLeft: "3px solid #7AADA0",
              backgroundColor: "#0D0D0D",
              padding: "24px 28px",
              borderRadius: "0 4px 4px 0",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                color: "#C8A96E",
                fontFamily: "monospace",
                fontSize: "10px",
                letterSpacing: "3px",
                marginBottom: "8px",
              }}
            >
              16 / AI READINESS & AUTOMATION OPPORTUNITY
            </div>
            <h4
              style={{
                fontSize: "20px",
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "#FFFFFF",
                margin: "0 0 12px 0",
                lineHeight: "1.3",
              }}
            >
              After-hours calls are going unanswered. This is the most recoverable gap in this audit.
            </h4>
            <p
              style={{
                color: "#999",
                fontSize: "14px",
                lineHeight: "1.6",
                margin: "0 0 16px 0",
              }}
            >
              Testing conducted across 7 call attempts between 6pm and 9pm on weekday evenings
              confirmed that every call goes to a generic voicemail after 3 rings. No callback
              confirmation. No text follow-up. Industry data for professional services shows that
              67% of after-hours callers who reach voicemail do not call back — they call the next result.
            </p>

            <div
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                padding: "20px",
                borderRadius: "4px",
                marginBottom: "16px",
                border: "1px solid #141414",
                fontSize: "13px",
              }}
            >
              <div style={{ color: "#7AADA0", fontWeight: "bold", marginBottom: "10px", fontFamily: "var(--font-bebas), monospace", letterSpacing: "1px" }}>
                Voice Agent ROI Calculation:
              </div>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px", color: "#aaa" }}>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>After-hours calls/week:</span>
                  <span style={{ color: "#fff", fontWeight: "bold" }}>est. 8–12</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>% unanswered:</span>
                  <span style={{ color: "#C62828", fontWeight: "bold" }}>100%</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Close rate:</span>
                  <span style={{ color: "#fff", fontWeight: "bold" }}>25%</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Average engagement value:</span>
                  <span style={{ color: "#C8A96E", fontWeight: "bold" }}>$2,400</span>
                </li>
                <li style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #222", paddingTop: "6px", marginTop: "4px" }}>
                  <span>Annual revenue from missed calls:</span>
                  <span style={{ color: "#C8A96E", fontWeight: "bold" }}>$24,960–$37,440</span>
                </li>
              </ul>
              <p style={{ margin: "14px 0 0 0", color: "#777", fontSize: "12px", lineHeight: "1.5" }}>
                A Sovereign X Voice Agent — Starter ($1,500 setup + $200/mo) captures this revenue with a break-even period of under 30 days.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <span
                style={{
                  color: "#1B5E20",
                  backgroundColor: "rgba(27, 94, 32, 0.15)",
                  fontFamily: "monospace",
                  fontSize: "10px",
                  padding: "4px 8px",
                  borderRadius: "2px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                CONFIRMED
              </span>
              <div
                style={{
                  color: "#C62828",
                  fontSize: "13px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                }}
              >
                Estimated annual revenue from missed calls: $24,960–$37,440
              </div>
            </div>
          </div>
        </div>

        {/* 4. REDACTED SECTIONS NOTICE */}
        <div
          style={{
            border: "1px solid #1A1A1A",
            padding: "20px 28px",
            textAlign: "center",
            marginBottom: "40px",
            backgroundColor: "rgba(255,255,255,0.01)",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              color: "#555",
              lineHeight: "1.8",
              letterSpacing: "0.5px",
            }}
          >
            <div style={{ fontWeight: "bold", color: "#666", marginBottom: "8px" }}>
              — 18 additional sections redacted from this sample —
            </div>
            The complete Sovereign X Digital Audit — Standard covers all 21 sections including Domain
            Security, Technical Performance, Mobile Accessibility, Brand Identity, Social Media
            Infrastructure, Audience Ownership, Revenue Leaks, AI Search Visibility, Reputation Management,
            Email & SMS Strategy, Press & PR, Competitive Context, the Sovereignty Scorecard, What This
            All Adds Up To, the Priority Sequence, and the Next Step.
            <div style={{ marginTop: "8px", color: "#C8A96E" }}>
              Delivered to your Google Drive within 72 hours. AICC Verified. No discovery call required.
            </div>
          </div>
        </div>

        {/* 5. IMPACT MATRIX TABLE */}
        <div
          style={{
            color: "#C8A96E",
            fontFamily: "monospace",
            fontSize: "11px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            borderBottom: "1px solid rgba(200, 169, 110, 0.15)",
            paddingBottom: "8px",
            marginBottom: "20px",
          }}
        >
          19 / THE IMPACT MATRIX
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "13px",
              minWidth: "700px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#0D0D0D" }}>
                <th style={{ padding: "14px 16px", color: "#C8A96E", fontWeight: 600 }}>Recommendation</th>
                <th style={{ padding: "14px 16px", color: "#C8A96E", fontWeight: 600, width: "100px" }}>Effort</th>
                <th style={{ padding: "14px 16px", color: "#C8A96E", fontWeight: 600, width: "100px" }}>Impact</th>
                <th style={{ padding: "14px 16px", color: "#C8A96E", fontWeight: 600, width: "140px" }}>Category</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr style={{ borderBottom: "1px solid #141414" }}>
                <td style={{ padding: "14px 16px", color: "#FFFFFF", fontWeight: 500 }}>
                  Fix PageSpeed — compress images and enable caching
                </td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Low</td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Critical</td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "#4CAF50",
                      backgroundColor: "rgba(76, 175, 80, 0.15)",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    QUICK WIN
                  </span>
                </td>
              </tr>
              {/* Row 2 */}
              <tr style={{ borderBottom: "1px solid #141414", backgroundColor: "#080808" }}>
                <td style={{ padding: "14px 16px", color: "#FFFFFF", fontWeight: 500 }}>
                  Claim and optimize Google Business Profile
                </td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Low</td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Critical</td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "#4CAF50",
                      backgroundColor: "rgba(76, 175, 80, 0.15)",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    QUICK WIN
                  </span>
                </td>
              </tr>
              {/* Row 3 */}
              <tr style={{ borderBottom: "1px solid #141414" }}>
                <td style={{ padding: "14px 16px", color: "#FFFFFF", fontWeight: 500 }}>
                  Standardize NAP across all 6 directories
                </td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Low</td>
                <td style={{ padding: "14px 16px", color: "#888" }}>High</td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "#4CAF50",
                      backgroundColor: "rgba(76, 175, 80, 0.15)",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    QUICK WIN
                  </span>
                </td>
              </tr>
              {/* Row 4 */}
              <tr style={{ borderBottom: "1px solid #141414", backgroundColor: "#080808" }}>
                <td style={{ padding: "14px 16px", color: "#FFFFFF", fontWeight: 500 }}>
                  Respond to all unresolved reviews within 48hrs
                </td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Low</td>
                <td style={{ padding: "14px 16px", color: "#888" }}>High</td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "#4CAF50",
                      backgroundColor: "rgba(76, 175, 80, 0.15)",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    QUICK WIN
                  </span>
                </td>
              </tr>
              {/* Row 5 */}
              <tr style={{ borderBottom: "1px solid #141414" }}>
                <td style={{ padding: "14px 16px", color: "#FFFFFF", fontWeight: 500 }}>
                  Add click-to-call button above the fold
                </td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Low</td>
                <td style={{ padding: "14px 16px", color: "#888" }}>High</td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "#4CAF50",
                      backgroundColor: "rgba(76, 175, 80, 0.15)",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    QUICK WIN
                  </span>
                </td>
              </tr>
              {/* Row 6 */}
              <tr style={{ borderBottom: "1px solid #141414", backgroundColor: "#080808" }}>
                <td style={{ padding: "14px 16px", color: "#FFFFFF", fontWeight: 500 }}>
                  Rebuild contact form — 3 fields max, autofill enabled
                </td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Medium</td>
                <td style={{ padding: "14px 16px", color: "#888" }}>High</td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "#FF9800",
                      backgroundColor: "rgba(255, 152, 0, 0.15)",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    BIG SWING
                  </span>
                </td>
              </tr>
              {/* Row 7 */}
              <tr style={{ borderBottom: "1px solid #141414" }}>
                <td style={{ padding: "14px 16px", color: "#FFFFFF", fontWeight: 500 }}>
                  Build dedicated service pages for top 3 offerings
                </td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Medium</td>
                <td style={{ padding: "14px 16px", color: "#888" }}>High</td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "#FF9800",
                      backgroundColor: "rgba(255, 152, 0, 0.15)",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    BIG SWING
                  </span>
                </td>
              </tr>
              {/* Row 8 */}
              <tr style={{ borderBottom: "1px solid #141414", backgroundColor: "#080808" }}>
                <td style={{ padding: "14px 16px", color: "#FFFFFF", fontWeight: 500 }}>
                  Set up Google Search Console and submit sitemap
                </td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Low</td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Medium</td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "#4CAF50",
                      backgroundColor: "rgba(76, 175, 80, 0.15)",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    QUICK WIN
                  </span>
                </td>
              </tr>
              {/* Row 9 */}
              <tr style={{ borderBottom: "1px solid #141414" }}>
                <td style={{ padding: "14px 16px", color: "#FFFFFF", fontWeight: 500 }}>
                  Deploy voice agent for after-hours call capture
                </td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Medium</td>
                <td style={{ padding: "14px 16px", color: "#888" }}>High</td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "#FF9800",
                      backgroundColor: "rgba(255, 152, 0, 0.15)",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    BIG SWING
                  </span>
                </td>
              </tr>
              {/* Row 10 */}
              <tr style={{ borderBottom: "1px solid #141414", backgroundColor: "#080808" }}>
                <td style={{ padding: "14px 16px", color: "#FFFFFF", fontWeight: 500 }}>
                  Launch email capture and 90-day nurture sequence
                </td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Medium</td>
                <td style={{ padding: "14px 16px", color: "#888" }}>Medium</td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      color: "#FF9800",
                      backgroundColor: "rgba(255, 152, 0, 0.15)",
                      fontFamily: "monospace",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "2px",
                    }}
                  >
                    BIG SWING
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. AUDIT FOOTER */}
      <div
        style={{
          backgroundColor: "#0D0D0D",
          padding: "20px 40px",
          borderTop: "1px solid #1A1A1A",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ color: "#666", fontStyle: "italic", fontSize: "12px" }}>
            — End of Sample Excerpt —
          </div>
          <div style={{ color: "#C8A96E", fontSize: "11px", fontFamily: "monospace" }}>
            Prepared by Ola &nbsp;·&nbsp; Sovereign X Audits &nbsp;·&nbsp; BlackFur Capital Group LLC &nbsp;·&nbsp; AICC Verified
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              color: "#555",
              fontFamily: "monospace",
              fontSize: "10px",
              letterSpacing: "2px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            SAMPLE DOCUMENT — SOVEREIGN X AUDITS
          </div>
          <div style={{ color: "#555", fontSize: "10px", fontStyle: "italic", marginTop: "2px" }}>
            Based on real audit data. Client details anonymized.
          </div>
        </div>
      </div>
    </div>
  );
}
