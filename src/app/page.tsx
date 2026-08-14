import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import LazySection from "@/components/ui/LazySection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LazySection delay={800} minHeight="700vh">
          <About />
          <Projects />
          <Experience />
          <Certificates />
          <Contact />
        </LazySection>
      </main>
      <LazySection delay={800}>
        <Footer />
      </LazySection>
    </>
  );
}
