"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight, Code2, Layers } from "lucide-react";

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
  },
  {
    title: "Sync",
    subtitle: "Real-time Group Decisions",
    description:
      "Real-time collaborative decision making for groups. Swipe to vote on restaurants and movies with your friends — powered by WebSockets.",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "WebSocket",
    ],
    github: "https://github.com/KlyrhonMiko/sync",
    live: "https://sync-mvto.onrender.com/",
    accent: "#7ec8b8",
    icon: Code2,
    features: ["Real-time Voting", "Group Rooms", "Swipe Interface"],
    mockUrl: "sync-app.onrender.com",
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
        {/* Large blob top-left — wide slow morph */}
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
        {/* Medium blob right — diagonal drift */}
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
        {/* Small blob bottom-center — accent pulse */}
        <div
          className="absolute bottom-10 left-1/2 h-[250px] w-[250px] -translate-x-1/2 opacity-[0.08]"
          style={{
            background:
              "linear-gradient(160deg, var(--color-accent-teal), var(--color-primary-light))",
            animation:
              "blob 8s ease-in-out infinite, float-1 14s ease-in-out infinite reverse",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(45px)",
          }}
        />
        {/* Tiny blob top-right — fast morph */}
        <div
          className="absolute right-1/4 top-16 h-[160px] w-[160px] opacity-[0.07]"
          style={{
            background: "var(--color-primary)",
            animation:
              "blob 7s ease-in-out infinite reverse, float-1 10s ease-in-out infinite",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(35px)",
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
          <p className="mx-auto mt-4 max-w-lg text-body">
            Here are some of my recent projects. Each one was built with care,
            attention to detail, and a focus on user experience.
          </p>
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
                  className={`relative grid items-center gap-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-border-light bg-surface shadow-sm transition-all duration-500 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/8 md:grid-cols-2 ${
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
                    {/* Subtle background glow */}
                    <div
                      className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-3xl"
                      style={{ background: project.accent }}
                    />

                    {/* Mock browser window */}
                    <div
                      className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] overflow-hidden rounded-lg sm:rounded-xl border shadow-lg transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1"
                      style={{
                        borderColor: `${project.accent}20`,
                        background: "#ffffff",
                        boxShadow: `0 8px 40px ${project.accent}12`,
                      }}
                    >
                      {/* Browser chrome */}
                      <div
                        className="flex items-center gap-2 border-b px-3 py-2"
                        style={{ borderColor: `${project.accent}15` }}
                      >
                        <div className="flex gap-1.5">
                          <div className="h-2.5 w-2.5 rounded-full bg-red-300/60" />
                          <div className="h-2.5 w-2.5 rounded-full bg-yellow-300/60" />
                          <div className="h-2.5 w-2.5 rounded-full bg-green-300/60" />
                        </div>
                        <div
                          className="ml-1 flex-1 rounded-md px-3 py-1 text-[10px] text-gray-400"
                          style={{ background: `${project.accent}08` }}
                        >
                          {project.mockUrl}
                        </div>
                      </div>

                      {/* Mock app content */}
                      <div className="space-y-3 p-4">
                        {/* Mock header */}
                        <div className="flex items-center gap-2">
                          <div
                            className="flex h-7 w-7 items-center justify-center rounded-lg"
                            style={{
                              background: `${project.accent}18`,
                            }}
                          >
                            <Icon
                              className="h-3.5 w-3.5"
                              style={{ color: project.accent }}
                            />
                          </div>
                          <div
                            className="h-2.5 w-16 rounded-full"
                            style={{ background: `${project.accent}25` }}
                          />
                          <div className="ml-auto flex gap-1">
                            <div
                              className="h-2 w-8 rounded-full"
                              style={{ background: `${project.accent}12` }}
                            />
                            <div
                              className="h-2 w-6 rounded-full"
                              style={{ background: `${project.accent}12` }}
                            />
                          </div>
                        </div>

                        {/* Divider */}
                        <div
                          className="h-[1px] w-full"
                          style={{ background: `${project.accent}12` }}
                        />

                        {/* Mock feature rows */}
                        {project.features.map((feature, i) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2.5 rounded-lg p-2 transition-colors duration-300"
                            style={{
                              background:
                                i === 0 ? `${project.accent}08` : "transparent",
                            }}
                          >
                            <div
                              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold"
                              style={{
                                background: `${project.accent}15`,
                                color: project.accent,
                              }}
                            >
                              {i + 1}
                            </div>
                            <span
                              className="text-xs font-medium"
                              style={{ color: `${project.accent}cc` }}
                            >
                              {feature}
                            </span>
                            <div
                              className="ml-auto h-1.5 rounded-full"
                              style={{
                                width: `${60 - i * 15}px`,
                                background: `${project.accent}${
                                  30 - i * 8
                                }`,
                              }}
                            />
                          </div>
                        ))}

                        {/* Mock stats row */}
                        <div className="flex gap-2 pt-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-lg p-2 text-center"
                              style={{ background: `${project.accent}08` }}
                            >
                              <div
                                className="text-xs font-bold"
                                style={{ color: project.accent }}
                              >
                                {["24+", "1.2k", "99%"][i]}
                              </div>
                              <div
                                className="mt-0.5 h-1.5 w-full rounded-full"
                                style={{ background: `${project.accent}12` }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div
                    className={`flex flex-col justify-center p-5 sm:p-6 md:p-10 lg:p-12 ${
                      isEven ? "" : "md:[direction:ltr]"
                    }`}
                  >
                    <h3 className="text-xl font-bold text-heading sm:text-2xl md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {project.subtitle}
                    </p>

                    <p className="mt-3 sm:mt-4 text-sm sm:text-[15px] leading-relaxed text-body">
                      {project.description}
                    </p>

                    {/* Tags */}
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

                    {/* Action links */}
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
                          className="group/btn inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-all hover:shadow-lg"
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
