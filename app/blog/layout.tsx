import { SiteNav } from '@/components/sections/site-nav'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="sx-intake">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Sovereign X Intelligence",
            "description": "Real findings. Real markets. Real stakes.",
            "url": "https://sxaudits.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Sovereign X Audits",
              "url": "https://sxaudits.com"
            }
          })
        }}
      />
      <SiteNav />
      {children}
    </div>
  )
}
