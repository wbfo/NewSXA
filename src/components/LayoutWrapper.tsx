"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    // Prevent scrolling when loading
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isLoading]);

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <SplashScreen key="splash" onComplete={() => setIsLoading(false)} />
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
