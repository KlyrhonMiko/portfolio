"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MagneticEffect from "@/components/ui/MagneticEffect";

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  link: string;
  description?: string;
  image?: string;
  target?: string;
};

const certificates: Certificate[] = [
  {
    title: "CS50x: Intro to Computer Science and the Art of Programming",
    issuer: "Harvard University",
    date: "2026",
    link: "https://certificates.cs50.io/ef106f39-6c3f-43b2-95ba-bc4662d9207d",
    image: "/certificates/cs50x.png",
    description: "A comprehensive introduction to the intellectual enterprises of computer science and the art of programming, covering C, Python, SQL, and web fundamentals."
  },
  {
    title: "CS50: Intro to Artificial Intelligence with Python",
    issuer: "Harvard University",
    date: "2026",
    link: "https://cs50.harvard.edu/certificates/63025dc0-e506-4ebc-ab38-e66466d52d34",
    image: "/certificates/cs50ai.png",
    description: "Explored fundamental concepts of artificial intelligence, including graph search algorithms, machine learning, and natural language processing using Python."
  },
  {
    title: "Responsive Web Design Developer Certification",
    issuer: "freeCodeCamp",
    date: "2026",
    link: "https://www.freecodecamp.org/certification/klyrhon/responsive-web-design-v9",
    image: "/certificates/responsive-web-design.png",
    description: "Mastered the foundations of modern web design, including HTML5, CSS3, Flexbox, CSS Grid, and responsive layout techniques."
  },
  {
    title: "Python Developer Certification",
    issuer: "freeCodeCamp",
    date: "2026",
    link: "https://www.freecodecamp.org/certification/klyrhon/python-v9",
    image: "/certificates/python-developer.png",
    description: "Developed proficiency in Python programming, covering data structures, object-oriented principles, and application development."
  },
  {
    title: "Prompt Like an Engineer",
    issuer: "Cisco Networking Academy",
    date: "2026",
    link: "https://www.credly.com/badges/50250e7d-dd3f-45b8-944a-0322efdd0456/public_url",
    image: "/certificates/prompt-engineering.png",
    description: "Gained expertise in advanced prompt engineering techniques, understanding how to effectively communicate with large language models to solve complex problems."
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    date: "2026",
    link: "https://verify.skilljar.com/c/wgk9ewiuyn66",
    image: "/certificates/claude-101.png",
    description: "Foundational certification covering Anthropic's Claude AI models, their capabilities, and ethical AI principles."
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic",
    date: "2026",
    link: "https://verify.skilljar.com/c/i6x6r67puy7o",
    image: "/certificates/claude-code-101.png",
    description: "Learned the essentials of leveraging Claude for software development, code generation, and debugging."
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "2026",
    link: "https://verify.skilljar.com/c/zzv6mqrbqzj2",
    image: "/certificates/claude-code-in-action.png",
    description: "Applied advanced techniques for using Claude in real-world coding scenarios, improving development workflows and productivity."
  },
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "2026",
    link: "https://verify.skilljar.com/c/b95cnb4w5bda",
    image: "/certificates/ai-fluency-framework.png",
    description: "Explored the fundamental architecture, frameworks, and foundational concepts underlying modern generative AI systems."
  },
  {
    title: "Introduction to agent skills",
    issuer: "Anthropic",
    date: "2026",
    link: "https://verify.skilljar.com/c/2vzhg7kjzxxg",
    image: "/certificates/intro-to-agent-skills.png",
    description: "Learned the principles of designing and equipping AI agents with specialized skills to autonomously execute complex workflows."
  },
  {
    title: "Introduction to subagents",
    issuer: "Anthropic",
    date: "2026",
    link: "https://verify.skilljar.com/c/nsbroi9399oc",
    image: "/certificates/intro-to-subagents.png",
    description: "Mastered the concept of delegating tasks to specialized subagents for hierarchical problem-solving and efficient AI operations."
  },
  {
    title: "AI Fluency: Ai Capabilities & Limitations",
    issuer: "Anthropic",
    date: "2026",
    link: "https://verify.skilljar.com/c/c45jzpz2c3y9",
    image: "/certificates/ai-fluency-capabilities.png",
    description: "Gained a deep understanding of what current AI models can achieve, alongside their technical limitations and safety considerations."
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Certificates() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={containerRef} className="py-24 lg:py-32 w-full relative overflow-hidden">

      {/* Subtle Background Decor */}
      <motion.div style={{ y: y1 }} className="absolute -left-32 top-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none will-change-transform transform-gpu" />
      <motion.div style={{ y: y2 }} className="absolute -right-32 bottom-10 w-[400px] h-[400px] bg-accent-teal/5 rounded-full blur-[80px] -z-10 pointer-events-none will-change-transform transform-gpu" />

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
              Achievements
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-heading tracking-tight mb-2">
              Certifications
            </h2>
          </div>
          <p className="text-lg text-body max-w-md md:text-right leading-relaxed">
            Continuous learning and validating my technical expertise through industry-recognized standards.
          </p>
        </motion.div>

        {/* ─── Minimalist List ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col border-t border-border-light/50"
        >
          {certificates.map((cert, index) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group relative flex items-center justify-between py-10 lg:py-12 border-b border-border-light/50 hover:border-primary/40 transition-colors duration-500"
            >
              {/* Hover glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 pointer-events-none will-change-opacity transform-gpu" />

              <div className="flex items-center gap-4 md:gap-8 lg:gap-16 w-full relative z-10 py-2">

                {/* Index & Date (Hidden on mobile) */}
                <div className="w-1/6 hidden md:flex flex-col gap-2 shrink-0 self-start mt-2">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium tracking-widest text-muted">
                    {cert.date}
                  </span>
                </div>

                {/* Text Content Area */}
                <div className="flex-1 transition-[padding] duration-300 ease-out">
                  <h3 className="text-2xl md:text-4xl font-light text-heading group-hover:text-primary transition-transform duration-300 group-hover:translate-x-2 ease-out transform-gpu">
                    {cert.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-4">
                    <span className="text-xs md:text-sm uppercase tracking-[0.15em] font-medium text-muted/80 group-hover:translate-x-2 transition-transform duration-300 delay-75 ease-out transform-gpu">
                      {cert.issuer}
                    </span>
                    <span className="md:hidden text-xs uppercase tracking-widest text-muted/60">
                      {cert.date}
                    </span>
                  </div>

                  {/* Expanded Description */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows,transform] duration-300 ease-out group-hover:translate-x-2 transform-gpu">
                    <div className="overflow-hidden">
                      <p className="pt-4 text-sm md:text-base text-muted/70 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 max-w-xl">
                        {cert.description || "Comprehensive certification covering fundamental concepts, advanced techniques, and practical applications in this domain."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Expanding Image Container */}
                <div className="flex items-center justify-end shrink-0 relative transition-[width] duration-300 ease-out w-8 md:w-12 group-hover:w-32 md:group-hover:w-64 lg:group-hover:w-80 h-full">
                  
                  {/* Floating Certificate Image (Visible on Hover) */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:rotate-[-4deg] group-hover:scale-100 scale-95 transition-[transform,opacity] duration-300 ease-out pointer-events-none hidden md:block z-20 origin-right">
                    <div className="w-64 lg:w-80 border border-border-light/30 rounded-lg shadow-2xl overflow-hidden flex flex-col items-center justify-center bg-transparent">
                      {cert.image ? (
                        <img src={cert.image} alt={cert.title} className="w-full h-auto object-cover" />
                      ) : (
                        <div className="w-full aspect-[1.49] bg-primary/5 flex flex-col items-center justify-center border border-primary/10">
                          <span className="text-[10px] uppercase tracking-widest text-primary/50 mb-1">Certificate</span>
                          <span className="text-[8px] text-muted/40">Placeholder Image</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subtle Arrow Icon */}
                  <div className="text-muted/30 group-hover:opacity-0 transition-opacity duration-300 absolute right-0">
                    <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </div>

              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
