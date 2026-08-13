"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticEffectProps {
    children: ReactNode;
    className?: string;
    strength?: number;
}

export default function MagneticEffect({ children, className = "inline-flex", strength = 0.5 }: MagneticEffectProps) {
    const magneticRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const magnetic = magneticRef.current;
        if (!magnetic) return;

        // Use quickTo for the elasticity physics
        const xTo = gsap.quickTo(magnetic, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(magnetic, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * strength);
            yTo(y * strength);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        magnetic.addEventListener("mousemove", handleMouseMove);
        magnetic.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            magnetic.removeEventListener("mousemove", handleMouseMove);
            magnetic.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={magneticRef} className={className}>
            {children}
        </div>
    );
}
