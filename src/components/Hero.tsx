"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail, Twitter, Sparkles, Facebook } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

const socialLinks = [
  { icon: Github, href: "https://github.com/KlyrhonMiko", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/klyrhon/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:aurelklyrhonmiko@gmail.com", label: "Email" },
  { icon: Facebook, href: "https://www.facebook.com/aurelklyrhon", label: "Facebook" },
];

const roles = [
  "Full Stack Developer",
  "Backend Engineer",
  "UI/UX Enthusiast",
  "Problem Solver",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!headerRef.current) return;

    gsap.set(headerRef.current, { visibility: "visible" });
    const splitText = new SplitType(headerRef.current, { types: "chars" });

    gsap.from(splitText.chars, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: 0.03,
      ease: "back.out(1.7)",
      delay: 0.1,
      onComplete: () => {
        splitText.revert();
      }
    });

    return () => {
      splitText.revert();
    };
  }, { scope: headerRef });

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col items-center pt-20"
    >


      {/* Top spacer — smaller than bottom so content sits slightly above center */}
      <div className="flex-[2] min-h-[60px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Main heading with staggered reveal */}
        <div>
          <h1
            ref={headerRef}
            className="mb-4 text-3xl font-bold leading-tight tracking-tight text-heading sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 150%, 0% 150%)", visibility: "hidden" }}
          >
            Hi, I&apos;m{" "}
            <span className="text-primary">
              Klyrhon
            </span>
          </h1>
        </div>

        {/* Rotating role text with blur transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 h-8 sm:h-10 md:h-12"
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={roleIndex}
              initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, filter: "blur(10px)" }}
              transition={{
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="text-base font-medium text-primary sm:text-xl md:text-2xl"
            >
              {roles[roleIndex]}
            </motion.h2>
          </AnimatePresence>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mb-8 sm:mb-10 max-w-xl text-sm leading-relaxed text-muted sm:text-base md:text-lg"
        >
          I build scalable APIs and backend systems with modern
          technologies. Passionate about clean architecture, database design,
          and creating reliable infrastructure that powers great products.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <motion.a
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="shimmer-btn group shrink-0 rounded-full bg-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles size={16} className="transition-transform duration-300 group-hover:rotate-12" />
              View My Work
            </span>
          </motion.a>
          <motion.a
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="group shrink-0 rounded-full border border-border bg-surface/80 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-heading backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Social links with staggered animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 sm:mt-16 flex items-center justify-center gap-2.5 sm:gap-3"
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-border-light bg-surface/80 text-muted backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:text-primary hover:shadow-lg hover:shadow-primary/15"
            >
              <social.icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="relative z-10 flex-1 flex flex-col items-center justify-end gap-2 pb-12 sm:pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-medium uppercase tracking-widest text-muted">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="text-primary" size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}
