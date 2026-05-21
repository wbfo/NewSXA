"use client";

import { motion } from "framer-motion";
import BackgroundDecoration from "./BackgroundDecoration";

export default function GlobalSection() {
    return (
        <section id="global" className="bg-black py-20 overflow-hidden relative border-y border-white/[0.05]">
            <BackgroundDecoration type="grid" className="opacity-10" />
            <BackgroundDecoration type="noise" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-[1140px] mx-auto px-10 relative z-10"
            >
                <div className="flex flex-col items-center justify-center gap-12 text-center">
                    <p className="font-montserrat font-medium text-white/90 leading-[1.6] text-[clamp(18px,2.8vw,24px)] max-w-[850px]">
                        Sovereign X conducts examinations for operators in{" "}
                        <motion.span
                            initial={{ color: "#FFF" }}
                            whileInView={{ color: "#A0A0A0" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-white font-bold"
                        >
                            New York
                        </motion.span>,{" "}
                        <motion.span
                            initial={{ color: "#FFF" }}
                            whileInView={{ color: "#A0A0A0" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7, duration: 1 }}
                            className="text-white font-bold"
                        >
                            Lagos
                        </motion.span>,{" "}
                        <motion.span
                            initial={{ color: "#FFF" }}
                            whileInView={{ color: "#A0A0A0" }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.9, duration: 1 }}
                            className="text-white font-bold"
                        >
                            London
                        </motion.span>, and beyond.
                    </p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-1 bg-white/10 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                        <span className="relative font-montserrat text-[10px] font-bold tracking-[0.4em] uppercase text-white/60 border border-white/20 px-10 py-4 whitespace-nowrap bg-black/40 backdrop-blur-sm">
                            Examination Available Globally
                        </span>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
