"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MagneticEffect from "@/components/ui/MagneticEffect";

const certificates = [
  {
    title: "CS50x: Intro to Computer Science and the Art of Programming",
    issuer: "Harvard University",
    date: "Aug 2026",
    link: "https://certificates.cs50.io/ef106f39-6c3f-43b2-95ba-bc4662d9207d.pdf"
  },
  {
    title: "CS50: Intro to Artificial Intelligence with Python",
    issuer: "Harvard University",
    date: "Aug 2026",
    link: "https://cs50.harvard.edu/certificates/63025dc0-e506-4ebc-ab38-e66466d52d34"
  },
  {
    title: "Responsive Web Design Developer Certification",
    issuer: "freeCodeCamp",
    date: "Aug 2026",
    link: "https://www.freecodecamp.org/certification/klyrhon/responsive-web-design-v9"
  },
  {
    title: "Python Developer Certification",
    issuer: "freeCodeCamp",
    date: "Aug 2026",
    link: "https://www.freecodecamp.org/certification/klyrhon/python-v9"
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    date: "Aug 2026",
    link: "https://verify.skilljar.com/c/wgk9ewiuyn66"
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic",
    date: "Aug 2026",
    link: "https://verify.skilljar.com/c/i6x6r67puy7o"
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "Aug 2026",
    link: "https://verify.skilljar.com/c/zzv6mqrbqzj2",
  },
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "Aug 2026",
    link: "https://verify.skilljar.com/c/b95cnb4w5bda"
  },
  {
    title: "Introduction to agent skills",
    issuer: "Anthropic",
    date: "Aug 2026",
    link: "https://verify.skilljar.com/c/2vzhg7kjzxxg"
  },
  {
    title: "Introduction to subagents",
    issuer: "Anthropic",
    date: "Aug 2026",
    link: "https://verify.skilljar.com/c/nsbroi9399oc"
  },
  {
    title: "AI Fluency: Ai Capabilities & Limitations",
    issuer: "Anthropic",
    date: "Aug 2026",
    link: "https://verify.skilljar.com/c/c45jzpz2c3y9"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export default function Certificates() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={containerRef} className="py-24 lg:py-32 w-full relative overflow-hidden">

      {/* Subtle Background Decor */}
      <motion.div style={{ y: y1 }} className="absolute -left-32 top-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none will-change-transform transform-gpu" />
      <motion.div style={{ y: y2 }} className="absolute -right-32 bottom-10 w-[400px] h-[400px] bg-accent-teal/5 rounded-full blur-[80px] -z-10 pointer-events-none will-change-transform transform-gpu" />

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
              Achievements
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-heading tracking-tight mb-2">
              Certifications
            </h2>
          </div>
          <p className="text-lg text-body max-w-md md:text-right leading-relaxed">
            Continuous learning and validating my technical expertise through industry-recognized standards.
          </p>
        </motion.div>

        {/* ─── Minimalist List ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col border-t border-border-light/50"
        >
          {certificates.map((cert, index) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group relative flex items-center justify-between py-10 lg:py-12 border-b border-border-light/50 hover:border-primary/40 transition-colors duration-500"
            >
              {/* Hover glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 pointer-events-none will-change-opacity transform-gpu" />

              <div className="flex items-center gap-8 lg:gap-16 w-full">

                {/* Index & Date (Hidden on mobile) */}
                <div className="w-1/6 hidden md:flex flex-col gap-2">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/40">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-medium tracking-widest text-muted">
                    {cert.date}
                  </span>
                </div>

                {/* Title & Issuer */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-4xl font-light text-heading group-hover:text-primary transition-all duration-500 group-hover:translate-x-2 ease-out transform-gpu">
                    {cert.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-4">
                    <span className="text-xs md:text-sm uppercase tracking-[0.15em] font-medium text-muted/80 group-hover:translate-x-2 transition-all duration-500 delay-75 ease-out transform-gpu">
                      {cert.issuer}
                    </span>
                    {/* Date on mobile */}
                    <span className="md:hidden text-xs uppercase tracking-widest text-muted/60">
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Arrow Icon */}
                <MagneticEffect strength={0.2}>
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-border-light/60 flex items-center justify-center text-muted group-hover:bg-primary group-hover:border-primary group-hover:text-surface transition-colors duration-500 shrink-0">
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-45 transition-transform duration-500 transform-gpu" />
                  </div>
                </MagneticEffect>

              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
