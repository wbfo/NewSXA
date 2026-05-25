import Link from "next/link";

export const metadata = { title: "Terms of Service — Sovereign X Audits" };

export default function TermsPage() {
  return (
    <div className="sx-intake">
      <section className="compact" style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "120px" }}>
        <div className="wrap" style={{ maxWidth: "800px" }}>
          
          <div style={{ marginBottom: "60px" }}>
            <Link href="/" className="btn btn-ghost" style={{ padding: 0, textTransform: "uppercase", letterSpacing: "2px", fontSize: "12px", color: "var(--subtle)" }}>
              ← Back to Main Site
            </Link>
          </div>

          <div className="sec-head" style={{ textAlign: "left", alignItems: "flex-start", marginBottom: "40px" }}>
            <div className="label">Legal</div>
            <h1 className="pm-headline" style={{ animation: "none", fontSize: "clamp(32px, 5vw, 64px)", textAlign: "left", textTransform: "uppercase" }}>
              Terms of Service
            </h1>
            <p className="sub" style={{ textAlign: "left", marginTop: "16px", maxWidth: "100%" }}>
              Effective date: May 2026 — BlackFur Capital Group LLC
            </p>
          </div>

          <div className="glass-premium" style={{ padding: "40px 48px", display: "flex", flexDirection: "column", gap: "40px" }}>
            
            <article>
              <h3 style={{ color: "var(--gold)", fontFamily: "monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>01 // Services</h3>
              <p style={{ color: "var(--text)", lineHeight: "1.8", fontSize: "14px", opacity: 0.85 }}>
                Sovereign X Audits is a service of BlackFur Capital Group LLC ("Company," "we," "us"). We provide
                digital intelligence audits, reputational analysis, and strategic digital structuring services to
                individuals and organisations ("Client," "you"). Engagements are governed by a separate service
                agreement executed between the Client and the Company, which takes precedence over these general terms.
              </p>
            </article>

            <article>
              <h3 style={{ color: "var(--gold)", fontFamily: "monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>02 // Eligibility and Authorised Use</h3>
              <p style={{ color: "var(--text)", lineHeight: "1.8", fontSize: "14px", opacity: 0.85 }}>
                By accessing this platform or submitting an intake form, you confirm that you are at least 18 years
                of age and are authorised to enter into binding agreements on behalf of yourself or the entity you
                represent. Access to the client portal is limited to individuals whose accounts have been verified
                by the Company.
              </p>
            </article>

            <article>
              <h3 style={{ color: "var(--gold)", fontFamily: "monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>03 // Confidentiality of Deliverables</h3>
              <p style={{ color: "var(--text)", lineHeight: "1.8", fontSize: "14px", opacity: 0.85 }}>
                All audit reports, findings, summaries, and supporting materials delivered by the Company
                ("Deliverables") are confidential and intended solely for the named Client. You agree not to
                reproduce, distribute, publish, or disclose any Deliverable to third parties without prior written
                consent from the Company.
              </p>
            </article>

            <article>
              <h3 style={{ color: "var(--gold)", fontFamily: "monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>04 // Payment and Refunds</h3>
              <p style={{ color: "var(--text)", lineHeight: "1.8", fontSize: "14px", opacity: 0.85 }}>
                Fees for services are set out in your service agreement. Payment is due as specified therein.
                The Company reserves the right to pause or discontinue work on an engagement if payment obligations
                are not met. Refund eligibility is determined on a case-by-case basis at the sole discretion of the
                Company, taking into account work completed at the time of the refund request.
              </p>
            </article>

            <article>
              <h3 style={{ color: "var(--gold)", fontFamily: "monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>05 // Limitation of Liability</h3>
              <p style={{ color: "var(--text)", lineHeight: "1.8", fontSize: "14px", opacity: 0.85 }}>
                The Company's Deliverables are provided for informational and strategic purposes only and do not
                constitute legal, financial, or professional advice. To the fullest extent permitted by applicable law,
                the Company's total liability for any claim arising from an engagement shall not exceed the fees paid
                by the Client for that engagement in the preceding 90 days.
              </p>
            </article>

            <article>
              <h3 style={{ color: "var(--gold)", fontFamily: "monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>06 // Intellectual Property</h3>
              <p style={{ color: "var(--text)", lineHeight: "1.8", fontSize: "14px", opacity: 0.85 }}>
                The Company retains all intellectual property rights in its proprietary methodology, frameworks,
                and tooling. Deliverables provided to a Client are licensed for that Client's internal use only.
                No Deliverable may be used to build a competing service or redistributed commercially.
              </p>
            </article>

            <article>
              <h3 style={{ color: "var(--gold)", fontFamily: "monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>07 // Termination</h3>
              <p style={{ color: "var(--text)", lineHeight: "1.8", fontSize: "14px", opacity: 0.85 }}>
                Either party may terminate an engagement by providing written notice. The Company reserves the right
                to refuse or discontinue service at any time, including where continued service would conflict with
                applicable law or the Company's internal policies.
              </p>
            </article>

            <article>
              <h3 style={{ color: "var(--gold)", fontFamily: "monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>08 // Governing Law</h3>
              <p style={{ color: "var(--text)", lineHeight: "1.8", fontSize: "14px", opacity: 0.85 }}>
                These terms are governed by the laws of the jurisdiction in which BlackFur Capital Group LLC is
                registered. Any disputes shall be resolved through binding arbitration or in the courts of that
                jurisdiction, as elected by the Company.
              </p>
            </article>

            <article>
              <h3 style={{ color: "var(--gold)", fontFamily: "monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>09 // Changes to These Terms</h3>
              <p style={{ color: "var(--text)", lineHeight: "1.8", fontSize: "14px", opacity: 0.85 }}>
                The Company may update these terms from time to time. Continued use of the platform or services
                following notice of an update constitutes acceptance of the revised terms. Material changes will
                be communicated to active clients directly.
              </p>
            </article>

            <article>
              <h3 style={{ color: "var(--gold)", fontFamily: "monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>10 // Contact</h3>
              <p style={{ color: "var(--text)", lineHeight: "1.8", fontSize: "14px", opacity: 0.85 }}>
                For questions about these terms, contact your assigned Sovereign X representative or reach us
                through the intake form.
              </p>
            </article>

          </div>
        </div>
      </section>
    </div>
  );
}
