"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { handleSmoothNavigation } from "../utils/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSmoothNavigation(e, href, lenis, () => setIsOpen(false));
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
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      <nav
        className={`pointer-events-auto relative flex w-full max-w-5xl items-center justify-between rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-surface/85 dark:bg-surface/80 backdrop-blur-2xl border border-border/80 dark:border-white/10 shadow-lg shadow-black/[0.04] dark:shadow-black/40 py-2.5 px-4 sm:px-6"
            : "bg-surface/65 dark:bg-surface/40 backdrop-blur-xl border border-border/40 dark:border-white/[0.06] shadow-sm py-3 px-4 sm:px-6"
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="group relative z-50 flex items-center gap-1.5 text-sm sm:text-base font-semibold tracking-tight text-heading transition-opacity hover:opacity-90"
        >
          <span className="font-mono text-primary text-xs sm:text-sm font-normal opacity-80 group-hover:opacity-100 transition-opacity">
            &lt;
          </span>
          <span className="text-heading font-semibold tracking-tight">
            Klyrhon
          </span>
          <span className="font-mono text-primary text-xs sm:text-sm font-normal opacity-80 group-hover:opacity-100 transition-opacity">
            /&gt;
          </span>
        </a>

        {/* Desktop navigation - Segmented Pill design */}
        <div className="hidden md:flex items-center rounded-full bg-surface-elevated/60 dark:bg-white/[0.03] p-1 border border-border/40 dark:border-white/[0.05]">
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
                        className="absolute inset-0 rounded-full bg-surface dark:bg-white/10 border border-border/60 dark:border-white/15 shadow-xs"
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
          <ThemeToggle />

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
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto absolute top-full left-3 right-3 sm:left-6 sm:right-6 mt-3 max-w-xl mx-auto rounded-3xl bg-surface/95 dark:bg-surface/95 backdrop-blur-2xl border border-border/80 dark:border-white/15 p-5 shadow-2xl shadow-black/20 md:hidden z-40 overflow-hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.04,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`group flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 dark:bg-primary/15 text-primary font-semibold"
                          : "text-heading hover:bg-surface-elevated"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-primary scale-120"
                              : "bg-muted/40 scale-75"
                          }`}
                        />
                        <span className="font-medium tracking-tight">
                          {link.label}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={15}
                        className={`transition-all duration-200 ${
                          isActive
                            ? "text-primary opacity-100"
                            : "text-muted opacity-0 group-hover:opacity-60"
                        }`}
                      />
                    </a>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom section */}
            <div className="mt-4 pt-4 border-t border-border/50 dark:border-white/10 flex items-center justify-between px-2">
              <span className="text-xs text-muted font-mono">
                aurelklyrhonmiko@gmail.com
              </span>
              <a
                href="mailto:aurelklyrhonmiko@gmail.com"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-dark transition-all active:scale-95"
              >
                Contact
                <ArrowUpRight size={13} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
