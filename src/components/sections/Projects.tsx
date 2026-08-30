"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import {
  Github,
  ArrowUpRight,
  Layers,
  Wallet,
  Shield,
  Layout,
  Code2,
  Terminal,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { handleSmoothNavigation } from "@/utils/navigation";
import Image from "next/image";
import { useSmartInView } from "@/hooks/useSmartInView";

/* ══════════════════════════════════════════════════
   Project Data
   ══════════════════════════════════════════════════ */

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  accent: string;
  icon: LucideIcon;
  mockUrl: string;
  mockupType: "desktop" | "mobile" | "algorithm" | "koin-app" | "terminal" | "pars-app";
}

const projects: Project[] = [
  {
    title: "Koin",
    subtitle: "Personal Finance Tracker",
    description:
      "A sophisticated personal finance tracker built with Flutter. Designed to offer a premium and effortless experience for managing money, featuring automated categorization and rich, interactive analytics.",
    tags: ["Flutter", "Dart", "Riverpod", "SQLite", "NLP", "Voice Recognition"],
    github: "https://github.com/KlyrhonMiko/koin",
    live: "https://klyrhon.me/koin?ref=portfolio",
    accent: "#14d2a5",
    icon: Wallet,
    mockUrl: "klyrhon.me/koin",
    mockupType: "koin-app",
  },
  {
    title: "pars.",
    subtitle: "AI-Enhanced ATS Resume Builder",
    description:
      "A modern ATS resume builder featuring a live preview editor and AI-powered bullet point optimization powered by Groq (Llama 3.1). Build professional, ATS-friendly resumes seamlessly.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Groq AI", "Supabase", "React PDF"],
    live: "https://usepars.vercel.app",
    accent: "#ffffff", // Monochrome white to match the app's minimalist design
    icon: FileText,
    mockUrl: "usepars.vercel.app",
    mockupType: "pars-app",
  },
  {
    title: "nulll",
    subtitle: "Interactive Python Code Visualizer",
    description:
      "An in-browser Python execution environment and visualizer. It allows users to write Python code and interactively step through its execution, visualizing algorithms and data structures in real-time.",
    tags: ["Next.js", "TypeScript", "Pyodide", "Web Workers", "D3.js", "Framer Motion"],
    github: "https://github.com/KlyrhonMiko/nulll",
    live: "https://klyrhon.me/nulll?ref=portfolio",
    accent: "#3b82f6",
    icon: Code2,
    mockUrl: "klyrhon.me/nulll",
    mockupType: "algorithm",
  },
  {
    title: "Kly Skills Installer",
    subtitle: "Interactive CLI for Agentic Workflows",
    description:
      "A guided command-line utility powered by @clack/prompts. It provides an interactive experience to seamlessly browse and install a curated collection of Antigravity AI skills into your local environment.",
    tags: ["Node.js", "CLI", "@clack/prompts", "Agentic AI"],
    github: "https://github.com/KlyrhonMiko/kly-skills",
    live: "https://kly-skills.vercel.app",
    accent: "#10b981",
    icon: Terminal,
    mockUrl: "npx kly-skills",
    mockupType: "terminal",
  },
  {
    title: "P.A.C.E",
    subtitle: "Pasig Alumni Career & Employability System",
    description:
      "A platform for Pasig City Alumni to find jobs, internships, and career opportunities. It leverages machine learning for smart job matching, seamlessly connecting graduates with relevant career paths.",
    tags: ["Next.js", "Supabase", "Python", "FastAPI", "Machine Learning"],
    github: "https://github.com/KlyrhonMiko/pace",
    accent: "#10b981",
    icon: Layers,
    mockUrl: "localhost:3000",
    mockupType: "desktop",
  },
];

/* ══════════════════════════════════════════════════
   Animation Variants
   ══════════════════════════════════════════════════ */

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const mockupVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const skeletonLineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (custom: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: {
      delay: 0.4 + custom * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const floatAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/* ══════════════════════════════════════════════════
   Minimalist Mockup Components
   ══════════════════════════════════════════════════ */

const TerminalMockup = ({ project }: { project: Project }) => {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useSmartInView(containerRef, { once: false, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : 0));
    }, 2000); // Change step every 2 seconds
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      ref={containerRef}
      variants={mockupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-[600px] perspective-[1000px] relative group mx-auto"
    >
      {/* Ambient Glow */}
      <div
        className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000"
        style={{ backgroundColor: project.accent }}
      />

      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="rounded-xl border border-border-light bg-[#0a0a0a] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] overflow-hidden transition-shadow duration-700 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] relative z-10"
      >
        {/* Terminal Chrome */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-[#111111] border-b border-[#222]">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-xs text-muted/70 font-medium font-mono">agy ~ bash</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-5 sm:p-6 h-[340px] sm:h-[380px] bg-[#0a0a0a] font-mono text-sm overflow-hidden flex flex-col gap-3">
          {/* Command Entry */}
          <div className="flex items-center gap-2 text-muted">
            <span className="text-emerald-500 font-bold">➜</span>
            <span className="text-blue-400 font-bold">portfolio</span>
            <div className="relative">
              <motion.span>
                {step === 0 ? "" : "npx kly-skills"}
              </motion.span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-white/70 ml-1 translate-y-0.5"
                style={{ display: step === 0 ? "inline-block" : "none" }}
              />
            </div>
          </div>

          {/* Interactive Menu Step */}
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 space-y-2"
            >
              <div className="text-emerald-400 font-bold">? <span className="text-white font-medium">Select skills to install:</span> <span className="text-muted/60 text-xs font-normal">(Press &lt;space&gt; to select, &lt;enter&gt; to proceed)</span></div>
              <div className="pl-4 space-y-1 text-muted/80">
                <div className="text-emerald-400">❯ ◉ animate</div>
                <div>  ◯ apple-design</div>
                <div className="text-emerald-400">  ◉ brandkit</div>
                <div>  ◯ minimalist-ui</div>
              </div>
            </motion.div>
          )}

          {/* Installation Progress */}
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-1.5 mt-2"
            >
              <div className="text-muted/60 mb-2">Installing selected skills...</div>
              {[
                { name: "animate", path: "skills/animate" },
                { name: "brandkit", path: "skills/brandkit" },
              ].map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-3 text-xs"
                >
                  <span className="text-emerald-500">✔</span>
                  <span className="text-muted/60">Downloaded</span>
                  <span className="text-emerald-400">{skill.name}</span>
                  <span className="text-muted/40 hidden sm:inline">→ ~/.gemini/config/{skill.path}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Completion */}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-muted"
            >
              <span className="text-emerald-500 font-bold">✔</span> Successfully installed 2 skills.
            </motion.div>
          )}

          {/* Next prompt */}
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-2 text-muted mt-2"
            >
              <span className="text-emerald-500 font-bold">➜</span>
              <span className="text-blue-400 font-bold">portfolio</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-white/70 ml-1 translate-y-0.5"
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const generateBubbleSortFrames = (initialArray: number[]) => {
  const frames: { array: number[], active: number[], verified: number[] }[] = [];
  const arr = [...initialArray];

  frames.push({ array: [...arr], active: [], verified: [] });

  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      frames.push({ array: [...arr], active: [j, j + 1], verified: [] });
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
        frames.push({ array: [...arr], active: [j, j + 1], verified: [] });
      }
    }
    if (!swapped) break;
  }

  const verified: number[] = [];
  for (let k = 0; k < arr.length; k++) {
    verified.push(k);
    frames.push({ array: [...arr], active: [], verified: [...verified] });
  }

  for (let k = 0; k < 12; k++) {
    frames.push({ array: [...arr], active: [], verified: [...verified] });
  }
  return frames;
};

const AlgorithmVisualizerMockup = ({ project }: { project: Project }) => {
  // Use a deterministic array for the initial render to prevent SSR hydration mismatches
  const [frames, setFrames] = useState(() => generateBubbleSortFrames([80, 20, 60, 40, 90, 30, 70, 50]));
  const [frameIndex, setFrameIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useSmartInView(containerRef, { once: false, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setFrameIndex((prev) => prev + 1);
    }, 300);
    return () => clearInterval(interval);
  }, [isInView]);

  useEffect(() => {
    if (frameIndex >= frames.length) {
      // Shuffle the array elements for the next run
      const elements = [20, 30, 40, 50, 60, 70, 80, 90];
      const newArr = elements.sort(() => Math.random() - 0.5);
      setFrames(generateBubbleSortFrames(newArr));
      setFrameIndex(0);
    }
  }, [frameIndex, frames.length]);

  const currentFrame = frames[frameIndex] || frames[frames.length - 1];

  return (
    <motion.div
      ref={containerRef}
      variants={mockupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full max-w-[600px] perspective-[1000px] relative group mx-auto"
    >
      {/* Ambient Glow */}
      <div
        className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000"
        style={{ backgroundColor: project.accent }}
      />

      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="rounded-xl border border-border-light bg-surface shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden transition-shadow duration-700 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] relative z-10"
      >
        {/* Browser Chrome */}
        <div className="flex items-center gap-2 border-b border-border-light px-3 sm:px-4 py-2 sm:py-3 bg-surface-elevated/30">
          <div className="flex gap-1 sm:gap-1.5">
            <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-border-light group-hover:bg-[#ff5f56] transition-colors duration-500" />
            <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-border-light group-hover:bg-[#ffbd2e] transition-colors duration-500 delay-75" />
            <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-border-light group-hover:bg-[#27c93f] transition-colors duration-500 delay-150" />
          </div>
          <div className="ml-2 sm:ml-4 flex items-center justify-center flex-1 max-w-[200px] sm:max-w-[240px] rounded bg-surface border border-border-light/50 px-2 py-0.5 sm:py-1 transition-colors duration-500 group-hover:border-border-light">
            <span className="text-[9px] sm:text-[10px] text-muted font-medium truncate transition-colors duration-500 group-hover:text-body">
              {project.mockUrl}
            </span>
          </div>
        </div>

        {/* IDE & Visualizer Content */}
        <div className="flex flex-col sm:flex-row h-[280px] sm:h-[320px] bg-surface">
          {/* Editor Side */}
          <div className="w-full sm:w-5/12 border-b sm:border-b-0 sm:border-r border-border-light/50 p-4 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-4 h-4 text-muted" />
              <span className="text-xs font-mono text-muted">main.py</span>
            </div>
            {/* Code Lines */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={skeletonLineVariants}
                className="h-2 rounded-full bg-border-light/40 origin-left"
                style={{
                  width: `${(i * 17) % 40 + 40}%`,
                  marginLeft: i > 1 && i < 5 ? '16px' : '0px'
                }}
              />
            ))}
          </div>

          {/* Visualizer Side */}
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: project.accent }} />
              <span className="text-xs font-mono text-muted">Visualization</span>
            </div>

            {/* Sorting Animation */}
            <div className="flex-1 flex justify-center items-end gap-1.5 sm:gap-2 px-4 pb-4">
              {currentFrame.array.map((height, index) => {
                const isActive = currentFrame.active.includes(index);
                const isVerified = currentFrame.verified.includes(index);

                let bgColor = isActive ? project.accent : "var(--border-light)";
                let opacity = isActive ? 1 : 0.3;

                if (isVerified) {
                  bgColor = "#10b981"; // Emerald-500
                  opacity = 1;
                }

                return (
                  <motion.div
                    key={height}
                    layout="position"
                    className="w-4 sm:w-6 rounded-t-sm origin-bottom"
                    style={{ height: `${height}%` }}
                    animate={{
                      backgroundColor: bgColor,
                      opacity: opacity
                    }}
                    transition={{
                      layout: { type: "tween", duration: 0.2, ease: "circOut" },
                      backgroundColor: { duration: 0.15 },
                      opacity: { duration: 0.15 }
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const layerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0, duration: 0.8 } },
  enter: { opacity: 0, y: 60, scale: 0.9, filter: "blur(4px)" },
  center: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", bounce: 0.15, duration: 0.8 } },
  exit: { opacity: 0, y: -60, scale: 0.9, filter: "blur(4px)", transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
};

export const ParsAppMockup = ({ project, isHero }: { project: Project; isHero?: boolean }) => {
  return (
    <motion.div
      {...(!isHero && {
        variants: mockupVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-100px" },
      })}
      className="relative w-full max-w-[600px] group mx-auto flex items-center justify-center min-h-[500px] lg:min-h-[600px]"
    >
      {/* Ambient Glow */}
      <div
        className="absolute inset-0 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 rounded-full scale-110"
        style={{ backgroundColor: project.accent }}
      />

      <div className="relative w-full h-full">

          {/* Layer 1 (Back): Landing */}
          <motion.div variants={layerVariants} className="absolute z-0 left-[5%] right-[15%] top-[5%]">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              className="w-full h-full"
            >  <div className="w-full rounded-xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 bg-[#0a0a0a] transition-all duration-700 ease-out group-hover:-translate-y-8 group-hover:-translate-x-6 group-hover:-rotate-6 group-hover:scale-105">
              <div className="flex items-center gap-1.5 px-3 h-7 bg-white/[0.02] border-b border-white/[0.05]">
                <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
              </div>
              <div className="relative">
                <Image
                  src="/pars/landing.jpeg"
                  alt="Landing"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
              </div>
            </div>
          </motion.div>
          </motion.div>

          {/* Layer 2 (Middle): Main Editor */}
          <motion.div variants={layerVariants} className="absolute z-10 left-[7.5%] right-[7.5%] top-[25%] lg:top-[30%]">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="w-full"
            >
            <div className="w-full rounded-xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-white/15 bg-[#0a0a0a] transition-all duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2">
              <div className="flex items-center gap-1.5 px-3 h-8 bg-white/[0.03] border-b border-white/[0.08]">
                <div className="h-2 w-2 rounded-full bg-white/20" />
                <div className="h-2 w-2 rounded-full bg-white/20" />
                <div className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <div className="relative">
                <Image
                  src="/pars/main-view.jpeg"
                  alt="Main Editor"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
              </div>
            </div>
          </motion.div>
          </motion.div>

          {/* Layer 3 (Front): Resume Grading */}
          <motion.div variants={layerVariants} className="absolute z-20 left-[15%] right-[5%] top-[45%] lg:top-[55%]">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
              className="w-full"
            >
              <div className="w-full rounded-xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] border border-white/20 bg-[#0a0a0a] transition-all duration-700 ease-out group-hover:translate-y-8 group-hover:translate-x-6 group-hover:rotate-6 group-hover:scale-105">
              <div className="flex items-center gap-1.5 px-3 h-7 bg-white/[0.02] border-b border-white/[0.05]">
                <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
              </div>
              <Image
                src="/pars/resume-grading.jpeg"
                alt="Resume Grading"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
              />
              </div>
            </motion.div>
          </motion.div>

      </div>
    </motion.div>
  );
};

const MinimalDesktopMockup = ({ project }: { project: Project }) => (
  <motion.div
    variants={mockupVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    className="w-full max-w-[600px] perspective-[1000px] relative group mx-auto"
  >
    {/* Ambient Glow behind mockup */}
    <div
      className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000"
      style={{ backgroundColor: project.accent }}
    />

    <motion.div
      animate={floatAnimation}
      className="rounded-xl border border-border-light bg-surface shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-700 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] group-hover:-translate-y-2 relative z-10"
    >
      {/* Browser Chrome */}
      <div className="flex items-center gap-2 border-b border-border-light px-3 sm:px-4 py-2 sm:py-3 bg-surface-elevated/30">
        <div className="flex gap-1 sm:gap-1.5">
          <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-border-light group-hover:bg-[#ff5f56] transition-colors duration-500" />
          <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-border-light group-hover:bg-[#ffbd2e] transition-colors duration-500 delay-75" />
          <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-border-light group-hover:bg-[#27c93f] transition-colors duration-500 delay-150" />
        </div>
        <div className="ml-2 sm:ml-4 flex items-center justify-center flex-1 max-w-[200px] sm:max-w-[240px] rounded bg-surface border border-border-light/50 px-2 py-0.5 sm:py-1 transition-colors duration-500 group-hover:border-border-light">
          <span className="text-[9px] sm:text-[10px] text-muted font-medium truncate transition-colors duration-500 group-hover:text-body">
            {project.mockUrl}
          </span>
        </div>
      </div>

      {/* Wireframe Content */}
      <div className="p-5 sm:p-8 space-y-6 sm:space-y-8 bg-surface">
        <div className="flex items-center gap-4 sm:gap-5">
          <motion.div
            variants={itemVariants}
            className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl transition-colors duration-500"
            style={{ backgroundColor: `${project.accent}15` }}
          >
            <project.icon className="h-5 w-5 sm:h-7 sm:w-7 transition-colors duration-500" style={{ color: project.accent }} />
          </motion.div>
          <div className="space-y-2.5 sm:space-y-3 flex-1">
            <motion.div custom={0} variants={skeletonLineVariants} className="h-2.5 sm:h-3 w-1/3 rounded-full bg-border-light/80 origin-left" />
            <motion.div custom={1} variants={skeletonLineVariants} className="h-1.5 sm:h-2 w-1/4 rounded-full bg-border-light/40 origin-left" />
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3">
          <motion.div custom={2} variants={skeletonLineVariants} className="h-1.5 sm:h-2 w-full rounded-full bg-border-light/40 origin-left" />
          <motion.div custom={3} variants={skeletonLineVariants} className="h-1.5 sm:h-2 w-[90%] rounded-full bg-border-light/40 origin-left" />
          <motion.div custom={4} variants={skeletonLineVariants} className="h-1.5 sm:h-2 w-[75%] rounded-full bg-border-light/40 origin-left" />
        </div>
        <motion.div
          variants={itemVariants}
          className="h-24 sm:h-36 w-full rounded-lg sm:rounded-xl bg-surface-elevated/50 border border-border-light/50 relative overflow-hidden group/box"
        >
          {/* Subtle moving gradient inside wireframe box */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover/box:opacity-100 transition-opacity duration-1000"
            style={{ background: `linear-gradient(45deg, transparent, ${project.accent}10, transparent)` }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </motion.div>
  </motion.div>
);

const MinimalMobileMockup = ({ project }: { project: Project }) => (
  <motion.div
    variants={mockupVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    className="relative w-[220px] sm:w-[280px] perspective-[1000px] group mx-auto"
  >
    {/* Ambient Glow */}
    <div
      className="absolute inset-0 blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000 rounded-[2rem] sm:rounded-[3rem]"
      style={{ backgroundColor: project.accent }}
    />

    <motion.div
      animate={{ y: [0, -8, 0], rotateZ: [0, 1, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
      className="relative rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[10px] border-surface-elevated bg-surface shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-700 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] group-hover:-translate-y-2 z-10"
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 sm:h-6 w-24 sm:w-32 bg-surface-elevated rounded-b-xl sm:rounded-b-2xl z-20 transition-colors duration-500 group-hover:bg-border-light/80" />

      {/* Wireframe Content */}
      <div className="p-4 sm:p-6 pt-10 sm:pt-14 space-y-6 sm:space-y-8 h-[420px] sm:h-[560px] relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5">
          <motion.div
            variants={itemVariants}
            className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl transition-colors duration-500"
            style={{ backgroundColor: `${project.accent}15` }}
          >
            <project.icon className="h-6 w-6 sm:h-8 sm:w-8 transition-colors duration-500" style={{ color: project.accent }} />
          </motion.div>
          <div className="space-y-2 sm:space-y-2.5 w-full flex flex-col items-center">
            <motion.div custom={0} variants={skeletonLineVariants} className="h-2 sm:h-3 w-3/5 rounded-full bg-border-light/80 origin-center" />
            <motion.div custom={1} variants={skeletonLineVariants} className="h-1.5 sm:h-2 w-2/5 rounded-full bg-border-light/40 origin-center" />
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="h-12 sm:h-16 w-full rounded-xl sm:rounded-2xl bg-surface-elevated/50 border border-border-light/50 flex items-center px-3 sm:px-4 gap-3 sm:gap-4 overflow-hidden relative group/item"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-700"
                style={{ background: `linear-gradient(90deg, transparent, ${project.accent}0a, transparent)` }}
              />
              <motion.div custom={i} variants={skeletonLineVariants} className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 rounded-full bg-border-light/50 origin-center" />
              <div className="space-y-1.5 sm:space-y-2 flex-1">
                <motion.div custom={i + 2} variants={skeletonLineVariants} className="h-1.5 sm:h-2 w-3/4 rounded-full bg-border-light/80 origin-left" />
                <motion.div custom={i + 3} variants={skeletonLineVariants} className="h-1 sm:h-1.5 w-1/2 rounded-full bg-border-light/40 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 h-1 w-20 sm:w-24 rounded-full bg-border-light/80 z-20" />
    </motion.div>
  </motion.div>
);

export const KoinAppMockup = ({ project, isHero }: { project: Project; isHero?: boolean }) => {
  return (
    <motion.div
      {...(!isHero && {
        variants: mockupVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-100px" },
      })}
      className="relative w-[280px] sm:w-[320px] lg:w-[350px] perspective-[1200px] group mx-auto flex items-center justify-center min-h-[400px]"
    >
      {/* Ambient Glow */}
      <div
        className="absolute inset-0 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 rounded-full scale-150"
        style={{ backgroundColor: project.accent }}
      />

      <div className="relative w-[180px] sm:w-[220px] lg:w-[240px] flex items-center justify-center">
          {/* Card 3: Budgets (Right - Behind) */}
          <motion.div variants={layerVariants} className="absolute z-0 top-[5%] -right-[40%] sm:-right-[45%] w-[130px] sm:w-[160px] lg:w-[180px]">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotateZ: [8, 10, 8],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="w-full h-full"
            >
            <div className="relative w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl border border-white/10 bg-surface transition-all duration-700 ease-out group-hover:translate-x-6 group-hover:-translate-y-4 group-hover:rotate-6 group-hover:scale-105">
              <Image
                src="/koin/budgets-light.png"
                alt="Budgets"
                width={1080}
                height={2400}
                className="w-full h-auto object-cover dark:hidden"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <Image
                src="/koin/budgets-dark.png"
                alt="Budgets"
                width={1080}
                height={2400}
                className="w-full h-auto object-cover hidden dark:block"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/10 dark:bg-black/40 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>

          {/* Card 2: Activity (Left - Front) */}
          <motion.div variants={layerVariants} className="absolute z-20 bottom-[5%] -left-[40%] sm:-left-[45%] w-[130px] sm:w-[160px] lg:w-[180px]">
            <motion.div
              animate={{
                y: [0, 10, 0],
                rotateZ: [-10, -12, -10],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="w-full h-full"
            >
            <div className="relative w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] border border-white/10 bg-surface transition-all duration-700 ease-out group-hover:-translate-x-6 group-hover:translate-y-4 group-hover:-rotate-6 group-hover:scale-105">
              <Image
                src="/koin/activity-light.png"
                alt="Activity"
                width={1080}
                height={2400}
                className="w-full h-auto object-cover dark:hidden"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <Image
                src="/koin/activity-dark.png"
                alt="Activity"
                width={1080}
                height={2400}
                className="w-full h-auto object-cover hidden dark:block"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          </motion.div>
        </motion.div>

          {/* Main Card: Home (Center) */}
          <motion.div variants={layerVariants} className="relative z-10 w-full">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="relative w-full h-full rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border border-white/15 bg-surface transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-105">
                <Image
                  src="/koin/home-light.png"
                  alt="Home"
                  width={1080}
                  height={2400}
                  className="w-full h-auto object-cover dark:hidden"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <Image
                  src="/koin/home-dark.png"
                  alt="Home"
                  width={1080}
                  height={2400}
                  className="w-full h-auto object-cover hidden dark:block"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════
   Alternating Project Row
   ══════════════════════════════════════════════════ */

const ProjectRow = ({ project: projectData, currentDomain, protocol, index }: { project: Project; currentDomain: string; protocol: string; index: number }) => {
  const isReversed = index % 2 === 0;
  const paddingClass = index === 0 ? "pb-16 lg:pb-32" : "py-16 lg:py-32";

  const project = {
    ...projectData,
    live: projectData.live?.replace("https://klyrhon.me", `${protocol}//${currentDomain}`),
    mockUrl: projectData.mockUrl.replace("klyrhon.me", currentDomain),
  };

  const rowRef = useRef<HTMLDivElement>(null);
  const isMockupInView = useSmartInView(rowRef, { once: true, margin: "0px 0px 400px 0px" });

  return (
    <div id={`project-${project.mockupType}`} ref={rowRef} className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 sm:gap-12 lg:gap-24 ${paddingClass} relative`}>

      {/* Connecting Scroll Line (Desktop only) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border-light/30 hidden lg:block -z-10" />

      {/* Mockup Side */}
      <div className="w-full lg:w-1/2 flex justify-center relative z-10 min-h-[400px] lg:min-h-[500px]">
        {isMockupInView ? (
          project.mockupType === "pars-app" ? (
            <ParsAppMockup project={project} />
          ) : project.mockupType === "koin-app" ? (
            <KoinAppMockup project={project} />
          ) : project.mockupType === "mobile" ? (
            <MinimalMobileMockup project={project} />
          ) : project.mockupType === "algorithm" ? (
            <AlgorithmVisualizerMockup project={project} />
          ) : project.mockupType === "terminal" ? (
            <TerminalMockup project={project} />
          ) : (
            <MinimalDesktopMockup project={project} />
          )
        ) : (
          <div className="w-full max-w-[600px] opacity-0" />
        )}
      </div>

      {/* Content Side with Staggered Reveal */}
      <div className="w-full lg:w-1/2 flex flex-col items-start relative z-10">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-start"
        >
          {/* Subheader */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <span
              className="text-sm font-semibold tracking-[0.2em] uppercase"
              style={{ color: project.accent }}
            >
              0{index + 1}
            </span>
            <div className="h-px w-8" style={{ backgroundColor: project.accent, opacity: 0.5 }} />
            <span className="text-xs font-medium tracking-widest uppercase text-muted">
              {project.mockupType === "mobile" || project.mockupType === "koin-app" ? "Mobile Application" : project.mockupType === "terminal" ? "Terminal Workflow" : "Web Platform"}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h3 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-heading tracking-tight mb-4 group inline-block">
            {project.title}
            <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out mt-1" style={{ backgroundColor: project.accent }} />
          </motion.h3>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-lg font-medium text-heading/80 mb-5">
            {project.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p variants={itemVariants} className="text-body leading-relaxed mb-8 max-w-[90%]">
            {project.description}
          </motion.p>

          {/* Tags - Editorial Prose */}
          <motion.div variants={itemVariants} className="mb-10 w-full pt-4 border-t border-border-light/30 group/tags transition-colors duration-500 hover:border-border-light/60">
            <p
              className="text-sm md:text-[15px] leading-relaxed text-body/50 font-light transition-colors duration-700 group-hover/tags:text-[var(--project-accent)]"
              style={{ "--project-accent": project.accent } as React.CSSProperties}
            >
              {project.tags.join(", ")}.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants} className="flex gap-6 items-center">
            {project.live && (
              <a
                href={project.live}
                onClick={(e) => handleSmoothNavigation(e, project.live!, null)}
                className="group relative inline-flex items-center gap-2 text-sm font-semibold overflow-hidden px-4 py-2 rounded-full transition-all"
                style={{ color: project.accent }}
              >
                <div className="absolute inset-0 rounded-full opacity-10 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" style={{ backgroundColor: project.accent }} />
                <span className="relative z-10">View Project</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-heading transition-colors px-2 py-2"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                Source Code
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   Main Section
   ══════════════════════════════════════════════════ */

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentDomain, setCurrentDomain] = useState("klyrhon.me");
  const [protocol, setProtocol] = useState("https:");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentDomain(window.location.host);
      setProtocol(window.location.protocol);
    }
  }, []);

  // Parallax line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-24 lg:py-32 w-full relative">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">

        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-heading tracking-tight mb-6 flex items-center gap-4">
            Selected Works
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="h-1 bg-primary/30 rounded-full hidden md:block"
            />
          </h2>
          <p className="text-lg text-body max-w-2xl leading-relaxed">
            A showcase of recent projects highlighting a focus on clean design, robust architecture, and seamless user experiences across web and mobile platforms.
          </p>
        </motion.div>

        {/* ─── Project Rows Container ─── */}
        <div className="flex flex-col relative">

          {/* Dynamic Progress Line (Desktop only) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden lg:block z-0">
            <motion.div
              className="w-full h-full bg-primary origin-top"
              style={{ scaleY: lineHeight, opacity: 0.3 }}
            />
          </div>

          {projects.map((project, index) => (
            <ProjectRow key={project.title} project={project} currentDomain={currentDomain} protocol={protocol} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
