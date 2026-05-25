// Cache bust
import { getAllPosts } from '@/lib/blog'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Link from 'next/link'

export const metadata = {
  title: 'Sovereign X Intelligence — sxaudits.com',
  description: 'What is actually happening out there. Real findings. Real markets. Real stakes.',
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <style>{`
        .blog-article-hover {
          transition: opacity 0.2s;
        }
        .blog-article-hover:hover {
          opacity: 0.75 !important;
        }
        .back-btn-hover {
          transition: color 0.2s;
        }
        .back-btn-hover:hover {
          color: var(--gold) !important;
        }
      `}</style>

      {/* HEADER */}
      <div className="mobile-padding-wrapper" style={{
        borderBottom: '1px solid var(--gold-glow)',
        paddingTop: '120px',
        paddingBottom: '60px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <div style={{ marginBottom: '24px' }}>
          <Link
            href="/"
            style={{
              color: 'var(--subtle)',
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
            className="back-btn-hover"
          >
            ← Back to Home
          </Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <p style={{
            color: 'var(--gold)',
            fontFamily: 'monospace',
            fontSize: '11px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}>
            Sovereign X · Intelligence
          </p>
          <ThemeToggle />
        </div>
        <h1 style={{
          color: 'var(--text)',
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 400,
          lineHeight: 1.2,
          marginBottom: '20px',
          letterSpacing: '-1px',
        }}>
          Sovereign X Intelligence
        </h1>
        <p style={{
          color: 'var(--subtle)',
          fontSize: '15px',
          lineHeight: 1.8,
          maxWidth: '560px',
        }}>
          What is actually happening out there.
          Real findings. Real markets. Real stakes.
        </p>
      </div>

      {/* POST LIST */}
      <div className="mobile-padding-wrapper" style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '80px' }}>
        {posts.map((post: any) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <article className="blog-article-hover blog-index-article" style={{
              borderBottom: '1px solid var(--border)',
              padding: '40px 0',
              cursor: 'pointer',
            }}>
              <div>
                {/* Tag + Industry */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}>
                  <span style={{
                    color: 'var(--gold)',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                  }}>
                    {post.tag}
                  </span>
                  <span style={{ color: 'var(--dim)', fontSize: '10px' }}>·</span>
                  <span style={{
                    color: 'var(--dim)',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                  }}>
                    {post.industry}
                  </span>
                </div>

                {/* Title */}
                <h2 style={{
                  color: 'var(--text)',
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  fontWeight: 400,
                  lineHeight: 1.35,
                  marginBottom: '12px',
                  letterSpacing: '-0.3px',
                }}>
                  {post.title}
                </h2>

                {/* Description */}
                <p style={{
                  color: 'var(--subtle)',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  maxWidth: '600px',
                }}>
                  {post.description}
                </p>
              </div>

              {/* Stakes badge */}
              <div style={{
                background: 'var(--bg-glow)',
                border: '1px solid var(--gold-glow)',
                borderRadius: '4px',
                padding: '12px 16px',
                textAlign: 'center',
                maxWidth: '260px',
                whiteSpace: 'normal',
                flexShrink: 0,
              }}>
                <div style={{
                  color: 'var(--subtle)',
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}>
                  What&apos;s at stake
                </div>
                <div style={{
                  color: 'var(--gold)',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}>
                  {post.stakes}
                </div>
              </div>

            </article>
          </a>
        ))}
      </div>

      {/* BOTTOM CTA */}
      <div className="mobile-padding-wrapper" style={{
        textAlign: 'center',
        paddingTop: '60px',
        paddingBottom: '60px',
        borderTop: '1px solid var(--border)',
      }}>
        <p style={{
          color: 'var(--subtle)',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '20px',
        }}>
          Want to know if your business has these problems?
        </p>
        <a
          href="/intake"
          style={{
            background: 'var(--gold)',
            color: 'var(--bg)',
            fontFamily: 'monospace',
            fontSize: '12px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            padding: '14px 32px',
            fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Start the Audit →
        </a>
      </div>

    </main>
  )
}
