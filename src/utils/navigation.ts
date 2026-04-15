import React from "react";
import gsap from "gsap";

export const handleSmoothNavigation = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    lenis: any,
    onNavStart?: () => void
) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    const distance = Math.abs(target.getBoundingClientRect().top);

    // For short distances, just smooth scroll natively
    if (distance < window.innerHeight * 2) {
        if (onNavStart) onNavStart();
        lenis?.scrollTo(href, { duration: 1.2 });
        return;
    }

    // Polished GSAP Transition for long leaps
    if (onNavStart) onNavStart();

    const container = document.createElement("div");
    container.className = "fixed inset-0 z-[100] pointer-events-none overflow-hidden";

    // Accent layer
    const layer1 = document.createElement("div");
    layer1.className = "absolute inset-0 bg-primary translate-y-full";

    // Main background layer (covers the screen to hide scroll jump)
    const layer2 = document.createElement("div");
    layer2.className = "absolute inset-0 bg-surface translate-y-full flex items-center justify-center";

    // Minimalist logo embedded in layer 2
    layer2.innerHTML = `<span class="text-2xl sm:text-3xl font-bold tracking-tight text-heading opacity-0 translate-y-4" id="transition-logo">&lt;Klyrhon /&gt;</span>`;

    container.appendChild(layer1);
    container.appendChild(layer2);
    document.body.appendChild(container);

    const logo = container.querySelector("#transition-logo");

    const tl = gsap.timeline({
        onComplete: () => {
            if (document.body.contains(container)) {
                document.body.removeChild(container);
            }
        }
    });

    // 1. Swipe up layer1, then layer2 trailing slightly
    tl.to(layer1, { y: 0, duration: 0.6, ease: "power4.inOut" })
        .to(layer2, { y: 0, duration: 0.6, ease: "power4.inOut" }, "-=0.4")
        // Pop in the logo
        .to(logo, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
        .add(() => {
            // Jump scroll behind the curtain instantly
            lenis?.scrollTo(href, { immediate: true });
        }, "-=0.1")
        // Very brief pause so the logo is readable, then swipe everything out upwards
        .to(logo, { opacity: 0, y: -15, duration: 0.3, ease: "power2.in" }, "+=0.3")
        .to(layer1, { y: "-100%", duration: 0.6, ease: "power4.inOut" }, "-=0.1")
        .to(layer2, { y: "-100%", duration: 0.6, ease: "power4.inOut" }, "-=0.5");
};
