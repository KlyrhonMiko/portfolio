"use client";

import { useState, useEffect, ReactNode } from "react";

interface DeferredContentProps {
  children: ReactNode;
  /** Milliseconds to wait before mounting children. Defaults to 800. */
  delay?: number;
}

/**
 * Defers mounting of children until after a specified delay.
 * Uses requestIdleCallback (with rAF fallback) to avoid blocking
 * the main thread during critical entrance animations.
 */
export default function DeferredContent({ children, delay = 800 }: DeferredContentProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Use requestIdleCallback if available to avoid interrupting animations
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as any).requestIdleCallback(() => setShow(true), { timeout: 2000 });
      } else {
        requestAnimationFrame(() => setShow(true));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return <>{children}</>;
}
