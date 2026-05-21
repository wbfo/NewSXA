"use client";

import { motion, Variants } from "framer-motion";

export default function FindingsSection() {
    const findings = [
        {
            type: "Type: Food & Beverage",
            before: "31",
            after: "74",
            body: "Critical gaps identified in search discoverability, listing consistency, and owned audience infrastructure. Full Prescription delivered.",
        },
        {
            type: "Type: Specialty Retail",
            before: "28",
            after: "69",
            body: "Structural misalignment across 4 platforms. Website infrastructure absent. AI visibility score: 0. Full remediation scoped.",
        },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="findings" className="bg-[#F5F5F5] py-[120px] text-black overflow-hidden">
            <div className="max-w-[1140px] mx-auto px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-[60px] pb-10 border-b border-[#D8D8D8] text-center flex flex-col items-center"
                >
                    <p className="font-montserrat text-[10px] font-semibold tracking-[0.4em] uppercase text-[#8A8A8A] mb-3">
                        Documented Outcomes
                    </p>
                    <h2 className="font-montserrat font-extrabold text-black tracking-[-0.02em] mb-4 text-[clamp(30px,4.5vw,52px)]">
                        Findings
                    </h2>
                    <p className="font-inter text-[16px] text-[#8A8A8A] max-w-xl mx-auto">
                        Structural outcomes from completed examinations.
                    </p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="font-inter text-[12px] italic text-[#8A8A8A] mb-12 text-center"
                >
                    Client identities withheld pending permission for public documentation.
                </motion.p>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
                >
                    {findings.map(({ type, before, after, body }) => (
                        <motion.div
                            key={type}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)",
                                borderColor: "rgba(0, 0, 0, 0.1)"
                            }}
                            className="bg-white p-10 md:p-12 transition-all duration-500 border border-[#EBEBEB] flex flex-col items-center text-center"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-black/5 font-mono text-xs select-none">[</span>
                                <p className="font-montserrat text-[9px] font-bold tracking-[0.2em] uppercase text-[#8A8A8A]">
                                    {type}
                                </p>
                                <span className="text-black/5 font-mono text-xs select-none">]</span>
                            </div>
                            <div className="flex items-center gap-4 mb-6">
                                <motion.span
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    className="font-montserrat font-extrabold text-[32px] md:text-[36px] text-red-600"
                                >
                                    {before}
                                </motion.span>
                                <span className="font-montserrat text-[16px] text-[#D8D8D8]">
                                    →
                                </span>
                                <motion.span
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                    className="font-montserrat font-extrabold text-[32px] md:text-[36px] text-green-700"
                                >
                                    {after}
                                </motion.span>
                                <span className="font-montserrat text-[11px] text-[#A0A0A0]">
                                    / 100
                                </span>
                            </div>
                            <p className="font-inter text-[14px] text-[#555] leading-[1.7] max-w-xs md:max-w-none">
                                {body}
                            </p>
                        </motion.div>
                    ))}

                    {/* Pending card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                        className="bg-white/40 p-10 md:p-12 flex flex-col items-center justify-center min-h-[220px] text-center border border-dashed border-black/[0.1] transition-all duration-500"
                    >
                        <p className="font-montserrat text-[9px] font-bold tracking-[0.22em] uppercase text-[#8A8A8A] mb-6">
                            Pending Classification
                        </p>
                        <motion.div
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="flex flex-col items-center gap-3"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse" />
                            <p className="font-montserrat text-[11px] font-bold tracking-[0.2em] text-navy">
                                Examination in Progress
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="font-inter text-[12px] italic text-[#8A8A8A] text-center"
                >
                    Findings documented upon client authorization. Full case records
                    available under NDA.
                </motion.p>
            </div>
        </section>
    );
}
