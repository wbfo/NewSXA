"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SovereignSnippet } from "@/components/sovereign-snippet";

export function SnippetParallax() {
  const containerRef = useRef<HTMLElement>(null);
  const snippetRef = useRef<HTMLDivElement>(null);
  const [desktopScale, setDesktopScale] = useState(0.48);
  const [desktopHeight, setDesktopHeight] = useState(900);
  const [desktopMaxScroll, setDesktopMaxScroll] = useState(500);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileHeight, setMobileHeight] = useState(600);
  const [scales, setScales] = useState({ min: 0.3, max: 0.5 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobileMode = width <= 1180;
      setIsMobile(mobileMode);
      
      if (!containerRef.current) return;
      
      const containerW = containerRef.current.offsetWidth || 500;
      
      // Get the actual, unscaled height of the snippet card. Fallback to 1850px if not loaded yet.
      const rawHeight = snippetRef.current ? (snippetRef.current.scrollHeight || snippetRef.current.offsetHeight) : 1850;
      
      if (mobileMode) {
        // Mobile: Scale to 96% of screen width, allow height to flow naturally
        const snippetW = 900;
        const scaleW = (width * 0.96) / snippetW;
        setScales({ min: scaleW * 0.65, max: scaleW });
        setMobileHeight(rawHeight * scaleW);
      } else {
        // Desktop: scale based on container width to fill the column perfectly, up to max 0.52 scale
        const computedScale = Math.min(0.52, (containerW * 0.95) / 900);
        setDesktopScale(computedScale);
        
        // The desktop container height is dynamic scaledHeight
        const scaledHeight = rawHeight * computedScale;
        setDesktopHeight(scaledHeight);
        
        const maxScroll = Math.max(0, scaledHeight - 550);
        setDesktopMaxScroll(maxScroll);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Multiple timeouts to handle dynamic layout shifts and late font loading
    const t1 = setTimeout(handleResize, 100);
    const t2 = setTimeout(handleResize, 500);
    const t3 = setTimeout(handleResize, 1000);
    const t4 = setTimeout(handleResize, 2000);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Force recalculation immediately after switching DOM views
  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [isMobile]);

  // Read page scroll state
  const { scrollY } = useScroll();

  // Desktop vertical panning scroll mapping:
  // As the page scrolls down by 500px, the snippet scrolls inside its view up to desktopMaxScroll.
  const translateYRaw = useTransform(scrollY, (latestScrollY) => {
    const progress = Math.min(1, Math.max(0, latestScrollY / 500));
    return -progress * desktopMaxScroll;
  });

  // Desktop rotate mapping: Starts with a premium -1.5 degree tilt, straightens out as you scroll down by 200px.
  const rotateRaw = useTransform(scrollY, (latestScrollY) => {
    const progress = Math.min(1, Math.max(0, latestScrollY / 200));
    return -1.5 + progress * 1.5;
  });

  // Spring smoothing for absolute premium fluidity
  const translateY = useSpring(translateYRaw, { stiffness: 85, damping: 22 });
  const rotate = useSpring(rotateRaw, { stiffness: 85, damping: 22 });

  if (isMobile) {
    return (
      <section
        ref={containerRef}
        className="w-full flex flex-col items-center justify-center pt-6 pb-6 overflow-hidden relative"
      >
        {/* Static Scaled Snippet for Mobile */}
        <div style={{ width: "100%", height: `${mobileHeight}px`, display: "flex", justifyContent: "center", position: "relative" }}>
          {/* Physical constraint wrapper so the parent knows exactly how wide the scaled snippet is */}
          <div style={{ width: `${900 * scales.max}px`, position: "relative" }}>
            <div 
              className="absolute top-0 left-0"
              style={{ 
                width: "900px",
                transform: `scale(${scales.max})`, 
                transformOrigin: "top left" 
              }}
            >
              <div ref={snippetRef} className="w-[900px]">
                <SovereignSnippet />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom label cleanly positioned below the snippet in document flow */}
        <div className="mt-1 w-full px-4 text-center z-10 flex justify-center">
          <a
            href="/samples#snippet"
            className="font-mono text-[10px] tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-md inline-block max-w-full truncate hover:bg-neon-blue hover:text-slate-950"
            style={{
              color: "#C8A96E",
              backgroundColor: "rgba(20,20,20,0.85)",
              border: "1px solid rgba(200, 169, 110, 0.4)",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
            }}
          >
            View Full Sample Report →
          </a>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center pt-6 pb-6 overflow-hidden relative"
    >
      {/* Static Scaled Snippet for Desktop */}
      <div 
        style={{ 
          width: "100%", 
          height: `${desktopHeight}px`, 
          display: "flex", 
          justifyContent: "center", 
          position: "relative" 
        }}
      >
        {/* Physical constraint wrapper so the parent knows exactly how wide the scaled snippet is */}
        <div style={{ width: `${900 * desktopScale}px`, position: "relative" }}>
          <div 
            className="absolute top-0 left-0"
            style={{ 
              width: "900px",
              transform: `scale(${desktopScale})`, 
              transformOrigin: "top left" 
            }}
          >
            <div ref={snippetRef} className="w-[900px]">
              <SovereignSnippet />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom label cleanly positioned below the snippet in natural document flow */}
      <div className="mt-6 w-full px-4 text-center z-10 flex justify-center">
        <a
          href="/samples#snippet"
          className="font-mono text-[10px] tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-md inline-block max-w-full hover:bg-neon-blue hover:text-slate-950"
          style={{
            color: "#C8A96E",
            backgroundColor: "rgba(20,20,20,0.85)",
            border: "1px solid rgba(200, 169, 110, 0.4)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
          }}
        >
          View Full Sample Report →
        </a>
      </div>
    </section>
  );
}
