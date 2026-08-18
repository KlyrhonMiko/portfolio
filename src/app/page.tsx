import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import BelowTheFold from "@/components/layout/BelowTheFold";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BelowTheFold />
      </main>
    </>
  );
}
