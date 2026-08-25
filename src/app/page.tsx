import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import BelowTheFold from "@/components/layout/BelowTheFold";

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
      <Navbar />
      <main>
        <Hero />
        <BelowTheFold githubData={githubData} />
      </main>
    </>
  );
}
