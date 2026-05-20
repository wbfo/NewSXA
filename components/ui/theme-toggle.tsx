"use client";

import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button className="btn btn-quiet" type="button" onClick={toggleTheme}>
      {mounted ? (theme === "dark" ? "Light Mode" : "Dark Mode") : "Theme"}
    </button>
  );
}
