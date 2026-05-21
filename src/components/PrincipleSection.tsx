"use client";

import { motion, Variants } from "framer-motion";
import BackgroundDecoration from "./BackgroundDecoration";

export default function PrincipleSection() {
    const principles = [
        "We diagnose before construction.",
        "We document before deployment.",
        "We prioritize ownership over convenience.",
        "We build infrastructure that you control.",
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section id="principle" className="bg-black py-[120px] overflow-hidden relative">
            <BackgroundDecoration type="dots" className="opacity-20" />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-[1140px] mx-auto px-10 relative z-10"
            >
                <div className="text-center flex flex-col items-center mb-12">
                    <p className="font-montserrat text-[10px] font-semibold tracking-[0.4em] uppercase text-white/35 mb-5">
                        Sovereignty Principle
                    </p>
                    <h2 className="font-montserrat font-extrabold text-white tracking-[-0.01em] mb-7 text-[clamp(28px,4.5vw,46px)] max-w-3xl">
                        Why Sovereignty Matters.
                    </h2>
                    <p className="font-inter text-[17px] text-white/50 max-w-[600px] leading-[1.65]">
                        Most agencies build systems that create dependence. Sovereign X
                        operates differently.
                    </p>
                </div>
                <motion.ul
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col gap-5 max-w-[600px] mx-auto md:mx-0"
                >
                    {principles.map((p) => (
                        <motion.li
                            key={p}
                            variants={itemVariants}
                            className="font-inter text-[17px] text-white/80 flex gap-4 group cursor-default justify-center md:justify-start"
                        >
                            <span className="text-blue-mid group-hover:scale-x-125 transition-transform origin-left shrink-0">—</span>
                            <span className="group-hover:text-white transition-colors">{p}</span>
                        </motion.li>
                    ))}
                </motion.ul>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1 }}
                    className="font-montserrat text-[9px] font-bold tracking-[0.35em] uppercase text-white/12 mt-[60px]"
                >
                    This is infrastructure. Not marketing.
                </motion.p>
            </motion.div>
        </section>
    );
}
