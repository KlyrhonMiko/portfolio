"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const contactInfo = [
  {
    label: "Email",
    value: "aurelklyrhonmiko@gmail.com",
    href: "mailto:aurelklyrhonmiko@gmail.com",
    description: "Drop me a line anytime",
  },
  {
    label: "Phone",
    value: "+63 936 109 0745",
    href: "tel:+639361090745",
    description: "Mon - Fri, 9am - 6pm",
  },
  {
    label: "Location",
    value: "Pasig City, Philippines",
    href: null,
    description: "Open to remote work",
  },
];

const socialLinks = [
  { href: "https://github.com/KlyrhonMiko", label: "GitHub" },
  { href: "https://www.linkedin.com/in/klyrhon/", label: "LinkedIn" },
  { href: "https://www.facebook.com/aurelklyrhon", label: "Facebook" },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const lineWidth = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="contact" ref={containerRef} className="relative py-24 lg:py-32 w-full bg-surface">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
              Contact
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-heading tracking-tight mb-2">
              Let's Work Together
            </h2>
          </div>
          <p className="text-lg text-body max-w-md md:text-right leading-relaxed">
            Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        {/* Dynamic separator line */}
        <div className="w-full h-px bg-border-light/30 mb-24 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full w-full bg-primary origin-left" 
            style={{ scaleX: lineWidth, opacity: 0.5 }} 
          />
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: CTA & Availability */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold text-heading leading-[1.1] mb-8"
              >
                Let's start a <br />
                <span className="text-primary italic font-light">conversation.</span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-body leading-relaxed mb-12 max-w-sm"
              >
                I'm always excited to connect with fellow developers, potential clients, and collaborators. Don't hesitate to reach out!
              </motion.p>
            </div>
            
            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 lg:mt-0"
            >
              <div>
                <p className="text-sm font-semibold tracking-[0.1em] uppercase text-heading">
                  Available for freelance
                </p>
                <p className="text-sm text-body mt-1">
                  Typically responds within 24 hours
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact List */}
          <div className="lg:col-span-7 flex flex-col border-t border-border-light/50">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 py-10 lg:py-12 border-b border-border-light/50 hover:border-primary/30 transition-colors duration-500"
              >
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                <div className="sm:w-1/3 shrink-0">
                  <span className="text-sm font-semibold tracking-[0.2em] uppercase text-primary/60">
                    {info.label}
                  </span>
                </div>
                
                <div className="sm:w-2/3 flex items-center justify-between">
                  <div>
                    {info.href ? (
                      <a href={info.href} className="text-xl md:text-2xl font-bold text-heading group-hover:translate-x-2 transition-transform duration-500 ease-out inline-block">
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-xl md:text-2xl font-bold text-heading group-hover:translate-x-2 transition-transform duration-500 ease-out inline-block">
                        {info.value}
                      </span>
                    )}
                    <p className="mt-2 text-sm text-body/80">
                      {info.description}
                    </p>
                  </div>
                  {info.href && (
                    <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
                  )}
                </div>
              </motion.div>
            ))}

            {/* Socials Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 py-10 lg:py-12 border-b border-border-light/50 hover:border-primary/30 transition-colors duration-500"
            >
              {/* Subtle Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

              <div className="sm:w-1/3 shrink-0">
                <span className="text-sm font-semibold tracking-[0.2em] uppercase text-primary/60">
                  Socials
                </span>
              </div>
              
              <div className="sm:w-2/3 flex items-center gap-6 flex-wrap">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-heading hover:text-primary transition-colors flex items-center gap-2 group/link"
                  >
                    {social.label}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                  </a>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
