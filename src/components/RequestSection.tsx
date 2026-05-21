"use client";

import { motion } from "framer-motion";
import IntakeForm from "./IntakeForm";

export default function RequestSection() {
    return (
        <section id="request" className="bg-black py-[120px] overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-[1140px] mx-auto px-10 text-center flex flex-col items-center"
            >
                <p className="font-montserrat text-[10px] font-semibold tracking-[0.4em] uppercase text-white/35 mb-5">
                    Intake
                </p>
                <h2 className="font-montserrat font-extrabold text-white tracking-[-0.01em] mb-4 text-[clamp(32px,5vw,56px)] max-w-3xl">
                    Request Examination
                </h2>
                <p className="font-inter text-[16px] text-white/40 mb-[52px] leading-relaxed max-w-2xl">
                    All submissions are reviewed before examination is scheduled. Not every applicant proceeds.
                </p>

                <div className="w-full max-w-[860px]">
                    <IntakeForm />
                </div>
            </motion.div>
        </section>
    );
}
