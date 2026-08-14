"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
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

const traits = [
  { label: "Problem Solver" },
  { label: "Team Player" },
  { label: "Fast Learner" },
  { label: "Detail Oriented" },
];

/* ── Main About Section ── */
export default function About() {
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
    <section id="about" ref={containerRef} className="relative py-24 lg:py-32 w-full bg-surface">
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
              About Me
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-heading tracking-tight mb-2">
              Get to Know Me
            </h2>
          </div>
          <p className="text-lg text-body max-w-md md:text-right leading-relaxed">
            A glimpse into who I am, what I do, and the technologies I work with to build the web.
          </p>
        </motion.div>

        {/* Dynamic separator line */}
        <div className="w-full h-px bg-border-light/30 mb-24 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full w-full bg-primary origin-left" 
            style={{ scaleX: lineWidth, opacity: 0.5 }} 
          />
        </div>

        {/* ── Bio Section ── */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-24 border-b border-border-light/50 pb-24">
          <div className="lg:col-span-5">
             <motion.h3 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6 }}
               className="text-3xl md:text-4xl font-bold text-heading leading-[1.3] mb-12"
             >
               A passionate developer building for the web.
             </motion.h3>
             
             <div className="flex flex-col gap-6">
               {traits.map((trait, index) => (
                 <motion.div 
                   key={trait.label} 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ duration: 0.6, delay: index * 0.1 }}
                   className="flex items-center gap-6 group cursor-default"
                 >
                   <span className="text-sm font-semibold tracking-[0.2em] text-primary/60 uppercase group-hover:text-primary transition-colors">
                     0{index + 1}
                   </span>
                   <span className="text-lg tracking-[0.1em] uppercase font-semibold text-heading/80 group-hover:translate-x-2 transition-transform duration-500 ease-out">
                     {trait.label}
                   </span>
                 </motion.div>
               ))}
             </div>
          </div>
          
          <div className="lg:col-span-7 flex flex-col gap-8 text-lg md:text-xl text-body leading-relaxed font-light">
             <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: 0.2 }}
             >
               I'm an aspiring software engineer with a passion for creating elegant, user-friendly web applications. With a strong foundation in both frontend and backend technologies, I bring ideas to life through clean code and thoughtful design.
             </motion.p>
             <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.6, delay: 0.3 }}
             >
               When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge through technical writing. I believe in continuous learning and pushing the boundaries of what's possible on the web.
             </motion.p>
          </div>
        </div>

        {/* ── Github Activity ── */}
        <div className="mb-24 border-b border-border-light/50 pb-24">
          <GithubActivity />
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
                className="group relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 py-10 lg:py-12 border-b border-border-light/50 hover:border-primary/30 transition-colors duration-500"
              >
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                {/* Left Side: Category */}
                <div className="lg:w-1/3 shrink-0 flex items-center gap-4 lg:gap-6">
                  <span className="text-sm font-semibold tracking-[0.2em] text-primary/60 uppercase shrink-0">
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

                {/* Right Side: Skills */}
                <div className="lg:w-2/3 flex flex-wrap gap-2 lg:gap-3">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 rounded-md text-xs sm:text-sm font-medium bg-surface-elevated border border-border-light text-body/80 group-hover:border-primary/30 group-hover:text-primary transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
