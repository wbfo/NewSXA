"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SealSVG from "./SealSVG";

export default function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-white/[0.06] pt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-[1140px] mx-auto px-10 flex flex-col items-center text-center mb-16"
            >
                {/* Brand */}
                <div className="flex flex-col items-center mb-12">
                    <motion.div
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <SealSVG size={50} color="white" showText={false} className="opacity-40" />
                    </motion.div>
                    <p className="font-montserrat text-[14px] font-bold tracking-[0.25em] uppercase text-white mt-6 mb-2">
                        Sovereign X Audits
                    </p>
                    <p className="font-inter text-[11px] text-white/20 tracking-widest uppercase">
                        A sub-brand of AI Council Conductor LLC
                    </p>
                </div>

                {/* Navigation Links - Centered Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-10 w-full max-w-4xl border-y border-white/[0.03] py-12">
                    {/* Services */}
                    <div className="flex flex-col items-center text-center">
                        <p className="font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase text-white/25 mb-6">
                            Services
                        </p>
                        <ul className="flex flex-col gap-3">
                            {[
                                { href: "#examination", label: "The Examination" },
                                { href: "#protocol", label: "The Prescription" },
                                { href: "#oversight", label: "Ongoing Oversight" },
                                { href: "#request", label: "Digital Employee" },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="font-inter text-[13px] text-white/45 no-underline hover:text-white transition-colors duration-200"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Platform */}
                    <div className="flex flex-col items-center text-center">
                        <p className="font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase text-white/25 mb-6">
                            Platform
                        </p>
                        <ul className="flex flex-col gap-3">
                            {[
                                { href: "#protocol", label: "Examination Protocol" },
                                { href: "#methodology", label: "Methodology" },
                                { href: "#industries", label: "Industries" },
                                { href: "#findings", label: "Findings" },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="font-inter text-[13px] text-white/45 no-underline hover:text-white transition-colors duration-200"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Authority */}
                    <div className="flex flex-col items-center text-center">
                        <p className="font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase text-white/25 mb-6">
                            Authority
                        </p>
                        <ul className="flex flex-col gap-3">
                            {["Global Standards", "Index Calibration", "Structural Integrity"].map((label) => (
                                <li key={label} className="font-inter text-[13px] text-white/45 cursor-default">
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col items-center text-center">
                        <p className="font-montserrat text-[9px] font-bold tracking-[0.3em] uppercase text-white/25 mb-6">
                            Contact
                        </p>
                        <div className="flex flex-col gap-3">
                            <Link href="#request" className="font-inter text-[13px] text-white/45 no-underline hover:text-white transition-colors duration-200">
                                Request Examination
                            </Link>
                            <span className="font-montserrat text-[8px] font-bold tracking-[0.2em] uppercase text-white/10 mt-2">
                                New York · Lagos · London
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Bottom Bar */}
            <div className="border-t border-white/[0.06] py-8 bg-black/40">
                <div className="max-w-[1140px] mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <span className="font-inter text-[11px] text-white/15 tracking-tight">
                        © 2026 AI Council Conductor LLC. All rights reserved.
                    </span>
                    <motion.span
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="font-montserrat text-[9px] font-bold tracking-[0.4em] uppercase text-white"
                    >
                        Sovereignty Assured
                    </motion.span>
                </div>
            </div>
        </footer>
    );
}
