"use client";

import React, { useState, useEffect } from "react";

export function ImageZoom(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZoomed(false);
    };
    if (isZoomed) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isZoomed]);

  return (
    <>
      {/* Base Image */}
      <img 
        {...props} 
        onClick={() => setIsZoomed(true)} 
        style={{ ...props.style, cursor: "zoom-in" }} 
        aria-label="Click to zoom in"
      />

      {/* Lightbox Overlay */}
      {isZoomed && (
        <div 
          onClick={() => setIsZoomed(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
            padding: "24px",
            animation: "fadeIn 0.2s ease-out forwards",
          }}
          aria-modal="true"
          role="dialog"
        >
          <img 
            src={props.src}
            alt={props.alt}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
              animation: "scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          />
          <button 
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
            aria-label="Close zoomed image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleUp {
              from { opacity: 0; transform: scale(0.96); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
