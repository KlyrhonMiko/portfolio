'use client';

import { motion, useInView } from 'framer-motion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRef } from 'react';
import { Github, Mail, ArrowUpRight, Facebook, Instagram } from 'lucide-react';

const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/KlyrhonMiko', username: '@KlyrhonMiko' },
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/aurelklyrhon', username: '@aurelklyrhon' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/klyrhonaurel/', username: '@klyrhonaurel' },
    { name: 'Email', icon: Mail, href: 'mailto:aurelklyrhonmiko@gmail.com', username: 'aurelklyrhonmiko@gmail.com' },
];

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

export default function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="contact" className="section" style={{ paddingBottom: 'var(--space-24)' }}>
            <Container className="container-custom">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {/* Section Header */}
                    <motion.div
                        variants={itemVariants}
                        style={{ marginBottom: 'var(--space-12)', textAlign: 'center' }}
                    >
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
                            04 / Contact
                        </p>
                        <h2 style={{ marginBottom: 'var(--space-6)' }}>Let&apos;s Connect</h2>
                        <p
                            style={{
                                fontSize: 'var(--text-lg)',
                                color: 'var(--text-secondary)',
                                maxWidth: '600px',
                                margin: '0 auto',
                            }}
                        >
                            I&apos;m always interested in new opportunities and collaborations.
                            Feel free to reach out if you&apos;d like to work together or just say hello.
                        </p>
                    </motion.div>

                    {/* Social Links Grid */}
                    <Row className="g-4 justify-content-center">
                        {socialLinks.map((link) => {
                            const IconComponent = link.icon;
                            return (
                                <Col key={link.name} xs={6} md={3}>
                                    <motion.a
                                        href={link.href}
                                        target={link.name !== 'Email' ? '_blank' : undefined}
                                        rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                                        variants={itemVariants}
                                        whileHover={{ y: -4 }}
                                        className="card-minimal"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            padding: 'clamp(1.25rem, 5vw, 2rem)',
                                            background: 'var(--bg-glass)',
                                            textDecoration: 'none',
                                            height: '100%',
                                        }}
                                    >
                                        <IconComponent
                                            size={24}
                                            style={{
                                                marginBottom: 'clamp(1rem, 2.5vw, 1.25rem)',
                                                color: 'var(--text-primary)',
                                            }}
                                        />
                                        <p
                                            style={{
                                                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                                                fontWeight: 600,
                                                marginBottom: 'var(--space-1)',
                                                color: 'var(--text-primary)',
                                            }}
                                        >
                                            {link.name}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: 'clamp(0.6rem, 1.8vw, 0.85rem)',
                                                color: 'var(--text-muted)',
                                                fontFamily: 'var(--font-mono)',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                maxWidth: '100%',
                                            }}
                                        >
                                            {link.username}
                                        </p>
                                    </motion.a>
                                </Col>
                            );
                        })}
                    </Row>

                    {/* CTA */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            marginTop: 'var(--space-16)',
                            textAlign: 'center',
                        }}
                    >
                        <motion.a
                            href="mailto:aurelklyrhonmiko@gmail.com"
                            className="btn-minimal btn-primary"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                fontSize: 'var(--text-lg)',
                                padding: 'var(--space-5) var(--space-10)',
                            }}
                        >
                            Send me an email
                            <ArrowUpRight size={20} />
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.footer
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    style={{
                        marginTop: 'clamp(2rem, 6vw, var(--space-24))',
                        paddingTop: 'clamp(1rem, 3vw, var(--space-8))',
                        borderTop: '1px solid var(--border-color)',
                        textAlign: 'center',
                    }}
                >
                    <p
                        style={{
                            fontSize: 'clamp(0.7rem, 2vw, var(--text-sm))',
                            color: 'var(--text-muted)',
                            fontFamily: 'var(--font-mono)',
                        }}
                    >
                        Designed & Built by Klyrhon Miko R. Aurel © {new Date().getFullYear()}
                    </p>
                </motion.footer>
            </Container>
        </section>
    );
}
