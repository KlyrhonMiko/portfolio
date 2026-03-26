"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight, Code2, Layers, Wallet, Wifi, Battery, Signal } from "lucide-react";

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
    features: ["Smart Job Matching", "Alumni Network", "ML-Powered Search"],
    mockUrl: "localhost:3000",
    mockupType: "desktop" as const,
    live: "https://pace.pasigcity.gov.ph",
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
    features: ["Multi-Account", "Dynamic Dashboard", "Savings Tracker"],
    mockUrl: "koin.app",
    mockupType: "mobile" as const,
    live: undefined,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="relative pt-10 pb-10 sm:pt-12 sm:pb-12 md:pt-16 md:pb-16">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-pattern absolute inset-0 opacity-[0.03]" />
        <div
          className="absolute -left-28 -top-16 h-[420px] w-[420px] opacity-[0.12]"
          style={{
            background:
              "linear-gradient(120deg, var(--color-primary-light), var(--color-accent-teal))",
            animation:
              "blob 13s ease-in-out infinite, float-2 20s ease-in-out infinite",
            borderRadius: "70% 30% 50% 50% / 30% 60% 40% 70%",
          }}
        />
        <div
          className="absolute -right-20 top-1/3 h-[380px] w-[380px] opacity-[0.10]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent), var(--color-primary))",
            animation:
              "blob 10s ease-in-out infinite reverse, float-3 16s ease-in-out infinite",
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
            My Work
          </span>
          <h2 className="mb-4 text-2xl font-bold text-[#2E3A3C] sm:text-3xl md:text-4xl lg:text-5xl">
            Featured Projects
          </h2>
          <div className="mx-auto h-0.5 w-20 bg-[#81C784]" />
        </motion.div>

        {/* Projects */}
        <div className="flex flex-col gap-6 sm:gap-10">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group relative"
              >
                <div
                  className={`relative grid items-center gap-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-border-light bg-surface shadow-sm transition-all duration-500 hover:border-primary/20 hover:shadow-2xl md:grid-cols-2 ${
                    isEven ? "" : "md:[direction:rtl]"
                  }`}
                >
                  {/* Visual / Mock browser side */}
                  <div
                    className="relative flex min-h-[220px] items-center justify-center overflow-hidden p-4 sm:min-h-[280px] sm:p-6 md:min-h-[360px] md:p-8"
                    style={{
                      background: `linear-gradient(135deg, ${project.accent}10, ${project.accent}06, ${project.accent}12)`,
                    }}
                  >
                    <div
                      className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-3xl"
                      style={{ background: project.accent }}
                    />

                    {/* Mock device/window */}
                    <div
                      className={`relative z-10 w-full overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1 ${
                        project.mockupType === "mobile"
                          ? "max-w-[190px] sm:max-w-[200px] h-[330px] sm:h-[370px] rounded-[2.5rem] border-[6px]"
                          : "max-w-[300px] sm:max-w-[420px] rounded-lg sm:rounded-xl border"
                      }`}
                      style={{
                        borderColor: project.mockupType === "mobile" ? "#1a1a1a" : `${project.accent}20`,
                        background: "#ffffff",
                        boxShadow: project.mockupType === "mobile" 
                          ? `0 20px 50px ${project.accent}15`
                          : `0 8px 30px ${project.accent}08`,
                      }}
                    >
                      {/* Frame extras */}
                      {project.mockupType === "mobile" ? (
                        <div className="relative">
                          <div className="flex items-center justify-between px-6 pt-4 pb-1 relative z-20">
                            <span className="text-[10px] font-bold text-gray-900">9:41</span>
                            <div className="flex items-center gap-1">
                              <Signal className="h-2.5 w-2.5 text-gray-900" />
                              <Wifi className="h-2.5 w-2.5 text-gray-900" />
                              <Battery className="h-2.5 w-2.5 text-gray-900" />
                            </div>
                          </div>
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 h-4 w-14 rounded-full bg-black z-20" />
                        </div>
                      ) : (
                        <div
                          className="flex items-center gap-2 border-b px-3 py-2.5 backdrop-blur-sm"
                          style={{
                            borderColor: `${project.accent}15`,
                            background: "rgba(255, 255, 255, 0.4)",
                          }}
                        >
                          <div className="flex gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                            <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                            <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                          </div>
                          <div
                            className="ml-4 h-2 w-24 rounded-full"
                            style={{ background: `${project.accent}10` }}
                          />
                        </div>
                      )}

                      {/* Unified Simple Content */}
                      <div className="relative space-y-4 p-5 text-left" style={{ direction: 'ltr' }}>
                        <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
                        
                        <div className="relative z-10 flex items-center gap-3">
                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-xl"
                            style={{ background: `${project.accent}15` }}
                          >
                            <Icon className="h-5 w-5" style={{ color: project.accent }} />
                          </div>
                          <div className="space-y-1.5">
                            <div className="h-2.5 w-20 rounded-full" style={{ background: `${project.accent}30` }} />
                            <div className="h-1.5 w-12 rounded-full" style={{ background: `${project.accent}15` }} />
                          </div>
                        </div>

                        <div className="h-[1px] w-full" style={{ background: `${project.accent}10` }} />

                        <div className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full" style={{ background: project.accent }} />
                              <div
                                className="h-1.5 rounded-full"
                                style={{ 
                                  width: `${100 - (i * 15)}%`,
                                  background: `${project.accent}12` 
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        <div 
                          className="mt-6 h-20 w-full rounded-2xl opacity-40"
                          style={{ 
                            background: `linear-gradient(135deg, ${project.accent}20, ${project.accent}05)`,
                            border: `1px dashed ${project.accent}30`
                          }}
                        />

                        {project.mockupType === "mobile" && (
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-1 w-16 rounded-full bg-gray-900/10 z-40" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={`flex flex-col justify-center p-5 sm:p-6 md:p-10 lg:p-12 ${isEven ? "" : "md:[direction:ltr]"}`}>
                    <h3 className="text-xl font-bold text-heading sm:text-2xl md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {project.subtitle}
                    </p>

                    <p className="mt-3 sm:mt-4 text-sm sm:text-[15px] leading-relaxed text-body">
                      {project.description}
                    </p>

                    <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-border-light bg-primary-lighter/60 px-3 py-1 text-xs font-medium text-primary-dark transition-colors hover:border-primary/20 hover:bg-primary-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-2 rounded-xl border border-border-light bg-surface-elevated px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-heading transition-all hover:border-primary/30 hover:bg-primary-light hover:text-primary-dark"
                      >
                        <Github className="h-4 w-4" />
                        Source Code
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all"
                          style={{
                            background: `linear-gradient(135deg, ${project.accent}, ${project.accent}dd)`,
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
