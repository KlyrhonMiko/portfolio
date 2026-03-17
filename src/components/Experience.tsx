"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, ChevronRight, Trophy, BookOpen } from "lucide-react";

const experiences = [
  {
    type: "education",
    title: "B.S. Information Technology",
    organization: "Pamantasan ng Lungsod ng Pasig",
    location: "Pasig City, Philippines",
    period: "2023 — Present",
    description:
      "Currently pursuing a Bachelor of Science in Information Technology. Focused on web technologies and software engineering. Led multiple team projects and participated in hackathons.",
    skills: [
      "Web Development",
      "Software Engineering",
      "UI/UX Design",
      "Machine Problems",
    ],
    highlights: [
      "Led multiple team projects with cross-functional collaboration",
      "Participated in coding competitions",
      "Focused on modern web technologies and software development",
    ],
  },
  {
    type: "work",
    title: "Freelance Full Stack Developer",
    organization: "Self-Employed",
    location: "Remote",
    period: "2025 — Present",
    description:
      "Developing and maintaining responsive web applications for various clients. Focusing on delivering high-quality, scalable solutions using modern web technologies to meet client requirements.",
    skills: [
      "Full Stack Development",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
    ],
    highlights: [
      "Designed and implemented intuitive user interfaces",
      "Developed robust backend APIs and integrated databases",
      "Managed project timelines and communicated directly with clients",
    ],
  }
];

export default function Experience() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  return (
    <section id="experience" className="relative pt-24 pb-32 md:pt-32 md:pb-40 bg-surface">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20" ref={containerRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24"
        >
          {/* Editorial Left Pane (Sticky) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <motion.div variants={itemVariants}>
                <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary/80">
                  Experience
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-heading leading-[1.1] mb-6">
                  My Journey.
                </h2>
                <div className="h-1 w-16 bg-primary mb-8 rounded-full" />
                <p className="text-base md:text-lg text-body leading-relaxed max-w-sm">
                  A timeline of my educational background, professional growth, and the technical skills I&apos;ve built along the way.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Pane (Content) — Timeline */}
          <div className="lg:col-span-8 relative">
            {/* Continuous vertical timeline line */}
            <div
              className="absolute left-[1.95rem] sm:left-[2rem] top-8 bottom-8 w-px hidden sm:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, var(--color-primary) 10%, var(--color-primary) 90%, transparent 100%)",
                opacity: 0.18,
              }}
            />

            <div className="flex flex-col gap-0">
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.title}-${index}`}
                  variants={itemVariants}
                  className="group relative"
                >
                  {/* Timeline Node */}
                  <div className="hidden sm:flex absolute left-0 top-9 z-10 items-center justify-center w-16">
                    {/* Outer glow ring */}
                    <div className="absolute h-5 w-5 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500" />
                    {/* Inner dot */}
                    <div className="relative h-3 w-3 rounded-full bg-primary/50 group-hover:bg-primary ring-4 ring-surface transition-all duration-300" />
                  </div>

                  {/* Card with timeline offset */}
                  <div className="sm:ml-20 mb-4">
                    <div className="bg-surface border border-border-light hover:border-primary/30 transition-all duration-500 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-xl hover:shadow-primary/5">
                      <div className="flex flex-col sm:flex-row gap-6 mb-8">
                        {/* Icon Container */}
                        <div className="shrink-0">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-elevated border border-border-light text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            {exp.type === "work" ? (
                              <Briefcase strokeWidth={1.5} size={28} />
                            ) : (
                              <GraduationCap strokeWidth={1.5} size={28} />
                            )}
                          </div>
                        </div>

                        {/* Header Info */}
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
                            <div>
                              <h3 className="text-2xl md:text-3xl font-bold text-heading tracking-tight mb-2">
                                {exp.title}
                              </h3>
                              <div className="text-lg font-medium text-primary mb-3">
                                {exp.organization}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-muted">
                            <span className="flex items-center gap-2">
                              <Calendar size={16} className="text-primary/60" />
                              {exp.period}
                            </span>
                            {exp.location && (
                              <span className="flex items-center gap-2">
                                <MapPin size={16} className="text-primary/60" />
                                {exp.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-base leading-relaxed text-body mb-8 max-w-3xl">
                        {exp.description}
                      </p>

                      {/* Highlights & Skills Grid */}
                      <div className="grid md:grid-cols-2 gap-8">
                        {exp.highlights && exp.highlights.length > 0 && (
                          <div>
                            <div className="mb-4 flex items-center gap-2 font-bold text-heading tracking-wide uppercase text-xs">
                              <Trophy size={16} className="text-primary" />
                              Key Highlights
                            </div>
                            <ul className="space-y-3">
                              {exp.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-body leading-relaxed">
                                  <ChevronRight size={16} className="mt-0.5 shrink-0 text-primary" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div>
                          <div className="mb-4 flex items-center gap-2 font-bold text-heading tracking-wide uppercase text-xs">
                            <BookOpen size={16} className="text-primary" />
                            Focus Areas
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-lg bg-surface-elevated border border-border-light px-3 py-1.5 text-xs font-semibold text-body hover:text-heading hover:border-border transition-colors cursor-default"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* "More to come" — aligned to the timeline */}
              <motion.div variants={itemVariants} className="relative">
                {/* End node */}
                <div className="hidden sm:flex absolute left-0 top-3 z-10 items-center justify-center w-16">
                  <div className="h-2.5 w-2.5 rounded-full border-2 border-primary/30 bg-surface ring-4 ring-surface" />
                </div>
                <div className="sm:ml-20 pt-4 pb-2 flex items-center gap-6">
                  <div className="h-px bg-border-light flex-grow" />
                  <span className="text-sm font-bold tracking-widest uppercase text-muted">
                    More to come
                  </span>
                  <div className="h-px bg-border-light flex-grow" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
