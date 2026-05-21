"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundGlowProps {
    variant?: "navy" | "white" | "mixed";
    className?: string;
}

export default function BackgroundGlow({ variant = "white", className }: BackgroundGlowProps) {
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
