"use client";

import { useTheme } from "@/components/theme-provider";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button className="btn btn-quiet" type="button" onClick={toggleTheme}>
      {mounted ? (theme === "dark" ? "Light Mode" : "Dark Mode") : "Theme"}
    </button>
  );
}
