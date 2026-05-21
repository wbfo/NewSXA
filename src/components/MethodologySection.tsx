"use client";

import { motion, Variants } from "framer-motion";

const pillars = [
    {
        num: "01",
        title: "Sovereignty Index",
        body: "Composite measure of digital infrastructure health. Evaluates owned vs. rented assets, data portability, and platform dependency risk.",
    },
    {
        num: "02",
        title: "Infrastructure Stability Rating",
        body: "Tests resilience of website, hosting, domain, and data architecture against structural failure scenarios.",
    },
    {
        num: "03",
        title: "AI Visibility Integrity",
        body: "Evaluates how accurately and completely your business appears in AI-driven search environments and language model responses.",
    },
    {
        num: "04",
        title: "Asset Ownership Matrix",
        body: "Maps every digital asset to an owner. Identifies assets controlled by third parties and assesses recoverability risk.",
    },
    {
        num: "05",
        title: "Platform Dependency Assessment",
        body: "Scores the degree to which your business revenue and visibility depends on platforms you do not control.",
    },
];

export default function MethodologySection() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const pillarVariants: Variants = {
        hidden: { opacity: 0, scale: 0.98, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="methodology" className="bg-black py-[120px] overflow-hidden">
            <div className="max-w-[1140px] mx-auto px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-[80px] pb-10 border-b border-white/[0.08] text-center flex flex-col items-center"
                >
                    <p className="font-montserrat text-[10px] font-semibold tracking-[0.4em] uppercase text-white/35 mb-3">
                        Proprietary System
                    </p>
                    <h2 className="font-montserrat font-extrabold text-white tracking-[-0.02em] mb-4 text-[clamp(30px,4.5vw,52px)]">
                        The Methodology
                    </h2>
                    <p className="font-inter text-[16px] text-white/40 max-w-2xl">
                        Five diagnostic pillars forming the Sovereignty Index framework.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col border-t border-white/[0.08]"
                >
                    {pillars.map(({ num, title, body }, i) => (
                        <motion.div
                            key={num}
                            variants={pillarVariants}
                            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)", borderColor: "rgba(0, 81, 153, 0.4)" }}
                            className="group border-x border-b border-white/[0.08] px-10 md:px-14 py-12 md:py-14 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10 md:gap-20 transition-all duration-500"
                        >
                            <div className="flex items-center gap-2 mb-4 md:mb-0 justify-center md:justify-start">
                                <span className="text-blue-mid/20 font-mono text-xs select-none">[</span>
                                <p className="font-montserrat text-[11px] font-bold tracking-[0.25em] text-white/20 group-hover:text-blue-mid transition-colors duration-500">
                                    {num}
                                </p>
                                <span className="text-blue-mid/20 font-mono text-xs select-none">]</span>
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="font-montserrat text-[14px] font-bold tracking-[0.12em] uppercase text-white mb-5 group-hover:text-blue-mid transition-colors duration-500">
                                    {title}
                                </h3>
                                <p className="font-inter text-[15px] text-white/40 leading-[1.8] max-w-2xl mx-auto md:mx-0">
                                    {body}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
