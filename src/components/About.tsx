"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Code2,
  Palette,
  Database,
  Terminal,
  Briefcase,
  Zap,
  Heart,
  Target,
  Lightbulb,
} from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: Code2,
    description: "Crafting interactive & responsive interfaces",
    accent: "from-emerald-400 to-teal-500",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: Database,
    description: "Building robust APIs & server logic",
    accent: "from-sky-400 to-blue-500",
    items: ["Node.js", "Express", "PostgreSQL", "FastAPI"],
  },
  {
    category: "Design",
    icon: Palette,
    description: "Creating beautiful user experiences",
    accent: "from-violet-400 to-purple-500",
    items: ["Figma", "UI/UX", "Responsive Design", "Accessibility"],
  },
  {
    category: "DevOps",
    icon: Terminal,
    description: "Streamlining deployment pipelines",
    accent: "from-amber-400 to-orange-500",
    items: ["Git", "Docker", "CI/CD", "AWS"],
  },
];

const marqueeRow1 = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "PostgreSQL",
];
const marqueeRow2 = [
  "FastAPI",
  "Figma",
  "UI/UX",
  "Docker",
  "Git",
  "CI/CD",
  "AWS",
  "Accessibility",
];

const traits = [
  { label: "Problem Solver", icon: Target },
  { label: "Team Player", icon: Heart },
  { label: "Fast Learner", icon: Zap },
  { label: "Detail Oriented", icon: Lightbulb },
];

/* ── Code Editor Widget ── */
function CodeLine({
  num,
  children,
}: {
  num: number;
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <span className="mr-6 inline-block w-5 select-none text-right text-[#4d6353]">
        {num}
      </span>
      <span>{children}</span>
    </div>
  );
}

function CodeEditor() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, rotateY: -5 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-3 sm:-inset-6 rounded-3xl bg-gradient-to-br from-[#6db38a]/20 via-[#7ec8b8]/10 to-[#5a9c76]/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-[#283830] bg-[#1a2420] shadow-2xl shadow-black/25">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-[#283830] bg-[#1e2c26] px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
            <div className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
            <div className="h-3 w-3 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
          </div>
          <div className="ml-3 flex items-center gap-1.5 rounded-md bg-[#1a2420] px-3 py-1">
            <Code2 size={12} className="text-[#6db38a]" />
            <span className="text-xs text-[#6a8a72]">whoami.ts</span>
          </div>
        </div>

        {/* Code content */}
        <div className="overflow-x-auto p-3 sm:p-5 font-mono text-[11px] sm:text-[13px] leading-6 sm:leading-7">
          <CodeLine num={1}>
            <span className="text-[#546e7a] italic">
              {"// "}who am I?
            </span>
          </CodeLine>
          <CodeLine num={2}>
            <span className="text-[#c792ea]">const</span>{" "}
            <span className="text-[#82aaff]">aurel</span>{" "}
            <span className="text-[#89ddff]">=</span>{" "}
            <span className="text-[#89ddff]">{"{"}</span>
          </CodeLine>
          <CodeLine num={3}>
            <span className="text-[#f07178]">&nbsp;&nbsp;name</span>
            <span className="text-[#89ddff]">:</span>{" "}
            <span className="text-[#c3e88d]">
              &apos;Klyrhon Aurel&apos;
            </span>
            <span className="text-[#89ddff]">,</span>
          </CodeLine>
          <CodeLine num={4}>
            <span className="text-[#f07178]">&nbsp;&nbsp;role</span>
            <span className="text-[#89ddff]">:</span>{" "}
            <span className="text-[#c3e88d]">
              &apos;Student&apos;
            </span>
            <span className="text-[#89ddff]">,</span>
          </CodeLine>
          <CodeLine num={5}>
            <span className="text-[#f07178]">&nbsp;&nbsp;loves</span>
            <span className="text-[#89ddff]">:</span>{" "}
            <span className="text-[#89ddff]">[</span>
          </CodeLine>
          <CodeLine num={6}>
            <span className="text-[#c3e88d]">
              &nbsp;&nbsp;&nbsp;&nbsp;&apos;Clean Code&apos;
            </span>
            <span className="text-[#89ddff]">,</span>
          </CodeLine>
          <CodeLine num={7}>
            <span className="text-[#c3e88d]">
              &nbsp;&nbsp;&nbsp;&nbsp;&apos;Pixel-Perfect UI&apos;
            </span>
            <span className="text-[#89ddff]">,</span>
          </CodeLine>
          <CodeLine num={8}>
            <span className="text-[#c3e88d]">
              &nbsp;&nbsp;&nbsp;&nbsp;&apos;Open Source&apos;
            </span>
            <span className="text-[#89ddff]">,</span>
          </CodeLine>
          <CodeLine num={9}>
            <span className="text-[#c3e88d]">
              &nbsp;&nbsp;&nbsp;&nbsp;&apos;Coffee &amp; Code&apos;
            </span>
          </CodeLine>
          <CodeLine num={10}>
            <span className="text-[#89ddff]">&nbsp;&nbsp;]</span>
            <span className="text-[#89ddff]">,</span>
          </CodeLine>
          <CodeLine num={11}>
            <span className="text-[#f07178]">&nbsp;&nbsp;hardWorker</span>
            <span className="text-[#89ddff]">:</span>{" "}
            <span className="text-[#ff9cac]">true</span>
            <span className="text-[#89ddff]">,</span>
          </CodeLine>
          <CodeLine num={12}>
            <span className="text-[#f07178]">&nbsp;&nbsp;quickLearner</span>
            <span className="text-[#89ddff]">:</span>{" "}
            <span className="text-[#ff9cac]">true</span>
            <span className="text-[#89ddff]">,</span>
          </CodeLine>
          <CodeLine num={13}>
            <span className="text-[#f07178]">&nbsp;&nbsp;hireable</span>
            <span className="text-[#89ddff]">:</span>{" "}
            <span className="text-[#ff9cac]">true</span>
            <span className="text-[#89ddff]">,</span>
          </CodeLine>
          <CodeLine num={14}>
            <span className="text-[#89ddff]">{"}"}</span>
            <span className="text-[#89ddff]">;</span>
          </CodeLine>
          {/* Blinking cursor */}
          <div className="mt-1 h-5 w-2 animate-pulse rounded-sm bg-[#6db38a]" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Marquee Pill ── */
function MarqueePill({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "default" | "alt";
}) {
  return (
    <div
      className={`mx-1.5 flex shrink-0 items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-medium shadow-sm transition-all duration-300 hover:scale-105 ${
        variant === "default"
          ? "border-primary/10 bg-white text-heading hover:border-primary/25 hover:shadow-md hover:shadow-primary/8"
          : "border-accent-teal/10 bg-white text-heading hover:border-accent-teal/25 hover:shadow-md hover:shadow-accent-teal/8"
      }`}
    >
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r ${
          variant === "default"
            ? "from-primary to-accent-teal"
            : "from-accent-teal to-primary"
        }`}
      />
      {label}
    </div>
  );
}

/* ── Main About Section ── */
export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative pt-16 pb-10 sm:pt-24 sm:pb-12 md:pt-32 md:pb-16">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-pattern absolute inset-0 opacity-[0.03]" />
        {/* Large blob top-right — slow diagonal drift */}
        <div
          className="absolute -right-24 -top-0 h-[450px] w-[450px] opacity-[0.12]"
          style={{
            background:
              "linear-gradient(160deg, var(--color-primary-light), var(--color-accent))",
            animation:
              "blob 12s ease-in-out infinite, float-1 18s ease-in-out infinite",
            borderRadius: "50% 60% 40% 70% / 40% 70% 50% 60%",
          }}
        />
        {/* Medium blob bottom-left — reverse morph */}
        <div
          className="absolute bottom-32 -left-24 h-[380px] w-[380px] opacity-[0.10]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent-teal), var(--color-primary-light))",
            animation:
              "blob 14s ease-in-out infinite reverse, float-2 20s ease-in-out infinite",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
        {/* Small accent blob center — blurred glow */}
        <div
          className="absolute left-1/3 top-2/3 h-[220px] w-[220px] opacity-[0.08]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary), var(--color-accent-teal))",
            animation:
              "blob 10s ease-in-out infinite, float-3 14s ease-in-out infinite",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(40px)",
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
            About Me
          </span>
          <h2 className="mb-4 text-2xl font-bold text-[#2E3A3C] sm:text-3xl md:text-4xl lg:text-5xl">
            Get to Know Me
          </h2>
          <div className="mx-auto h-0.5 w-20 bg-[#81C784]" />
          <p className="mx-auto mt-4 max-w-xl text-body">
            A glimpse into who I am, what I do, and the technologies I work with
          </p>
        </motion.div>

        {/* ── Bio + Code Editor ── */}
        <div className="mb-12 sm:mb-20 grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
          {/* Left column – bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h3 className="mb-4 sm:mb-5 text-xl font-bold leading-snug text-heading sm:text-2xl md:text-3xl">
              A passionate developer{" "}
              <span className="text-gradient-animated">building</span> for the
              web
            </h3>
            <p className="mb-4 text-base leading-relaxed text-body sm:text-lg">
              I&apos;m an aspiring software engineer with a passion for creating
              elegant, user-friendly web applications. With a strong foundation
              in both frontend and backend technologies, I bring ideas to life
              through clean code and thoughtful design.
            </p>
            <p className="mb-6 sm:mb-8 text-base leading-relaxed text-body sm:text-lg">
              When I&apos;m not coding, you can find me exploring new
              technologies, contributing to open-source projects, or sharing
              knowledge through technical writing. I believe in continuous
              learning and pushing the boundaries of what&apos;s possible on the
              web.
            </p>

            {/* Trait badges */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {traits.map((trait, i) => (
                <motion.div
                  key={trait.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="group flex items-center gap-1.5 sm:gap-2 rounded-full border border-border-light bg-surface px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-body shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                >
                  <trait.icon
                    size={15}
                    className="text-primary transition-transform duration-300 group-hover:scale-110"
                  />
                  {trait.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column – code editor */}
          <CodeEditor />
        </div>

        {/* ── Skills ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="mb-10 text-center">
            <h3 className="text-xl font-bold text-heading sm:text-2xl md:text-3xl">
              Skills &amp;{" "}
              <span className="text-gradient-animated">Technologies</span>
            </h3>
            <p className="mt-2 text-body">
              The tools and frameworks I use to bring products to life
            </p>
          </div>

          {/* ── Infinite Marquee ── */}
          <div className="marquee-container relative -mx-4 sm:-mx-6 mb-10 sm:mb-14">
            {/* Fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--background)] to-transparent sm:w-20 md:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--background)] to-transparent sm:w-20 md:w-32" />

            {/* Row 1 – scrolls left */}
            <div className="mb-3 flex overflow-hidden py-1">
              <div
                className="marquee-track flex w-max"
                style={{ animation: "marquee-scroll 25s linear infinite" }}
              >
                {marqueeRow1.map((skill, i) => (
                  <MarqueePill key={`a-${i}`} label={skill} />
                ))}
                {marqueeRow1.map((skill, i) => (
                  <MarqueePill key={`b-${i}`} label={skill} />
                ))}
              </div>
            </div>

            {/* Row 2 – scrolls right */}
            <div className="flex overflow-hidden py-1">
              <div
                className="marquee-track flex w-max"
                style={{
                  animation: "marquee-scroll 30s linear infinite reverse",
                }}
              >
                {marqueeRow2.map((skill, i) => (
                  <MarqueePill key={`a-${i}`} label={skill} variant="alt" />
                ))}
                {marqueeRow2.map((skill, i) => (
                  <MarqueePill key={`b-${i}`} label={skill} variant="alt" />
                ))}
              </div>
            </div>
          </div>

          {/* ── Category Bento Grid ── */}
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border-light bg-surface p-4 sm:p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/8${
                  index === 0 || index === 3 ? " lg:col-span-2" : ""
                }`}
              >
                {/* Watermark number */}
                <span className="pointer-events-none absolute -bottom-3 -right-1 select-none text-[80px] font-black leading-none text-heading/[0.03] transition-all duration-500 group-hover:text-heading/[0.06]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Hover gradient blob */}
                <div
                  className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${skill.accent} opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-[0.12]`}
                />

                <div className="relative">
                  {/* Icon + Category */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${skill.accent} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <skill.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-heading">
                        {skill.category}
                      </h4>
                      <p className="text-xs text-muted">
                        {skill.description}
                      </p>
                    </div>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <span
                        key={item}
                        className="rounded-lg border border-border-light/60 bg-primary-lighter/50 px-3.5 py-1.5 text-xs font-semibold text-body transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary-light/60 group-hover:text-primary-dark"
                        style={{ transitionDelay: `${i * 60}ms` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
