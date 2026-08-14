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
  const [computedMinHeight, setComputedMinHeight] = useState(minHeight);

  useEffect(() => {
    // Attempt to read the saved scroll position to ensure the container is tall enough
    // for native browser scroll restoration to work without clamping.
    if (typeof window !== "undefined") {
      const savedScroll = sessionStorage.getItem("savedScrollY");
      if (savedScroll) {
        const parsed = parseInt(savedScroll, 10);
        // Ensure the min height is at least the scroll position + a viewport height buffer
        if (!isNaN(parsed) && parsed > 0) {
          setComputedMinHeight(`${parsed + window.innerHeight}px`);
        }
      }

      const handleBeforeUnload = () => {
        sessionStorage.setItem("savedScrollY", window.scrollY.toString());
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      // Clean up event listener when ready
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);

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
    return <div style={{ minHeight: computedMinHeight }} />;
  }

  return <>{children}</>;
}
