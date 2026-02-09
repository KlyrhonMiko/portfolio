"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  BookOpen,
  Trophy,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const experiences = [
  {
    type: "education",
    title: "B.S. Information Technology",
    organization: "Pamantasan ng Lungsod ng Pasig",
    location: "Pasig City, Philippines",
    period: "2023 — Current",
    status: "In Progress",
    description:
      "Currently pursuing a Bachelor of Science in Information Technology. Focused on web technologies and software engineering. Led multiple team projects and participated in hackathons.",
    skills: [
      "Web Development",
      "Software Engineering",
      "Database Management",
      "Network Administration",
    ],
    highlights: [
      "Led multiple team projects with cross-functional collaboration",
      "Participated in coding competitions",
      "Focused on modern web technologies and software development",
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      className="relative pt-12 pb-12 md:pt-16 md:pb-16"
    >
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-pattern absolute inset-0 opacity-[0.02]" />
        {/* Blob left — slow horizontal drift */}
        <div
          className="absolute -left-20 top-1/4 h-[400px] w-[400px] opacity-[0.12]"
          style={{
            background:
              "linear-gradient(180deg, var(--color-accent-teal), var(--color-primary-light))",
            animation:
              "blob 15s ease-in-out infinite, float-3 22s ease-in-out infinite",
            borderRadius: "40% 60% 70% 30% / 50% 40% 60% 50%",
          }}
        />
        {/* Blob right — counter-morph with blur */}
        <div
          className="absolute -right-16 bottom-1/3 h-[350px] w-[350px] opacity-[0.10]"
          style={{
            background:
              "linear-gradient(200deg, var(--color-primary), var(--color-accent))",
            animation:
              "blob 11s ease-in-out infinite reverse, float-1 18s ease-in-out infinite reverse",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(20px)",
          }}
        />
        {/* Small top-center glow */}
        <div
          className="absolute left-1/2 top-10 h-[180px] w-[180px] -translate-x-1/2 opacity-[0.08]"
          style={{
            background: "var(--color-accent-teal)",
            animation:
              "blob 9s ease-in-out infinite, float-2 12s ease-in-out infinite",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6" ref={ref}>
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16 text-center"
        >
          <span className="mb-3 inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-[#81C784]">
            Experience
          </span>
          <h2 className="mb-4 text-2xl font-bold text-[#2E3A3C] sm:text-3xl md:text-4xl lg:text-5xl">
            My Journey
          </h2>
          <div className="mx-auto h-0.5 w-20 bg-[#81C784]" />
          <p className="mx-auto mt-4 max-w-lg text-body">
            A timeline of my educational background and professional growth
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-2xl">
          {/* Animated vertical line */}
          <div
            className="absolute left-1/2 top-0 hidden -translate-x-1/2 md:block"
            style={{ width: "2px" }}
          >
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
              className="bg-gradient-to-b from-primary via-accent-teal to-primary-light"
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.title}-${exp.period}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + index * 0.2 }}
                className="relative"
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
                  <div className="relative">
                    <span
                      className="absolute -inset-2 rounded-full bg-primary/20"
                      style={{
                        animation:
                          "pulse-ring 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                      }}
                    />
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-primary bg-surface shadow-lg shadow-primary/20">
                      {exp.type === "work" ? (
                        <Briefcase size={16} className="text-primary" />
                      ) : (
                        <GraduationCap size={16} className="text-primary" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div className="pt-8">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="group relative overflow-hidden rounded-2xl border border-border-light bg-surface shadow-sm transition-shadow duration-400 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/8"
                  >
                    {/* Top gradient accent */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent-teal to-primary opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="p-4 sm:p-6 md:p-8">
                      {/* Header */}
                      <div className="mb-4 sm:mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent-teal/10 text-primary transition-all duration-300 group-hover:from-primary group-hover:to-primary-dark group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/25">
                            {exp.type === "work" ? (
                              <Briefcase size={22} />
                            ) : (
                              <GraduationCap size={22} />
                            )}
                          </div>
                          <div>
                            <h3 className="text-base font-bold leading-snug text-heading sm:text-lg md:text-xl">
                              {exp.title}
                            </h3>
                            <p className="mt-0.5 text-sm font-semibold text-primary/80">
                              {exp.organization}
                            </p>
                          </div>
                        </div>
                        {/* Status badge */}
                        {exp.status && (
                          <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                            <Sparkles size={12} />
                            {exp.status}
                          </span>
                        )}
                      </div>

                      {/* Meta info row */}
                      <div className="mb-4 sm:mb-5 flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-xs sm:text-sm text-muted">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-primary/60" />
                          {exp.period}
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-primary/60" />
                            {exp.location}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="mb-5 sm:mb-6 text-sm sm:text-base leading-relaxed text-body">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="mb-5 sm:mb-6 rounded-lg sm:rounded-xl border border-border-light/60 bg-primary-lighter/30 p-3 sm:p-4">
                          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-heading">
                            <Trophy
                              size={15}
                              className="text-primary"
                            />
                            Key Highlights
                          </div>
                          <ul className="space-y-2">
                            {exp.highlights.map((highlight, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                  duration: 0.4,
                                  delay: 0.8 + i * 0.1,
                                }}
                                className="flex items-start gap-2 text-sm text-body"
                              >
                                <ChevronRight
                                  size={14}
                                  className="mt-0.5 shrink-0 text-primary"
                                />
                                {highlight}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Skills */}
                      <div>
                        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-heading">
                          <BookOpen size={15} className="text-primary" />
                          Skills & Focus Areas
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={
                                isInView ? { opacity: 1, scale: 1 } : {}
                              }
                              transition={{
                                duration: 0.3,
                                delay: 1.0 + i * 0.08,
                              }}
                              className="rounded-full border border-border-light bg-gradient-to-r from-primary-lighter/60 to-primary-light/40 px-3.5 py-1.5 text-xs font-medium text-primary-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md hover:shadow-primary/10"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* "More to come" indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 flex flex-col items-center"
          >
            {/* Connector */}
            <div className="mb-4 h-8 w-0.5 bg-gradient-to-b from-primary/40 to-transparent" />
            <div className="glass flex items-center gap-2.5 rounded-full px-5 py-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"
                  style={{
                    animation:
                      "pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                  }}
                />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="text-sm font-medium text-body">
                More milestones coming soon...
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
