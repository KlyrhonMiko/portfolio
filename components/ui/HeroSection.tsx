'use client';

import { motion } from 'framer-motion';
import Container from 'react-bootstrap/Container';
import { ArrowDown } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    },
};

export default function HeroSection() {
    const scrollToNext = () => {
        const aboutSection = document.getElementById('about');
        aboutSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="section" style={{ minHeight: '100vh' }}>
            <Container className="container-custom">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ maxWidth: '900px' }}
                >
                    {/* Greeting */}
                    <motion.p
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                            color: 'var(--text-secondary)',
                            marginBottom: 'clamp(1rem, 2vw, 1.25rem)',
                            fontFamily: 'var(--font-mono)',
                        }}
                    >
                        Hello, I&apos;m
                    </motion.p>

                    {/* Name */}
                    <motion.h1
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(2.5rem, 10vw, 5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
                            lineHeight: 1.1,
                        }}
                    >
                        Klyrhon Aurel
                    </motion.h1>

                    {/* Title */}
                    <motion.h2
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                            fontWeight: 600,
                            color: 'var(--text-secondary)',
                            marginBottom: 'clamp(2rem, 5vw, 2.5rem)',
                            lineHeight: 1.2,
                        }}
                    >
                        BSIT Student
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                            color: 'var(--text-secondary)',
                            maxWidth: '600px',
                            marginBottom: 'clamp(2rem, 5vw, 3rem)',
                            lineHeight: 1.8,
                        }}
                    >
                        A passionate BSIT student at Pamantasan ng Lungsod ng Pasig, exploring the world of
                        web development and building projects that bring ideas to life.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            display: 'flex',
                            gap: 'var(--space-4)',
                            flexWrap: 'wrap',
                        }}
                    >
                        {/* Removed View Projects button */}
                        <motion.a
                            href="#contact"
                            className="btn-minimal"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Get in Touch
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    onClick={scrollToNext}
                    style={{
                        position: 'absolute',
                        bottom: 'var(--space-10)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        cursor: 'pointer',
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ArrowDown size={24} color="var(--text-secondary)" />
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
