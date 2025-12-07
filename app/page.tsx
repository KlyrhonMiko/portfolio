'use client';

import NavbarComponent from '@/components/ui/Navbar';
import HeroSection from '@/components/ui/HeroSection';
import AboutSection from '@/components/ui/AboutSection';
import SkillsSection from '@/components/ui/SkillsSection';
// Removed ProjectsSection import
import ContactSection from '@/components/ui/ContactSection';

export default function Home() {
    return (
        <>
            <NavbarComponent />
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            {/* ProjectsSection removed */}
            <ContactSection />
        </>
    );
}
