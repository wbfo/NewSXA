"use client";

import { motion, Variants } from "framer-motion";

const steps = [
    {
        num: "01",
        title: "Intake & History",
        body: "We review your business model, digital stack, revenue exposure, and market position.",
    },
    {
        num: "02",
        title: "Structural Examination",
        body: "We analyze your digital infrastructure: website, search presence, AI discoverability, listings, automation, ownership structure.",
    },
    {
        num: "03",
        title: "Risk Imaging",
        body: "We test visibility integrity across platforms and data environments.",
    },
    {
        num: "04",
        title: "Findings Report",
        body: "You receive a structured Sovereign Diagnostic Report with gap classification and severity rating.",
    },
    {
        num: "05",
        title: "Treatment Plan",
        body: "If required, we issue a Sovereign Execution Blueprint — contractor-ready, vendor-neutral.",
    },
];

export default function ProtocolSection() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <section id="protocol" className="bg-[#F5F5F5] py-[120px] overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-[1140px] mx-auto px-10"
            >
                <div className="text-center flex flex-col items-center mb-[60px]">
                    <p className="font-montserrat text-[10px] font-semibold tracking-[0.4em] uppercase text-[#8A8A8A] mb-5">
                        Examination Protocol
                    </p>
                    <h2 className="font-montserrat font-extrabold text-black tracking-[-0.01em] text-[clamp(28px,4vw,42px)] max-w-3xl">
                        A Structured Process. Not a Sales Call.
                    </h2>
                </div>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6"
                >
                    {steps.map(({ num, title, body }) => (
                        <motion.div
                            key={num}
                            variants={itemVariants}
                            className="bg-white p-10 border-l-[3px] border-transparent hover:border-navy hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 group cursor-default"
                        >
                            <p className="font-montserrat text-[11px] font-bold tracking-[0.2em] text-[#8A8A8A] mb-3.5 group-hover:text-navy transition-colors">
                                {num}
                            </p>
                            <p className="font-montserrat text-[13px] font-bold tracking-[0.08em] text-black uppercase mb-4 group-hover:translate-x-1 transition-transform">
                                {title}
                            </p>
                            <p className="font-inter text-[14px] text-[#555] leading-[1.65]">
                                {body}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
