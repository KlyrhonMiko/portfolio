"use client";

export default function Background() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Animated mesh gradient */}
            <div className="mesh-gradient absolute inset-0 opacity-[0.07]" />

            {/* Film grain / noise overlay */}
            <div className="noise-overlay absolute inset-0 opacity-[0.03] mix-blend-overlay" />

            {/* Dot grid pattern */}
            <div className="dot-pattern absolute inset-0 opacity-[0.03]" />

            {/* Vignette – soft radial darkening at edges */}
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
