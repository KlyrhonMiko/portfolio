import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LazySection from "@/components/LazySection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LazySection delay={800}>
          <About />
          <Projects />
          <Experience />
          <Contact />
        </LazySection>
      </main>
      <LazySection delay={800}>
        <Footer />
      </LazySection>
    </>
  );
}
