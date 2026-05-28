import React from 'react';

// StandardAuditSample.tsx (overwritten from StandardAuditSample_1.tsx)
// Sovereign X Digital Audit — Standard · All 14 Sections
// Anonymized · Staten Island Specialty Food Market

const BLUR_STYLE = {
  filter: 'blur(5px)',
  userSelect: 'none' as const,
  pointerEvents: 'none' as const,
  opacity: 0.7,
};

const BlurBadge = () => (
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

const SectionRow = ({ num, label, score, finding, scoreBg, scoreColor, blurred = false }: any) => (
  <tr style={{ background: blurred ? '#F9F9F9' : (parseInt(num) % 2 === 0 ? '#F5F5F5' : '#FFFFFF') }}>
    <td style={{ padding: '8px 12px', fontSize: '14px', textAlign: 'center' }}>{label.split(' ')[0]}</td>
    <td style={{ padding: '8px 12px', fontSize: '12px', fontWeight: 600, color: '#1A1A1A' }}>{label.split(' ').slice(1).join(' ')}</td>
    <td style={{ padding: '8px 12px' }}>
      <span style={{ background: scoreBg, color: scoreColor, fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '3px', fontFamily: 'monospace', ...(blurred ? BLUR_STYLE : {}) }}>{score}</span>
    </td>
    <td style={{ padding: '8px 12px', fontSize: '11px', color: '#555', lineHeight: 1.4, ...(blurred ? BLUR_STYLE : {}) }}>{finding}</td>
  </tr>
);

const FindingCard = ({ num, icon, title, bullets, cost, costColor, borderColor, bgColor, blurred = false }: any) => (
  <div style={{ background: '#FFFFFF', borderRadius: '6px', borderTop: `3px solid ${borderColor}`, padding: '16px', position: 'relative', overflow: 'hidden' }}>
    {blurred && (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(6px)', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ background: '#0A1628', color: '#C8A96E', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '2px', padding: '6px 14px', borderRadius: '3px', border: '1px solid #C8A96E' }}>FULL REPORT ONLY</span>
      </div>
    )}
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
      <span style={{ background: borderColor, color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>{num}</span>
      <span style={{ fontSize: '14px' }}>{icon}</span>
    </div>
    <div style={{ color: borderColor, fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, marginBottom: '8px' }}>{title}</div>
    <ul style={{ padding: 0, margin: '0 0 10px', listStyle: 'none', fontSize: '11px', color: '#374151', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {bullets.map((b: string, i: number) => <li key={i} style={{ display: 'flex', gap: '6px' }}><span style={{ color: borderColor, flexShrink: 0 }}>•</span><span>{b}</span></li>)}
    </ul>
    <div style={{ background: bgColor, borderLeft: `3px solid ${borderColor}`, borderRadius: '0 4px 4px 0', padding: '10px' }}>
      <div style={{ color: '#374151', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>What This Costs</div>
      <div style={{ color: costColor, fontSize: '18px', fontWeight: 900, fontFamily: 'monospace' }}>{cost}</div>
    </div>
  </div>
);

const SectionBlock = ({ sectionNum, sectionTitle, blurred = false, children }: any) => (
  <div style={{ padding: '16px 28px 0', position: 'relative' }}>
    <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
      {sectionNum} / {sectionTitle}
      {blurred && <BlurBadge />}
    </div>
    <div style={blurred ? { ...BLUR_STYLE, filter: 'blur(6px)' } : {}}>
      {children}
    </div>
  </div>
);

export function StandardAuditSample() {
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
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px', lineHeight: 1.2 }}>SOVEREIGN X DIGITAL AUDIT<span style={{ color: '#C8A96E' }}> — STANDARD</span></div>
          <div style={{ color: '#38BDF8', fontSize: '12px', marginTop: '6px', letterSpacing: '1px' }}>[Staten Island Specialty Food Market] · Staten Island, NY · Butcher / Specialty Food · May 2026</div>
          <div style={{ color: '#777', fontSize: '11px', marginTop: '4px' }}>Sovereign X Audits · BlackFur Capital Group LLC</div>
        </div>
        <div style={{ border: '1px solid #C8A96E', color: '#C8A96E', fontSize: '10px', letterSpacing: '2px', padding: '4px 12px', borderRadius: '4px', fontFamily: 'monospace' }}>AICC Verified</div>
      </div>

      {/* SCORE */}
      <div style={{ background: '#111827', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        <div>
          <div style={{ color: '#555', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'monospace' }}>Digital Sovereignty Score</div>
          <div style={{ fontSize: '56px', fontWeight: 900, color: '#E63946', lineHeight: 1, letterSpacing: '-2px' }}>31<span style={{ fontSize: '24px', color: '#555', fontWeight: 400 }}>/100</span></div>
          <div style={{ background: '#E63946', color: '#FFFFFF', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', padding: '3px 10px', borderRadius: '3px', display: 'inline-block', marginTop: '8px' }}>HIGH RISK</div>
          <div style={{ color: '#777', fontSize: '11px', fontStyle: 'italic', marginTop: '6px', maxWidth: '260px', lineHeight: 1.5 }}>A score out of 100 measuring how well your digital infrastructure is owned, consistent, and optimized across every platform where your business appears.</div>
        </div>
        <div style={{ color: '#777', fontSize: '12px', maxWidth: '380px', lineHeight: 1.6, fontStyle: 'italic' }}>Decades of community trust. Real product quality. Digital infrastructure that is actively working against both. Every piece of reputation equity built lives on platforms the business does not own or control.</div>
      </div>

      {/* SECTION 01 — THE REAL SITUATION */}
      <SectionBlock sectionNum="01" sectionTitle="The Real Situation">
        <div style={{ background: '#1A1A2E', borderRadius: '4px', padding: '14px', marginBottom: '8px' }}>
          <div style={{ color: '#C8A96E', fontSize: '11px', fontWeight: 700, marginBottom: '6px', fontFamily: 'monospace' }}>WHAT IS WORKING</div>
          <div style={{ color: '#9CA3AF', fontSize: '12px', lineHeight: 1.7 }}>A multi-decade community institution. Consistent foot traffic from loyal local customers. Product quality confirmed through word-of-mouth referrals. Real reputation equity exists — it is simply invisible to anyone who isn't already a customer.</div>
        </div>
        <div style={{ background: '#1A0A0A', borderRadius: '4px', padding: '14px' }}>
          <div style={{ color: '#E63946', fontSize: '11px', fontWeight: 700, marginBottom: '6px', fontFamily: 'monospace' }}>THE CORE INFRASTRUCTURE GAP</div>
          <div style={{ color: '#9CA3AF', fontSize: '12px', lineHeight: 1.7 }}>A business with no domain, no website, and a duplicate Yelp listing sending customers to the wrong address is effectively invisible to every new customer who hasn't already been told about it by someone who already knows. Every referral that searches the name encounters someone else's story about this business — not theirs.</div>
        </div>
      </SectionBlock>

      {/* SECTION 02 — SOVEREIGNTY SCORECARD */}
      <div style={{ padding: '16px 28px 0' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '12px' }}>02 / The Sovereignty Scorecard</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#111827' }}>
              {['', 'DIMENSION', 'SCORE', 'CORE FINDING'].map((h, i) => (
                <td key={i} style={{ padding: '8px 12px', color: '#C8A96E', fontSize: '10px', letterSpacing: '2px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', width: i === 0 ? '32px' : i === 2 ? '80px' : 'auto' }}>{h}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            <SectionRow num="1" label="🌐 Website & Domain" score="1/10" finding="No domain. No website. Zero owned web presence." scoreBg="#FFEBEE" scoreColor="#E63946" />
            <SectionRow num="2" label="🎨 Brand Identity" score="3/10" finding="Five name variants. No story. No digital home for brand equity." scoreBg="#FFF8E1" scoreColor="#E65100" />
            <SectionRow num="3" label="📱 Social Media" score="1/10" finding="No dedicated accounts. 16k related account unconnected." scoreBg="#FFEBEE" scoreColor="#E63946" />
            <SectionRow num="4" label="🔍 Local SEO / NAP" score="2/10" finding="Duplicate listing. Wrong address indexed. Hours discrepancy." scoreBg="#FFEBEE" scoreColor="#E63946" />
            <SectionRow num="5" label="⚙️ Systems & Automation" score="1/10" finding="No pre-order, no list, no intake, no holiday infrastructure." scoreBg="#FFEBEE" scoreColor="#E63946" />
            <SectionRow num="6" label="🤖 AI Search / GEO" score="2/10" finding="Unclaimed GBP with 134 reviews. No website. No schema." scoreBg="#FFEBEE" scoreColor="#E63946" />
            <tr style={{ background: '#111827' }}>
              <td colSpan={2} style={{ padding: '10px 12px', color: '#C8A96E', fontSize: '13px', fontWeight: 700, fontFamily: 'monospace' }}>OVERALL</td>
              <td style={{ padding: '10px 12px' }}><span style={{ background: '#FFEBEE', color: '#E63946', fontSize: '13px', fontWeight: 800, padding: '3px 10px', borderRadius: '3px', fontFamily: 'monospace' }}>31/100</span></td>
              <td style={{ padding: '10px 12px', color: '#9CA3AF', fontSize: '11px', fontStyle: 'italic' }}>Real product. Real trust. Infrastructure working against both.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* SECTIONS 03-07 — BLURRED */}
      <SectionBlock sectionNum="03" sectionTitle="Domain Security & Ownership" blurred={true}>
        <div style={{ background: '#1A1A2E', borderRadius: '4px', padding: '14px', height: '60px' }}>
          <div style={{ color: '#9CA3AF', fontSize: '12px' }}>Domain registration status, ownership verification, SSL certificate, name variation analysis...</div>
        </div>
      </SectionBlock>

      <SectionBlock sectionNum="04" sectionTitle="Technical Performance — Desktop" blurred={true}>
        <div style={{ background: '#1A1A2E', borderRadius: '4px', padding: '14px', height: '60px' }}>
          <div style={{ color: '#9CA3AF', fontSize: '12px' }}>Google PageSpeed Insights scores, Core Web Vitals, revenue impact calculation...</div>
        </div>
      </SectionBlock>

      <SectionBlock sectionNum="05" sectionTitle="Mobile Performance & Revenue Impact" blurred={true}>
        <div style={{ background: '#1A1A2E', borderRadius: '4px', padding: '14px', height: '60px' }}>
          <div style={{ color: '#9CA3AF', fontSize: '12px' }}>Mobile PageSpeed scores, Core Web Vitals, ADA compliance, mobile journey audit...</div>
        </div>
      </SectionBlock>

      <SectionBlock sectionNum="06" sectionTitle="Website & Conversion Architecture" blurred={true}>
        <div style={{ background: '#1A1A2E', borderRadius: '4px', padding: '14px', height: '60px' }}>
          <div style={{ color: '#9CA3AF', fontSize: '12px' }}>Navigation audit, CTA hierarchy, trust elements, technology stack, AI tools assessment...</div>
        </div>
      </SectionBlock>

      <SectionBlock sectionNum="07" sectionTitle="Brand Identity & Consistency" blurred={true}>
        <div style={{ background: '#1A1A2E', borderRadius: '4px', padding: '14px', height: '60px' }}>
          <div style={{ color: '#9CA3AF', fontSize: '12px' }}>Logo consistency, brand voice, differentiation analysis, founder personal brand integration...</div>
        </div>
      </SectionBlock>

      {/* SECTION 08 — LOCAL PRESENCE — VISIBLE (BONUS) */}
      <div style={{ padding: '16px 28px 0' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          08 / Local Presence & Discoverability
          <span style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)', color: '#C8A96E', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px', padding: '2px 8px', borderRadius: '3px' }}>★ STANDARD BONUS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '8px' }}>
          {[
            { label: 'NAP CONSISTENCY', value: '4 inconsistencies', sub: 'Across Google, Yelp, Facebook, Apple Maps', color: '#E63946' },
            { label: 'GOOGLE BUSINESS PROFILE', value: 'Unclaimed', sub: '134 reviews — none being responded to', color: '#E63946' },
            { label: 'LOCAL MAP PACK', value: 'Not ranking', sub: 'Invisible for primary search queries', color: '#E63946' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} style={{ background: '#1A1A2E', borderRadius: '4px', padding: '12px' }}>
              <div style={{ color: '#C8A96E', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '2px', marginBottom: '6px' }}>{label}</div>
              <div style={{ color, fontSize: '14px', fontWeight: 700, marginBottom: '3px' }}>{value}</div>
              <div style={{ color: '#6B7280', fontSize: '10px' }}>{sub}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#1A0A0A', borderRadius: '4px', padding: '12px', marginBottom: '8px' }}>
          <div style={{ color: '#E63946', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>DUPLICATE LISTING — SENDING CUSTOMERS TO WRONG ADDRESS</div>
          <div style={{ color: '#9CA3AF', fontSize: '11px', lineHeight: 1.6 }}>A second Yelp listing with a completely different address and phone number is actively indexed by Google. Customers following that listing arrive at the wrong location and leave. This has been happening every day the listing has been live.</div>
          <div style={{ color: '#E63946', fontSize: '14px', fontWeight: 900, fontFamily: 'monospace', marginTop: '8px' }}>$20K–$40K/yr in lost walk-in revenue</div>
        </div>
      </div>

      {/* SECTION 09 — SOCIAL MEDIA — BLURRED */}
      <SectionBlock sectionNum="09" sectionTitle="Social Media Infrastructure" blurred={true}>
        <div style={{ background: '#1A1A2E', borderRadius: '4px', padding: '14px', height: '60px' }}>
          <div style={{ color: '#9CA3AF', fontSize: '12px' }}>Platform presence audit, follower counts, engagement rates, posting cadence, UGC analysis...</div>
        </div>
      </SectionBlock>

      {/* SECTION 10 — REVENUE LEAKS — VISIBLE */}
      <SectionBlock sectionNum="10" sectionTitle="Revenue Leaks & Systems">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '8px' }}>
          {[
            { label: 'AFTER-HOURS COVERAGE', value: 'Voicemail only', sub: 'No after-hours capture system', color: '#E63946' },
            { label: 'PRE-ORDER SYSTEM', value: 'Does not exist', sub: 'Holiday demand not captured', color: '#E63946' },
            { label: 'EMAIL / SMS LIST', value: 'Not built', sub: 'Zero owned communication channel', color: '#E63946' },
            { label: 'RECURRING REVENUE', value: 'None', sub: 'No subscription, membership, or retainer', color: '#E63946' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} style={{ background: '#1A1A2E', borderRadius: '4px', padding: '12px' }}>
              <div style={{ color: '#C8A96E', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '2px', marginBottom: '6px' }}>{label}</div>
              <div style={{ color, fontSize: '14px', fontWeight: 700, marginBottom: '3px' }}>{value}</div>
              <div style={{ color: '#6B7280', fontSize: '10px' }}>{sub}</div>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* SECTION 11 — AI SEARCH — VISIBLE (BONUS) */}
      <div style={{ padding: '16px 28px 0' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          11 / AI Search & GEO Visibility
          <span style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)', color: '#C8A96E', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px', padding: '2px 8px', borderRadius: '3px' }}>★ STANDARD BONUS</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '8px' }}>
          {[
            { platform: 'ChatGPT', result: 'Not found', detail: 'No AI-generated mention in any query' },
            { platform: 'Perplexity', result: 'Not found', detail: 'Competitors cited. This business was not.' },
            { platform: 'Google AI Overview', result: 'Not found', detail: 'No schema. No structured data. Invisible.' },
          ].map(({ platform, result, detail }) => (
            <div key={platform} style={{ background: '#1A0A0A', borderRadius: '4px', padding: '12px' }}>
              <div style={{ color: '#C8A96E', fontSize: '10px', fontFamily: 'monospace', letterSpacing: '2px', marginBottom: '6px' }}>{platform}</div>
              <div style={{ color: '#E63946', fontSize: '13px', fontWeight: 700, marginBottom: '3px' }}>✗ {result}</div>
              <div style={{ color: '#6B7280', fontSize: '10px' }}>{detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 12 — REPUTATION — VISIBLE (BONUS) */}
      <div style={{ padding: '16px 28px 0' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          12 / Reputation Management
          <span style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)', color: '#C8A96E', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '1px', padding: '2px 8px', borderRadius: '3px' }}>★ STANDARD BONUS</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '8px' }}>
          <thead>
            <tr style={{ background: '#111827' }}>
              {['PLATFORM', 'RATING', 'REVIEWS', 'VELOCITY', 'UNANSWERED'].map(h => (
                <td key={h} style={{ padding: '7px 10px', color: '#C8A96E', fontSize: '10px', letterSpacing: '1px', fontFamily: 'monospace', fontWeight: 700 }}>{h}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Google', '4.2 ★', '134', '~2/mo', '87%'],
              ['Yelp', '3.0 ★', '48', '<1/mo', '94%'],
              ['Facebook', '4.5 ★', '23', '<1/mo', '100%'],
            ].map(([p, r, rv, v, u], i) => (
              <tr key={p} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F5F5' }}>
                <td style={{ padding: '7px 10px', fontSize: '12px', fontWeight: 600, color: '#1A1A1A' }}>{p}</td>
                <td style={{ padding: '7px 10px', fontSize: '12px', color: '#374151' }}>{r}</td>
                <td style={{ padding: '7px 10px', fontSize: '12px', color: '#374151' }}>{rv}</td>
                <td style={{ padding: '7px 10px', fontSize: '12px', color: '#374151' }}>{v}</td>
                <td style={{ padding: '7px 10px' }}><span style={{ background: '#FFEBEE', color: '#E63946', fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '3px' }}>{u}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SECTION 13 — COMPETITIVE CONTEXT — BLURRED */}
      <SectionBlock sectionNum="13" sectionTitle="Competitive Context" blurred={true}>
        <div style={{ background: '#1A1A2E', borderRadius: '4px', padding: '14px', height: '60px' }}>
          <div style={{ color: '#9CA3AF', fontSize: '12px' }}>1–2 competitor analysis, key data points, competitive gaps, recommended actions...</div>
        </div>
      </SectionBlock>

      {/* SECTION 14 — IMPACT MATRIX — PARTIAL */}
      <div style={{ padding: '16px 28px' }}>
        <div style={{ color: '#C8A96E', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '12px' }}>14 / Impact Matrix</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '12px' }}>
          <thead>
            <tr style={{ background: '#111827' }}>
              {['RECOMMENDATION', 'EFFORT', 'IMPACT', 'CATEGORY'].map(h => (
                <td key={h} style={{ padding: '8px 12px', color: '#C8A96E', fontSize: '10px', letterSpacing: '1px', fontFamily: 'monospace', fontWeight: 700 }}>{h}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Register the domain — available today for under $15', 'Low', 'Critical', 'QUICK WIN', '#1B5E20', '#E8F5E9'],
              ['Claim and correct the duplicate Yelp listing', 'Low', 'Critical', 'QUICK WIN', '#1B5E20', '#E8F5E9'],
              ['Update hours across all platforms', 'Low', 'High', 'QUICK WIN', '#1B5E20', '#E8F5E9'],
            ].map(([rec, effort, impact, cat, cc, cb]) => (
              <tr key={rec} style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '8px 12px', fontSize: '11px', color: '#1A1A1A' }}>{rec}</td>
                <td style={{ padding: '8px 12px', fontSize: '11px', color: '#555', textAlign: 'center' }}>{effort}</td>
                <td style={{ padding: '8px 12px', fontSize: '11px', color: '#555', textAlign: 'center' }}>{impact}</td>
                <td style={{ padding: '8px 12px' }}><span style={{ background: cb, color: cc, fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '3px', fontFamily: 'monospace' }}>{cat}</span></td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} style={{ padding: '0' }}>
                <div style={{ filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none' }}>
                  {[
                    ['Build a simple website with hours, location, brand story', 'Low', 'High', 'BIG SWING', '#E65100', '#FFF8E1'],
                    ['Claim Google Business Profile and optimize all fields', 'Low', 'Critical', 'QUICK WIN', '#1B5E20', '#E8F5E9'],
                    ['Launch Instagram with product photography', 'Medium', 'High', 'BIG SWING', '#E65100', '#FFF8E1'],
                    ['Build pre-order system for holiday season', 'Medium', 'High', 'BIG SWING', '#E65100', '#FFF8E1'],
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

      {/* TOTAL IMPACT */}
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
              <div key={t} style={{ color: '#D1FAE5', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}><span style={{ color: '#16A34A' }}>✓</span> {t}</div>
            ))}
          </div>
          <div>
            <div style={{ color: '#E63946', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Caused By:</div>
            {['Zero web presence', 'Duplicate listings', 'NAP inconsistency'].map(t => (
              <div key={t} style={{ color: '#FECACA', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}><span style={{ color: '#E63946' }}>✗</span> {t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#0A1628', padding: '14px 28px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#C8A96E', fontSize: '11px' }}>Ola · Strategic Co-Architect · Sovereign X Audits · BlackFur Capital Group LLC</div>
        <div style={{ color: '#555', fontSize: '10px', fontFamily: 'monospace', textAlign: 'right' }}>
          SAMPLE DOCUMENT — SOVEREIGN X AUDITS<br/>
          <span style={{ fontSize: '9px' }}>Proprietary. For Authorized Review Only.</span>
        </div>
      </div>

    </div>
  );
}
