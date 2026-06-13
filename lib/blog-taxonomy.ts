export interface BlogPostSummary {
  slug: string
  title: string
  description: string
  date: string
  industry: string
  stakes: string
  tag: string
}

export const intelligenceNodes = [
  'ALL',
  'AI SEARCH',
  'LOCAL & GOOGLE',
  'AUDITS & STRATEGY',
  'HOW TO & TECHNICAL',
  'COMPARISONS',
  'INDUSTRIES & VOICE',
  'BRAND & OWNERSHIP',
  'REVENUE & STAKES',
] as const

export type IntelligenceNode = (typeof intelligenceNodes)[number]

const includesAny = (value: string, terms: string[]) => terms.some(term => value.includes(term))

export function getIntelligenceNode(post: BlogPostSummary): IntelligenceNode {
  const tag = post.tag.toUpperCase()
  const topic = `${post.slug} ${post.title} ${post.description} ${post.industry}`.toUpperCase()

  if (tag.includes('COMPARISON')) return 'COMPARISONS'

  if (includesAny(tag, ['INDUSTRY VERTICALS', 'VOICE AGENTS', 'TECHNOLOGY'])) {
    return 'INDUSTRIES & VOICE'
  }

  if (
    includesAny(tag, ['LOCAL VISIBILITY', 'GOOGLE VISIBILITY', 'SEO FUNDAMENTALS']) ||
    includesAny(topic, ['GOOGLE BUSINESS PROFILE', 'GOOGLE MAPS', 'LOCAL 3-PACK', 'NAP CONSISTENCY', 'GOOGLE PENALTY'])
  ) {
    return 'LOCAL & GOOGLE'
  }

  if (
    includesAny(tag, ['AI VISIBILITY', 'AI SEARCH EXPLAINED', 'MYTH-BUSTING']) ||
    includesAny(topic, ['CHATGPT', 'AI SEARCH', 'AI CITATION', 'GEO ', ' AEO', 'LLMO'])
  ) {
    return 'AI SEARCH'
  }

  if (includesAny(tag, ['HOW TO FIX IT', 'TECHNICAL FOUNDATIONS'])) {
    return 'HOW TO & TECHNICAL'
  }

  if (
    includesAny(tag, ['DIFFERENTIATORS', 'OUR APPROACH', 'AUDIT TYPES', 'THE AUDIT', 'WHAT WE DO', 'SERVICE MODEL']) ||
    includesAny(topic, ['AUDIT VS', 'AUDIT CHECK', 'AUDIT DELIVER', 'READINESS AUDIT'])
  ) {
    return 'AUDITS & STRATEGY'
  }

  if (
    includesAny(topic, ['DIGITAL SOVEREIGNTY', 'PERSONAL BRAND', 'OWN YOUR STORY', 'WEBSITE IS YOUR', 'SOCIAL MEDIA']) ||
    tag.includes('DIGITAL VISIBILITY')
  ) {
    return 'BRAND & OWNERSHIP'
  }

  if (includesAny(tag, ['THE STAKES', 'METRICS', 'ADVERTISING & VISIBILITY', 'AWARENESS'])) {
    return 'REVENUE & STAKES'
  }

  if (includesAny(tag, ['DEFINITIONS & EDUCATION', 'ALL INDUSTRIES'])) {
    return 'HOW TO & TECHNICAL'
  }

  return 'AUDITS & STRATEGY'
}

const stopWords = new Set([
  'about', 'actually', 'after', 'against', 'audit', 'audits', 'before', 'business', 'does',
  'each', 'every', 'from', 'have', 'here', 'into', 'most', 'need', 'online', 'other',
  'should', 'small', 'that', 'their', 'them', 'there', 'these', 'this', 'what', 'when',
  'where', 'which', 'with', 'without', 'your',
])

function topicTokens(post: BlogPostSummary) {
  return new Set(
    `${post.slug} ${post.title} ${post.description} ${post.tag} ${post.industry}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 3 && !stopWords.has(token)),
  )
}

export function getRelatedPosts(posts: BlogPostSummary[], current: BlogPostSummary, limit = 6) {
  const currentTokens = topicTokens(current)
  const currentNode = getIntelligenceNode(current)

  return posts
    .filter(post => post.slug !== current.slug)
    .map(post => {
      const tokens = topicTokens(post)
      const overlap = [...currentTokens].filter(token => tokens.has(token)).length
      let score = Math.min(overlap, 8)

      if (getIntelligenceNode(post) === currentNode) score += 8
      if (post.tag === current.tag) score += 7
      if (post.industry === current.industry && post.industry !== 'All Industries') score += 6
      if (post.slug.split('-').some(part => part.length > 3 && current.slug.includes(part))) score += 2

      return { post, score }
    })
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .slice(0, limit)
    .map(({ post }) => post)
}
