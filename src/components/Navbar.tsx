"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { useRouter } from "next/navigation";
import { handleSmoothNavigation } from "../utils/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lenis = useLenis();
  const router = useRouter();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSmoothNavigation(e, href, lenis, router, () => setIsOpen(false));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = document.querySelectorAll("section[id]");
      const triggerOffset = 180;

      let current = "home";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= triggerOffset) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.header 
      initial={{ y: -80, opacity: 0, filter: "blur(8px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none"
    >
      <nav
        className={`pointer-events-auto relative flex w-full max-w-5xl items-center justify-between rounded-full transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl border border-border/80 dark:border-white/10 shadow-lg shadow-black/[0.04] dark:shadow-black/40 py-2.5 px-4 sm:px-6"
            : "backdrop-blur-xl border border-border/40 dark:border-white/[0.06] shadow-sm py-3 px-4 sm:px-6"
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group relative z-50 flex items-center gap-1.5 text-lg sm:text-xl font-bold tracking-tight text-heading transition-opacity hover:opacity-80"
        >
          <span className="text-primary font-light">/</span>
          <span>Klyrhon</span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center">
          <ul className="flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-200 block ${
                      isActive
                        ? "text-primary dark:text-emerald-400 font-semibold"
                        : "text-muted hover:text-heading"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeSectionTab"
                        className="absolute inset-0 rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 relative z-50">
          {/* Desktop grouped pill */}
          <div className="hidden md:flex items-center rounded-full p-1 border border-border/40 dark:border-white/[0.05]">
            <a
              href="/resume"
              onClick={(e) => handleNavClick(e, "/resume")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-muted hover:text-heading hover:bg-surface dark:hover:bg-white/10 transition-colors block"
            >
              <span>Resume</span>
              <ArrowUpRight size={14} className="opacity-70" />
            </a>
            <div className="w-[1px] h-4 bg-border/60 dark:bg-white/10 mx-1"></div>
            <ThemeToggle className="group relative flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-heading transition-colors hover:bg-surface dark:hover:bg-white/10 focus:outline-none active:scale-95 cursor-pointer" />
          </div>

          {/* Mobile standalone toggle */}
          <div className="md:hidden flex">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-heading bg-surface-elevated/80 dark:bg-white/[0.05] border border-border/60 dark:border-white/10 transition-colors hover:bg-surface-elevated md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Modal Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute top-full left-4 right-4 sm:left-6 sm:right-6 mt-3 max-w-xl mx-auto rounded-3xl bg-surface/95 dark:bg-surface/95 backdrop-blur-2xl border border-border/60 dark:border-white/10 p-7 sm:p-8 shadow-2xl shadow-black/20 md:hidden z-40 overflow-hidden"
          >
            <nav className="flex flex-col gap-5">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`group flex items-center justify-between text-lg sm:text-xl transition-colors duration-200 ${
                        isActive
                          ? "text-heading font-medium"
                          : "text-muted hover:text-heading"
                      }`}
                    >
                      <span className="tracking-tight">
                        {link.label}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="mobileActiveIndicator"
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                        />
                      )}
                    </a>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom section */}
            <div className="mt-8 pt-6 border-t border-border/40 dark:border-white/10 flex flex-col gap-6">
              <a
                href="/resume"
                onClick={(e) => handleNavClick(e, "/resume")}
                className="group flex items-center justify-between text-lg sm:text-xl text-muted hover:text-heading transition-colors duration-200"
              >
                <span className="tracking-tight">Resume</span>
                <ArrowUpRight size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono text-muted/70 uppercase tracking-wider">
                  Get in touch
                </span>
                <a
                  href="mailto:aurelklyrhonmiko@gmail.com"
                  onClick={() => setIsOpen(false)}
                  className="text-sm sm:text-base text-heading hover:text-primary transition-colors flex items-center gap-1.5 group"
                >
                  aurelklyrhonmiko@gmail.com
                  <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
