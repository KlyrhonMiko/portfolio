"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Github, ArrowUpRight, ExternalLink, Layers, Wallet, Wifi, Battery, Signal, Layout, Shield } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "P.A.C.E",
    subtitle: "Pasig Alumni Career & Employability System",
    description:
      "A platform for Pasig City Alumni to find jobs, internships, and career opportunities — powered by machine learning for smart job matching.",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "FastAPI",
      "PostgreSQL",
      "Supabase",
      "Machine Learning",
    ],
    github: "https://github.com/KlyrhonMiko/pace",
    accent: "#6db38a",
    icon: Layers,
    mockUrl: "localhost:3000",
    mockupType: "desktop" as const,
  },
  {
    title: "Koin",
    subtitle: "Personal Finance Tracker",
    description:
      "A sophisticated personal finance tracker built with Flutter, designed to offer a premium and effortless experience for managing your money. It features multi-account support, automated transaction categorization, and insightful analytics to help you stay on top of your financial goals with ease.",
    tags: [
      "Flutter",
      "Dart",
      "Riverpod",
      "SQLite",
      "Data Visualization",
    ],
    github: "https://github.com/KlyrhonMiko/koin",
    accent: "#f5a623",
    icon: Wallet,
    mockUrl: "koin.app",
    mockupType: "mobile" as const,
    live: undefined,
  },
  {
    title: "HRMO System",
    subtitle: "Personnel Digitization & Records Management",
    description:
      "A comprehensive human resource management system featuring role-based access for HR Heads, Record Assistants, and Employees. It manages employee 201 files, PDS data entry, certificate scanning, and training records with integrated analytics and reporting.",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "FastAPI",
      "Recharts",
      "PostgreSQL",
    ],
    github: "https://github.com/KlyrhonMiko/hrmo",
    accent: "#15803d",
    icon: Shield,
    mockUrl: "hrmo.ph",
    mockupType: "desktop" as const,
  },
  {
    title: "JTCI Carpet Gallery",
    subtitle: "Premium Flooring & Interiors",
    description:
      "A premium corporate website for JTCI Carpet Gallery Corporation, showcasing their extensive collection of high-end broadloom carpets, modular tiles, and luxury window treatments with a focus on timeless craft and quality.",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Company Website",
    ],
    github: "https://github.com/KlyrhonMiko/jtci",
    accent: "#9c6f4a",
    icon: Layout,
    mockUrl: "jtci.ph",
    mockupType: "desktop" as const,
  },
];

function ProjectCard({ project, index, isMobile }: { project: typeof projects[number]; index: number; isMobile: boolean }) {
  const Icon = project.icon;

  return (
    <motion.div
      initial={isMobile ? { opacity: 0, y: 40 } : undefined}
      whileInView={isMobile ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="projects-card group relative flex-shrink-0 w-full md:w-[clamp(700px,55vw,920px)]"
    >
      <div
        className="project-card-inner relative h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-border-light bg-surface/80 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_25px_60px_-12px_rgba(109,179,138,0.15)]"
        style={{
          borderColor: `color-mix(in srgb, ${project.accent} 12%, var(--color-border-light))`,
        }}
      >
        {/* Accent glow on hover */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${project.accent}08, transparent 40%, ${project.accent}05)`,
          }}
        />

        {/* Inner grid: mockup top/left, content bottom/right */}
        <div className="relative flex flex-col md:grid md:grid-cols-[1fr_1.2fr] h-full">

          {/* === Left: Mockup showcase === */}
          <div
            className="relative flex items-center justify-center overflow-hidden p-6 sm:p-8 md:p-10"
            style={{
              background: `linear-gradient(160deg, ${project.accent}08, ${project.accent}03 50%, transparent)`,
            }}
          >
            {/* Subtle radial glow */}
            <div
              className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] transition-opacity duration-500 opacity-[0.06] group-hover:opacity-[0.12]"
              style={{ background: project.accent }}
            />

            {/* Decorative grid dots */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `radial-gradient(circle, ${project.accent} 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Project number watermark */}
            <span
              className="absolute top-4 left-5 text-[72px] sm:text-[96px] font-black leading-none select-none opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.07]"
              style={{ color: project.accent }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Mock device */}
            <div
              className={`relative z-10 w-full overflow-hidden transition-all duration-700 ease-out group-hover:-translate-y-1.5 ${project.mockupType === "mobile"
                ? "max-w-[160px] sm:max-w-[180px] h-[280px] sm:h-[320px] rounded-[2.2rem] border-[5px]"
                : "max-w-[300px] sm:max-w-[380px] rounded-xl border"
                }`}
              style={{
                borderColor: project.mockupType === "mobile" ? "#1a1a1a" : `${project.accent}18`,
                background: "#ffffff",
                boxShadow: `0 20px 60px -10px ${project.accent}18, 0 8px 20px -8px rgba(0,0,0,0.06)`,
              }}
            >
              {/* Frame chrome */}
              {project.mockupType === "mobile" ? (
                <div className="relative">
                  <div className="flex items-center justify-between px-5 pt-3 pb-1 relative z-20">
                    <span className="text-[10px] sm:text-[9px] font-bold text-gray-900">9:41</span>
                    <div className="flex items-center gap-1">
                      <Signal className="h-2.5 w-2.5 sm:h-2 sm:w-2 text-gray-900" />
                      <Wifi className="h-2.5 w-2.5 sm:h-2 sm:w-2 text-gray-900" />
                      <Battery className="h-2.5 w-2.5 sm:h-2 sm:w-2 text-gray-900" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 h-3.5 sm:h-3.5 w-[70px] sm:w-[70px] rounded-full bg-black z-20" />
                </div>
              ) : (
                <div
                  className="flex items-center gap-2 border-b px-3.5 py-2"
                  style={{
                    borderColor: `${project.accent}10`,
                    background: `${project.accent}04`,
                  }}
                >
                  <div className="flex gap-1.5">
                    <div className="h-[7px] w-[7px] rounded-full bg-[#ff5f56]" />
                    <div className="h-[7px] w-[7px] rounded-full bg-[#ffbd2e]" />
                    <div className="h-[7px] w-[7px] rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="ml-3 flex items-center gap-1.5 rounded-md px-2 py-0.5" style={{ background: `${project.accent}08` }}>
                    <div className="h-1.5 w-1.5 rounded-full" style={{ background: `${project.accent}40` }} />
                    <span className="text-[8px] font-medium tracking-wide" style={{ color: `${project.accent}90` }}>
                      {project.mockUrl}
                    </span>
                  </div>
                </div>
              )}

              {/* Skeleton UI content */}
              <div className="relative p-4 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{ background: `${project.accent}12` }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: project.accent }} />
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 w-16 rounded-full" style={{ background: `${project.accent}25` }} />
                    <div className="h-1.5 w-10 rounded-full" style={{ background: `${project.accent}12` }} />
                  </div>
                </div>
                <div className="h-px w-full" style={{ background: `${project.accent}08` }} />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full" style={{ background: `${project.accent}60` }} />
                    <div className="h-1.5 rounded-full" style={{ width: `${90 - i * 18}%`, background: `${project.accent}10` }} />
                  </div>
                ))}
                <div
                  className="mt-3 h-14 w-full rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${project.accent}08, ${project.accent}03)`,
                    border: `1px dashed ${project.accent}15`,
                  }}
                />
                {project.mockupType === "mobile" && (
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-14 rounded-full bg-gray-900/8 z-40" />
                )}
              </div>
            </div>
          </div>

          {/* === Right: Content === */}
          <div className="relative flex flex-col justify-center p-5 sm:p-6 md:py-8 md:pr-8 md:pl-2">
            {/* Top: icon badge + project number */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}18, ${project.accent}08)`,
                  boxShadow: `0 4px 12px ${project.accent}10`,
                }}
              >
                <Icon className="h-5 w-5" style={{ color: project.accent }} />
              </div>
              <div
                className="h-6 w-px"
                style={{ background: `${project.accent}20` }}
              />
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: `${project.accent}90` }}
              >
                Project {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Title + subtitle */}
            <h3 className="text-xl font-bold text-heading sm:text-2xl md:text-[1.65rem] leading-tight">
              {project.title}
            </h3>
            <p className="mt-1 text-sm font-medium" style={{ color: project.accent }}>
              {project.subtitle}
            </p>

            {/* Description */}
            <p className="mt-3 text-[13px] sm:text-sm leading-relaxed text-body/80 line-clamp-3 md:line-clamp-4">
              {project.description}
            </p>


            {/* Divider */}
            <div className="my-4 h-px w-full bg-border-light" />

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 sm:gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-surface-elevated px-3 py-1 text-[11px] font-medium text-muted border border-border-light/60 transition-colors hover:text-primary-dark hover:border-primary/15"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 rounded-xl border border-border-light bg-surface-elevated px-4 py-2 text-xs sm:text-sm font-medium text-heading transition-all hover:border-primary/30 hover:bg-primary-light hover:text-primary-dark"
              >
                <Github className="h-4 w-4" />
                Source Code
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium text-white transition-all hover:brightness-110"
                  style={{
                    background: `linear-gradient(135deg, ${project.accent}, ${project.accent}cc)`,
                    boxShadow: `0 4px 14px ${project.accent}25`,
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Track mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP horizontal scroll for desktop
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Wait for layout to settle
    const ctx = gsap.context(() => {
      // Calculate how far we need to scroll
      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.round(progress * (projects.length - 1));
            setActiveIndex(idx);
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile scroll snap tracking
  const handleMobileScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0]?.getBoundingClientRect().width ?? 0;
    const gap = 24; // gap-6 = 1.5rem = 24px
    const idx = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(idx, projects.length - 1));
  }, []);

  // Navigate to specific project (desktop: scroll page, mobile: scroll container)
  const goToProject = useCallback((index: number) => {
    if (isMobile) {
      const container = scrollContainerRef.current;
      if (!container) return;
      const cardWidth = container.children[0]?.getBoundingClientRect().width ?? 0;
      const gap = 24;
      container.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
    } else {
      // Find the ScrollTrigger instance and scroll to the right position
      const triggers = ScrollTrigger.getAll();
      const projectsTrigger = triggers.find(t => t.vars.trigger === sectionRef.current);
      if (projectsTrigger) {
        const progress = index / (projects.length - 1);
        const targetScroll = projectsTrigger.start + (projectsTrigger.end - projectsTrigger.start) * progress;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
    setActiveIndex(index);
  }, [isMobile]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`projects-section relative ${isMobile ? "py-20" : ""}`}
    >


      {/* Desktop: full-viewport pinned layout */}
      {/* Mobile: normal vertical stack */}
      <div className={`relative ${!isMobile ? "min-h-screen" : ""} flex flex-col justify-center`}>
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", damping: 20 }}
          className="pt-4 sm:pt-12 md:pt-16 mb-10 sm:mb-12 md:mb-16 text-center px-6"
        >
          <span className="mb-3 inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
            Portfolio
          </span>
          <h2 className="mb-4 text-3xl font-bold text-heading sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Featured Projects
          </h2>
          <div className="mx-auto h-1 w-12 rounded-full bg-primary/30" />
        </motion.div>

        {/* === Desktop horizontal scroll track === */}
        <div className="hidden md:block overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-stretch gap-8 pl-[max(2rem,calc((100vw-72rem)/2+1rem))] will-change-transform"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} isMobile={false} />
            ))}
            {/* Spacer so the last card has breathing room before section unpins */}
            <div className="flex-shrink-0 w-20" aria-hidden="true" />
          </div>
        </div>

        {/* === Mobile vertical stack === */}
        <div
          className="flex flex-col md:hidden gap-12 px-6"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} isMobile={true} />
          ))}
        </div>

        {/* Navigation dots (Desktop only) */}
        {!isMobile && (
          <div className="flex items-center justify-center gap-4 pt-10 pb-16 px-4">
            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`rounded-full transition-all duration-300 ${index === activeIndex
                    ? "h-2 w-8 bg-primary"
                    : "h-2 w-2 bg-border hover:bg-muted"
                    }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
