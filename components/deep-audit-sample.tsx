import React from 'react';

// DeepAuditSample.tsx (overwritten from DeepAuditSample_1.tsx)
// Sovereign X Digital Audit — Deep · All 20 Sections
// Anonymized · NYC AV & IT Solutions Firm

const BLUR_STYLE = {
  filter: 'blur(6px)',
  userSelect: 'none' as const,
  pointerEvents: 'none' as const,
  opacity: 0.6,
};

const DeepExclusiveBadge = () => (
  <span style={{
    background: 'rgba(124,58,237,0.15)',
    border: '1px solid rgba(124,58,237,0.4)',
    color: '#7C3AED',
    fontSize: '9px',
    fontFamily: 'monospace',
    letterSpacing: '2px',
    padding: '2px 8px',
    borderRadius: '3px',
    marginLeft: '8px',
    verticalAlign: 'middle',
  }}>DEEP EXCLUSIVE</span>
);

const FullReportBadge = () => (
  <span style={{
    background: 'rgba(200,169,110,0.15)',
    border: '1px solid rgba(200,169,110,0.4)',
    color: '#C8A96E',
    fontSize: '9px',
    fontFamily: 'monospace',
    letterSpacing: '2px',
    padding: '2px 8px',
    borderRadius: '3px',
    marginLeft: '8px',
    verticalAlign: 'middle',
  }}>FULL REPORT ONLY</span>
);

const SectionBlock = ({ sectionNum, sectionTitle, blurred = false, deepExclusive = false, children }: any) => (
  <div style={{ padding: '16px 28px 0', position: 'relative' }}>
    <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
      {sectionNum} / {sectionTitle}
      {deepExclusive && <DeepExclusiveBadge />}
      {blurred && !deepExclusive && <FullReportBadge />}
    </div>
    {blurred ? (
      <div style={{ position: 'relative' }}>
        <div style={BLUR_STYLE}>{children}</div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ background: '#0A1628', color: '#C8A96E', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '2px', padding: '6px 16px', borderRadius: '3px', border: '1px solid #C8A96E' }}>
            {deepExclusive ? 'DEEP EXCLUSIVE — FULL REPORT ONLY' : 'FULL REPORT ONLY'}
          </span>
        </div>
      </div>
    ) : children}
  </div>
);

export function DeepAuditSample() {
  return (
    <div style={{
      width: '900px', maxWidth: '92vw',
      background: '#0A1628',
      borderRadius: '8px', overflow: 'hidden',
      boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
      fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
    }}>

      {/* HEADER */}
      <div style={{ background: '#0A1628', padding: '20px 28px', borderBottom: '1px solid rgba(200,169,110,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ color: '#C8A96E', fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Sovereign X Audits · BlackFur Capital Group LLC</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px', lineHeight: 1.2 }}>SOVEREIGN X DIGITAL AUDIT<span style={{ color: '#C8A96E' }}> — DEEP</span></div>
          <div style={{ color: '#38BDF8', fontSize: '12px', marginTop: '6px', letterSpacing: '1px' }}>[NYC AV & IT Solutions Firm] · New York, NY · AV & IT Services · May 2026</div>
          <div style={{ color: '#777', fontSize: '11px', marginTop: '4px' }}>Sovereign X Audits · BlackFur Capital Group LLC</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ border: '1px solid #C8A96E', color: '#C8A96E', fontSize: '10px', letterSpacing: '2px', padding: '4px 12px', borderRadius: '4px', fontFamily: 'monospace', marginBottom: '6px' }}>AICC Verified</div>
          <div style={{ color: '#555', fontSize: '10px', fontFamily: 'monospace' }}>Deep Intelligence Report</div>
        </div>
      </div>

      {/* SCORE */}
      <div style={{ background: '#111827', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        <div>
          <div style={{ color: '#555', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'monospace' }}>Digital Sovereignty Score</div>
          <div style={{ fontSize: '56px', fontWeight: 900, color: '#E63946', lineHeight: 1, letterSpacing: '-2px' }}>31<span style={{ fontSize: '24px', color: '#555', fontWeight: 400 }}>/100</span></div>
          <div style={{ background: '#E63946', color: '#FFFFFF', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', padding: '3px 10px', borderRadius: '3px', display: 'inline-block', marginTop: '8px' }}>HIGH RISK</div>
        </div>
        <div style={{ color: '#777', fontSize: '12px', maxWidth: '420px', lineHeight: 1.6, fontStyle: 'italic' }}>Real technical expertise. Authorized partnerships with Dell, Resi, and Logitech. Genuine institutional relationships. Every piece of that credibility is being suppressed by digital infrastructure that is actively working against discovery, lead generation, and revenue growth.</div>
      </div>

      {/* SECTION 01 */}
      <SectionBlock sectionNum="01" sectionTitle="The Real Situation">
        <div style={{ background: '#1A1A2E', borderRadius: '4px', padding: '14px', marginBottom: '8px' }}>
          <div style={{ color: '#C8A96E', fontSize: '11px', fontWeight: 700, marginBottom: '6px', fontFamily: 'monospace' }}>WHAT IS WORKING</div>
          <div style={{ color: '#9CA3AF', fontSize: '12px', lineHeight: 1.7 }}>Authorized partner relationships with Dell, Resi, and Logitech represent real institutional credibility. The firm has completed corporate AV installations, church buildouts, and school technology projects. The work quality is confirmed. The problem is not the product — it is the infrastructure around the product.</div>
        </div>
        <div style={{ background: '#1A0A0A', borderRadius: '4px', padding: '14px' }}>
          <div style={{ color: '#E63946', fontSize: '11px', fontWeight: 700, marginBottom: '6px', fontFamily: 'monospace' }}>THE CORE INFRASTRUCTURE GAP</div>
          <div style={{ color: '#9CA3AF', fontSize: '12px', lineHeight: 1.7 }}>A business with no Google Business Profile, a website with a broken Instagram link, zero pricing transparency, and a name that competes with 20+ unrelated companies in search is invisible to every potential client who doesn't already have a personal referral. The technical expertise is real. The digital presence makes it unverifiable.</div>
        </div>
      </SectionBlock>

      {/* SECTION 02 — SCORECARD */}
      <div style={{ padding: '16px 28px 0' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '12px' }}>02 / The Sovereignty Scorecard</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#111827' }}>
              {['', 'DIMENSION', 'SCORE', 'CORE FINDING'].map((h, i) => (
                <td key={i} style={{ padding: '8px 12px', color: '#C8A96E', fontSize: '10px', letterSpacing: '2px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase' }}>{h}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['🌐', 'Website & Domain', '4/10', '#FFF8E1', '#E65100', 'Site exists — zero pricing, broken Instagram link costing leads daily'],
              ['🎨', 'Brand Identity', '2/10', '#FFEBEE', '#E63946', 'Name battles 20+ competitors in search. Generic messaging.'],
              ['📱', 'Social Media', '3/10', '#FFEBEE', '#E63946', '1,864 personal followers, zero business funnel. Wrong handle on site.'],
              ['🔍', 'Local SEO / Discovery', '1/10', '#FFEBEE', '#E63946', 'No Google Business Profile. Invisible in all local search results.'],
              ['⚙️', 'Systems & Proof', '2/10', '#FFEBEE', '#E63946', 'One testimonial. No case studies. No portfolio. No recurring revenue.'],
              ['🤖', 'AI Search / GEO', '3/10', '#FFF8E1', '#E65100', 'Site exists — no schema, name confusion kills AI search confidence.'],
            ].map(([icon, dim, score, sb, sc, finding], i) => (
              <tr key={dim} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F5F5' }}>
                <td style={{ padding: '8px 12px', fontSize: '14px', textAlign: 'center' }}>{icon}</td>
                <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: '#1A1A1A' }}>{dim}</td>
                <td style={{ padding: '8px 12px' }}><span style={{ background: sb, color: sc, fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '3px', fontFamily: 'monospace' }}>{score}</span></td>
                <td style={{ padding: '8px 12px', fontSize: '11px', color: '#555', lineHeight: 1.4 }}>{finding}</td>
              </tr>
            ))}
            <tr style={{ background: '#111827' }}>
              <td colSpan={2} style={{ padding: '10px 12px', color: '#C8A96E', fontSize: '13px', fontWeight: 700, fontFamily: 'monospace' }}>OVERALL</td>
              <td style={{ padding: '10px 12px' }}><span style={{ background: '#FFEBEE', color: '#E63946', fontSize: '13px', fontWeight: 800, padding: '3px 10px', borderRadius: '3px', fontFamily: 'monospace' }}>31/100</span></td>
              <td style={{ padding: '10px 12px', color: '#9CA3AF', fontSize: '11px', fontStyle: 'italic' }}>Real expertise. Zero visibility. Fixable with structure.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SECTIONS 03-07 BLURRED */}
      {[
        ['03', 'Domain Security & Ownership', 'Domain registration, ownership, SSL, name variation analysis...'],
        ['04', 'Technical Performance — Desktop', 'PageSpeed scores, Core Web Vitals, revenue impact calculation...'],
        ['05', 'Mobile Performance & Revenue Impact', 'Mobile scores, ADA compliance, mobile journey friction audit...'],
        ['06', 'Website & Conversion Architecture', 'Navigation, CTAs, trust elements, tech stack, AI tools assessment...'],
        ['07', 'Brand Identity & Consistency', 'Logo consistency, brand voice, differentiation, personal brand integration...'],
      ].map(([num, title, desc]) => (
        <SectionBlock key={num} sectionNum={num} sectionTitle={title} blurred={true}>
          <div style={{ background: '#1A1A2E', borderRadius: '4px', padding: '14px', height: '60px' }}>
            <div style={{ color: '#9CA3AF', fontSize: '12px' }}>{desc}</div>
          </div>
        </SectionBlock>
      ))}

      {/* SECTION 08 LOCAL PRESENCE — VISIBLE */}
      <div style={{ padding: '16px 28px 0' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          08 / Local Presence & Discoverability
          <span style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)', color: '#C8A96E', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px', padding: '2px 8px', borderRadius: '3px' }}>★ BONUS DEPTH</span>
        </div>
        <div style={{ background: '#1A0A0A', borderRadius: '4px', padding: '14px', marginBottom: '8px' }}>
          <div style={{ color: '#E63946', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>NO GOOGLE BUSINESS PROFILE — COMPLETELY INVISIBLE IN LOCAL SEARCH</div>
          <div style={{ color: '#9CA3AF', fontSize: '12px', lineHeight: 1.6 }}>A search for AV installation services in New York returns a local map pack of 3 businesses. This firm does not appear in that pack at all — not ranked low, genuinely absent. Every local search query for this service category is sending potential clients to competitors. The fix is immediate and costs nothing.</div>
          <div style={{ color: '#E63946', fontSize: '16px', fontWeight: 900, fontFamily: 'monospace', marginTop: '8px' }}>Estimated $80K–$120K/yr in lost local search leads</div>
        </div>
      </div>

      {/* SECTION 09 BLURRED */}
      <SectionBlock sectionNum="09" sectionTitle="Social Media Infrastructure" blurred={true}>
        <div style={{ background: '#1A1A2E', borderRadius: '4px', padding: '14px', height: '60px' }}>
          <div style={{ color: '#9CA3AF', fontSize: '12px' }}>Platform presence, engagement rates, content cadence, UGC, link audit...</div>
        </div>
      </SectionBlock>

      {/* SECTION 10 REVENUE LEAKS — VISIBLE */}
      <SectionBlock sectionNum="10" sectionTitle="Revenue Leaks & Systems">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '8px' }}>
          {[
            { label: 'AFTER-HOURS COVERAGE', value: '7/7 calls → voicemail', sub: 'Church & school clients book after 5pm', color: '#E63946' },
            { label: 'RESPONSE TIME', value: 'Unknown — no tracking', sub: 'No CRM, no intake system', color: '#E63946' },
            { label: 'PORTFOLIO / CASE STUDIES', value: '1 testimonial only', sub: 'No project gallery, no social proof depth', color: '#E63946' },
            { label: 'RECURRING REVENUE', value: 'None structured', sub: 'No retainer, maintenance, or support packages', color: '#E63946' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} style={{ background: '#1A1A2E', borderRadius: '4px', padding: '12px' }}>
              <div style={{ color: '#C8A96E', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '2px', marginBottom: '6px' }}>{label}</div>
              <div style={{ color, fontSize: '13px', fontWeight: 700, marginBottom: '3px' }}>{value}</div>
              <div style={{ color: '#6B7280', fontSize: '10px' }}>{sub}</div>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* SECTION 11 AI SEARCH — VISIBLE */}
      <div style={{ padding: '16px 28px 0' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          11 / AI Search & GEO Visibility
          <span style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)', color: '#C8A96E', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px', padding: '2px 8px', borderRadius: '3px' }}>★ BONUS DEPTH</span>
        </div>
        <div style={{ background: '#1A0A0A', borderRadius: '4px', padding: '14px', marginBottom: '8px' }}>
          <div style={{ color: '#E63946', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>NAME CONFUSION KILLS AI SEARCH CONFIDENCE</div>
          <div style={{ color: '#9CA3AF', fontSize: '12px', lineHeight: 1.6 }}>When ChatGPT is asked about AV companies in New York, it cites firms with unambiguous names and verified GBP profiles. A business name that shares identity with 20+ unrelated companies gives AI systems no confident signal. The result: the AI skips it entirely and recommends a competitor with a cleaner identity footprint.</div>
        </div>
      </div>

      {/* SECTION 12 REPUTATION — VISIBLE */}
      <div style={{ padding: '16px 28px 0' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          12 / Reputation Management
          <span style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)', color: '#C8A96E', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px', padding: '2px 8px', borderRadius: '3px' }}>★ BONUS DEPTH</span>
        </div>
        <div style={{ background: '#1A1A2E', borderRadius: '4px', padding: '14px', marginBottom: '8px' }}>
          <div style={{ color: '#9CA3AF', fontSize: '12px', lineHeight: 1.6 }}>No Google Business Profile means no Google reviews. Yelp shows a sparse profile with minimal engagement. Facebook business page exists but has no recent activity. The firm has delivered real projects for real institutions — none of that work is represented in any review infrastructure that a prospect could find and verify.</div>
        </div>
      </div>

      {/* SECTION 13 COMPETITIVE CONTEXT — VISIBLE — DEEP EXCLUSIVE */}
      <div style={{ padding: '16px 28px 0' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
          13 / Competitive Context <DeepExclusiveBadge />
        </div>
        <div style={{ background: '#FFFFFF', borderRadius: '6px', overflow: 'hidden', marginBottom: '12px' }}>
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
                <tr key={comp} style={{ background: i === 2 ? '#FFEBEE' : i % 2 === 0 ? '#FFFFFF' : '#F5F5F5' }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          {[
            { num: '02', title: 'THE NAME MAKES SEO UNWINNABLE', body: '20+ competitors with similar names split every organic search. 80–90% of potential traffic goes to wrong companies.', cost: '$150K/yr', color: '#E63946', bg: '#FEF2F2' },
            { num: '03', title: 'WEBSITE LINKS TO NON-EXISTENT INSTAGRAM', body: 'Every visitor who clicks the Instagram link gets a 404. The actual business account is invisible in search.', cost: '$25K/yr', color: '#2563EB', bg: '#EFF6FF' },
            { num: '04', title: 'ZERO PRICING — ZERO PRE-QUALIFICATION', body: 'Serious buyers pre-qualify themselves. No pricing means they assume it is out of budget and move on.', cost: '$100K/yr', color: '#F97316', bg: '#FFF7ED' },
          ].map(({ num, title, body, cost, color, bg }) => (
            <div key={num} style={{ background: '#FFFFFF', borderRadius: '6px', borderTop: `3px solid ${color}`, padding: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span style={{ background: color, color: '#FFF', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>{num}</span>
              </div>
              <div style={{ color, fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, marginBottom: '8px' }}>{title}</div>
              <div style={{ fontSize: '11px', color: '#374151', lineHeight: 1.5, marginBottom: '10px' }}>{body}</div>
              <div style={{ background: bg, borderLeft: `3px solid ${color}`, borderRadius: '0 4px 4px 0', padding: '8px' }}>
                <div style={{ color, fontSize: '16px', fontWeight: 900, fontFamily: 'monospace' }}>{cost}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 14 IMPACT MATRIX — PARTIAL BLUR */}
      <div style={{ padding: '16px 28px 0' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '12px' }}>14 / Impact Matrix</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#111827' }}>
              {['RECOMMENDATION', 'EFFORT', 'IMPACT', 'CATEGORY'].map(h => (
                <td key={h} style={{ padding: '8px 12px', color: '#C8A96E', fontSize: '10px', letterSpacing: '1px', fontFamily: 'monospace', fontWeight: 700 }}>{h}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Fix broken Instagram link on website', 'Low', 'High', 'QUICK WIN', '#1B5E20', '#E8F5E9'],
              ['Claim Google Business Profile', 'Low', 'Critical', 'QUICK WIN', '#1B5E20', '#E8F5E9'],
              ['Add "Starting at" pricing to website', 'Low', 'High', 'QUICK WIN', '#1B5E20', '#E8F5E9'],
            ].map(([rec, effort, impact, cat, cc, cb]) => (
              <tr key={rec} style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px 12px', fontSize: '11px', color: '#1A1A1A' }}>{rec}</td>
                <td style={{ padding: '8px 12px', fontSize: '11px', color: '#555', textAlign: 'center' }}>{effort}</td>
                <td style={{ padding: '8px 12px', fontSize: '11px', color: '#555', textAlign: 'center' }}>{impact}</td>
                <td style={{ padding: '8px 12px' }}><span style={{ background: cb, color: cc, fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '3px', fontFamily: 'monospace' }}>{cat}</span></td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} style={{ padding: 0 }}>
                <div style={{ ...BLUR_STYLE, filter: 'blur(5px)' }}>
                  {[
                    ['Create 3 case study pages from existing clients', 'Medium', 'High', 'BIG SWING', '#E65100', '#FFF8E1'],
                    ['Bridge founder personal brand to business', 'Low', 'High', 'BIG SWING', '#E65100', '#FFF8E1'],
                    ['Deploy voice agent for after-hours capture', 'Medium', 'Critical', 'BIG SWING', '#E65100', '#FFF8E1'],
                    ['Build Wikipedia stub page for brand entity', 'Low', 'High', 'BIG SWING', '#E65100', '#FFF8E1'],
                    ['Claim and build Clutch.co profile', 'Low', 'High', 'QUICK WIN', '#1B5E20', '#E8F5E9'],
                  ].map(([rec, effort, impact, cat, cc, cb]) => (
                    <div key={rec} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '8px', padding: '8px 12px', background: '#F9F9F9', borderBottom: '1px solid #E5E7EB' }}>
                      <span style={{ fontSize: '11px', color: '#1A1A1A' }}>{rec}</span>
                      <span style={{ fontSize: '11px', color: '#555', textAlign: 'center', minWidth: '60px' }}>{effort}</span>
                      <span style={{ fontSize: '11px', color: '#555', textAlign: 'center', minWidth: '60px' }}>{impact}</span>
                      <span style={{ background: cb, color: cc, fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '3px', fontFamily: 'monospace', minWidth: '80px', textAlign: 'center' }}>{cat}</span>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SECTION 17 AI READINESS — VISIBLE — DEEP EXCLUSIVE */}
      <div style={{ padding: '16px 28px 0' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
          17 / AI Readiness & Automation Opportunity <DeepExclusiveBadge />
        </div>
        <div style={{ background: '#1A0A2A', borderRadius: '6px', padding: '16px', marginBottom: '12px' }}>
          <div style={{ color: '#7C3AED', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>VOICE AGENT OPPORTUNITY IDENTIFIED</div>
          <div style={{ color: '#9CA3AF', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>Testing 7 after-hours calls confirmed every call goes to voicemail. Church and school clients book primarily after 5pm. A voice agent capturing these calls at a 25% close rate and $8,500 average project value represents significant recoverable revenue.</div>
          <div style={{ background: '#F3E5F5', borderLeft: '3px solid #7C3AED', borderRadius: '0 4px 4px 0', padding: '12px' }}>
            <div style={{ color: '#7C3AED', fontSize: '11px', fontWeight: 700, marginBottom: '4px', fontFamily: 'monospace' }}>VOICE AGENT ROI CALCULATION</div>
            <div style={{ color: '#7C3AED', fontSize: '28px', fontWeight: 900, fontFamily: 'monospace' }}>$88,400/yr</div>
            <div style={{ color: '#777', fontSize: '11px', marginTop: '4px' }}>recoverable from after-hours missed calls at current volume</div>
          </div>
        </div>
      </div>

      {/* TOTAL IMPACT */}
      <div style={{ background: '#111827', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', marginTop: '16px' }}>
        <div>
          <div style={{ color: '#9CA3AF', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>Total Revenue Impact</div>
          <div style={{ color: '#E63946', fontSize: '36px', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1 }}>$400K+</div>
          <div style={{ color: '#9CA3AF', fontSize: '11px', fontWeight: 600, marginTop: '4px', letterSpacing: '2px' }}>PER YEAR</div>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div>
            <div style={{ color: '#16A34A', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Not Caused By:</div>
            {['Technical capability', 'Partner relationships', 'Service quality'].map(t => (
              <div key={t} style={{ color: '#D1FAE5', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}><span style={{ color: '#16A34A' }}>✓</span> {t}</div>
            ))}
          </div>
          <div>
            <div style={{ color: '#E63946', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Caused By:</div>
            {['Name confusion in search', 'Zero pricing transparency', 'Broken discovery paths'].map(t => (
              <div key={t} style={{ color: '#FECACA', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}><span style={{ color: '#E63946' }}>✗</span> {t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTIONS 15, 16, 18, 19, 20 — DEEP EXCLUSIVE BLURRED */}
      {[
        ['15', 'Owned Audience & Communication', 'Email list audit, SMS strategy, platform dependency risk, owned channel revenue potential...'],
        ['16', 'Press & PR Opportunity Map', 'Current press inventory, pitch narrative, named journalist targets, top 5 outlets...'],
        ['18', 'Total Revenue Impact', 'Full compound effect synthesis — how every finding amplifies every other finding...'],
        ['19', 'Priority Sequence', 'Every action sequenced by urgency with specific revenue recovery estimate per action...'],
        ['20', '90-Day Roadmap', 'Phased implementation plan — Days 1–7, 8–30, 31–60, 61–90 with milestones and owners...'],
      ].map(([num, title, desc]) => (
        <SectionBlock key={num} sectionNum={num} sectionTitle={title} blurred={true} deepExclusive={true}>
          <div style={{ background: '#1A0A2A', borderRadius: '4px', padding: '14px', height: '60px' }}>
            <div style={{ color: '#9CA3AF', fontSize: '12px' }}>{desc}</div>
          </div>
        </SectionBlock>
      ))}

      {/* FOOTER */}
      <div style={{ background: '#0A1628', padding: '14px 28px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <div style={{ color: '#C8A96E', fontSize: '11px' }}>Ola · Strategic Co-Architect · Sovereign X Audits · BlackFur Capital Group LLC</div>
        <div style={{ color: '#555', fontSize: '10px', fontFamily: 'monospace', textAlign: 'right' }}>
          SAMPLE DOCUMENT — SOVEREIGN X AUDITS<br/>
          <span style={{ fontSize: '9px' }}>Proprietary. For Authorized Review Only.</span>
        </div>
      </div>

    </div>
  );
}
