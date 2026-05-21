"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundDecorationProps {
    type: "grid" | "dots" | "glow" | "scanlines" | "noise";
    className?: string;
    variant?: "navy" | "white" | "mixed";
}

export default function BackgroundDecoration({ type, className, variant = "white" }: BackgroundDecorationProps) {
    if (type === "grid") {
        return (
            <div className={cn("absolute inset-0 bg-grid-white pointer-events-none opacity-20", className)} />
        );
    }

    if (type === "dots") {
        return (
            <div className={cn("absolute inset-0 bg-dot-white pointer-events-none opacity-30", className)} />
        );
    }

    if (type === "glow") {
        return (
            <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className={cn(
                        "absolute -top-[20%] -left-[10%] w-[60%] h-[60%] blur-[120px] rounded-full",
                        variant === "navy" ? "bg-navy" : "bg-white/20"
                    )}
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.05, 0.15, 0.05],
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className={cn(
                        "absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] blur-[100px] rounded-full",
                        variant === "navy" ? "bg-navy/60" : "bg-white/10"
                    )}
                />
            </div>
        );
    }

    if (type === "scanlines") {
        return (
            <div className={cn("absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]", className)}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                <motion.div
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-[100px] bg-gradient-to-bottom from-transparent via-white/10 to-transparent"
                />
            </div>
        );
    }

    if (type === "noise") {
        return <div className={cn("absolute inset-0 bg-noise pointer-events-none z-0", className)} />;
    }

    return null;
}
