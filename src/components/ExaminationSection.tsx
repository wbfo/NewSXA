"use client";

import { motion, Variants } from "framer-motion";

export default function ExaminationSection() {
    const scope = [
        "Digital presence across platforms",
        "Search visibility and consistency",
        "AI discoverability in language models",
        "Data consistency across directories",
        "Asset ownership verification",
        "Automation readiness assessment",
        "Platform dependency mapping",
    ];

    const categories = [
        "Identity & Brand Consistency",
        "Search & Discoverability",
        "Website Infrastructure",
        "Social Infrastructure",
        "AI & Automation Readiness",
        "Data & Platform Ownership",
        "Audience & Lead Capture",
    ];

    const risks = [
        {
            range: "20 – 40",
            badge: "Critical",
            badgeClass: "bg-red-900/10 text-red-600",
            desc: "Immediate structural failure risk",
        },
        {
            range: "41 – 60",
            badge: "Elevated",
            badgeClass: "bg-yellow-900/10 text-yellow-600",
            desc: "Gaps creating measurable revenue loss",
        },
        {
            range: "61 – 80",
            badge: "Stable",
            badgeClass: "bg-blue-mid/10 text-blue-mid",
            desc: "Functional but optimization required",
        },
        {
            range: "81 – 100",
            badge: "Sovereign",
            badgeClass: "bg-green-900/10 text-green-600",
            desc: "Infrastructure operating at standard",
        },
    ];

    const deliverables = [
        "Sovereign Diagnostic Report",
        "Sovereignty Score infographic",
        "Executive slide deck",
        "Execution Blueprint",
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const listVariants: Variants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4 },
        },
    };

    return (
        <section id="examination" className="bg-white py-[120px] text-black overflow-hidden">
            <div className="max-w-[1140px] mx-auto px-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-[60px] pb-10 border-b border-[#E0E0E0] text-center flex flex-col items-center"
                >
                    <p className="font-montserrat text-[10px] font-semibold tracking-[0.4em] uppercase text-blue-mid mb-4">
                        Sovereign X
                    </p>
                    <h2 className="font-montserrat font-extrabold text-black tracking-[-0.02em] mb-4 text-[clamp(30px,4.5vw,52px)] leading-tight max-w-3xl">
                        The Examination
                    </h2>
                    <p className="font-inter text-[16px] text-[#8A8A8A] max-w-[600px] mx-auto">
                        A structured diagnostic of your digital infrastructure. Rigorous.
                        Documented. Actionable.
                    </p>
                </motion.div>

                {/* 2x2 cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                >
                    {/* Scope */}
                    <motion.div variants={cardVariants} className="bg-[#FBFBFB] p-10 md:p-14 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 border border-[#EEEEEE] group rounded-sm">
                        <div className="flex items-center gap-3 mb-12 justify-center md:justify-start">
                            <div className="w-1 h-1 rounded-full bg-navy/20" />
                            <h3 className="font-montserrat text-[11px] font-bold tracking-[0.25em] uppercase text-navy">
                                Examination Scope
                            </h3>
                        </div>
                        <motion.ul variants={containerVariants} className="flex flex-col gap-6">
                            {scope.map((s) => (
                                <motion.li
                                    key={s}
                                    variants={listVariants}
                                    className="font-inter text-[14px] text-[#444] pl-8 relative before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-navy/20 group-hover:before:bg-navy transition-colors duration-300"
                                >
                                    {s}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Categories */}
                    <motion.div variants={cardVariants} className="bg-[#FBFBFB] p-10 md:p-14 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 border border-[#EEEEEE] group rounded-sm">
                        <div className="flex items-center gap-3 mb-12 justify-center md:justify-start">
                            <div className="w-1 h-1 rounded-full bg-navy/20" />
                            <h3 className="font-montserrat text-[11px] font-bold tracking-[0.25em] uppercase text-navy">
                                Structural Categories
                            </h3>
                        </div>
                        <motion.ul variants={containerVariants} className="flex flex-col gap-6">
                            {categories.map((c) => (
                                <motion.li
                                    key={c}
                                    variants={listVariants}
                                    className="font-inter text-[14px] text-[#444] pl-8 relative before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-navy/20 group-hover:before:bg-navy transition-colors duration-300"
                                >
                                    {c}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Scoring */}
                    <motion.div variants={cardVariants} className="bg-[#F8F8F8] p-10 md:p-14 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500 border border-[#EBEBEB] flex flex-col items-center text-center rounded-sm">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-1 h-1 rounded-full bg-navy/20" />
                            <h3 className="font-montserrat text-[11px] font-bold tracking-[0.25em] uppercase text-navy">
                                Scoring System
                            </h3>
                        </div>
                        <div className="bg-white p-10 mb-10 border border-[#F0F0F0] shadow-sm w-full relative overflow-hidden group/score">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover/score:opacity-100 transition-opacity duration-500" />
                            <p className="font-montserrat text-[13px] font-bold tracking-[0.05em] text-navy uppercase mb-3 relative z-10">
                                100-Point
                            </p>
                            <p className="font-montserrat text-[28px] md:text-[32px] font-black text-black tracking-tighter leading-none relative z-10">
                                Sovereignty Score<sup>™</sup>
                            </p>
                        </div>
                        <div className="flex flex-col gap-6 w-full max-w-[280px]">
                            {[
                                "Each of 7 sections scored 0 – 14.3 points",
                                "Scores below 60 indicate structural risk",
                                "Most businesses score 20 – 50"
                            ].map((text, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="flex items-start gap-4 text-left"
                                >
                                    <span className="text-navy/20 font-mono text-[10px] mt-1">/</span>
                                    <p className="font-inter text-[13px] text-[#666] leading-relaxed italic">
                                        {text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Risk Table */}
                    <motion.div variants={cardVariants} className="bg-[#F8F8F8] p-10 md:p-14 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500 border border-[#EBEBEB] rounded-sm flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-3 mb-12 justify-center md:justify-start">
                            <span className="text-navy/10 font-mono text-lg select-none">[</span>
                            <h3 className="font-montserrat text-[11px] font-bold tracking-[0.25em] uppercase text-navy">
                                Risk Severity Table
                            </h3>
                            <span className="text-navy/10 font-mono text-lg select-none">]</span>
                        </div>
                        <div className="flex flex-col gap-6 w-full">
                            {risks.map(({ range, badge, badgeClass, desc }, i) => (
                                <motion.div
                                    key={range}
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="flex flex-col items-center md:items-start lg:flex-row lg:items-center gap-3 lg:gap-6 pb-6 border-b border-black/[0.04] last:border-0 last:pb-0"
                                >
                                    <div className="flex items-center justify-center md:justify-start gap-4 w-full lg:w-auto">
                                        <span className="font-montserrat text-[14px] font-black text-black min-w-[65px]">
                                            {range}
                                        </span>
                                        <span
                                            className={`font-montserrat text-[8px] font-black tracking-[0.2em] uppercase px-4 py-2 whitespace-nowrap rounded-full ${badgeClass}`}
                                        >
                                            {badge}
                                        </span>
                                    </div>
                                    <span className="font-inter text-[13px] text-[#555] leading-snug font-medium max-w-[280px] lg:max-w-none text-center md:text-left">
                                        {desc}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Deliverables — full width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white p-10 md:p-16 border border-[#EEEEEE] shadow-sm relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-navy/[0.02] rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700" />

                    <div className="flex items-center gap-4 mb-14 justify-center md:justify-start">
                        <div className="h-px w-6 bg-navy/10" />
                        <h3 className="font-montserrat text-[11px] font-bold tracking-[0.25em] uppercase text-navy">
                            Deliverable Format
                        </h3>
                        <div className="w-1.5 h-1.5 rounded-full bg-navy/5 animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14">
                        {deliverables.map((d, i) => (
                            <motion.div
                                key={d}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + (i * 0.1) }}
                                className="flex flex-col items-center md:items-start text-center md:text-left gap-5"
                            >
                                <span className="text-navy/10 font-black text-[32px] leading-none select-none">/ 0{i + 1}</span>
                                <p className="font-inter text-[14px] text-[#333] font-bold leading-tight tracking-tight uppercase">{d}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
