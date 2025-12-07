'use client';

import { motion, useInView } from 'framer-motion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRef } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="section">
            <Container className="container-custom">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {/* Section Header */}
                    <motion.div variants={itemVariants} style={{ marginBottom: 'var(--space-12)' }}>
                        <p
                            style={{
                                fontSize: 'var(--text-sm)',
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                marginBottom: 'var(--space-3)',
                                fontFamily: 'var(--font-mono)',
                            }}
                        >
                            01 / About
                        </p>
                        <h2 style={{ marginBottom: 'var(--space-2)' }}>Who I Am</h2>
                        <div className="divider" />
                    </motion.div>

                    <Row className="align-items-center g-5">
                        <Col lg={8}>
                            <motion.div variants={itemVariants}>
                                <p style={{
                                    fontSize: 'clamp(1.125rem, 3vw, 1.375rem)',
                                    marginBottom: 'clamp(1.25rem, 3vw, 1.75rem)'
                                }}>
                                    Hi, I&apos;m Klyrhon Miko R. Aurel a passionate BSIT student at Pamantasan ng Lungsod ng Pasig,
                                    driven by curiosity and a love for building things that make a difference.
                                </p>
                                <p style={{
                                    marginBottom: 'clamp(1.25rem, 3vw, 1.75rem)',
                                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
                                }}>
                                    My journey in tech started with a fascination for how software shapes the world around us.
                                    Today, I&apos;m focused on honing my skills in web development, exploring technologies
                                    like React, Next.js, and modern full-stack frameworks.
                                </p>
                                <p style={{
                                    marginBottom: 'clamp(1.25rem, 3vw, 1.75rem)',
                                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
                                }}>
                                    When I&apos;m not studying or coding, you&apos;ll find me working on personal projects,
                                    learning new programming languages, or collaborating with fellow students on exciting ideas.
                                </p>
                            </motion.div>

                            {/* Quick Stats */}
                            <motion.div
                                variants={itemVariants}
                                style={{
                                    display: 'flex',
                                    gap: 'clamp(2rem, 6vw, 3rem)',
                                    marginTop: 'clamp(2rem, 5vw, 2.5rem)',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                                            fontWeight: 700,
                                            marginBottom: 0,
                                            color: 'var(--text-primary)',
                                        }}
                                    >
                                        BSIT
                                    </p>
                                    <p style={{
                                        fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                                        color: 'var(--text-muted)'
                                    }}>
                                        Program
                                    </p>
                                </div>
                                <div>
                                    <p
                                        style={{
                                            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                                            fontWeight: 700,
                                            marginBottom: 0,
                                            color: 'var(--text-primary)',
                                        }}
                                    >
                                        6+
                                    </p>
                                    <p style={{
                                        fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                                        color: 'var(--text-muted)'
                                    }}>
                                        Years Coding
                                    </p>
                                </div>
                                <div>
                                    <p
                                        style={{
                                            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                                            fontWeight: 700,
                                            marginBottom: 0,
                                            color: 'var(--text-primary)',
                                        }}
                                    >
                                        PLP
                                    </p>
                                    <p style={{
                                        fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                                        color: 'var(--text-muted)'
                                    }}>
                                        University
                                    </p>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </motion.div>
            </Container>
        </section>
    );
}
