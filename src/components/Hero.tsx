"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowDown, Github, Linkedin, Mail, Twitter, Sparkles, Facebook} from "lucide-react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col items-center"
    >
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        {/* Large blob top-right */}
        <div
          className="absolute -right-20 -top-20 h-[500px] w-[500px] opacity-20"
          style={{
            background: "linear-gradient(135deg, var(--color-primary-light), var(--color-accent))",
            animation: "blob 8s ease-in-out infinite, float-1 12s ease-in-out infinite",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        {/* Medium blob bottom-left */}
        <div
          className="absolute bottom-20 -left-20 h-[400px] w-[400px] opacity-15"
          style={{
            background: "linear-gradient(135deg, var(--color-accent), var(--color-primary-light))",
            animation: "blob 10s ease-in-out infinite reverse, float-2 14s ease-in-out infinite",
            borderRadius: "50% 60% 30% 60% / 30% 60% 70% 40%",
          }}
        />
        {/* Small blob center-left */}
        <div
          className="absolute left-1/4 top-1/3 h-[250px] w-[250px] opacity-12"
          style={{
            background: "linear-gradient(135deg, var(--color-primary), var(--color-accent-teal))",
            animation: "blob 7s ease-in-out infinite, float-3 10s ease-in-out infinite",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(40px)",
          }}
        />
        {/* Small accent blob */}
        <div
          className="absolute right-1/3 bottom-1/4 h-[200px] w-[200px] opacity-10"
          style={{
            background: "var(--color-accent-teal)",
            animation: "blob 9s ease-in-out infinite reverse, float-1 16s ease-in-out infinite reverse",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(30px)",
          }}
        />
      </div>

      {/* Dot grid pattern */}
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-[0.03]" />

      {/* Gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background" />

      {/* Top spacer — smaller than bottom so content sits slightly above center */}
      <div className="flex-2" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Main heading with animated gradient name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-heading sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl">
            Hi, I&apos;m{" "}
            <span className="text-gradient-animated">
              Klyrhon
            </span>
          </h1>
        </motion.div>

        {/* Rotating role text with blur transition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mb-6 h-8 sm:h-10 md:h-12"
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={roleIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.4 }}
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
          transition={{ duration: 0.7, delay: 0.45 }}
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
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#projects"
            className="shimmer-btn group shrink-0 rounded-full bg-primary px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles size={16} className="transition-transform duration-300 group-hover:rotate-12" />
              View My Work
            </span>
          </a>
          <a
            href="#contact"
            className="group shrink-0 rounded-full border border-border bg-surface/80 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-heading backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            Get in Touch
          </a>
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
        className="relative z-10 flex-1 flex flex-col items-center justify-end gap-2 pb-609 sm:pb-8"
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
