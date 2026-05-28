import React from 'react';

// SovereignSnippet.tsx
// Sovereign X Intelligence Snippet — Sample
// Anonymized · Multi-Location Healthcare Group

export function SovereignSnippet() {
  const blur = (content: React.ReactNode, blurred = false) =>
    blurred ? (
      <div style={{ filter: 'blur(4px)', userSelect: 'none', pointerEvents: 'none' }}>
        {content}
      </div>
    ) : content;

  return (
    <div className="snippet-container" style={{
      width: '900px', maxWidth: '92vw',
      background: '#FFFFFF',
      borderRadius: '8px', overflow: 'hidden',
      boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
      fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
      color: '#111827',
      margin: '0 auto',
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .snippet-header { display: flex; justify-content: space-between; align-items: center; }
        .snippet-disclosure { display: flex; gap: 12px; align-items: flex-start; }
        .snippet-address { display: flex; gap: 14px; }
        .snippet-findings-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .snippet-impact-bar { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .snippet-details-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 24px; }

        @media (max-width: 768px) {
          .snippet-header { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; padding: 16px !important; }
          .snippet-header > div:last-child { margin-top: 8px !important; }
          .snippet-disclosure { padding: 12px 16px !important; }
          .snippet-address { padding: 16px !important; flex-direction: column !important; gap: 12px !important; }
          .snippet-findings-grid { grid-template-columns: 1fr !important; padding: 16px !important; gap: 16px !important; }
          .snippet-impact-bar { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; padding: 16px !important; }
          .snippet-impact-bar > div:last-child { flex-direction: column !important; gap: 12px !important; }
          .snippet-details-grid { grid-template-columns: 1fr !important; padding: 16px !important; gap: 20px !important; }
        }
      `}} />

      {/* HEADER BAR */}
      <div className="snippet-header" style={{ background: '#0A1628', padding: '16px 28px' }}>
        <div>
          <div style={{ color: '#C8A96E', fontSize: '11px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>Sovereign X Audits · BlackFur Capital Group LLC</div>
          <div style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 800, marginTop: '4px', letterSpacing: '-0.5px' }}>SOVEREIGN INTELLIGENCE <span style={{ color: '#C8A96E' }}>SNIPPET</span></div>
          <div style={{ color: '#38BDF8', fontSize: '11px', marginTop: '4px' }}>Multi-Location Healthcare Group · New York, NY · Multi-Location DSO · May 2026</div>
        </div>
        <div style={{ border: '1px solid #C8A96E', color: '#C8A96E', fontSize: '10px', letterSpacing: '2px', padding: '4px 12px', borderRadius: '4px', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>AICC Verified</div>
      </div>

      {/* DISCLOSURE */}
      <div className="snippet-disclosure" style={{ background: '#FFFBEB', padding: '12px 28px', borderBottom: '1px solid #FCD34D' }}>
        <span style={{ fontSize: '18px' }}>⚠️</span>
        <div style={{ fontSize: '12px', color: '#92400E', lineHeight: 1.5 }}>
          <strong>PARTIAL DISCLOSURE:</strong> This document contains 3 of 20 findings identified in a full intelligence review of this organization's digital footprint. A complete Sovereign X Audit is available upon request.
        </div>
      </div>

      {/* PERSONAL ADDRESS */}
      <div className="snippet-address" style={{ padding: '20px 28px', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ width: '40px', height: '40px', background: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <div>
          <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#374151' }}>
            <span style={{ fontWeight: 700, fontSize: '15px' }}>[CLIENT NAME],</span> Before reaching out, I spent time reviewing your digital footprint — not just the corporate site, but across several of your NYC locations. I found three things I believe you should know about. Each one is costing you patients and revenue right now, independent of your clinical quality or your team's effort.
          </div>
          <div style={{ color: '#C8A96E', fontWeight: 700, fontSize: '13px', marginTop: '8px' }}>These findings are yours. No pitch. No strings.</div>
        </div>
      </div>

      {/* THREE FINDINGS */}
      <div className="snippet-findings-grid" style={{ padding: '20px 28px' }}>

        {/* Finding 01 */}
        <div style={{ background: '#FFFFFF', borderRadius: '6px', borderTop: '4px solid #E63946', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ background: '#E63946', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>01</span>
              <span style={{ color: '#E63946', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Finding 01</span>
            </div>
          </div>
          <div style={{ color: '#E63946', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, marginBottom: '10px' }}>THIS BUSINESS IS INVISIBLE IN AI SEARCH — WHERE PATIENTS ARE NOW LOOKING</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {['ChatGPT', 'Perplexity', 'Google AI Overview'].map(p => (
              <span key={p} style={{ border: '1px solid #E5E7EB', borderRadius: '20px', padding: '3px 8px', fontSize: '10px', color: '#374151' }}>{p}</span>
            ))}
          </div>
          <ul style={{ padding: 0, margin: '0 0 12px', listStyle: 'none', fontSize: '11px', color: '#374151', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
            {['Not found in a single AI-generated response across all three platforms.', 'Competitors appeared. This business did not.', 'No schema markup connecting the multi-location network.', 'To AI systems, each location reads as an unrelated business.'].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: '6px' }}><span style={{ color: '#E63946', flexShrink: 0 }}>✗</span><span>{t}</span></li>
            ))}
          </ul>
          <div style={{ background: '#FEF2F2', borderLeft: '3px solid #E63946', borderRadius: '0 4px 4px 0', padding: '10px', marginTop: 'auto' }}>
            <div style={{ color: '#374151', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>What This Costs</div>
            <div style={{ color: '#E63946', fontSize: '20px', fontWeight: 900, fontFamily: 'monospace' }}>$180K–$240K</div>
            <div style={{ color: '#777', fontSize: '10px' }}>in annual patient revenue across the NYC network</div>
          </div>
        </div>

        {/* Finding 02 */}
        <div style={{ background: '#FFFFFF', borderRadius: '6px', borderTop: '4px solid #2563EB', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ background: '#2563EB', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>02</span>
              <span style={{ color: '#2563EB', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Finding 02</span>
            </div>
          </div>
          <div style={{ color: '#2563EB', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, marginBottom: '10px' }}>THOUSANDS OF REVIEWS GENERATING ZERO NEW PATIENTS</div>
          <div style={{ background: '#EFF6FF', borderRadius: '6px', padding: '10px', marginBottom: '10px', display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#2563EB', fontWeight: 700, fontSize: '16px' }}>Thousands</div>
              <div style={{ color: '#6B7280', fontSize: '10px', fontStyle: 'italic' }}>closed review platform</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#374151', fontWeight: 700, fontSize: '16px' }}>19 reviews</div>
              <div style={{ color: '#6B7280', fontSize: '10px' }}>Yelp</div>
            </div>
          </div>
          <ul style={{ padding: 0, margin: '0 0 12px', listStyle: 'none', fontSize: '11px', color: '#374151', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
            {['Thousands of reviews sit in a closed platform — they do not feed Yelp or impact search ranking.', 'Competitors with far fewer reviews outrank this location.', 'Review equity is trapped in a platform that search engines cannot read.'].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: '6px' }}><span style={{ color: '#2563EB', flexShrink: 0 }}>•</span><span>{t}</span></li>
            ))}
          </ul>
          <div style={{ background: '#EFF6FF', borderLeft: '3px solid #2563EB', borderRadius: '0 4px 4px 0', padding: '10px', marginTop: 'auto' }}>
            <div style={{ color: '#374151', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>What This Costs</div>
            <div style={{ color: '#2563EB', fontSize: '20px', fontWeight: 900, fontFamily: 'monospace' }}>$200K–$300K</div>
            <div style={{ color: '#777', fontSize: '10px' }}>in annual patient revenue network-wide</div>
          </div>
        </div>

        {/* Finding 03 */}
        <div style={{ background: '#FFFFFF', borderRadius: '6px', borderTop: '4px solid #F97316', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ background: '#F97316', color: '#FFF', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700 }}>03</span>
              <span style={{ color: '#F97316', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Finding 03</span>
            </div>
          </div>
          <div style={{ color: '#F97316', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.3, marginBottom: '10px' }}>MANHATTAN LOCATION LOSING SATURDAY WALK-INS — EVERY WEEK</div>
          <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '4px', padding: '8px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ flex: 1, fontSize: '11px', color: '#92400E' }}>Lists Saturday as <strong>CLOSED</strong> on Yelp</div>
            <div style={{ background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: '4px', padding: '4px 8px', textAlign: 'center' }}>
              <div style={{ color: '#EF4444', fontSize: '9px', fontWeight: 700 }}>SAT</div>
              <div style={{ color: '#EF4444', fontSize: '11px', fontWeight: 700 }}>CLOSED</div>
            </div>
          </div>
          <ul style={{ padding: 0, margin: '0 0 12px', listStyle: 'none', fontSize: '11px', color: '#374151', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
            {["Saturday 'open near me' is one of NYC's highest-intent local searches — this location doesn't appear.", 'This is happening every Saturday, right now.', 'The fix takes under 10 minutes.'].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: '6px' }}><span style={{ color: '#F97316', flexShrink: 0 }}>•</span><span>{t}</span></li>
            ))}
          </ul>
          <div style={{ background: '#FFF7ED', borderLeft: '3px solid #F97316', borderRadius: '0 4px 4px 0', padding: '10px', marginTop: 'auto' }}>
            <div style={{ color: '#374151', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '3px' }}>What This Costs</div>
            <div style={{ color: '#F97316', fontSize: '20px', fontWeight: 900, fontFamily: 'monospace' }}>$80K–$120K</div>
            <div style={{ color: '#777', fontSize: '10px' }}>in annual revenue from lost Saturday walk-in traffic</div>
          </div>
        </div>
      </div>

      {/* IMPACT BAR */}
      <div className="snippet-impact-bar" style={{ background: '#111827', padding: '20px 28px' }}>
        <div>
          <div style={{ color: '#9CA3AF', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '4px' }}>Total Revenue Impact</div>
          <div style={{ color: '#E63946', fontSize: '40px', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1 }}>$680K–$970K</div>
          <div style={{ color: '#9CA3AF', fontSize: '11px', fontWeight: 600, marginTop: '4px', letterSpacing: '2px' }}>PER YEAR</div>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div>
            <div style={{ color: '#16A34A', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Not Caused By:</div>
            {['Clinical quality', 'Staff performance', 'Team dedication'].map(t => (
              <div key={t} style={{ color: '#D1FAE5', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}><span style={{ color: '#16A34A' }}>✓</span> {t}</div>
            ))}
          </div>
          <div>
            <div style={{ color: '#E63946', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Caused By:</div>
            {['Visibility gaps', 'System misalignment', 'Infrastructure failures'].map(t => (
              <div key={t} style={{ color: '#FECACA', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}><span style={{ color: '#E63946' }}>✗</span> {t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* FINDINGS COUNT + COVERAGE */}
      <div className="snippet-details-grid" style={{ padding: '20px 28px' }}>
        <div>
          <div style={{ color: '#111827', fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>THESE ARE 3 OF 20 FINDINGS.</div>
          <div style={{ color: '#9CA3AF', fontSize: '12px', fontStyle: 'italic', marginBottom: '12px' }}>The full Sovereign X Audit covers:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              ['🌐', 'Website & Technical — schema, speed, mobile, location architecture'],
              ['⭐', 'Brand Identity & Consistency — naming audit, cross-platform NAP alignment'],
              ['📱', 'Social Media Infrastructure — presence, content cadence, engagement signals'],
              ['🔍', 'Local SEO & AI Visibility — GBP audit, hours accuracy, competitor positioning'],
              ['⚙️', 'Systems, Automation & Revenue Leaks — review equity, intake, funnels'],
              ['🤖', 'AI Workforce Deployment — specific roles where AI reduces cost and increases output'],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#9CA3AF', lineHeight: 1.4 }}>
                <span style={{ flexShrink: 0 }}>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
          <div style={{ color: '#111827', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em' }}>THE NEXT STEP IS A 30-MINUTE CONVERSATION.</div>
          <div style={{ color: '#6B7280', fontSize: '12px', lineHeight: 1.6 }}>No commitment, no pressure — just the full picture of what the data shows and what the priority sequence looks like to fix it.</div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginTop: '4px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'left', minWidth: '140px' }}>
              <div style={{ color: '#6B7280', fontSize: '10px', fontWeight: 700 }}>THIS CONVERSATION COSTS:</div>
              <div style={{ color: '#16A34A', fontSize: '28px', fontWeight: 900, fontFamily: 'monospace' }}>$0</div>
            </div>
            <div style={{ textAlign: 'left', minWidth: '180px' }}>
              <div style={{ color: '#6B7280', fontSize: '10px', fontWeight: 700 }}>THE STATUS QUO COSTS:</div>
              <div style={{ color: '#E63946', fontSize: '18px', fontWeight: 900, fontFamily: 'monospace' }}>$680K–$970K/YR</div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#0A1628', padding: '14px 28px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ color: '#C8A96E', fontSize: '11px' }}>Ola · Strategic Co-Architect · Sovereign X Audits · BlackFur Capital Group LLC</div>
        <div style={{ color: '#555', fontSize: '10px', fontFamily: 'monospace', textAlign: 'right' }}>
          SAMPLE DOCUMENT — SOVEREIGN X AUDITS<br/>
          <span style={{ fontSize: '9px' }}>Proprietary. For Authorized Review Only.</span>
        </div>
      </div>

    </div>
  );
}
