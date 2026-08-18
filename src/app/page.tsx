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
        <LazySection minHeight="100vh">
          <About />
        </LazySection>
        <LazySection minHeight="100vh">
          <Projects />
        </LazySection>
        <LazySection minHeight="100vh">
          <Experience />
        </LazySection>
        <LazySection minHeight="100vh">
          <Certificates />
        </LazySection>
        <LazySection minHeight="100vh">
          <Contact />
        </LazySection>
      </main>
      <LazySection minHeight="20vh">
        <Footer />
      </LazySection>
    </>
  );
}
