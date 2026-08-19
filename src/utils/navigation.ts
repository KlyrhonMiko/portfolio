import React from "react";
import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleSmoothNavigation = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    lenis: any,
    router?: AppRouterInstance,
    onNavStart?: () => void
) => {
    if (!href.startsWith("#")) {
        // For external pages like /resume, play the curtain animation then navigate
        e.preventDefault();
        if (onNavStart) onNavStart();

        const container = document.createElement("div");
        container.id = "exit-transition-container";
        container.className = "fixed inset-0 z-[100] pointer-events-none overflow-hidden";

        const layer1 = document.createElement("div");
        layer1.className = "absolute inset-0 bg-primary translate-y-full";

        const layer2 = document.createElement("div");
        layer2.className = "absolute inset-0 bg-surface translate-y-full flex items-center justify-center";

        layer2.innerHTML = `<span class="text-3xl sm:text-4xl font-bold tracking-tight text-heading opacity-0 translate-y-4" style="font-family: system-ui, sans-serif;" id="transition-logo">&lt;Klyrhon /&gt;</span>`;

        container.appendChild(layer1);
        container.appendChild(layer2);
        document.body.appendChild(container);

        const logo = container.querySelector("#transition-logo");
        
        const tl = gsap.timeline();

        tl.to(layer1, { y: 0, duration: 0.6, ease: "power4.inOut" })
          .to(layer2, { y: 0, duration: 0.6, ease: "power4.inOut" }, "-=0.4")
          .to(logo, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2")
          .add(() => {
              if (router) {
                  router.push(href);
              } else {
                  window.location.href = href;
              }
          }, "+=0.2");

        return;
    }
    
    e.preventDefault();

    if (href === "#home") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (onNavStart) onNavStart();
        return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    if (onNavStart) onNavStart();
    
    // Force all lazy sections to mount before scrolling so layout shifts don't ruin the scroll offset
    window.dispatchEvent(new CustomEvent("force-mount-sections"));

    // Wait for React to render the components and update the DOM
    setTimeout(() => {
        // Force Lenis to recalculate document bounds before scrolling
        // otherwise it clamps the destination to the old maxScroll limit
        lenis?.resize();
        lenis?.scrollTo(target, { duration: 1.2 });
    }, 150);
};
