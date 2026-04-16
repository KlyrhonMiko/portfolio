"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface FloatingElement {
    content: string;
    x: string;
    y: string;
    size: string;
    opacity: number;
    rotate?: number;
    font?: "mono" | "sans";
}

// Deep layer is now just geometric rings (no grid)

const midSymbols: FloatingElement[] = [
    { content: "{ }", x: "8%", y: "10%", size: "text-7xl", opacity: 0.18, rotate: -8, font: "mono" },
    { content: "< />", x: "78%", y: "5%", size: "text-6xl", opacity: 0.15, rotate: 12, font: "mono" },
    { content: "=>", x: "85%", y: "30%", size: "text-5xl", opacity: 0.18, rotate: -5, font: "mono" },
    { content: "[ ]", x: "12%", y: "45%", size: "text-6xl", opacity: 0.15, rotate: 15, font: "mono" },
    { content: "//", x: "70%", y: "50%", size: "text-5xl", opacity: 0.18, rotate: -10, font: "mono" },
    { content: "&&", x: "25%", y: "65%", size: "text-5xl", opacity: 0.14, rotate: 8, font: "mono" },
    { content: "( )", x: "55%", y: "70%", size: "text-6xl", opacity: 0.15, rotate: -12, font: "mono" },
    { content: "{ }", x: "42%", y: "25%", size: "text-8xl", opacity: 0.12, rotate: 5, font: "mono" },
    { content: "#", x: "90%", y: "60%", size: "text-5xl", opacity: 0.14, rotate: 20, font: "mono" },
    { content: "0x", x: "5%", y: "28%", size: "text-4xl", opacity: 0.15, rotate: -3, font: "mono" },
];

const nearElements: FloatingElement[] = [
    { content: "●", x: "18%", y: "6%", size: "text-sm", opacity: 0.22 },
    { content: "|", x: "82%", y: "18%", size: "text-2xl", opacity: 0.18, rotate: 15, font: "mono" },
    { content: ";", x: "35%", y: "14%", size: "text-3xl", opacity: 0.2, font: "mono" },
    { content: "●", x: "65%", y: "36%", size: "text-xs", opacity: 0.22 },
    { content: ":", x: "48%", y: "46%", size: "text-2xl", opacity: 0.18, font: "mono" },
    { content: "●", x: "8%", y: "58%", size: "text-sm", opacity: 0.2 },
    { content: "|", x: "92%", y: "44%", size: "text-xl", opacity: 0.18, rotate: -20, font: "mono" },
    { content: ";", x: "72%", y: "66%", size: "text-2xl", opacity: 0.2, font: "mono" },
    { content: "●", x: "28%", y: "34%", size: "text-[8px]", opacity: 0.25 },
    { content: "_", x: "55%", y: "12%", size: "text-xl", opacity: 0.18, font: "mono" },
    { content: "●", x: "40%", y: "72%", size: "text-sm", opacity: 0.2 },
    { content: "|", x: "15%", y: "74%", size: "text-lg", opacity: 0.18, rotate: 10, font: "mono" },
];

export default function Background() {
    const containerRef = useRef<HTMLDivElement>(null);
    const deepRef = useRef<HTMLDivElement>(null);
    const midRef = useRef<HTMLDivElement>(null);
    const nearRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const deep = deepRef.current;
        const mid = midRef.current;
        const near = nearRef.current;
        if (!deep || !mid || !near) return;

        const allLayers = [deep, mid, near];

        // Vertical parallax across the full page
        const verticalSpeeds = [-8, -20, -35];
        allLayers.forEach((el, i) => {
            gsap.fromTo(
                el,
                { yPercent: 0 },
                {
                    yPercent: verticalSpeeds[i],
                    ease: "none",
                    scrollTrigger: {
                        trigger: document.body,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }
            );
        });

        // Horizontal parallax during the pinned Projects section
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
            const getHorizontalEnd = () => {
                const track = projectsSection.querySelector<HTMLElement>(".will-change-transform");
                if (track) return `+=${track.scrollWidth - window.innerWidth}`;
                return "+=2000";
            };

            const horizontalSpeeds = [-4, -10, -18];
            allLayers.forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { xPercent: 0 },
                    {
                        xPercent: horizontalSpeeds[i],
                        ease: "none",
                        scrollTrigger: {
                            trigger: projectsSection,
                            start: "top top",
                            end: getHorizontalEnd,
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        },
                    }
                );
            });
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
        >
            {/* Base: mesh gradient */}
            <div className="mesh-gradient absolute inset-0 opacity-[0.07]" />

            {/* Base: noise overlay */}
            <div className="noise-overlay absolute inset-0 opacity-[0.03] mix-blend-overlay" />

            {/* === DEEP LAYER: Geometric rings only (no grid) === */}
            <div
                ref={deepRef}
                className="absolute will-change-transform"
                style={{ inset: "-15% 0", height: "130%" }}
            >
                <div
                    className="parallax-geo-ring absolute"
                    style={{
                        left: "20%",
                        top: "20%",
                        width: "200px",
                        height: "200px",
                        border: "1.5px solid var(--color-primary)",
                        borderRadius: "50%",
                        opacity: 0.18,
                    }}
                />
                <div
                    className="parallax-geo-ring absolute"
                    style={{
                        left: "72%",
                        top: "50%",
                        width: "140px",
                        height: "140px",
                        border: "1.5px dashed var(--color-accent-teal)",
                        borderRadius: "12px",
                        opacity: 0.2,
                        transform: "rotate(45deg)",
                    }}
                />
                <div
                    className="parallax-geo-ring absolute"
                    style={{
                        left: "40%",
                        top: "70%",
                        width: "240px",
                        height: "240px",
                        border: "1.5px solid var(--color-accent)",
                        borderRadius: "50%",
                        opacity: 0.15,
                    }}
                />
                <div
                    className="parallax-geo-ring absolute"
                    style={{
                        left: "85%",
                        top: "15%",
                        width: "160px",
                        height: "160px",
                        border: "1.5px solid var(--color-primary)",
                        borderRadius: "50%",
                        opacity: 0.12,
                    }}
                />
                <div
                    className="parallax-geo-ring absolute"
                    style={{
                        left: "8%",
                        top: "80%",
                        width: "100px",
                        height: "100px",
                        border: "1.5px dashed var(--color-primary)",
                        borderRadius: "8px",
                        opacity: 0.16,
                        transform: "rotate(20deg)",
                    }}
                />
            </div>

            {/* === MID LAYER: Code symbols === */}
            <div
                ref={midRef}
                className="absolute will-change-transform"
                style={{ inset: "-25% 0", height: "150%" }}
            >
                {midSymbols.map((el, i) => (
                    <span
                        key={`mid-${i}`}
                        className={`absolute select-none ${el.size} text-primary`}
                        style={{
                            left: el.x,
                            top: el.y,
                            opacity: el.opacity,
                            transform: el.rotate ? `rotate(${el.rotate}deg)` : undefined,
                            fontFamily: "var(--font-mono)",
                            fontWeight: 600,
                            filter: "blur(0.5px)",
                        }}
                    >
                        {el.content}
                    </span>
                ))}
            </div>

            {/* === NEAR LAYER: Small punctuation & dots === */}
            <div
                ref={nearRef}
                className="absolute will-change-transform"
                style={{ inset: "-40% 0", height: "180%" }}
            >
                {nearElements.map((el, i) => (
                    <span
                        key={`near-${i}`}
                        className={`absolute select-none ${el.size} text-primary`}
                        style={{
                            left: el.x,
                            top: el.y,
                            opacity: el.opacity,
                            transform: el.rotate ? `rotate(${el.rotate}deg)` : undefined,
                            fontFamily: el.font === "mono" ? "var(--font-mono)" : undefined,
                            fontWeight: el.font === "mono" ? 600 : undefined,
                        }}
                    >
                        {el.content}
                    </span>
                ))}
            </div>

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
