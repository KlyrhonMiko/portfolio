"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { KoinAppMockup, ParsAppMockup, Project } from "../sections/Projects";
import { Wallet, FileText } from "lucide-react";

// Mock data strictly for the visual rendering of the mockups
const koinProject: Project = {
  title: "Koin",
  subtitle: "Personal Finance",
  description: "",
  tags: [],
  accent: "#14d2a5",
  icon: Wallet,
  mockUrl: "klyrhon.me/koin",
  mockupType: "koin-app",
};

const parsProject: Project = {
  title: "pars.",
  subtitle: "Resume Builder",
  description: "",
  tags: [],
  accent: "#ffffff",
  icon: FileText,
  mockUrl: "usepars.vercel.app",
  mockupType: "pars-app",
};

export default function HeroMockupShowcase() {
  const [showKoin, setShowKoin] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowKoin((prev) => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProject = (mockupType: string) => {
    const el = document.getElementById(`project-${mockupType}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const showcaseVariants: Variants = {
    enter: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      rotateX: 10,
      filter: "blur(8px)",
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        duration: 0.7,
        bounce: 0.15,
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.95,
      rotateX: -10,
      filter: "blur(8px)",
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1], // strong ease-out
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <div className="relative w-full h-full flex items-start lg:items-center justify-center perspective-[1200px]">
      <AnimatePresence>
        {showKoin ? (
          <motion.div
            key="koin"
            variants={showcaseVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-start lg:items-center justify-center"
          >
            <div 
              onClick={() => scrollToProject(koinProject.mockupType)}
              className="group/showcase relative w-full flex justify-center scale-[0.75] min-[400px]:scale-[0.8] sm:scale-[0.85] md:scale-[0.9] lg:scale-[0.95] xl:scale-100 origin-top lg:origin-center cursor-pointer"
            >
              <KoinAppMockup project={koinProject} isHero={true} />
              
              {/* Editorial Typographic Label */}
              <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 flex flex-col items-end opacity-0 translate-x-4 group-hover/showcase:opacity-100 group-hover/showcase:translate-x-0 transition-all duration-700 ease-out z-50 pointer-events-none">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-heading">{koinProject.title}</span>
                  <div className="w-8 h-[1px]" style={{ backgroundColor: koinProject.accent }} />
                </div>
                <span className="text-xs text-muted font-medium tracking-wide">{koinProject.subtitle}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="pars"
            variants={showcaseVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-start lg:items-center justify-center"
          >
            <div 
              onClick={() => scrollToProject(parsProject.mockupType)}
              className="group/showcase relative w-full flex justify-center scale-[0.7] min-[400px]:scale-[0.75] sm:scale-[0.8] md:scale-[0.85] lg:scale-[0.95] xl:scale-100 origin-top lg:origin-center cursor-pointer"
            >
              <ParsAppMockup project={parsProject} isHero={true} />
              
              {/* Editorial Typographic Label */}
              <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 flex flex-col items-start opacity-0 -translate-x-4 group-hover/showcase:opacity-100 group-hover/showcase:translate-x-0 transition-all duration-700 ease-out z-50 pointer-events-none">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-8 h-[1px]" style={{ backgroundColor: parsProject.accent }} />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-heading">{parsProject.title}</span>
                </div>
                <span className="text-xs text-muted font-medium tracking-wide">{parsProject.subtitle}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
