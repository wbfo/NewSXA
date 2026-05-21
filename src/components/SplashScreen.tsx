"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SealSVG from "./SealSVG";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const [status, setStatus] = useState("INITIALIZING KERNEL...");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const statuses = [
            "INITIALIZING KERNEL...",
            "LOADING SOVEREIGN PROTOCOLS...",
            "DECRYPTING INFRASTRUCTURE DATA...",
            "ESTABLISHING SECURE AUTHORITY...",
            "READY.",
        ];

        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            if (currentStep < statuses.length) {
                setStatus(statuses[currentStep]);
                setProgress((currentStep / (statuses.length - 1)) * 100);
            } else {
                clearInterval(interval);
                setTimeout(onComplete, 800);
            }
        }, 600);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
            >
                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
                <div className="absolute inset-0 bg-navy/5 animate-scanline pointer-events-none opacity-20" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-20 flex flex-col items-center justify-center w-full max-w-md px-6"
                >
                    <motion.div
                        className="mb-14 relative"
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <SealSVG size={140} color="white" showText={false} />
                        <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full -z-10" />
                    </motion.div>

                    <div className="w-full max-w-[240px]">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
                                {status}
                            </span>
                            <span className="text-[12px] font-mono text-white font-bold">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <div className="h-[2px] w-full bg-white/5 relative overflow-hidden backdrop-blur-sm">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-[-160px] left-0 right-0 text-center">
                        <div className="text-[9px] font-mono text-white/20 tracking-[0.5em] uppercase">
                            Digital Infrastructure Examination Authority // v1.0.4
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
