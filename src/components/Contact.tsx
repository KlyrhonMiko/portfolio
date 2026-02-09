"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Github,
  Linkedin,
  Facebook,
  Send,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "aurelklyrhonmiko@gmail.com",
    href: "mailto:aurelklyrhonmiko@gmail.com",
    description: "Drop me a line anytime",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pasig City, Philippines",
    href: null,
    description: "Open to remote work",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+63 936 109 0745",
    href: "tel:+639361090745",
    description: "Mon - Fri, 9am - 6pm",
  },
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/KlyrhonMiko",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/klyrhon/",
    label: "LinkedIn",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/aurelklyrhon",
    label: "Facebook",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative pt-10 pb-16 sm:pt-12 sm:pb-24 md:pt-16 md:pb-32">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-pattern absolute inset-0 opacity-[0.02]" />
        {/* Large blob right — warm accent sweep */}
        <div
          className="absolute -right-16 top-1/4 h-[440px] w-[440px] opacity-[0.14]"
          style={{
            background:
              "linear-gradient(140deg, var(--color-accent), var(--color-primary-light))",
            animation:
              "blob 11s ease-in-out infinite, float-1 16s ease-in-out infinite",
            borderRadius: "50% 50% 30% 70% / 40% 60% 40% 60%",
          }}
        />
        {/* Medium blob left — slow counter-morph */}
        <div
          className="absolute -left-20 bottom-1/4 h-[360px] w-[360px] opacity-[0.10]"
          style={{
            background:
              "linear-gradient(200deg, var(--color-primary), var(--color-accent-teal))",
            animation:
              "blob 14s ease-in-out infinite reverse, float-3 20s ease-in-out infinite",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(25px)",
          }}
        />
        {/* Center glow — blurred focus */}
        <div
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent-teal), var(--color-accent))",
            animation:
              "blob 9s ease-in-out infinite, float-2 12s ease-in-out infinite reverse",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(50px)",
          }}
        />
        {/* Tiny blob top-left — fast accent */}
        <div
          className="absolute left-1/4 top-10 h-[150px] w-[150px] opacity-[0.07]"
          style={{
            background: "var(--color-accent)",
            animation:
              "blob 7s ease-in-out infinite reverse, float-1 10s ease-in-out infinite reverse",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(30px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6" ref={ref}>
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16 text-center"
        >
          <span className="mb-3 inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-[#81C784]">
            Contact
          </span>
          <h2 className="mb-4 text-2xl font-bold text-[#2E3A3C] sm:text-3xl md:text-4xl lg:text-5xl">
            Let&apos;s Work Together
          </h2>
          <div className="mx-auto h-0.5 w-20 bg-[#81C784]" />
          <p className="mx-auto mt-4 max-w-lg text-body">
            Have a project in mind or just want to chat? Feel free to reach out.
            I&apos;m always open to discussing new opportunities.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left column - CTA & Social */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-between lg:col-span-2"
          >
            <div>
              {/* Decorative chat icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <MessageCircle size={28} className="text-primary" />
              </div>

              <h3 className="mb-3 text-xl font-bold text-heading sm:text-2xl md:text-3xl">
                Let&apos;s start a
                <br />
                <span className="text-gradient-animated">conversation</span>
              </h3>
              <p className="mb-6 sm:mb-8 max-w-sm text-sm sm:text-base leading-relaxed text-body">
                I&apos;m always excited to connect with fellow developers,
                potential clients, and collaborators. Don&apos;t hesitate to
                reach out!
              </p>

              {/* Primary CTA button */}
              <a
                href="mailto:aurelklyrhonmiko@gmail.com"
                className="shimmer-btn group mb-8 sm:mb-10 inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-primary px-5 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  <Send
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  Send Me an Email
                </span>
              </a>
            </div>

            {/* Social links */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
                Find me on
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-border-light bg-surface/80 text-muted backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20"
                  >
                    <social.icon
                      size={18}
                      className="transition-transform duration-300 group-hover:scale-110"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column - Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
              <div className="space-y-4">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        className="group flex items-center gap-3 sm:gap-5 rounded-xl sm:rounded-2xl border border-border-light/50 bg-surface/60 p-3.5 sm:p-5 transition-all duration-300 hover:border-primary/20 hover:bg-surface/90 hover:shadow-lg hover:shadow-primary/5"
                      >
                        <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary-light text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                          <info.icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="mb-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted">
                            {info.label}
                          </p>
                          <p className="text-sm sm:text-[15px] font-semibold text-heading truncate">
                            {info.value}
                          </p>
                          <p className="mt-0.5 text-[10px] sm:text-xs text-muted">
                            {info.description}
                          </p>
                        </div>
                        <div className="hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light/50 text-muted opacity-0 transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary group-hover:opacity-100">
                          <ExternalLink size={14} />
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 sm:gap-5 rounded-xl sm:rounded-2xl border border-border-light/50 bg-surface/60 p-3.5 sm:p-5">
                        <div className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary-light text-primary">
                          <info.icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                        </div>
                        <div className="min-w-0">
                          <p className="mb-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted">
                            {info.label}
                          </p>
                          <p className="text-sm sm:text-[15px] font-semibold text-heading truncate">
                            {info.value}
                          </p>
                          <p className="mt-0.5 text-[10px] sm:text-xs text-muted">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Availability status bar */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-5 sm:mt-6 flex items-center gap-3 rounded-xl sm:rounded-2xl border border-primary/10 bg-primary-light/40 px-4 sm:px-5 py-3 sm:py-4"
              >
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
                    style={{
                      animation:
                        "pulse-ring 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                    }}
                  />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-heading">
                    Available for freelance projects
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted">
                    Typically responds within 24 hours
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
