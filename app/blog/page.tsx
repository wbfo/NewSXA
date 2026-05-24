import { getAllPosts } from '@/lib/blog'

export const metadata = {
  title: 'Sovereign X Intelligence — sxaudits.com',
  description: 'What is actually happening out there. Real findings. Real markets. Real stakes.',
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <main style={{ background: '#060606', minHeight: '100vh' }}>

      {/* HEADER */}
      <div style={{
        borderBottom: '1px solid rgba(200,169,110,0.15)',
        padding: '80px 40px 60px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <p style={{
          color: '#C8A96E',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          Sovereign X Audits · Intelligence
        </p>
        <h1 style={{
          color: '#D0C8B8',
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
          color: '#555',
          fontSize: '15px',
          lineHeight: 1.8,
          maxWidth: '560px',
        }}>
          What is actually happening out there.
          Real findings. Real markets. Real stakes.
        </p>
      </div>

      {/* POST LIST */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px 80px' }}>
        {posts.map((post: any) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: 'none', display: 'block' }}
          >
            <article style={{
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              padding: '40px 0',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '40px',
              alignItems: 'start',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <div>
                {/* Tag + Industry */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}>
                  <span style={{
                    color: '#C8A96E',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                  }}>
                    {post.tag}
                  </span>
                  <span style={{ color: '#333', fontSize: '10px' }}>·</span>
                  <span style={{
                    color: '#444',
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
                  color: '#D0C8B8',
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
                  color: '#555',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  maxWidth: '600px',
                }}>
                  {post.description}
                </p>
              </div>

              {/* Stakes badge */}
              <div style={{
                background: 'rgba(200,169,110,0.06)',
                border: '1px solid rgba(200,169,110,0.15)',
                borderRadius: '4px',
                padding: '12px 16px',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>
                <div style={{
                  color: '#555',
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}>
                  What&apos;s at stake
                </div>
                <div style={{
                  color: '#C8A96E',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  fontWeight: 600,
                }}>
                  {post.stakes}
                </div>
              </div>

            </article>
          </a>
        ))}
      </div>

      {/* BOTTOM CTA */}
      <div style={{
        textAlign: 'center',
        padding: '60px 40px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <p style={{
          color: '#555',
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
            background: '#C8A96E',
            color: '#060606',
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
