// DeepAuditSample.tsx
// Sovereign X Digital Audit — Deep Sample
// Based on anonymized real audit · NYC AV & IT Solutions Firm

export function DeepAuditSample() {
  return (
    <div style={{
      width: '900px',
      maxWidth: '92vw',
      fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
    }}>

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
            <span style={{ color: '#C8A96E' }}> — DEEP</span>
          </div>
          <div style={{ color: '#38BDF8', fontSize: '12px', marginTop: '6px', letterSpacing: '1px' }}>
            [NYC AV & IT Solutions Firm] · New York, NY · AV & IT Services · May 2026
          </div>
          <div style={{ color: '#777', fontSize: '11px', marginTop: '4px' }}>
            Sovereign X Audits · BlackFur Capital Group LLC
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            border: '1px solid #C8A96E',
            color: '#C8A96E',
            fontSize: '10px',
            letterSpacing: '2px',
            padding: '4px 12px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            marginBottom: '6px',
          }}>
            AICC Verified
          </div>
          <div style={{ color: '#555', fontSize: '10px', fontFamily: 'monospace' }}>Deep Intelligence Report</div>
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
          Real technical expertise. Authorized partnerships with Dell, Resi, and Logitech. Genuine institutional relationships. Every piece of that credibility is being suppressed by digital infrastructure that is actively working against discovery, lead generation, and revenue growth.
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
              ['🌐', 'Website & Domain', '4/10', '#E65100', '#FFF8E1', 'Site exists, clean design — zero pricing, broken Instagram link costing leads daily'],
              ['🎨', 'Brand Identity', '2/10', '#E63946', '#FFEBEE', 'Name battles 20+ competitors in search. Generic messaging. No differentiation.'],
              ['📱', 'Social Media', '3/10', '#E63946', '#FFEBEE', '1,864 personal followers, zero business funnel. Wrong handle on site.'],
              ['🔍', 'Local SEO / Discovery', '1/10', '#E63946', '#FFEBEE', 'No Google Business Profile. Invisible in all local search results.'],
              ['⚙️', 'Systems & Proof', '2/10', '#E63946', '#FFEBEE', 'One testimonial. No case studies. No portfolio. No recurring revenue.'],
              ['🤖', 'AI Search / GEO', '3/10', '#E65100', '#FFF8E1', 'Site exists, no schema, name confusion kills AI search confidence.'],
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
              <td style={{ padding: '10px 12px', color: '#9CA3AF', fontSize: '11px', fontStyle: 'italic' }}>Real expertise. Zero visibility. Fixable with structure.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* COMPETITIVE CONTEXT — DEEP EXCLUSIVE */}
      <div style={{ padding: '20px 28px 0' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '12px' }}>
          15 / Competitive Context <span style={{ color: '#7C3AED', background: '#F3E5F5', padding: '2px 8px', borderRadius: '3px', fontSize: '9px', marginLeft: '8px' }}>DEEP EXCLUSIVE</span>
        </div>
        <div style={{ background: '#FFFFFF', borderRadius: '6px', overflow: 'hidden', marginBottom: '16px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1A1A2E' }}>
                {['Competitor', 'GBP Status', 'Pricing Visible', 'Portfolio', 'Advantage Over [Client]'].map(h => (
                  <td key={h} style={{ padding: '8px 12px', color: '#C8A96E', fontSize: '10px', letterSpacing: '1px', fontFamily: 'monospace', fontWeight: 700 }}>{h}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['CTI — Commercial Tech', '✅ Claimed', '✅ Yes', '✅ 50+ projects', 'Full digital presence, verified GBP, rich portfolio'],
                ['Ford AV', '✅ Claimed', '✅ Starting at $X', '✅ Video walkthroughs', 'National brand, local search dominance'],
                ['[Client]', '🔴 None', '🔴 None', '⚠️ 1 testimonial', 'Technical expertise equal — but invisible'],
              ].map(([comp, gbp, pricing, port, adv], i) => (
                <tr key={i} style={{ background: i === 2 ? '#FFEBEE' : i % 2 === 0 ? '#FFFFFF' : '#F5F5F5' }}>
                  <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: i === 2 ? 700 : 400, color: i === 2 ? '#E63946' : '#1A1A1A' }}>{comp}</td>
                  <td style={{ padding: '8px 12px', fontSize: '11px', color: '#374151' }}>{gbp}</td>
                  <td style={{ padding: '8px 12px', fontSize: '11px', color: '#374151' }}>{pricing}</td>
                  <td style={{ padding: '8px 12px', fontSize: '11px', color: '#374151' }}>{port}</td>
                  <td style={{ padding: '8px 12px', fontSize: '11px', color: '#555', lineHeight: 1.4 }}>{adv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KEY FINDINGS */}
      <div style={{ padding: '0 28px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

        {/* Finding 01 */}
        <div style={{ background: '#FFFFFF', borderRadius: '6px', borderTop: '3px solid #E63946', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span style={{ background: '#E63946', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>02</span>
            <span style={{ color: '#E63946', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Name Crisis</span>
          </div>
          <div style={{ color: '#E63946', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, marginBottom: '8px' }}>
            THE NAME MAKES SEO UNWINNABLE
          </div>
          <div style={{ fontSize: '11px', color: '#374151', lineHeight: 1.5, marginBottom: '10px' }}>
            Search the business name and count how many unrelated companies appear first. 20+ competitors with similar names split every organic search. 80–90% of potential traffic goes to wrong companies before the client is found.
          </div>
          <div style={{ background: '#FEF2F2', borderLeft: '3px solid #E63946', borderRadius: '0 4px 4px 0', padding: '10px' }}>
            <div style={{ color: '#E63946', fontSize: '18px', fontWeight: 900, fontFamily: 'monospace' }}>$150K/yr</div>
            <div style={{ color: '#777', fontSize: '10px' }}>in lost organic revenue from search name confusion</div>
          </div>
        </div>

        {/* Finding 02 */}
        <div style={{ background: '#FFFFFF', borderRadius: '6px', borderTop: '3px solid #2563EB', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span style={{ background: '#2563EB', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>03</span>
            <span style={{ color: '#2563EB', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Broken Social Link</span>
          </div>
          <div style={{ color: '#2563EB', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, marginBottom: '8px' }}>
            WEBSITE LINKS TO A NON-EXISTENT INSTAGRAM
          </div>
          <div style={{ fontSize: '11px', color: '#374151', lineHeight: 1.5, marginBottom: '10px' }}>
            The website lists an Instagram handle that does not exist. Every visitor who clicks that link gets a 404 or unrelated results. The actual business Instagram account is invisible in search — likely due to verification or engagement issues.
          </div>
          <div style={{ background: '#EFF6FF', borderLeft: '3px solid #2563EB', borderRadius: '0 4px 4px 0', padding: '10px' }}>
            <div style={{ color: '#2563EB', fontSize: '18px', fontWeight: 900, fontFamily: 'monospace' }}>$25K/yr</div>
            <div style={{ color: '#777', fontSize: '10px' }}>in leads lost from broken social discovery path</div>
          </div>
        </div>

        {/* Finding 03 */}
        <div style={{ background: '#FFFFFF', borderRadius: '6px', borderTop: '3px solid #F97316', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span style={{ background: '#F97316', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>04</span>
            <span style={{ color: '#F97316', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Pricing Opacity</span>
          </div>
          <div style={{ color: '#F97316', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, marginBottom: '8px' }}>
            ZERO PRICING — ZERO PRE-QUALIFICATION
          </div>
          <div style={{ fontSize: '11px', color: '#374151', lineHeight: 1.5, marginBottom: '10px' }}>
            The website shows no pricing of any kind. Serious buyers pre-qualify themselves. If they have a $25K budget and see a competitor's "Starting at $5K" they know they're in range. If this client shows nothing, they assume it's out of budget and move on.
          </div>
          <div style={{ background: '#FFF7ED', borderLeft: '3px solid #F97316', borderRadius: '0 4px 4px 0', padding: '10px' }}>
            <div style={{ color: '#F97316', fontSize: '18px', fontWeight: 900, fontFamily: 'monospace' }}>$100K/yr</div>
            <div style={{ color: '#777', fontSize: '10px' }}>in qualified leads who chose a competitor rather than guess</div>
          </div>
        </div>

        {/* AI Readiness — Deep Exclusive */}
        <div style={{ background: '#FFFFFF', borderRadius: '6px', borderTop: '3px solid #7C3AED', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ background: '#7C3AED', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>16</span>
              <span style={{ color: '#7C3AED', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>AI Readiness</span>
            </div>
            <span style={{ color: '#7C3AED', background: '#F3E5F5', padding: '2px 8px', borderRadius: '3px', fontSize: '9px', fontFamily: 'monospace', fontWeight: 700 }}>DEEP EXCLUSIVE</span>
          </div>
          <div style={{ color: '#7C3AED', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, marginBottom: '8px' }}>
            VOICE AGENT OPPORTUNITY IDENTIFIED
          </div>
          <div style={{ fontSize: '11px', color: '#374151', lineHeight: 1.5, marginBottom: '10px' }}>
            Testing 7 after-hours calls confirmed every call goes to voicemail. Church and school clients book primarily after 5pm. A voice agent capturing these calls at a 25% close rate and $8,500 average project value represents significant recoverable revenue.
          </div>
          <div style={{ background: '#F3E5F5', borderLeft: '3px solid #7C3AED', borderRadius: '0 4px 4px 0', padding: '10px' }}>
            <div style={{ color: '#7C3AED', fontSize: '11px', fontWeight: 700, marginBottom: '4px', fontFamily: 'monospace' }}>VOICE AGENT ROI CALCULATION</div>
            <div style={{ color: '#7C3AED', fontSize: '16px', fontWeight: 900, fontFamily: 'monospace' }}>$88,400/yr</div>
            <div style={{ color: '#777', fontSize: '10px' }}>recoverable from after-hours missed calls at current volume</div>
          </div>
        </div>
      </div>

      {/* IMPACT BAR */}
      <div style={{ background: '#111827', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        <div>
          <div style={{ color: '#9CA3AF', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>Total Revenue Impact</div>
          <div style={{ color: '#E63946', fontSize: '36px', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1 }}>$400K+</div>
          <div style={{ color: '#9CA3AF', fontSize: '11px', fontWeight: 600, marginTop: '4px', letterSpacing: '2px' }}>PER YEAR</div>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div>
            <div style={{ color: '#16A34A', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Not Caused By:</div>
            {['Technical capability', 'Partner relationships', 'Service quality'].map(t => (
              <div key={t} style={{ color: '#D1FAE5', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                <span style={{ color: '#16A34A' }}>✓</span> {t}
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: '#E63946', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Caused By:</div>
            {['Name confusion in search', 'Zero pricing transparency', 'Broken discovery paths'].map(t => (
              <div key={t} style={{ color: '#FECACA', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                <span style={{ color: '#E63946' }}>✗</span> {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IMPACT MATRIX — DEEP EXCLUSIVE */}
      <div style={{ padding: '20px 28px 0', background: '#0D0D0D' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '12px' }}>
          19 / The Impact Matrix <span style={{ color: '#7C3AED', background: '#F3E5F5', padding: '2px 8px', borderRadius: '3px', fontSize: '9px', marginLeft: '8px' }}>DEEP EXCLUSIVE</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ background: '#1A1A2E' }}>
              {['Recommendation', 'Effort', 'Impact', 'Category'].map(h => (
                <td key={h} style={{ padding: '8px 12px', color: '#C8A96E', fontSize: '10px', letterSpacing: '1px', fontFamily: 'monospace', fontWeight: 700 }}>{h}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Fix broken Instagram link on website', 'Low', 'High', 'QUICK WIN', '#1B5E20', '#E8F5E9'],
              ['Claim Google Business Profile', 'Low', 'Critical', 'QUICK WIN', '#1B5E20', '#E8F5E9'],
              ['Add "Starting at" pricing to website', 'Low', 'High', 'QUICK WIN', '#1B5E20', '#E8F5E9'],
              ['Create 3 case study pages from existing clients', 'Medium', 'High', 'BIG SWING', '#E65100', '#FFF8E1'],
              ['Bridge founder personal brand to business', 'Low', 'High', 'BIG SWING', '#E65100', '#FFF8E1'],
              ['Deploy voice agent for after-hours capture', 'Medium', 'Critical', 'BIG SWING', '#E65100', '#FFF8E1'],
            ].map(([rec, effort, impact, cat, cc, cb]) => (
              <tr key={rec} style={{ background: cat === 'QUICK WIN' ? '#FFFFFF' : '#F5F5F5', borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px 12px', fontSize: '11px', color: '#1A1A1A' }}>{rec}</td>
                <td style={{ padding: '8px 12px', fontSize: '11px', color: '#555', textAlign: 'center' }}>{effort}</td>
                <td style={{ padding: '8px 12px', fontSize: '11px', color: '#555', textAlign: 'center' }}>{impact}</td>
                <td style={{ padding: '8px 12px' }}>
                  <span style={{ background: cb, color: cc, fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '3px', fontFamily: 'monospace' }}>{cat}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
