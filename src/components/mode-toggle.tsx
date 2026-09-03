// components/mode-toggle.tsx
"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";
import useMounted from "../hooks/useMounted";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className=" right-5 top-5 z-50 fixed inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-stone-300 bg-white/80 text-stone-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-stone-400 dark:border-white/20 dark:bg-zinc-800/80 dark:text-stone-100 dark:hover:bg-zinc-700 dark:focus:ring-zinc-400"
    >
      {isDark ? (
        <FiSun aria-hidden="true" size={18} />
      ) : (
        <FiMoon aria-hidden="true" size={18} />
      )}
    </button>
  );
}
