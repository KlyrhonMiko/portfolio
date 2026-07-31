"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={className || "group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-surface/50 border border-border/50 backdrop-blur-sm transition-all cursor-pointer"}>
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!document.startViewTransition) {
      setTheme(isDark ? "light" : "dark");
      return;
    }

    let x = event.clientX;
    let y = event.clientY;

    if (!x || !y || (x === 0 && y === 0)) {
      const rect = event.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    x = Math.round(x);
    y = Math.round(y);

    if (x < 50 && y < 50) {
      x = Math.round(window.innerWidth - 40);
      y = 40;
    }

    const xPercent = (x / window.innerWidth) * 100;
    const yPercent = (y / window.innerHeight) * 100;

    document.documentElement.style.setProperty("--theme-x", `${xPercent}%`);
    document.documentElement.style.setProperty("--theme-y", `${yPercent}%`);
    document.documentElement.setAttribute("data-theme-transition", "true");

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(isDark ? "light" : "dark");
      });
    });

    transition.finished.then(() => {
      document.documentElement.removeAttribute("data-theme-transition");
      document.documentElement.style.removeProperty("--theme-x");
      document.documentElement.style.removeProperty("--theme-y");
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className={className || "group relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-surface/80 border border-border/60 text-heading backdrop-blur-md transition-all duration-300 hover:bg-surface-elevated hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5 focus:outline-none active:scale-95 cursor-pointer"}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Sun size={18} className="text-heading group-hover:text-primary transition-colors duration-300" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <Moon size={18} className="text-heading group-hover:text-primary transition-colors duration-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
