"use client";

import { motion, Variants } from "framer-motion";
import BackgroundDecoration from "./BackgroundDecoration";

const scopeItems = [
    { num: "01", name: "Monthly Structural Review" },
    { num: "02", name: "Platform Integrity Monitoring" },
    { num: "03", name: "Analytics Interpretation & Reporting" },
    { num: "04", name: "Quarterly Sovereignty Re-Score" },
];

export default function OversightSection() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section id="oversight" className="bg-black py-[120px] overflow-hidden relative">
            <BackgroundDecoration type="scanlines" className="opacity-[0.03]" />
            <BackgroundDecoration type="noise" />
            <div className="max-w-[1140px] mx-auto px-10 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 pb-10 border-b border-white/[0.08] text-center flex flex-col items-center"
                >
                    <p className="font-montserrat text-[10px] font-semibold tracking-[0.4em] uppercase text-white/35 mb-3">
                        Tier 3
                    </p>
                    <h2 className="font-montserrat font-extrabold text-white tracking-[-0.02em] mb-4 text-[clamp(30px,4.5vw,52px)]">
                        Ongoing Oversight
                    </h2>
                    <p className="font-inter text-[16px] text-white/40 max-w-2xl">
                        Structured monitoring against Sovereign standards. Not a retainer.
                        Not a marketing service.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-10">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="font-inter text-[15px] text-white/50 leading-[1.75]"
                    >
                        Ongoing Oversight is not a content service. It is not a retainer
                        agreement in the traditional sense. It is a structured, recurring
                        examination of how your digital infrastructure is performing against
                        the benchmarks established in your Sovereign Diagnostic Report.
                        <br />
                        <br />
                        Operators who have completed examination and implemented remediation
                        can engage Sovereign X for continuous integrity monitoring —
                        ensuring that the ground you reclaimed stays yours.
                    </motion.p>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col gap-5"
                    >
                        {scopeItems.map(({ num, name }) => (
                            <motion.div
                                key={num}
                                variants={itemVariants}
                                className="flex gap-4 items-start pb-5 border-b border-white/[0.06] last:border-b-0 last:pb-0"
                            >
                                <span className="font-montserrat text-[10px] font-bold tracking-[0.15em] text-white/20 min-w-[24px] pt-0.5">
                                    {num}
                                </span>
                                <span className="font-montserrat text-[13px] font-bold tracking-[0.06em] text-white">
                                    {name}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
