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
    period: "2023 — Current",
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

          {/* Right Pane (Content) */}
          <div className="lg:col-span-8 space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.title}-${index}`}
                variants={itemVariants}
                className="group relative"
              >
                {/* Timeline connection line for desktop */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-8 top-24 bottom-[-3rem] w-px bg-border-light hidden sm:block" />
                )}

                <div className="bg-surface border border-border-light hover:border-primary/30 transition-colors duration-500 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-xl hover:shadow-primary/5">
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
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="pt-8 flex items-center gap-6">
              <div className="h-px bg-border-light flex-grow" />
              <span className="text-sm font-bold tracking-widest uppercase text-muted">
                More to come
              </span>
              <div className="h-px bg-border-light flex-grow" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
