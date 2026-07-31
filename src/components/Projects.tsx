"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import {
  Github,
  ArrowUpRight,
  Layers,
  Wallet,
  Shield,
  Layout,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ══════════════════════════════════════════════════
   Project Data
   ══════════════════════════════════════════════════ */

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  accent: string;
  icon: LucideIcon;
  mockUrl: string;
  mockupType: "desktop" | "mobile";
}

const projects: Project[] = [
  {
    title: "Koin",
    subtitle: "Personal Finance Tracker",
    description:
      "A sophisticated personal finance tracker built with Flutter. Designed to offer a premium and effortless experience for managing money, featuring automated categorization and rich, interactive analytics.",
    tags: ["Flutter", "Dart", "Riverpod", "SQLite", "Data Visualization"],
    github: "https://github.com/KlyrhonMiko/koin",
    live: "https://klyrhon.tech/koin?ref=portfolio",
    accent: "#f59e0b",
    icon: Wallet,
    mockUrl: "klyrhon.tech/koin",
    mockupType: "mobile",
  },
  {
    title: "P.A.C.E",
    subtitle: "Pasig Alumni Career & Employability System",
    description:
      "A platform for Pasig City Alumni to find jobs, internships, and career opportunities. It leverages machine learning for smart job matching, seamlessly connecting graduates with relevant career paths.",
    tags: ["Next.js", "React", "FastAPI", "PostgreSQL", "Supabase", "Machine Learning"],
    github: "https://github.com/KlyrhonMiko/pace",
    accent: "#10b981",
    icon: Layers,
    mockUrl: "localhost:3000",
    mockupType: "desktop",
  },
  {
    title: "HRMO System",
    subtitle: "Personnel Digitization & Records Management",
    description:
      "A comprehensive human resource management system featuring role-based access, automated 201 file management, PDS data entry, and integrated analytics for local government units.",
    tags: ["Next.js", "React", "FastAPI", "Recharts", "PostgreSQL"],
    github: "https://github.com/KlyrhonMiko/hrmo",
    accent: "#059669",
    icon: Shield,
    mockUrl: "localhost:3000",
    mockupType: "desktop",
  },
  {
    title: "JTCI Gallery",
    subtitle: "Premium Flooring & Interiors",
    description:
      "A corporate website showcasing an extensive collection of high-end broadloom carpets, modular tiles, and luxury window treatments, built with a focus on fast load times and clean presentation.",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    accent: "#b45309",
    icon: Layout,
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
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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

const MinimalDesktopMockup = ({ project }: { project: Project }) => (
  <motion.div
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

/* ══════════════════════════════════════════════════
   Alternating Project Row
   ══════════════════════════════════════════════════ */

const ProjectRow = ({ project, index }: { project: Project; index: number }) => {
  const isReversed = index % 2 === 0;

  return (
    <div className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-8 sm:gap-12 lg:gap-24 py-16 lg:py-32 relative`}>
      
      {/* Connecting Scroll Line (Desktop only) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border-light/30 hidden lg:block -z-10" />

      {/* Mockup Side */}
      <div className="w-full lg:w-1/2 flex justify-center relative z-10">
        {project.mockupType === "mobile" ? (
          <MinimalMobileMockup project={project} />
        ) : (
          <MinimalDesktopMockup project={project} />
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
              {project.mockupType === "mobile" ? "Mobile Application" : "Web Platform"}
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

          {/* Tags */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                style={{ "--project-accent": project.accent } as React.CSSProperties}
                className="px-3 py-1.5 rounded-md text-[11px] font-medium bg-surface-elevated border border-border-light text-body/80 cursor-default transition-all duration-200 hover:bg-surface hover:border-[var(--project-accent)] hover:text-[var(--project-accent)]"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants} className="flex gap-6 items-center">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
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
  
  // Parallax line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="projects" ref={containerRef} className="py-24 lg:py-32 w-full relative">
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
               className="w-full bg-primary origin-top"
               style={{ height: lineHeight, opacity: 0.3 }}
             />
           </div>

          {projects.map((project, index) => (
            <ProjectRow key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
