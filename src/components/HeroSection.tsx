"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import SealSVG from "./SealSVG";
import BackgroundDecoration from "./BackgroundDecoration";

export default function HeroSection() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: "easeOut",
            },
        },
    };

    return (
        <section
            id="home"
            className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-center px-6"
        >
            <BackgroundDecoration type="glow" variant="navy" className="opacity-40" />
            <BackgroundDecoration type="grid" className="opacity-10" />
            <BackgroundDecoration type="noise" />
            {/* Watermark seal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            >
                <SealSVG size={580} color="white" showText={true} className="animate-pulse-soft" />
            </motion.div>

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-[800px]"
            >
                <motion.p
                    variants={itemVariants}
                    className="font-montserrat text-[11px] font-bold tracking-[0.5em] uppercase text-blue-mid mb-8"
                >
                    Digital Infrastructure Examination Authority
                </motion.p>
                <motion.h1
                    variants={itemVariants}
                    className="font-montserrat font-black text-white leading-[1.02] tracking-[-0.03em] mb-8 text-[clamp(48px,8vw,84px)]"
                >
                    Examine Before <br /> You Build.
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    className="font-inter font-light text-[18px] md:text-[20px] text-white/50 leading-[1.6] mb-12 max-w-[600px] mx-auto italic"
                >
                    Sovereign X conducts structured digital infrastructure examinations
                    for founders and capital operators.
                </motion.p>
                <motion.div
                    variants={itemVariants}
                    className="flex gap-6 justify-center flex-wrap"
                >
                    <Link
                        href="#request"
                        className="font-montserrat text-[11px] font-black tracking-[0.2em] uppercase text-white bg-navy px-10 py-5 hover:bg-[#004080] transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,102,255,0.2)] no-underline"
                    >
                        Request Examination
                    </Link>
                    <Link
                        href="#protocol"
                        className="font-montserrat text-[11px] font-black tracking-[0.2em] uppercase text-white/60 bg-transparent border border-white/10 px-10 py-5 hover:border-white/30 hover:text-white transition-all hover:scale-105 active:scale-95 no-underline"
                    >
                        View Protocol
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
                <motion.div
                    animate={{
                        height: [40, 20, 40],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-[1px] bg-white"
                />
                <span className="font-montserrat text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">
                    Scroll
                </span>
            </motion.div>
        </section>
    );
}
