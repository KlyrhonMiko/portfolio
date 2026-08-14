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
  const [computedMinHeight, setComputedMinHeight] = useState(() => {
    if (typeof window !== "undefined") {
      const savedScroll = sessionStorage.getItem("savedScrollY");
      if (savedScroll) {
        const parsed = parseInt(savedScroll, 10);
        if (!isNaN(parsed) && parsed > 0) {
          return `${parsed + window.innerHeight * 1.5}px`;
        }
      }
    }
    return minHeight;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleBeforeUnload = () => {
        sessionStorage.setItem("savedScrollY", window.scrollY.toString());
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);

  useEffect(() => {
    if (ready && typeof window !== "undefined") {
      const savedScroll = sessionStorage.getItem("savedScrollY");
      if (savedScroll) {
        const parsed = parseInt(savedScroll, 10);
        if (!isNaN(parsed) && parsed > 0) {
          // Force Lenis / Browser to respect the restored scroll position
          requestAnimationFrame(() => {
            window.scrollTo({ top: parsed, behavior: "instant" });
            // Optionally, we could clear it here, but keeping it is fine for next reloads.
          });
        }
      }
    }
  }, [ready]);

  useEffect(() => {
    // Use requestIdleCallback where available, else rAF + setTimeout
    if (delay > 0) {
      const timer = setTimeout(() => setReady(true), delay);
      return () => clearTimeout(timer);
    }

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(() => setReady(true), { timeout: 1500 });
      return () => (window as any).cancelIdleCallback(id);
    }

    // Fallback: wait two animation frames so the hero paints first
    let cancelled = false;
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cancelled) setReady(true);
        });
      });
    } else {
      setReady(true);
    }
    
    return () => { cancelled = true; };
  }, [delay]);

  if (!ready) {
    return <div suppressHydrationWarning style={{ minHeight: computedMinHeight }} />;
  }

  return <>{children}</>;
}
