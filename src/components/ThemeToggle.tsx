"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("cuzion-theme", next ? "dark" : "light");
    } catch {
      // localStorage unavailable — theme just won't persist across reloads
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 border border-line rounded-lg flex items-center justify-center text-foreground hover:bg-surface-soft transition-colors"
    >
      <Icon name={isDark ? "light_mode" : "dark_mode"} />
    </button>
  );
}
