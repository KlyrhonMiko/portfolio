"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";

const About = dynamic(() => import("@/components/sections/About"), { ssr: false });
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: false });
const Experience = dynamic(() => import("@/components/sections/Experience"), { ssr: false });
const Certificates = dynamic(() => import("@/components/sections/Certificates"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: false });

function LazySection({ children, minHeight, id }: { children: React.ReactNode; minHeight: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger loading when the section is 800px below the viewport
  const isInView = useInView(ref, { once: true, margin: "0px 0px 800px 0px" });
  const [canMount, setCanMount] = useState(false);

  useEffect(() => {
    // Guarantee the main thread stays free during the 1.5s Hero entrance animation
    const timer = setTimeout(() => {
      setCanMount(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={ref} id={id} style={{ minHeight }} className="w-full">
      {canMount && isInView ? children : null}
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
