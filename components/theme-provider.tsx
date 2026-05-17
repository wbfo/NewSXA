"use client";

import { createContext, useContext, useEffect, useMemo, useState, startTransition } from "react";
import type { ThemeMode } from "@/lib/domain/types";

const ThemeContext = createContext<{ theme: ThemeMode; toggleTheme: () => void } | null>(null);

function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const storage = window.localStorage;
    if (storage && typeof storage.getItem === "function") {
      return (storage.getItem("sx-theme") as ThemeMode | null) ?? "dark";
    }
  } catch {
    return "dark";
  }

  return "dark";
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    // startTransition: non-urgent sync from localStorage, avoids cascading renders
    startTransition(() => setTheme(readStoredTheme()));
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((current) => {
          const nextTheme = current === "dark" ? "light" : "dark";
          window.localStorage.setItem("sx-theme", nextTheme);
          applyTheme(nextTheme);
          return nextTheme;
        });
      }
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
