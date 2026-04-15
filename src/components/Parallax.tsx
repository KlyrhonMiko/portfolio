"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxProps {
    children: ReactNode;
    speed?: number; // Higher is faster. Negative is reverse.
    className?: string;
    id?: string;
}

export default function Parallax({ children, speed = 1, className = "", id }: ParallaxProps) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const trigger = triggerRef.current;
        const target = targetRef.current;
        if (!trigger || !target) return;

        // Use a timeline for ScrollTrigger scrub to move element
        const yMove = -100 * speed;

        const tween = gsap.fromTo(
            target,
            { y: -yMove },
            {
                y: yMove,
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            }
        );

        return () => {
            tween.kill();
        };
    }, [speed]);

    return (
        <div ref={triggerRef} className={className} id={id}>
            <div ref={targetRef} className="h-full w-full">
                {children}
            </div>
        </div>
    );
}
