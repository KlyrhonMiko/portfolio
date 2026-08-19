"use client";
import { useState, useEffect, RefObject } from "react";
import { useInView, UseInViewOptions } from "framer-motion";

/**
 * A wrapper around framer-motion's useInView that forces the view to be true
 * when the "force-mount-sections" event is dispatched (e.g. during navigation).
 * This prevents layout shifts from ruining smooth scroll offsets.
 */
// Global state to track if we've ever forced a mount
let globalForceMount = false;

export function useSmartInView(ref: RefObject<any>, options?: UseInViewOptions) {
  const isInView = useInView(ref, options);
  const [forceMount, setForceMount] = useState(globalForceMount);

  useEffect(() => {
    if (globalForceMount) return;

    const handleForceMount = () => {
      globalForceMount = true;
      setForceMount(true);
    };

    window.addEventListener("force-mount-sections", handleForceMount);
    
    // Automatically force mount everything after 1500ms to ensure layout stability
    // before any scrolling occurs, eliminating layout shifts completely.
    const timer = setTimeout(handleForceMount, 1500);
    
    return () => {
      window.removeEventListener("force-mount-sections", handleForceMount);
      clearTimeout(timer);
    };
  }, []);

  return isInView || forceMount;
}
