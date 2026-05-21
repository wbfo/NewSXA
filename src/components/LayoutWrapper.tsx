"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useSyncExternalStore } from "react";
import SplashScreen from "./SplashScreen";

// useSyncExternalStore subscriber that never fires — used to get a
// stable client-only value without hydration mismatch warnings.
function subscribe() {
    return () => {};
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    // Server snapshot returns false → SSR renders children directly (real content).
    // Client snapshot returns true → client shows splash on first mount.
    const isClient = useSyncExternalStore(
        subscribe,
        () => true,   // client snapshot
        () => false   // server snapshot
    );

    const [splashDone, setSplashDone] = useState(false);
    const showSplash = isClient && !splashDone;

    // Prevent scrolling while splash is visible
    useEffect(() => {
        if (showSplash) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [showSplash]);

    return (
        <AnimatePresence mode="wait">
            {showSplash ? (
                <SplashScreen key="splash" onComplete={() => setSplashDone(true)} />
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: isClient ? 0 : 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
