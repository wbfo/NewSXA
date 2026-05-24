import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { frontmatter } = getPostBySlug(resolvedParams.slug)
  return {
    title: `${frontmatter.title} — Sovereign X Audits`,
    description: frontmatter.description,
  }
}

// MDX component overrides — match site aesthetic
const components = {
  h2: (props: any) => (
    <h2 style={{
      color: '#D0C8B8',
      fontFamily: 'Georgia, serif',
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: 1.3,
      marginTop: '48px',
      marginBottom: '16px',
      letterSpacing: '-0.3px',
      borderBottom: '1px solid rgba(200,169,110,0.15)',
      paddingBottom: '12px',
    }} {...props} />
  ),
  h3: (props: any) => (
    <h3 style={{
      color: '#C8A96E',
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
      color: '#777',
      fontSize: '16px',
      lineHeight: 1.85,
      marginBottom: '20px',
    }} {...props} />
  ),
  strong: (props: any) => (
    <strong style={{ color: '#D0C8B8', fontWeight: 600 }} {...props} />
  ),
  ul: (props: any) => (
    <ul style={{
      color: '#777',
      fontSize: '15px',
      lineHeight: 1.8,
      paddingLeft: '20px',
      marginBottom: '20px',
    }} {...props} />
  ),
  li: (props: any) => (
    <li style={{ marginBottom: '8px' }} {...props} />
  ),

  // FINDING BOX — use in MDX as <Finding>
  Finding: ({ title, cost, children }: any) => (
    <div style={{
      background: '#0D0D0D',
      borderLeft: '3px solid #C8A96E',
      borderRadius: '0 4px 4px 0',
      padding: '24px 28px',
      margin: '32px 0',
    }}>
      {title && (
        <div style={{
          color: '#C8A96E',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          {title}
        </div>
      )}
      <div style={{ color: '#777', fontSize: '15px', lineHeight: 1.8 }}>
        {children}
      </div>
      {cost && (
        <div style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(200,169,110,0.15)',
          color: '#C8A96E',
          fontFamily: 'monospace',
          fontSize: '18px',
          fontWeight: 600,
        }}>
          {cost}
        </div>
      )}
    </div>
  ),

  // CTA BOX — use in MDX as <AuditCTA>
  AuditCTA: ({ headline, sub }: any) => (
    <div style={{
      background: '#0A0A0A',
      border: '1px solid rgba(200,169,110,0.2)',
      borderRadius: '6px',
      padding: '32px',
      margin: '48px 0',
      textAlign: 'center',
    }}>
      <p style={{
        color: '#D0C8B8',
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
        marginBottom: '8px',
        fontWeight: 400,
      }}>
        {headline || 'Want to know if your business has this problem?'}
      </p>
      <p style={{
        color: '#555',
        fontSize: '13px',
        marginBottom: '24px',
      }}>
        {sub || 'We send a free snippet before you commit to anything.'}
      </p>
      <a
        href="/intake"
        style={{
          background: '#C8A96E',
          color: '#060606',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          padding: '12px 28px',
          fontWeight: 700,
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        Start the Audit →
      </a>
    </div>
  ),
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { frontmatter, content } = getPostBySlug(resolvedParams.slug)

  if (!frontmatter) {
    notFound()
  }

  return (
    <main style={{ background: '#060606', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": frontmatter.title,
            "description": frontmatter.description,
            "datePublished": frontmatter.date,
            "author": {
              "@type": "Person",
              "name": "Ola Olaitan",
              "url": "https://sxaudits.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Sovereign X Audits",
              "url": "https://sxaudits.com"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://sxaudits.com/blog/${resolvedParams.slug}`
            }
          })
        }}
      />

      {/* POST HEADER */}
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '80px 40px 48px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        {/* Tag + Industry */}
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <span style={{
            color: '#C8A96E',
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}>
            {frontmatter.tag}
          </span>
          <span style={{ color: '#333' }}>·</span>
          <span style={{
            color: '#444',
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            {frontmatter.industry}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          color: '#D0C8B8',
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 400,
          lineHeight: 1.25,
          marginBottom: '20px',
          letterSpacing: '-0.5px',
        }}>
          {frontmatter.title}
        </h1>

        {/* Description */}
        <p style={{
          color: '#666',
          fontSize: '16px',
          lineHeight: 1.7,
          marginBottom: '28px',
        }}>
          {frontmatter.description}
        </p>

        {/* Stakes + Date strip */}
        <div style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          paddingTop: '20px',
          borderTop: '1px solid rgba(200,169,110,0.1)',
        }}>
          <div>
            <div style={{
              color: '#333',
              fontFamily: 'monospace',
              fontSize: '9px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}>
              What&apos;s at stake
            </div>
            <div style={{
              color: '#C8A96E',
              fontFamily: 'monospace',
              fontSize: '16px',
              fontWeight: 600,
            }}>
              {frontmatter.stakes}
            </div>
          </div>
          <div style={{ color: '#222', fontSize: '20px' }}>·</div>
          <div style={{
            color: '#333',
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '2px',
          }}>
            Sovereign X Audits · AICC Verified
          </div>
        </div>
      </div>

      {/* POST BODY */}
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '48px 40px 80px',
      }}>
        <MDXRemote source={content} components={components} />
      </div>

      {/* BACK TO INTELLIGENCE */}
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '0 40px 80px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        paddingTop: '40px',
      }}>
        <a
          href="/blog"
          style={{
            color: '#444',
            fontFamily: 'monospace',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          ← Back to Intelligence
        </a>
      </div>

    </main>
  )
}
