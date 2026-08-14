"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";

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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const lineWidth = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" ref={containerRef} className="py-24 lg:py-32 relative w-full">
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
              Experience
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-heading tracking-tight mb-2">
              My Journey
            </h2>
          </div>
          <p className="text-lg text-body max-w-md md:text-right leading-relaxed">
            A chronological timeline of my professional growth, educational background, and technical expertise.
          </p>
        </motion.div>

        {/* Dynamic separator line */}
        <div className="w-full h-px bg-border-light/30 mb-8 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full w-full bg-primary origin-left" 
            style={{ scaleX: lineWidth, opacity: 0.5 }} 
          />
        </div>

        {/* ─── Experience List ─── */}
        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.title}-${index}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={itemVariants}
              className="group relative border-b border-border-light/50 py-12 lg:py-16 flex flex-col lg:flex-row gap-8 lg:gap-16 hover:border-primary/30 transition-colors duration-500"
            >
              
              {/* Subtle hover background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

              {/* Year & Index */}
              <div className="lg:w-1/4 shrink-0 flex flex-col justify-between">
                <div>
                  <div className="text-sm font-semibold tracking-[0.2em] uppercase text-primary/60 mb-2">
                    0{index + 1}
                  </div>
                  <div className="text-2xl md:text-3xl font-light text-heading group-hover:text-primary transition-colors duration-500">
                    {exp.period}
                  </div>
                </div>
                
                {exp.location && (
                   <div className="mt-8 lg:mt-0 flex items-center gap-2 text-sm text-muted font-medium">
                     <MapPin className="w-4 h-4" />
                     {exp.location}
                   </div>
                )}
              </div>

              {/* Core Info */}
              <div className="lg:w-1/3 shrink-0">
                <h3 className="text-2xl md:text-3xl font-bold text-heading mb-3 group-hover:translate-x-2 transition-transform duration-500 ease-out">
                  {exp.title}
                </h3>
                <div className="text-lg font-medium text-primary/80 mb-6 flex items-center gap-2">
                  {exp.organization}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
              </div>

              {/* Details & Tags */}
              <div className="lg:w-5/12 flex flex-col">
                <p className="text-body leading-relaxed mb-8">
                  {exp.description}
                </p>

                {/* Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-body/90 leading-relaxed">
                        <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-md text-[11px] font-medium bg-surface-elevated border border-border-light text-body/80 group-hover:border-primary/30 group-hover:text-primary transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
