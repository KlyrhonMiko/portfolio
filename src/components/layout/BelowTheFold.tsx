"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSmartInView } from "@/hooks/useSmartInView";

import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

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

export default function BelowTheFold() {
  return (
    <>
      <LazySection id="about" minHeight="100vh"><About /></LazySection>
      <LazySection id="projects" minHeight="3000px"><Projects /></LazySection>
      <LazySection id="experience" minHeight="1200px"><Experience /></LazySection>
      <LazySection id="certificates" minHeight="1500px"><Certificates /></LazySection>
      <LazySection id="contact" minHeight="800px"><Contact /></LazySection>
      <LazySection minHeight="400px"><Footer /></LazySection>
    </>
  );
}
