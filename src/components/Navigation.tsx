"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SealSVG from "./SealSVG";
import { cn } from "@/lib/utils";

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#examination", label: "Examination" },
        { href: "#methodology", label: "Methodology" },
        { href: "#industries", label: "Industries" },
        { href: "#findings", label: "Findings" },
        { href: "#oversight", label: "Oversight" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "fixed top-0 left-0 right-0 z-[1000] transition-all duration-500",
                isScrolled
                    ? "py-3 bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-2xl"
                    : "py-6 bg-transparent border-b border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
                <Link href="/" className="group flex items-center gap-4 outline-none no-underline">
                    <div className="relative">
                        <SealSVG size={42} color="white" />
                        <div className="absolute inset-0 bg-navy/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-extrabold tracking-[0.3em] uppercase transition-colors group-hover:text-navy text-white">
                            Sovereign X
                        </span>
                        <span className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-medium">
                            Audits
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    <div className="flex gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="nav-link-hover text-[11px] font-bold uppercase tracking-[0.25em] text-[#8A8A8A] hover:text-white no-underline transition-colors block"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <Link
                        href="#request"
                        className="bg-navy hover:bg-[#004080] text-white px-6 py-2.5 rounded-none text-[10px] font-black uppercase tracking-[0.25em] no-underline transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,102,255,0.2)] hover:shadow-[0_0_30px_rgba(0,102,255,0.4)]"
                    >
                        Request Examination
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <motion.div
                        initial={false}
                        animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }}
                        className="w-6 h-[2px] bg-white rounded-full transition-all duration-300"
                    />
                    <motion.div
                        initial={false}
                        animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                        className="w-6 h-[2px] bg-white rounded-full transition-all duration-300"
                    />
                    <motion.div
                        initial={false}
                        animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }}
                        className="w-6 h-[2px] bg-white rounded-full transition-all duration-300"
                    />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 top-[72px] z-[999] bg-black/95 backdrop-blur-xl md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col p-12 gap-8 items-center text-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-2xl font-black uppercase tracking-[0.4em] text-white/70 hover:text-white no-underline transition-all hover:scale-110"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="#request"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-navy text-white px-10 py-5 text-center font-black uppercase tracking-[0.3em] mt-8 w-full shadow-[0_0_40px_rgba(0,102,255,0.3)] no-underline"
                            >
                                Request Examination
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
