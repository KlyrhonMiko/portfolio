"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { handleSmoothNavigation } from "../utils/navigation";

export function PageTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    // Start fully opaque and showing
    tl.to(logoRef.current, { opacity: 0, y: -15, duration: 0.3, ease: "power2.in", delay: 0.3 })
      .to(layer1Ref.current, { y: "-100%", duration: 0.6, ease: "power4.inOut" }, "-=0.1")
      .to(layer2Ref.current, { y: "-100%", duration: 0.6, ease: "power4.inOut" }, "-=0.5")
      .set(containerRef.current, { display: "none" });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      <div ref={layer1Ref} className="absolute inset-0 bg-primary translate-y-0" />
      <div ref={layer2Ref} className="absolute inset-0 bg-surface translate-y-0 flex items-center justify-center">
        <span ref={logoRef} className="text-2xl sm:text-3xl font-bold tracking-tight text-heading">
          &lt;Klyrhon /&gt;
        </span>
      </div>
    </div>
  );
}

export function ResumeBackButton() {
  return (
    <a 
      href="/"
      onClick={(e) => handleSmoothNavigation(e, "/", null)}
      className="inline-flex items-center gap-2 text-gray-600 hover:text-black font-medium transition-colors cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back to Portfolio
    </a>
  );
}
