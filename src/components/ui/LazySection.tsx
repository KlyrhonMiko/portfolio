"use client";

import { useEffect, useState, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** ms after mount before rendering (default: 0, meaning render after idle/rAF) */
  delay?: number;
  /** Fallback height to prevent layout shift while deferred */
  minHeight?: string;
}

/**
 * Defers rendering of children until after the browser has had a
 * chance to paint the above-fold content. This prevents heavy
 * below-fold components (GSAP ScrollTrigger setup, Framer Motion
 * tree creation, etc.) from stealing main-thread time during the
 * hero entrance animation.
 */
export default function LazySection({ children, delay = 0, minHeight = "100vh" }: LazySectionProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback where available, else rAF + setTimeout
    if (delay > 0) {
      const timer = setTimeout(() => setReady(true), delay);
      return () => clearTimeout(timer);
    }

    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => (window as any).cancelIdleCallback(id);
    }

    // Fallback: wait two animation frames so the hero paints first
    let cancelled = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) setReady(true);
      });
    });
    return () => { cancelled = true; };
  }, [delay]);

  if (!ready) {
    return <div style={{ minHeight }} />;
  }

  return <>{children}</>;
}
