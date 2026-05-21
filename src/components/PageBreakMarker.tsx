"use client";

import { motion } from "framer-motion";
import BackgroundDecoration from "./BackgroundDecoration";

export default function PageBreakMarker({
    name,
    section,
}: {
    name: string;
    section: string;
}) {
    return (
        <div className="w-full bg-[#050505] py-20 relative overflow-hidden flex items-center justify-center">
            {/* Background elements */}
            <BackgroundDecoration type="scanlines" className="opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-20"
            >
                {/* Gold Outline Wrapper with subtle glow */}
                <div className="relative p-[1px] rounded-lg group/marker">
                    {/* The Gold Border using a gradient background for the 1px padding area */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#B38728] opacity-30 group-hover/marker:opacity-60 transition-opacity duration-700 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.1)]" />
                    <div className="absolute inset-0 border border-[#D4AF37]/20 rounded-lg blur-[1px]" />

                    {/* Content Container */}
                    <div className="relative bg-[#050505]/90 backdrop-blur-md px-12 md:px-20 py-8 md:py-12 rounded-lg flex flex-col items-center gap-6 border border-white/[0.05]">
                        {/* Section Number with gold accent */}
                        <div className="flex items-center gap-4">
                            <div className="h-px w-8 bg-[#D4AF37]/30" />
                            <span className="font-montserrat text-[11px] font-black tracking-[0.4em] text-[#D4AF37] bg-white/5 px-4 py-1.5 border border-[#D4AF37]/30 rounded-sm">
                                {section.toUpperCase()}
                            </span>
                            <div className="h-px w-8 bg-[#D4AF37]/30" />
                        </div>

                        {/* Main Name with Brackets */}
                        <div className="flex items-center gap-4 md:gap-8">
                            <span className="text-[#D4AF37]/20 font-montserrat text-4xl md:text-6xl font-thin select-none hidden sm:block">[</span>
                            <h2 className="font-montserrat text-[24px] md:text-[32px] font-black tracking-[0.3em] uppercase text-white text-center">
                                {name}
                            </h2>
                            <span className="text-[#D4AF37]/20 font-montserrat text-4xl md:text-6xl font-thin select-none hidden sm:block">]</span>
                        </div>

                        {/* System Status Indicator with gold pulse */}
                        <div className="flex items-center gap-3 mt-4 opacity-70">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]" />
                            <span className="font-montserrat text-[9px] font-bold tracking-[0.25em] uppercase text-white/70">
                                System Ready: Accessing Data
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom decorative line in gold */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[240px] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-50" />
            </motion.div>
        </div>
    );
}
