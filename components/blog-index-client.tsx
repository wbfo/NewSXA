'use client'

import { useState } from 'react'
import { getIntelligenceNode, intelligenceNodes, type BlogPostSummary } from '@/lib/blog-taxonomy'

interface BlogIndexClientProps {
  posts: BlogPostSummary[]
}

export function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('ALL')

  // Filter posts based on search query and selected tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedTag === 'ALL') {
      return matchesSearch
    }
    
    return matchesSearch && getIntelligenceNode(post) === selectedTag
  })

  // Helper to count posts in each tag category
  const getTagCount = (tag: string) => {
    if (tag === 'ALL') return posts.length
    return posts.filter(post => getIntelligenceNode(post) === tag).length
  }

  return (
    <div>
      <style>{`
        .search-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 48px;
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 32px;
          border-radius: 4px;
        }
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .search-input {
          width: 100%;
          background: var(--bg);
          border: 1px solid var(--border);
          color: var(--text);
          font-family: monospace;
          font-size: 14px;
          padding: 16px 20px;
          padding-left: 56px;
          border-radius: 2px;
          outline: none;
          transition: all 0.25s ease;
        }
        .search-input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 12px var(--gold-glow);
        }
        .search-icon {
          position: absolute;
          left: 20px;
          color: var(--gold);
          font-family: monospace;
          font-size: 14px;
          letter-spacing: 1px;
          pointer-events: none;
        }
        .filter-tags-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }
        .filter-tag-btn {
          background: var(--bg);
          border: 1px solid var(--border);
          color: var(--subtle);
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 10px 18px;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .filter-tag-btn:hover {
          border-color: var(--gold);
          color: var(--text);
        }
        .filter-tag-btn.active {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--bg);
          font-weight: 700;
        }
        .tag-count {
          font-size: 9px;
          opacity: 0.65;
          font-family: monospace;
        }
        .filter-tag-btn.active .tag-count {
          opacity: 0.9;
        }
        .results-meta {
          color: var(--dim);
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 1px;
          margin-top: 4px;
        }
        .empty-results-panel {
          text-align: center;
          background: var(--surface);
          border: 1px dashed var(--border);
          padding: 60px 40px;
          border-radius: 4px;
          margin: 40px 0;
        }
        .clear-search-btn {
          background: none;
          border: 1px solid var(--gold);
          color: var(--gold);
          font-family: monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 12px 24px;
          margin-top: 24px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 2px;
        }
        .clear-search-btn:hover {
          background: var(--gold);
          color: var(--bg);
        }
      `}</style>

      {/* INTERACTIVE CONTROLS CONTAINER */}
      <div className="mobile-padding-wrapper" style={{ maxWidth: '1100px', margin: '0 auto', marginBottom: '24px' }}>
        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Search reports by title, description, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            <div style={{ color: '--subtle', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
              Filter by Intelligence Node:
            </div>
            <div className="filter-tags-grid">
              {intelligenceNodes.map((tag) => {
                const count = getTagCount(tag)
                if (count === 0 && tag !== 'ALL') return null // hide empty nodes
                return (
                  <button
                    key={tag}
                    className={`filter-tag-btn ${selectedTag === tag ? 'active' : ''}`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                    <span className="tag-count">({count})</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="results-meta">
            Showing {filteredPosts.length} of {posts.length} audited intelligence logs
          </div>
        </div>
      </div>

      {/* POST LIST */}
      <div className="mobile-padding-wrapper" style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '80px' }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post: any) => (
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
          ))
        ) : (
          <div className="empty-results-panel">
            <div style={{ color: 'var(--gold)', fontFamily: 'monospace', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>
              [0 matching intelligence nodes found]
            </div>
            <p style={{ color: 'var(--subtle)', fontSize: '14px', maxWidth: '460px', margin: '0 auto', lineHeight: 1.6 }}>
              No audited report headers match your search parameters. Try adjusting your query or resetting your intelligence node filter.
            </p>
            <button
              className="clear-search-btn"
              onClick={() => {
                setSearchQuery('')
                setSelectedTag('ALL')
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
