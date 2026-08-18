"use client";

import { useEffect, useState, ReactNode, useRef } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** Legacy delay, kept for backwards compatibility but we prefer IntersectionObserver */
  delay?: number;
  /** Fallback height to prevent layout shift while deferred */
  minHeight?: string;
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
}

export default function LazySection({ children, delay, minHeight = "100vh", rootMargin = "600px 0px" }: LazySectionProps) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
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
      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }
  }, []);

  useEffect(() => {
    if (ready && typeof window !== "undefined") {
      const savedScroll = sessionStorage.getItem("savedScrollY");
      if (savedScroll) {
        const parsed = parseInt(savedScroll, 10);
        if (!isNaN(parsed) && parsed > 0) {
          requestAnimationFrame(() => {
            window.scrollTo({ top: parsed, behavior: "instant" });
          });
        }
      }
    }
  }, [ready]);

  useEffect(() => {
    // If the user refreshed and we're already scrolled down, we should render early
    if (typeof window !== "undefined") {
      const savedScroll = sessionStorage.getItem("savedScrollY");
      if ((savedScroll && parseInt(savedScroll, 10) > 0) || window.scrollY > 0) {
         setReady(true);
         return;
      }
    }

    if (delay && delay > 0) {
      const timer = setTimeout(() => setReady(true), delay);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, rootMargin]);

  if (!ready) {
    return <div ref={ref} suppressHydrationWarning style={{ minHeight: computedMinHeight }} />;
  }

  return <div ref={ref}>{children}</div>;
}
