import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import BelowTheFold from "@/components/layout/BelowTheFold";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "dateModified": new Date().toISOString(),
  "mainEntity": {
    "@type": "Person",
    "name": "Klyrhon Aurel",
    "alternateName": "KlyrhonMiko",
    "jobTitle": "Software Engineer",
    "description": "Full stack developer and AI developer based in the Philippines, specializing in modern web technologies.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "",
    "sameAs": [
      "https://github.com/KlyrhonMiko",
      "https://www.linkedin.com/in/klyrhon/",
      "https://www.facebook.com/aurelklyrhon",
    ],
    "email": "aurelklyrhonmiko@gmail.com",
    "knowsAbout": ["Software Engineering", "Full Stack Development", "AI Development", "React", "Next.js", "TypeScript"],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PH",
    },
  },
};

async function getGithubData() {
  try {
    const res = await fetch('https://github-contributions-api.jogruber.de/v4/KlyrhonMiko?y=last', {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.contributions;
  } catch {
    return null;
  }
}

export default async function Home() {
  const githubData = await getGithubData();
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <BelowTheFold githubData={githubData} />
      </main>
    </>
  );
}
