"use client";

import { motion, Variants } from "framer-motion";
import BackgroundDecoration from "./BackgroundDecoration";

const industries = [
    {
        name: "Real Estate Operators",
        desc: "High structural exposure across listing syndication, directory data, and ownership verification.",
    },
    {
        name: "Private Medical & Aesthetic Clinics",
        desc: "Trust-dependent environments where digital credibility precedes patient conversion.",
    },
    {
        name: "Tech Founders",
        desc: "Product-first builders with infrastructure exposure during market entry windows.",
    },
    {
        name: "Hospitality & Capital Operators",
        desc: "Platform-dependent operators facing margin compression and ownership dilution.",
    },
    {
        name: "High-Visibility Personal Brands",
        desc: "Earned visibility with fractured infrastructure leaking audience and authority.",
    },
    {
        name: "Diaspora-Led Enterprises",
        desc: "Multi-market operators with inconsistent digital presence across geographic contexts.",
    },
];

export default function WhoSection() {
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section id="who" className="bg-black py-[120px] text-white overflow-hidden relative">
            <BackgroundDecoration type="dots" className="opacity-10" />
            <BackgroundDecoration type="noise" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-[1140px] mx-auto px-10 relative z-10"
            >
                <div className="text-center mb-16 flex flex-col items-center">
                    <p className="font-montserrat text-[10px] font-semibold tracking-[0.4em] uppercase text-white/40 mb-5">
                        Clientele
                    </p>
                    <h2 className="font-montserrat font-extrabold text-white tracking-[-0.01em] text-[clamp(30px,4.5vw,48px)] max-w-4xl">
                        Who Undergoes Sovereign Examination
                    </h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                >
                    {industries.map(({ name, desc }, index) => (
                        <motion.div
                            key={name}
                            variants={itemVariants}
                            className="relative border border-white/10 p-9 bg-white/[0.02] backdrop-blur-sm hover:border-white/30 hover:bg-white/[0.05] transition-all duration-300 group cursor-default overflow-hidden"
                        >
                            <span className="absolute top-4 right-6 font-montserrat text-[40px] font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors select-none">
                                {(index + 1).toString().padStart(2, '0')}
                            </span>
                            <p className="font-montserrat text-[14px] font-bold text-white mb-2.5 tracking-[0.02em] group-hover:text-white transition-colors relative z-10">
                                {name}
                            </p>
                            <p className="font-inter text-[13px] text-white/50 leading-[1.65] relative z-10">
                                {desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="border-t border-white/10 pt-7"
                >
                    <p className="font-inter text-[14px] italic text-white/40">
                        Examination is best suited for operators with structural exposure.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
