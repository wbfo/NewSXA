const FINDINGS = [
  { id: "01", label: "Visibility leak", amount: "$1,250 / month", detail: "The audience is arriving, but the page is not converting that attention into orders." },
  { id: "02", label: "Response gap", amount: "$650 / month", detail: "After-hours leads and slower follow-up can quietly turn into lost opportunities." },
  { id: "03", label: "Conversion friction", amount: "$2,000 / month", detail: "Decision-making becomes easier when the offer, proof, and next step are clearer." },
];

export function FeaturedSection({ month }: { month: string }) {
  return (
    <section className="compact" id="featured">
      <div className="wrap">
        <a className="snippet-card glass-premium hover:shadow-neon-purple transition-all duration-300" href="#intake">
          <div className="snippet-grid">
            <div className="snippet-body">
              <span className="label aicc-stamp text-neon-purple border-neon-purple">Featured intake</span>
              <h2 className="snippet-title text-white">A premium intake experience that feels like an executive brief.</h2>
              <p className="snippet-desc text-subtle">
                The page keeps the black-and-gold editorial language from the original design while turning the order flow into a clear client-facing conversion path.
              </p>
              <div className="snippet-badges">
                <span className="aicc-stamp border-neon-blue text-neon-blue">AICC Verified</span>
                <span className="stamp">Intake → Order queue</span>
                <span className="stamp">Light / Dark mode</span>
              </div>
              <div className="snippet-cta-wrap">
                <span className="btn btn-primary hover:shadow-neon-blue">
                  Start Intake <span className="arrow">→</span>
                </span>
                <p className="snippet-note">
                  Orders flow straight into the command center with a live event, a queue item, and a visible status card.
                </p>
              </div>
            </div>
            <div className="snippet-preview">
              <div className="snippet-preview-doc">
                <div className="doc-head">
                  <div className="doc-badge">SX</div>
                  <div>
                    <div className="doc-eyebrow">Preview document</div>
                    <div className="doc-title">Three things the audit surfaces immediately</div>
                  </div>
                </div>
                {FINDINGS.map((finding) => (
                  <div key={finding.id} className="doc-finding">
                    <div className="doc-num">{finding.id}</div>
                    <div>
                      <div className="doc-finding-label">{finding.label}</div>
                      <div className="doc-finding-amount">{finding.amount}</div>
                      <div className="mono-subtle" style={{ marginTop: 4, lineHeight: 1.6 }}>{finding.detail}</div>
                    </div>
                  </div>
                ))}
                <div className="doc-foot">
                  <span>Delivered within the command system</span>
                  <span>{month} intake view</span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
