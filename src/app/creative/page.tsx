import { CREATIVE_SITE_URL, studioVersionHref } from "@/config/sites";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import CreativeBelowTheFold from "@/components/layout/CreativeBelowTheFold";
import Background from "@/components/ui/Background";
import SmoothScroll from "@/components/ui/SmoothScroll";
import styles from "./creative.module.css";

export const metadata: Metadata = {
  title: "Creative portfolio | Klyrhon Aurel",
  description: "The animated version of Klyrhon Aurel’s portfolio, featuring interactive project showcases, experience, and certificates.",
  alternates: { canonical: CREATIVE_SITE_URL },
  openGraph: { title: "Creative portfolio | Klyrhon Aurel", description: "Explore Klyrhon Aurel’s animated portfolio.", url: CREATIVE_SITE_URL },
};

async function getGithubData() {
  try {
    const response = await fetch("https://github-contributions-api.jogruber.de/v4/KlyrhonMiko?y=last", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.contributions;
  } catch {
    return null;
  }
}

export default async function CreativePage() {
  const githubData = await getGithubData();
  return <div className={styles.creative}>
    <SmoothScroll>
      <Background />
      <Navbar />
      <main>
        <Hero />
        <CreativeBelowTheFold githubData={githubData} />
      </main>
    </SmoothScroll>
    <Link href={studioVersionHref} className={styles.switchVersion}>Minimal version<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M12 8H4m4-4L4 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
  </div>;
}

