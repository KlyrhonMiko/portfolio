"use client";

import dynamic from "next/dynamic";

// Dynamically import heavy sections so they don't block the initial page load JS payload.
const DynamicAbout = dynamic(() => import("@/components/sections/About"));
const DynamicProjects = dynamic(() => import("@/components/sections/Projects"));
const DynamicExperience = dynamic(() => import("@/components/sections/Experience"));
const DynamicCertificates = dynamic(() => import("@/components/sections/Certificates"));
const DynamicContact = dynamic(() => import("@/components/sections/Contact"));
const DynamicFooter = dynamic(() => import("@/components/layout/Footer"));

function LazySection({ children, minHeight, id }: { children: React.ReactNode; minHeight: string; id?: string }) {
  // Removed shouldMount gating for SEO purposes.
  // By rendering children unconditionally, Next.js includes these sections in the initial HTML payload (SSR),
  // which is critical for search engines to index the content.
  // The JS bundles are still code-split via the 'dynamic' imports above.
  return (
    <div id={id} className="relative w-full">
      {children}
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
