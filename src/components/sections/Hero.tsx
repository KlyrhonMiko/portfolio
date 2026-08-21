"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Twitter, Sparkles, Facebook } from "lucide-react";
import { useLenis } from "lenis/react";
import { handleSmoothNavigation } from "@/utils/navigation";
import { isMobileDevice } from "@/utils/device";

const socialLinks = [
  { icon: Github, href: "https://github.com/KlyrhonMiko", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/klyrhon/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:aurelklyrhonmiko@gmail.com", label: "Email" },
  { icon: Facebook, href: "https://www.facebook.com/aurelklyrhon", label: "Facebook" },
];

const roles = [
  "Software Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSmoothNavigation(e, href, lenis);
  };

  const handleEmailClick = async (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isMobileDevice()) {
      e.preventDefault();
    }
    
    if (href.startsWith('mailto:')) {
      const email = href.replace('mailto:', '');
      try {
        await navigator.clipboard.writeText(email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden"
    >
      {/* Optional minimal background glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Oversized Typographic Watermark */}
      <div 
        className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:flex gap-4 opacity-[0.03] dark:opacity-[0.05] z-0"
        aria-hidden="true"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span 
          className="text-[15vw] 2xl:text-[200px] font-black leading-[0.85] tracking-[-0.05em] uppercase text-transparent"
          style={{ WebkitTextStroke: '2px var(--heading)' }}
        >
          KLYRHON
        </span>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl flex flex-col items-start"
        >
          {/* Subheader */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
              Hello, World
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-heading tracking-tight leading-[1.1] mb-6"
          >
            I'm Klyrhon, a{" "}
            <br className="hidden sm:block" />
            <span className="inline-flex flex-col h-[1.35em] overflow-hidden align-top text-primary">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -40, rotateX: 90 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="origin-center pb-2 inline-block will-change-transform"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-body max-w-2xl leading-relaxed mb-10"
          >
            I build scalable APIs and backend systems with modern technologies.
            Passionate about clean architecture, database design, and creating
            reliable infrastructure that powers great products.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, "#projects")}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-heading px-8 py-3.5 text-sm font-semibold text-surface transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-heading/20"
            >
              <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <Sparkles size={16} className="transition-transform duration-500 group-hover:rotate-12" />
                View My Work
              </span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="group inline-flex items-center justify-center rounded-full border border-border bg-surface/80 px-8 py-3.5 text-sm font-semibold text-heading transition-all duration-300 hover:border-primary/40 hover:bg-surface-elevated hover:shadow-lg"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                onClick={(e) => {
                  if (social.label === "Email") {
                    handleEmailClick(e, social.href);
                  }
                }}
                target={social.label === "Email" ? undefined : "_blank"}
                rel={social.label === "Email" ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-border-light bg-surface/80 text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:text-primary hover:shadow-lg hover:shadow-primary/15"
              >
                <social.icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
                {social.label === "Email" && (
                  <span
                    className={`absolute -bottom-8 left-1/2 -translate-x-1/2 rounded bg-surface-elevated px-2 py-1 text-[10px] font-medium text-primary shadow-md transition-all duration-300 ${
                      copiedEmail ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    Copied!
                  </span>
                )}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        onClick={(e) => handleNavClick(e, "#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
        aria-label="Scroll to about section"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted group-hover:text-primary transition-colors duration-300">
          Scroll
        </span>
        <div className="h-12 w-[1px] bg-border-light relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/3 bg-primary"
            animate={{ top: ['-50%', '150%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.a>
    </section>
  );
}
