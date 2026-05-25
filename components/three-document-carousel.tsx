"use client"

import { useRef, useState, useEffect } from "react"
import { SovereignSnippet } from "@/components/sovereign-snippet"
import { StandardAuditSample } from "@/components/standard-audit-sample"
import { DeepAuditSample } from "@/components/deep-audit-sample"

function ScrollSnapDoc({ children, label, title, description, badge, badgeColor, ctaText, ctaHref }: any) {
  return (
    <div style={{
      flex: "0 0 100%",
      scrollSnapAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px 0",
      boxSizing: "border-box"
    }}>
      <div className="text-center px-4" style={{ maxWidth: "640px", marginBottom: "120px" }}>
        <p className="font-mono text-xs tracking-[4px] uppercase mb-4" style={{ color: "#C8A96E" }}>{label}</p>
        <h3 className="text-xl md:text-2xl font-serif mb-3 text-white">{title}</h3>
        <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" }}>{description}</p>
        <span className="inline-block font-mono text-xs tracking-widest uppercase px-3 py-1"
          style={{ background: badgeColor + "22", color: badgeColor, border: `1px solid ${badgeColor}44`, borderRadius: "3px" }}>
          {badge}
        </span>
      </div>

      {children}

      <div className="text-center mt-10 px-4">
        <a href={ctaHref} className="font-mono text-sm tracking-widest uppercase border-b pb-1 transition-colors" style={{ color: "#C8A96E", borderColor: "#C8A96E44" }}>
          {ctaText} →
        </a>
      </div>
    </div>
  )
}

export function ThreeDocumentCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const index = Math.round(containerRef.current.scrollLeft / containerRef.current.clientWidth)
      setActiveIndex(index)
    }
    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev === 2 ? 0 : prev + 1
        if (containerRef.current) {
          containerRef.current.scrollTo({
            left: next * containerRef.current.clientWidth,
            behavior: "smooth"
          })
        }
        return next
      })
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return
    containerRef.current.scrollTo({
      left: index * containerRef.current.clientWidth,
      behavior: "smooth"
    })
  }

  return (
    <div style={{ paddingBottom: "40px" }}>

      <div className="text-center py-16 px-6">
        <p className="font-mono text-xs tracking-[4px] uppercase mb-4" style={{ color: "#C8A96E" }}>See The Work</p>
        <h2 className="text-3xl md:text-4xl font-serif mb-4" style={{ color: "#D0C8B8" }}>This Is What a Sovereign X Audit Delivers.</h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: "#555", lineHeight: 1.8 }}>
          Three levels. Each one shows more than the last. Swipe or scroll sideways to see exactly what lands in your hands.
        </p>
      </div>

      {/* Horizontal Scroll Snap Container */}
      <div 
        ref={containerRef}
        style={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", 
          msOverflowStyle: "none",
        }}
        className="hide-scrollbar"
      >
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}} />

        <ScrollSnapDoc 
          label="01 / The Snippet" 
          title="What You Receive Before You Pay a Dollar"
          description="Before any client commits, we send a free partial disclosure — 3 verified findings from a real audit of their business or image. No pitch. No pressure. Just the intelligence."
          badge="FREE · NO STRINGS" 
          badgeColor="#16A34A" 
          ctaText="View Full Sample Snippet" 
          ctaHref="/samples/snippet"
        >
          <SovereignSnippet />
        </ScrollSnapDoc>

        <ScrollSnapDoc 
          label="02 / Sovereign X Digital Audit — Standard" 
          title="The Complete Intelligence Report"
          description="A comprehensive 21-section analysis of your entire digital presence. We expose every hidden revenue leak, broken system, and visibility gap that is quietly draining your business."
          badge="$500 PROMO · 21 SECTIONS · 48–72 HRS" 
          badgeColor="#C8A96E" 
          ctaText="Start a Standard Audit" 
          ctaHref="/intake"
        >
          <StandardAuditSample />
        </ScrollSnapDoc>

        <ScrollSnapDoc 
          label="03 / Sovereign X Digital Audit — Deep" 
          title="Competitive Context & AI Workforce Readiness"
          description="Everything in the Standard Audit, plus a deep-dive into your competitors' digital infrastructure, a prioritized impact matrix, and a customized AI workforce deployment plan to automate your operations."
          badge="$1,500 PROMO · DEEP INTELLIGENCE · 48–72 HRS" 
          badgeColor="#7C3AED" 
          ctaText="Start a Deep Audit" 
          ctaHref="/intake"
        >
          <DeepAuditSample />
        </ScrollSnapDoc>

      </div>

      {/* Pagination Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "40px", marginBottom: "20px" }}>
        {[0, 1, 2].map(index => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: activeIndex === index ? "#C8A96E" : "rgba(200, 169, 110, 0.2)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
              transform: activeIndex === index ? "scale(1.2)" : "scale(1)"
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="text-center py-16 px-6 mt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="font-mono text-xs tracking-[4px] uppercase mb-6" style={{ color: "#555" }}>Ready to see what we find in your business?</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="/intake" className="font-mono text-sm tracking-widest uppercase px-10 py-4 font-bold hover:opacity-90 transition-opacity" style={{ background: "#C8A96E", color: "#060606" }}>Start the Audit →</a>
          <a href="/samples" className="font-mono text-sm tracking-widest uppercase px-10 py-4 hover:border-[#C8A96E] transition-colors" style={{ border: "1px solid #C8A96E33", color: "#C8A96E" }}>View All Sample Reports</a>
        </div>
      </div>

    </div>
  )
}
