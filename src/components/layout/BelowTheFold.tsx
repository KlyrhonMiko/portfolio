"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSmartInView } from "@/hooks/useSmartInView";

// Dynamically import heavy sections so they don't block the initial page load JS payload.
const DynamicAbout = dynamic(() => import("@/components/sections/About"));
const DynamicProjects = dynamic(() => import("@/components/sections/Projects"));
const DynamicExperience = dynamic(() => import("@/components/sections/Experience"));
const DynamicCertificates = dynamic(() => import("@/components/sections/Certificates"));
const DynamicContact = dynamic(() => import("@/components/sections/Contact"));
const DynamicFooter = dynamic(() => import("@/components/layout/Footer"));

function LazySection({ children, minHeight, id }: { children: React.ReactNode; minHeight: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger loading when the section is 800px below the viewport
  const isInView = useSmartInView(ref, { once: true, margin: "0px 0px 800px 0px" });
  const [canMount, setCanMount] = useState(false);
  const [forceMount, setForceMount] = useState(false);

  useEffect(() => {
    // Guarantee the main thread stays free during the 1.5s Hero entrance animation
    const timer = setTimeout(() => {
      setCanMount(true);
    }, 1500);
    
    const handleForceMount = () => setForceMount(true);
    window.addEventListener("force-mount-sections", handleForceMount);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("force-mount-sections", handleForceMount);
    };
  }, []);

  const shouldMount = canMount || forceMount;

  return (
    <div ref={ref} id={id} style={{ minHeight: shouldMount ? undefined : minHeight }} className="relative w-full">
      {shouldMount ? children : null}
    </div>
  );
}

export default function BelowTheFold({ githubData }: { githubData?: any }) {
  return (
    <>
      <LazySection id="about" minHeight="100vh"><DynamicAbout githubData={githubData} /></LazySection>
      <LazySection id="projects" minHeight="3000px"><DynamicProjects /></LazySection>
      <LazySection id="experience" minHeight="1200px"><DynamicExperience /></LazySection>
      <LazySection id="certificates" minHeight="1500px"><DynamicCertificates /></LazySection>
      <LazySection id="contact" minHeight="800px"><DynamicContact /></LazySection>
      <LazySection minHeight="400px"><DynamicFooter /></LazySection>
    </>
  );
}
