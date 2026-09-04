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
          <div className="mb-16 max-w-3xl">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-heading tracking-tighter mb-6">
              Skills & Technologies
            </h3>
            <p className="text-base md:text-lg text-body leading-relaxed max-w-[65ch]">
              The tools, languages, and frameworks I use to build robust applications.
            </p>
          </div>

          {/* ── Typography-Heavy Minimalist Index ── */}
          <div className="flex flex-col border-t border-border-light/50">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col lg:flex-row lg:items-start py-10 md:py-16 border-b border-border-light/50 hover:bg-surface-elevated/30 transition-colors duration-300 -mx-6 px-6 lg:-mx-12 lg:px-12"
              >
                {/* Category Area */}
                <div className="lg:w-1/3 flex flex-col mb-6 lg:mb-0 pr-8">
                  <span className="text-[11px] font-mono tracking-[0.2em] text-primary/60 uppercase mb-6">
                    0{index + 1}
                  </span>
                  <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading tracking-tighter group-hover:text-primary transition-colors duration-300">
                    {skill.category}
                  </h4>
                  <p className="mt-4 text-sm text-body/70 font-medium">
                    {skill.description}
                  </p>
                </div>

                {/* Skills Area */}
                <div className="lg:w-2/3 lg:mt-8">
                  <p className="text-xl md:text-2xl lg:text-3xl leading-[1.6] tracking-tight text-body/80 group-hover:text-heading transition-colors duration-500">
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
