"use client";

import { useTheme } from "@ecosy/next-themes";
import styles from "./StudioPortfolio.module.css";

export default function StudioThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return <button type="button" className={styles.theme} aria-label="Toggle light or dark theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M8 2.5a5.5 5.5 0 0 1 0 11Z" fill="currentColor" /></svg>
    <span>Switch appearance</span>
  </button>;
}
