"use client";

import { useLenis } from "lenis/react";
import { handleSmoothNavigation } from "@/utils/navigation";
import { ArrowUp, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/KlyrhonMiko", label: "GitHub" },
  { href: "https://www.linkedin.com/in/klyrhon/", label: "LinkedIn" },
  { href: "https://www.facebook.com/aurelklyrhon", label: "Facebook" },
];

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSmoothNavigation(e, href, lenis);
  };

  return (
    <footer className="relative border-t border-border-light/30 bg-surface pt-20 pb-10 lg:pt-32 lg:pb-12 w-full">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 mb-20 lg:mb-32">
          
          {/* Brand & Bio */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col items-start">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="text-4xl md:text-5xl font-bold text-heading tracking-tight mb-6 hover:text-primary transition-colors"
            >
              Klyrhon Miko.
            </a>
            <p className="text-lg text-body max-w-sm leading-relaxed mb-10 font-light">
              Building scalable web applications with modern technologies. Passionate about clean code, great UX, and continuous learning.
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/60">
                Email
              </span>
              <a
                href="mailto:aurelklyrhonmiko@gmail.com"
                className="text-xl font-bold text-heading hover:text-primary transition-colors inline-block"
              >
                aurelklyrhonmiko@gmail.com
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-6 lg:col-span-5 grid grid-cols-2 gap-8 lg:gap-12">
            
            {/* Quick Links */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-primary/60 mb-8">
                Explore
              </span>
              <nav className="flex flex-col gap-5">
                {footerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-lg font-medium text-heading/80 hover:text-primary transition-colors w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Socials */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-primary/60 mb-8">
                Connect
              </span>
              <div className="flex flex-col gap-5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-heading/80 hover:text-primary transition-colors flex items-center gap-1 group w-fit"
                  >
                    {social.label}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border-light/30">
          <p className="text-sm text-body/80 font-medium">
            © {new Date().getFullYear()} Klyrhon Miko. All rights reserved.
          </p>
          
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-heading hover:text-primary transition-colors"
          >
            Back to top
            <ArrowUp
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1"
            />
          </a>
        </div>

      </div>
    </footer>
  );
}
