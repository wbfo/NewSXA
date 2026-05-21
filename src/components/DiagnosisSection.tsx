"use client";

import { motion, Variants } from "framer-motion";
import BackgroundDecoration from "./BackgroundDecoration";

export default function DiagnosisSection() {
    const symptoms = [
        "Low visibility",
        "Poor conversions",
        "Fragmented systems",
        "Missed calls",
        "Inconsistent branding",
    ];
    const causes = [
        "Structural misalignment",
        "Incomplete data architecture",
        "Asset fragmentation",
        "Platform dependency",
        "Infrastructure instability",
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <section id="diagnosis" className="bg-black py-[120px] text-white overflow-hidden relative">
            <BackgroundDecoration type="grid" className="opacity-10" />
            <BackgroundDecoration type="noise" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-[1140px] mx-auto px-10 relative z-10"
            >
                <div className="text-center mb-20 flex flex-col items-center">
                    <p className="font-montserrat text-[10px] font-semibold tracking-[0.4em] uppercase text-white/40 mb-5">
                        The Diagnosis Gap
                    </p>
                    <h2 className="font-montserrat font-extrabold text-white tracking-[-0.01em] text-[clamp(32px,5vw,52px)] leading-tight max-w-3xl">
                        Most Businesses Treat Symptoms.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-x-[80px] mb-[80px]">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <div className="flex items-center gap-3 mb-10">
                            <span className="text-white/10 font-mono text-xl select-none">[</span>
                            <p className="font-montserrat text-[10px] font-bold tracking-[0.35em] uppercase text-white/30">
                                Symptoms (Legacy Load)
                            </p>
                            <span className="text-white/10 font-mono text-xl select-none">]</span>
                            <div className="w-1 h-1 rounded-full bg-red-600/40" />
                        </div>
                        <ul className="flex flex-col gap-0 w-full">
                            {symptoms.map((s) => (
                                <motion.li
                                    key={s}
                                    variants={itemVariants}
                                    whileHover={{ x: 5, color: "#FFF" }}
                                    className="flex items-center justify-center md:justify-start gap-5 text-[15px] text-white/50 border-b border-white/[0.05] py-5 last:border-0 transition-colors duration-300 group"
                                >
                                    <span className="w-1.5 h-[1px] bg-white/20 group-hover:bg-white/60 transition-colors shrink-0" />
                                    <span className="font-medium">{s}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="hidden md:block bg-gradient-to-b from-transparent via-white/10 to-transparent w-px origin-top h-full"
                    />

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:items-start"
                    >
                        <div className="flex items-center gap-3 mb-10 mt-16 md:mt-0">
                            <span className="text-blue-mid/30 font-mono text-xl select-none">[</span>
                            <p className="font-montserrat text-[10px] font-bold tracking-[0.35em] uppercase text-white">
                                Root Causes (Structural Truth)
                            </p>
                            <span className="text-blue-mid/30 font-mono text-xl select-none">]</span>
                            <div className="w-1 h-1 rounded-full bg-blue-mid animate-pulse" />
                        </div>
                        <ul className="flex flex-col gap-0 w-full">
                            {causes.map((c) => (
                                <motion.li
                                    key={c}
                                    variants={itemVariants}
                                    whileHover={{ x: 5, color: "#FFF" }}
                                    className="flex items-center justify-center md:justify-start gap-5 text-[15px] text-white/90 border-b border-white/[0.05] py-5 last:border-0 transition-colors duration-300 group"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 group-hover:bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all shrink-0" />
                                    <span className="font-semibold">{c}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1 }}
                    className="border-t border-white/10 pt-12 text-center"
                >
                    <p className="font-montserrat text-[16px] md:text-[18px] font-medium text-white/80 max-w-2xl mx-auto leading-relaxed">
                        We examine root cause before prescribing execution.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
