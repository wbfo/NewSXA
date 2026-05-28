// Cache bust
import { getAllPosts } from '@/lib/blog'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import Link from 'next/link'
import { BlogIndexClient } from '@/components/blog-index-client'

export const metadata = {
  title: 'Intelligence — Sovereign X Audits',
  description: 'Real findings from real audits. What is actually happening in local SEO, AI search, and digital infrastructure — and what it costs businesses to ignore it.',
  alternates: {
    canonical: 'https://sxaudits.com/blog',
  },
  openGraph: {
    title: 'Sovereign X Intelligence',
    description: 'Real findings. Real markets. Real stakes.',
    url: 'https://sxaudits.com/blog',
    siteName: 'Sovereign X Audits',
    images: [{ url: 'https://sxaudits.com/og-image.png', width: 1200, height: 630, alt: 'Sovereign X Audits' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sovereign X Intelligence',
    description: 'Real findings. Real markets. Real stakes.',
    images: ['https://sxaudits.com/og-image.png'],
  },
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
      <BlogIndexClient posts={posts} />

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
