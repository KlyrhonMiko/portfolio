"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import GithubActivity from "./GithubActivity";

const skills = [
  {
    category: "Frontend",
    description: "Crafting interactive & responsive interfaces",
    items: ["React", "Next.js", "TypeScript", "HTML", "CSS", "Tailwind CSS", "GSAP", "Framer Motion", "Lenis", "Three.js"],
  },
  {
    category: "Backend",
    description: "Robust APIs and server-side logic",
    items: ["Node.js", "Express", "FastAPI", "Python"],
  },
  {
    category: "Mobile",
    description: "Cross-platform apps with native feel",
    items: ["Flutter", "Dart", "Riverpod"],
  },
  {
    category: "Databases",
    description: "Data persistence and management",
    items: ["Supabase", "PostgreSQL", "SQLite"],
  },
  {
    category: "DevOps & Tools",
    description: "Streamlining deployment pipelines",
    items: ["Docker", "Git"],
  },
];


/* ── Main About Section ── */
export default function About({ githubData }: { githubData?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 w-full bg-surface">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Github Activity ── */}
        <div className="mb-24 border-b border-border-light/50 pb-24">
          <GithubActivity githubData={githubData} />
        </div>

        {/* ── Skills & Technologies ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <h3 className="text-2xl md:text-4xl font-bold text-heading tracking-tight">
              Skills & Technologies
            </h3>
            <p className="text-lg text-body lg:text-right max-w-md">
              The tools, languages, and frameworks I use to build robust applications.
            </p>
          </div>

          {/* ── Minimalist Category List ── */}
          <div className="mt-12 flex flex-col border-t border-border-light/50">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12 py-10 lg:py-12 border-b border-border-light/50 hover:border-primary/30 transition-colors duration-500"
              >
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                {/* Left Side: Category */}
                <div className="lg:w-1/3 shrink-0 flex items-start gap-4 lg:gap-6 pt-2">
                  <span className="text-sm font-semibold tracking-[0.2em] text-primary/60 uppercase shrink-0 mt-1">
                    0{index + 1}
                  </span>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-heading group-hover:translate-x-2 transition-transform duration-500 ease-out">
                      {skill.category}
                    </h4>
                    <p className="mt-1.5 text-sm text-body/80">
                      {skill.description}
                    </p>
                  </div>
                </div>

                {/* Right Side: Skills - Editorial Prose */}
                <div className="lg:w-2/3 lg:pt-2">
                  <p className="text-lg md:text-xl lg:text-[22px] leading-[1.7] text-body/50 font-light group-hover:text-heading transition-colors duration-700">
                    {skill.items.join(", ")}.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
