"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function RouteTransitionHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if there's a transition container left from an inter-page navigation
    const exitContainer = document.getElementById("exit-transition-container");
    if (!exitContainer) return;

    const layer1 = exitContainer.querySelector(".bg-primary");
    const layer2 = exitContainer.querySelector(".bg-surface");
    const logo = exitContainer.querySelector("#transition-logo");

    if (!layer1 || !layer2 || !logo) {
      exitContainer.remove();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (document.body.contains(exitContainer)) {
          exitContainer.remove();
        }
      }
    });

    // Run the entrance reveal animation (the second half of the navigation sequence)
    // Add a tiny delay to ensure the new page is painted before revealing
    tl.to(logo, { opacity: 0, y: -15, duration: 0.3, ease: "power2.in" }, "+=0.2")
      .to(layer1, { y: "-100%", duration: 0.6, ease: "power4.inOut" }, "-=0.1")
      .to(layer2, { y: "-100%", duration: 0.6, ease: "power4.inOut" }, "-=0.5");

  }, [pathname]);

  return null;
}
