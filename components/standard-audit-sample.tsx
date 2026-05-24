// StandardAuditSample.tsx
// Sovereign X Digital Audit — Standard Sample
// Based on anonymized real audit · Staten Island Specialty Food Market

export function StandardAuditSample() {
  return (
    <div
      className="sample-report sample-report-standard"
      style={{
        width: '100%',
        maxWidth: '900px',
        fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
      }}
    >

      {/* HEADER */}
      <div style={{
        background: '#0A1628',
        padding: '20px 28px',
        borderBottom: '1px solid rgba(200,169,110,0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        <div>
          <div style={{ color: '#C8A96E', fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>
            Sovereign X Audits · BlackFur Capital Group LLC
          </div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
            SOVEREIGN X DIGITAL AUDIT
            <span style={{ color: '#C8A96E' }}> — STANDARD</span>
          </div>
          <div style={{ color: '#38BDF8', fontSize: '12px', marginTop: '6px', letterSpacing: '1px' }}>
            [Staten Island Specialty Food Market] · Staten Island, NY · Butcher / Specialty Food · May 2026
          </div>
          <div style={{ color: '#777', fontSize: '11px', marginTop: '4px' }}>
            Sovereign X Audits · BlackFur Capital Group LLC
          </div>
        </div>
        <div style={{
          border: '1px solid #C8A96E',
          color: '#C8A96E',
          fontSize: '10px',
          letterSpacing: '2px',
          padding: '4px 12px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          whiteSpace: 'nowrap',
        }}>
          AICC Verified
        </div>
      </div>

      {/* SCORE BANNER */}
      <div style={{
        background: '#111827',
        padding: '20px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
        <div>
          <div style={{ color: '#555', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'monospace' }}>
            Digital Sovereignty Score
          </div>
          <div style={{ fontSize: '56px', fontWeight: 900, color: '#E63946', lineHeight: 1, letterSpacing: '-2px' }}>
            31<span style={{ fontSize: '24px', color: '#555', fontWeight: 400 }}>/100</span>
          </div>
          <div style={{ background: '#E63946', color: '#FFFFFF', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', padding: '3px 10px', borderRadius: '3px', display: 'inline-block', marginTop: '8px' }}>
            HIGH RISK
          </div>
        </div>
        <div style={{ color: '#777', fontSize: '12px', maxWidth: '420px', lineHeight: 1.6, fontStyle: 'italic' }}>
          Decades of community trust. Real product quality. Digital infrastructure that is actively working against both. Every piece of reputation equity built lives on platforms the business does not own or control.
        </div>
      </div>

      {/* SCORECARD */}
      <div style={{ padding: '24px 28px 0' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '12px' }}>
          17 / The Sovereignty Scorecard
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#111827' }}>
              {['', 'DIMENSION', 'SCORE', 'CORE FINDING'].map((h, i) => (
                <td key={i} style={{ padding: '8px 12px', color: '#C8A96E', fontSize: '10px', letterSpacing: '2px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', width: i === 0 ? '32px' : i === 2 ? '80px' : 'auto' }}>{h}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['🌐', 'Website & Domain', '1/10', '#E63946', '#FFEBEE', 'No domain. No website. Zero owned web presence.'],
              ['🎨', 'Brand Identity', '3/10', '#E65100', '#FFF8E1', 'Five name variants. No story. No digital home for brand equity.'],
              ['📱', 'Social Media', '1/10', '#E63946', '#FFEBEE', 'No butcher shop accounts. 16k related account unconnected.'],
              ['🔍', 'Local SEO / NAP', '2/10', '#E63946', '#FFEBEE', 'Duplicate listing. Wrong address indexed. Hours discrepancy.'],
              ['⚙️', 'Systems & Automation', '1/10', '#E63946', '#FFEBEE', 'No pre-order, no list, no intake, no holiday infrastructure.'],
              ['🤖', 'AI Search / GEO', '2/10', '#E63946', '#FFEBEE', 'Unclaimed GBP with 134 reviews. No website. No schema.'],
            ].map(([icon, dim, score, sc, sb, finding], i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F5F5' }}>
                <td style={{ padding: '8px 12px', fontSize: '14px', textAlign: 'center' }}>{icon}</td>
                <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: '#1A1A1A' }}>{dim}</td>
                <td style={{ padding: '8px 12px' }}>
                  <span style={{ background: sb, color: sc, fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '3px', fontFamily: 'monospace' }}>{score}</span>
                </td>
                <td style={{ padding: '8px 12px', fontSize: '11px', color: '#555', lineHeight: 1.4 }}>{finding}</td>
              </tr>
            ))}
            <tr style={{ background: '#111827' }}>
              <td colSpan={2} style={{ padding: '10px 12px', color: '#C8A96E', fontSize: '13px', fontWeight: 700, fontFamily: 'monospace' }}>OVERALL</td>
              <td style={{ padding: '10px 12px' }}>
                <span style={{ background: '#FFEBEE', color: '#E63946', fontSize: '13px', fontWeight: 800, padding: '3px 10px', borderRadius: '3px', fontFamily: 'monospace' }}>31/100</span>
              </td>
              <td style={{ padding: '10px 12px', color: '#9CA3AF', fontSize: '11px', fontStyle: 'italic' }}>Real product. Real community trust. Digital infrastructure working against both.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* THREE FINDINGS */}
      <div style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>

        {/* Finding 01 */}
        <div style={{ background: '#FFFFFF', borderRadius: '6px', borderTop: '3px solid #E63946', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ background: '#E63946', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>01</span>
              <span style={{ color: '#E63946', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Finding 01</span>
            </div>
            <span style={{ fontSize: '16px' }}>🌐</span>
          </div>
          <div style={{ color: '#E63946', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, marginBottom: '10px' }}>
            THE UNOWNED FRONT DOOR
          </div>
          <div style={{ fontSize: '11px', color: '#374151', lineHeight: 1.5, marginBottom: '10px' }}>
            Three domain variants — all unregistered and available. No website exists. When a referred customer searches the business name, they land on Yelp showing a 3.0-star rating — not the business's own story.
          </div>
          <div style={{ background: '#FEF2F2', borderLeft: '3px solid #E63946', borderRadius: '0 4px 4px 0', padding: '10px' }}>
            <div style={{ color: '#374151', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>What This Costs</div>
            <div style={{ color: '#E63946', fontSize: '18px', fontWeight: 900, fontFamily: 'monospace' }}>$15K–$35K</div>
            <div style={{ color: '#777', fontSize: '10px', lineHeight: 1.4 }}>annually in warm referrals lost to zero web presence</div>
          </div>
        </div>

        {/* Finding 02 */}
        <div style={{ background: '#FFFFFF', borderRadius: '6px', borderTop: '3px solid #E63946', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ background: '#E63946', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>02</span>
              <span style={{ color: '#E63946', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Finding 02</span>
            </div>
            <span style={{ fontSize: '16px' }}>📍</span>
          </div>
          <div style={{ color: '#E63946', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, marginBottom: '10px' }}>
            CUSTOMERS GOING TO THE WRONG STREET
          </div>
          <div style={{ fontSize: '11px', color: '#374151', lineHeight: 1.5, marginBottom: '10px' }}>
            A duplicate Yelp listing with a completely different address and phone number is actively indexed by Google. Customers following that listing arrive at the wrong location and leave.
          </div>
          <div style={{ background: '#FEF2F2', borderLeft: '3px solid #E63946', borderRadius: '0 4px 4px 0', padding: '10px' }}>
            <div style={{ color: '#374151', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>What This Costs</div>
            <div style={{ color: '#E63946', fontSize: '18px', fontWeight: 900, fontFamily: 'monospace' }}>$20K–$40K</div>
            <div style={{ color: '#777', fontSize: '10px', lineHeight: 1.4 }}>annually from walk-in customers redirected to wrong address</div>
          </div>
        </div>

        {/* Finding 03 */}
        <div style={{ background: '#FFFFFF', borderRadius: '6px', borderTop: '3px solid #F97316', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ background: '#F97316', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>03</span>
              <span style={{ color: '#F97316', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Finding 03</span>
            </div>
            <span style={{ fontSize: '16px' }}>⚠️</span>
          </div>
          <div style={{ color: '#F97316', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, marginBottom: '10px' }}>
            FALSE ADVERTISING EXPOSURE — ACTIVE NOW
          </div>
          <div style={{ fontSize: '11px', color: '#374151', lineHeight: 1.5, marginBottom: '10px' }}>
            All listings state a 6:00 PM close. Doors observed locked at 5:40 PM. Under NYC consumer guidelines this creates a direct 311 complaint path for any turned-away customer.
          </div>
          <div style={{ background: '#FFF7ED', borderLeft: '3px solid #F97316', borderRadius: '0 4px 4px 0', padding: '10px' }}>
            <div style={{ color: '#374151', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>What This Costs</div>
            <div style={{ color: '#F97316', fontSize: '18px', fontWeight: 900, fontFamily: 'monospace' }}>Legal Risk</div>
            <div style={{ color: '#777', fontSize: '10px', lineHeight: 1.4 }}>Fix: update all listings to 5:30 PM close. Takes 15 minutes.</div>
          </div>
        </div>
      </div>

      {/* IMPACT BAR */}
      <div style={{ background: '#111827', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        <div>
          <div style={{ color: '#9CA3AF', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>Total Revenue Impact</div>
          <div style={{ color: '#E63946', fontSize: '36px', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1 }}>$65K–$120K</div>
          <div style={{ color: '#9CA3AF', fontSize: '11px', fontWeight: 600, marginTop: '4px', letterSpacing: '2px' }}>PER YEAR</div>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div>
            <div style={{ color: '#16A34A', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Not Caused By:</div>
            {['Product quality', 'Community trust', 'Staff dedication'].map(t => (
              <div key={t} style={{ color: '#D1FAE5', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                <span style={{ color: '#16A34A' }}>✓</span> {t}
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: '#E63946', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Caused By:</div>
            {['Zero web presence', 'Duplicate listings', 'NAP inconsistency'].map(t => (
              <div key={t} style={{ color: '#FECACA', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                <span style={{ color: '#E63946' }}>✗</span> {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRIORITY SEQUENCE */}
      <div style={{ padding: '20px 28px', background: '#0D0D0D' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '14px' }}>
          20 / The Priority Sequence
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            ['IMMEDIATE', 'Register the domain', 'Under $15. Available today.', '#E63946'],
            ['IMMEDIATE', 'Claim and remove duplicate Yelp listing', 'Wrong address sending customers elsewhere.', '#E63946'],
            ['IMMEDIATE', 'Update hours across all platforms', 'Eliminate the false advertising exposure.', '#E65100'],
            ['30 DAYS', 'Build a simple website', 'Hours, location, brand story, pre-order form.', '#1A6B5A'],
          ].map(([tag, title, desc, tc]) => (
            <div key={title} style={{ background: '#1A1A1A', borderRadius: '4px', padding: '12px', borderLeft: `3px solid ${tc}` }}>
              <div style={{ color: tc, fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>{tag}</div>
              <div style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600, marginBottom: '3px' }}>{title}</div>
              <div style={{ color: '#777', fontSize: '11px' }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#0A1628', padding: '14px 28px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#C8A96E', fontSize: '11px' }}>Ola · Strategic Co-Architect · Sovereign X Audits · BlackFur Capital Group LLC</div>
        <div style={{ color: '#555', fontSize: '10px', fontFamily: 'monospace', textAlign: 'right' }}>
          SAMPLE DOCUMENT — SOVEREIGN X AUDITS<br />
          <span style={{ fontSize: '9px' }}>Proprietary. For Authorized Review Only.</span>
        </div>
      </div>

    </div>
  );
}
