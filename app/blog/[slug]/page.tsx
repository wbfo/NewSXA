import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
// Cache bust
import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ShareButtons } from '@/components/share-buttons'
import { ImageZoom } from '@/components/image-zoom'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { frontmatter } = getPostBySlug(resolvedParams.slug)
  const canonicalUrl = `https://sxaudits.com/blog/${resolvedParams.slug}`
  
  return {
    title: { absolute: `${frontmatter.title} — Sovereign X Audits` },
    description: frontmatter.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: canonicalUrl,
      type: 'article',
      siteName: 'Sovereign X Audits',
      authors: ['Abimbola Olaitan'],
      publishedTime: frontmatter.date,
      images: frontmatter.ogImage ? [{ url: frontmatter.ogImage }] : [],
    }
  }
}

// MDX component overrides — match site aesthetic
const components = {
  h2: (props: any) => (
    <h2 style={{
      color: 'var(--text)',
      fontFamily: 'Georgia, serif',
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: 1.3,
      marginTop: '48px',
      marginBottom: '16px',
      letterSpacing: '-0.3px',
      borderBottom: '1px solid var(--gold-glow)',
      paddingBottom: '12px',
    }} {...props} />
  ),
  h3: (props: any) => (
    <h3 style={{
      color: 'var(--gold)',
      fontFamily: 'monospace',
      fontSize: '11px',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      marginTop: '32px',
      marginBottom: '12px',
    }} {...props} />
  ),
  p: (props: any) => (
    <p style={{
      color: 'var(--subtle)',
      fontSize: '16px',
      lineHeight: 1.85,
      marginBottom: '20px',
    }} {...props} />
  ),
  strong: (props: any) => (
    <strong style={{ color: 'var(--text)', fontWeight: 600 }} {...props} />
  ),
  ul: (props: any) => (
    <ul style={{
      color: 'var(--subtle)',
      fontSize: '15px',
      lineHeight: 1.8,
      paddingLeft: '20px',
      marginBottom: '20px',
    }} {...props} />
  ),
  li: (props: any) => (
    <li style={{ marginBottom: '8px' }} {...props} />
  ),
  img: (props: any) => (
    <ImageZoom style={{
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '8px',
      border: '1px solid var(--border)',
      margin: '48px 0',
      boxShadow: 'var(--shadow-card)',
    }} {...props} />
  ),

  // FINDING BOX — use in MDX as <Finding label="FINDING 01" title="..." cost="...">
  Finding: ({ label, title, cost, children }: any) => (
    <div style={{
      background: 'var(--surface)',
      borderLeft: '3px solid var(--gold)',
      padding: '24px 32px',
      margin: '32px 0 48px',
    }}>
      {label && (
        <div style={{
          color: 'var(--gold)',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          {label}
        </div>
      )}
      {title && (
        <h3 style={{
          color: 'var(--text)',
          fontFamily: 'Georgia, serif',
          fontSize: '20px',
          fontWeight: 400,
          marginTop: 0,
          marginBottom: '16px',
        }}>
          {title}
        </h3>
      )}
      <div style={{ color: 'var(--subtle)', fontSize: '15px', lineHeight: 1.8 }}>
        {children}
      </div>
      {cost && (
        <div style={{
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border)',
          color: 'var(--text)',
          fontFamily: 'monospace',
          fontSize: '16px',
          fontWeight: 600,
        }}>
          {cost}
        </div>
      )}
    </div>
  ),

  ActionChecklist: ({ thisWeek, thisMonth }: any) => {
    let weekItems = [];
    let monthItems = [];
    try { weekItems = typeof thisWeek === 'string' ? JSON.parse(thisWeek) : (thisWeek || []); } catch(e) { console.error('Error parsing thisWeek:', e); }
    try { monthItems = typeof thisMonth === 'string' ? JSON.parse(thisMonth) : (thisMonth || []); } catch(e) { console.error('Error parsing thisMonth:', e); }

    return (
      <div style={{
        background: 'var(--surface-2)',
        padding: '40px',
        margin: '48px 0',
        borderRadius: '4px',
      }}>
        <div style={{
          color: 'var(--subtle)',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '32px',
        }}>
          Action checklist — what to do now
        </div>
        
        {weekItems && weekItems.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ color: 'var(--gold)', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>This Week</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {weekItems.map((item: string, i: number) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '16px', height: '16px', border: '1px solid var(--border)', flexShrink: 0, marginTop: '4px', borderRadius: '2px' }} />
                  <div style={{ color: 'var(--text)', fontSize: '15px', lineHeight: 1.6 }}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {monthItems && monthItems.length > 0 && (
          <div>
            <div style={{ color: 'var(--gold)', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>This Month</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {monthItems.map((item: string, i: number) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '16px', height: '16px', border: '1px solid var(--border)', flexShrink: 0, marginTop: '4px', borderRadius: '2px' }} />
                  <div style={{ color: 'var(--text)', fontSize: '15px', lineHeight: 1.6 }}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },

  // CTA BOX — use in MDX as <AuditCTA>
  AuditCTA: ({ headline, sub }: any) => (
    <div className="mobile-padding-wrapper" style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      paddingTop: '40px',
      paddingBottom: '40px',
      marginBottom: '64px',
      marginTop: '48px',
    }}>
      <p style={{
        color: 'var(--text)',
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
        marginBottom: '12px',
        fontWeight: 400,
        lineHeight: 1.4,
      }}>
        {headline || 'Want to know exactly where your business stands with AI search?'}
      </p>
      <p style={{
        color: 'var(--subtle)',
        fontSize: '15px',
        marginBottom: '32px',
        lineHeight: 1.6,
      }}>
        {sub || 'We run the full diagnostic and deliver a findings report in 72 hours. No discovery call. No commitment.'}
      </p>
      <a
        href="/intake"
        style={{
          background: 'var(--gold)',
          color: 'var(--bg)',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          padding: '14px 32px',
          fontWeight: 700,
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        Book the Audit →
      </a>
    </div>
  ),
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { frontmatter, content } = getPostBySlug(resolvedParams.slug)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts.filter((p: any) => p.slug !== resolvedParams.slug).slice(0, 3)

  if (!frontmatter) {
    notFound()
  }

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": frontmatter.title,
            "description": frontmatter.description,
            "author": {
              "@type": "Person",
              "name": "Ola Olaitan",
              "url": "https://aicouncilconductor.com/about"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Sovereign X Audits",
              "url": "https://sxaudits.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://sxaudits.com/og-image.png"
              }
            },
            "datePublished": frontmatter.date,
            "dateModified": frontmatter.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://sxaudits.com/blog/${resolvedParams.slug}`
            }
          })
        }}
      />

      {/* POST HEADER */}
      <div className="mobile-padding-wrapper" style={{
        maxWidth: '720px',
        margin: '0 auto',
        paddingTop: '120px',
      }}>
        {/* Back Button */}
        <div style={{ marginBottom: '32px' }}>
          <Link href="/blog" style={{
            color: 'var(--subtle)',
            fontFamily: 'monospace',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            ← Back to Intelligence
          </Link>
        </div>

        {/* Category Tag & Theme Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}>
            <span style={{ color: 'var(--gold)', fontSize: '10px' }}>●</span>
            <span style={{
              color: 'var(--subtle)',
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}>
              {frontmatter.tag} · {frontmatter.industry}
            </span>
          </div>
          <ThemeToggle />
        </div>

        {/* Hero Image */}
        {frontmatter.heroImage && (
          <div style={{ marginBottom: '40px' }}>
            <img 
              src={frontmatter.heroImage} 
              alt={frontmatter.title} 
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-card)',
                aspectRatio: '16/9',
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        {/* Title */}
        <h1 style={{
          color: 'var(--text)',
          fontFamily: 'Georgia, serif',
          fontSize: '28px',
          fontWeight: 500,
          lineHeight: 1.3,
          marginBottom: '32px',
          letterSpacing: '-0.5px',
        }}>
          {frontmatter.title}
        </h1>

        {/* Stakes Bar */}
        <div style={{
          borderLeft: '3px solid var(--gold)',
          paddingLeft: '24px',
          marginBottom: '40px',
        }}>
          <div style={{
            color: 'var(--text)',
            fontFamily: 'monospace',
            fontSize: '18px',
            fontWeight: 600,
            marginBottom: '8px',
          }}>
            {frontmatter.stakes} estimated revenue at risk
          </div>
          <div style={{
            color: 'var(--subtle)',
            fontSize: '16px',
            lineHeight: 1.6,
          }}>
            {frontmatter.description}
          </div>
        </div>

        {/* Byline & Share */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          paddingBottom: '32px',
          borderBottom: '1px solid var(--border)',
          marginBottom: '32px',
        }}>
          {/* Author Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(200,169,110,0.1) url(/images/author.jpg) center/cover no-repeat',
              border: '1px solid var(--border)',
              flexShrink: 0,
            }}>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text)', fontSize: '15px', fontWeight: 600 }}>Abimbola Olaitan</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981', fontSize: '11px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                  AICC Verified
                </span>
              </div>
              <div style={{ color: 'var(--subtle)', fontSize: '13px' }}>
                Founder, AI Council Conductor LLC · 5 min read · May 2026
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <ShareButtons title={frontmatter.title} url={`https://sxaudits.com/blog/${resolvedParams.slug}`} />
        </div>

        {/* CTA #1 (Early Hook) */}
        <div className="mobile-padding-wrapper" style={{
          border: '1px solid var(--gold-glow)',
          borderRadius: '4px',
          background: 'var(--bg-glow)',
          paddingTop: '40px',
          paddingBottom: '40px',
          marginBottom: '64px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}>
          <div style={{
            color: 'var(--subtle)',
            fontSize: '15px',
            lineHeight: 1.6,
            maxWidth: '360px',
          }}>
            Not sure if this applies to your business? We run the diagnostic before you spend a dollar.
          </div>
          <a href="/intake" style={{
            background: 'var(--gold)',
            color: 'var(--bg)',
            fontFamily: 'monospace',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '12px 24px',
            fontWeight: 700,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            Start the Audit →
          </a>
        </div>
      </div>

      {/* POST BODY */}
      <div className="mobile-padding-wrapper" style={{
        maxWidth: '720px',
        margin: '0 auto',
        paddingTop: '48px',
        paddingBottom: '80px',
      }}>
        <MDXRemote source={content} components={components} />
      </div>

      {/* RELATED INTELLIGENCE */}
      <div className="mobile-padding-wrapper" style={{
        maxWidth: '720px',
        margin: '0 auto',
        paddingBottom: '60px',
      }}>
        <h3 style={{
          color: 'var(--subtle)',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '16px',
          marginBottom: '32px',
        }}>
          Related intelligence
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
        }}>
          {relatedPosts.map((item: any) => (
            <a key={item.slug} href={`/blog/${item.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', padding: '24px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px' }}>
              <div style={{
                color: 'var(--gold)',
                fontFamily: 'monospace',
                fontSize: '9px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>{item.tag} · {item.industry}</div>
              <div style={{
                color: 'var(--text)',
                fontSize: '15px',
                lineHeight: 1.5,
                fontWeight: 500,
                marginBottom: '20px',
                flexGrow: 1,
              }}>{item.title}</div>
              <div style={{
                color: 'var(--gold)',
                fontFamily: 'monospace',
                fontSize: '10px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>Read the finding →</div>
            </a>
          ))}
        </div>
      </div>

      {/* FINAL AUTHOR BIO */}
      <div className="mobile-padding-wrapper" style={{
        maxWidth: '720px',
        margin: '0 auto',
        paddingTop: '20px',
        paddingBottom: '60px',
      }}>
        <div style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          padding: '32px',
          display: 'flex',
          gap: '24px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(200,169,110,0.1) url(/images/author.jpg) center/cover no-repeat',
            border: '1px solid var(--border)',
            flexShrink: 0,
          }}>
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ color: 'var(--text)', fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>Abimbola Olaitan</div>
            <div style={{ color: 'var(--dim)', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', lineHeight: 1.5 }}>
              Founder, AI Council Conductor LLC · Framework Developer · AICC Verified
            </div>
            <p style={{ color: 'var(--subtle)', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
              Framework developer and systems thinker specializing in AI implementation and decision architecture. Creator of the AI Council methodology — a structured multi-model framework used to surface deeper insights in complex decisions. The audit intelligence at Sovereign X Audits is built on these same principles.
            </p>
            <a href="https://aicouncilconductor.com" style={{
              color: 'var(--gold)',
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
              aicouncilconductor.com →
            </a>
          </div>
        </div>
      </div>

      {/* FINAL CTA AREA */}
      <div className="mobile-padding-wrapper" style={{
        maxWidth: '720px',
        margin: '0 auto',
        paddingBottom: '80px',
      }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: '48px 40px',
          textAlign: 'center',
          borderRadius: '4px',
        }}>
          <div style={{ color: 'var(--subtle)', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>Sovereign X Audits</div>
          <h2 style={{ color: 'var(--text)', fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 400, marginBottom: '16px' }}>Find out exactly where your business stands.</h2>
          <p style={{ color: 'var(--subtle)', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
            We audit your digital infrastructure, AI visibility, and brand presence — and show you exactly what it's costing you.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', color: 'var(--text)', fontSize: '13px', marginBottom: '32px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--gold)' }}>🕐</span> Delivered in 72 hours
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--gold)' }}>✕</span> No discovery call
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--gold)' }}>📄</span> Free snippet first
            </span>
          </div>
          <a href="/intake" style={{
            background: 'var(--gold)',
            color: 'var(--bg)',
            fontFamily: 'monospace',
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            padding: '16px 40px',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-block',
            width: '100%',
            maxWidth: '300px',
          }}>
            Book the Audit →
          </a>
        </div>
      </div>

      {/* BACK TO INTELLIGENCE */}
      <div className="mobile-padding-wrapper" style={{
        maxWidth: '720px',
        margin: '0 auto',
        paddingBottom: '80px',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        paddingTop: '40px',
      }}>
        <Link
          href="/blog"
          style={{
            color: 'var(--subtle)',
            fontFamily: 'monospace',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          ← Back to Intelligence
        </Link>
      </div>

    </main>
  )
}
