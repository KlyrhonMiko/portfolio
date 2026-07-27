"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Background() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [animReady, setAnimReady] = useState(false);

    // Delay the expensive mesh-gradient CSS animation until
    // after the hero entrance animation has had time to finish.
    useEffect(() => {
        const timer = setTimeout(() => setAnimReady(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
        >
            {/* Base: animated blobs */}
            <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.08] filter blur-[80px] sm:blur-[120px] transform-gpu will-change-[opacity,filter]">
                <div 
                    className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-primary" 
                    style={{ animation: animReady ? "float-1 18s ease-in-out infinite" : "none" }} 
                />
                <div 
                    className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-accent-teal" 
                    style={{ animation: animReady ? "float-2 22s ease-in-out infinite" : "none" }} 
                />
                <div 
                    className="absolute -bottom-[10%] left-[15%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-accent" 
                    style={{ animation: animReady ? "float-3 25s ease-in-out infinite" : "none" }} 
                />
            </div>

            {/* Base: noise overlay */}
            <div className="noise-overlay absolute inset-0 opacity-[0.03]" />

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
