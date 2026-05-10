"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Background() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
        >
            {/* Base: mesh gradient */}
            <div className="mesh-gradient absolute inset-0 opacity-[0.07]" />

            {/* Base: noise overlay */}
            <div className="noise-overlay absolute inset-0 opacity-[0.03] mix-blend-overlay" />

            {/* Dot grid pattern */}
            <div className="dot-pattern absolute inset-0 opacity-[0.03]" />

            {/* Vignette */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 50%, var(--background) 100%)",
                }}
            />
        </div>
    );
}
