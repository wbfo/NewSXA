"use client";

import { motion } from "framer-motion";
import BackgroundDecoration from "./BackgroundDecoration";

export default function MarkSection() {
    return (
        <section id="mark" className="bg-black py-[120px] text-center overflow-hidden relative">
            <BackgroundDecoration type="scanlines" className="opacity-[0.05]" />
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="max-w-[1140px] mx-auto px-10 text-center relative z-10"
            >
                <p className="font-montserrat text-[10px] font-semibold tracking-[0.4em] uppercase text-white/35 mb-5">
                    Classification
                </p>
                <motion.div
                    initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="flex justify-center mb-12"
                >
                    <svg
                        className="w-[180px] h-[180px] text-blue-light"
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <path id="topArcMark" d="M 20,100 A 80,80 0 0,0 180,100" />
                            <path id="bottomArcMark" d="M 20,100 A 80,80 0 0,1 180,100" />
                        </defs>
                        <motion.circle
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            cx="100" cy="100" r="90" stroke="#6E90C5" strokeWidth="2.5"
                        />
                        <motion.circle
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            cx="100" cy="100" r="76" stroke="#6E90C5" strokeWidth="1"
                        />
                        <line x1="100" y1="10" x2="100" y2="24" stroke="#6E90C5" strokeWidth="2" />
                        <line x1="100" y1="176" x2="100" y2="190" stroke="#6E90C5" strokeWidth="2" />
                        <line x1="10" y1="100" x2="24" y2="100" stroke="#6E90C5" strokeWidth="2" />
                        <line x1="176" y1="100" x2="190" y2="100" stroke="#6E90C5" strokeWidth="2" />
                        <text
                            fontFamily="Montserrat, sans-serif"
                            fontSize="9.5"
                            fontWeight="700"
                            fill="#6E90C5"
                            letterSpacing="0.18em"
                        >
                            <textPath href="#topArcMark" startOffset="50%" textAnchor="middle">
                                SOVEREIGN X
                            </textPath>
                        </text>
                        <text
                            fontFamily="Montserrat, sans-serif"
                            fontSize="9.5"
                            fontWeight="600"
                            fill="#6E90C5"
                            letterSpacing="0.18em"
                        >
                            <textPath href="#bottomArcMark" startOffset="50%" textAnchor="middle">
                                · AUDITS ·
                            </textPath>
                        </text>
                        <text
                            x="100"
                            y="115"
                            textAnchor="middle"
                            fontFamily="Georgia, serif"
                            fontSize="42"
                            fontWeight="700"
                            fill="#6E90C5"
                            letterSpacing="1"
                        >
                            SX
                        </text>
                        <motion.line
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1, duration: 1 }}
                            x1="68"
                            y1="78"
                            x2="132"
                            y2="122"
                            stroke="#6E90C5"
                            strokeWidth="0.75"
                            opacity="0.5"
                        />
                    </svg>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="font-montserrat font-extrabold text-white tracking-[-0.01em] mb-6 text-[clamp(28px,4vw,42px)]"
                >
                    The Sovereign Mark.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="font-inter text-[16px] text-white/50 max-w-[540px] mx-auto leading-[1.7]"
                >
                    Businesses that complete examination receive a classification based on
                    structural integrity and digital sovereignty. The mark is not
                    decorative. It is earned.
                </motion.p>
            </motion.div>
        </section>
    );
}
