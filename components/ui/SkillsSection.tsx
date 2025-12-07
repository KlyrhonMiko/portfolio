'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Container from 'react-bootstrap/Container';
import { useRef, useState, useEffect } from 'react';
import { Code2, Server, Wrench, Sparkles, ChevronRight, Terminal, Database, Cloud, Palette } from 'lucide-react';

const services = [
    {
        icon: Code2,
        title: 'Frontend Development',
        description: 'Crafting beautiful, responsive user interfaces with modern frameworks and pixel-perfect precision.',
        skills: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'HTML/CSS'],
        gradient: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
        accentColor: 'rgba(255, 255, 255, 0.8)',
    },
    {
        icon: Server,
        title: 'Backend Development',
        description: 'Building robust, scalable server architectures and APIs that power seamless experiences.',
        skills: ['Node.js', 'Python', 'Express', 'PostgreSQL'],
        gradient: 'linear-gradient(135deg, rgba(200,200,200,0.1) 0%, rgba(150,150,150,0.02) 100%)',
        accentColor: 'rgba(200, 200, 200, 0.8)',
    },
    {
        icon: Wrench,
        title: 'DevOps & Tools',
        description: 'Streamlining development workflows with modern tooling and deployment strategies.',
        skills: ['Git', 'Figma', 'VS Code'],
        gradient: 'linear-gradient(135deg, rgba(180,180,180,0.1) 0%, rgba(120,120,120,0.02) 100%)',
        accentColor: 'rgba(180, 180, 180, 0.8)',
    },
    {
        icon: Sparkles,
        title: 'Best Practices',
        description: 'Implementing industry standards for clean, maintainable, and scalable codebases.',
        skills: ['REST APIs', 'GraphQL', 'CI/CD', 'Testing', 'Agile'],
        gradient: 'linear-gradient(135deg, rgba(220,220,220,0.1) 0%, rgba(160,160,160,0.02) 100%)',
        accentColor: 'rgba(220, 220, 220, 0.8)',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
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
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    },
};

// Interactive card with 3D tilt effect
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const IconComponent = service.icon;

    return (
        <motion.div
            ref={cardRef}
            variants={itemVariants}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
        >
            <motion.div
                style={{
                    background: service.gradient,
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'clamp(1.25rem, 4vw, 2rem)',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    borderColor: isHovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                    boxShadow: isHovered
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255,255,255,0.05)'
                        : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Animated background glow */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `radial-gradient(circle at 50% 50%, ${service.accentColor}15 0%, transparent 70%)`,
                        opacity: 0,
                        pointerEvents: 'none',
                    }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                />

                {/* Number indicator */}
                <motion.span
                    style={{
                        position: 'absolute',
                        top: 'var(--space-6)',
                        right: 'var(--space-6)',
                        fontSize: 'var(--text-6xl)',
                        fontWeight: 800,
                        color: 'rgba(255,255,255,0.03)',
                        fontFamily: 'var(--font-mono)',
                        lineHeight: 1,
                        userSelect: 'none',
                    }}
                    animate={{
                        color: isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                    }}
                >
                    0{index + 1}
                </motion.span>

                {/* Icon with animated ring */}
                <div style={{ position: 'relative', width: 'fit-content', marginBottom: 'var(--space-6)' }}>
                    <motion.div
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: 'var(--radius-lg)',
                            background: 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255,255,255,0.1)',
                            position: 'relative',
                            zIndex: 1,
                        }}
                        animate={{
                            background: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                            borderColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
                        }}
                    >
                        <IconComponent
                            size={24}
                            style={{ color: service.accentColor }}
                        />
                    </motion.div>

                    {/* Animated ring on hover */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: -4,
                            left: -4,
                            right: -4,
                            bottom: -4,
                            borderRadius: 'calc(var(--radius-lg) + 4px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                        }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: isHovered ? 1 : 0.8,
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Title */}
                <h3
                    style={{
                        fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
                        fontWeight: 600,
                        marginBottom: 'var(--space-3)',
                        color: 'var(--text-primary)',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    {service.title}
                </h3>

                {/* Description */}
                <p
                    style={{
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                        color: 'var(--text-secondary)',
                        marginBottom: 'var(--space-6)',
                        lineHeight: 1.7,
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    {service.description}
                </p>

                {/* Skills as flowing chips */}
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 'var(--space-2)',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    {service.skills.map((skill, skillIndex) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * skillIndex + 0.3 }}
                            whileHover={{
                                scale: 1.08,
                                backgroundColor: 'rgba(255,255,255,0.15)',
                                borderColor: 'rgba(255,255,255,0.3)',
                            }}
                            style={{
                                padding: 'var(--space-1) var(--space-3)',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 'var(--radius-full)',
                                fontSize: 'var(--text-xs)',
                                color: 'var(--text-secondary)',
                                fontWeight: 500,
                                cursor: 'default',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>

                {/* Bottom decorative line */}
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: 2,
                        background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)`,
                        opacity: 0,
                    }}
                    animate={{
                        width: isHovered ? '100%' : '0%',
                        opacity: isHovered ? 0.5 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                />
            </motion.div>
        </motion.div>
    );
}

// Floating particles background
function FloatingParticles() {
    const [particles, setParticles] = useState<Array<{
        width: number;
        height: number;
        left: number;
        top: number;
        duration: number;
        delay: number;
    }>>([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: 20 }).map(() => ({
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                left: Math.random() * 100,
                top: Math.random() * 100,
                duration: Math.random() * 3 + 4,
                delay: Math.random() * 2,
            }))
        );
    }, []);

    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: p.width,
                        height: p.height,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

export default function SkillsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="skills" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            <FloatingParticles />

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
                        style={{
                            marginBottom: 'var(--space-16)',
                            position: 'relative',
                        }}
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
                            02 / Services
                        </p>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                            <h2 style={{ marginBottom: 0 }}>What I Do</h2>
                            <motion.span
                                style={{
                                    fontSize: 'var(--text-lg)',
                                    color: 'var(--text-secondary)',
                                    fontWeight: 400,
                                    marginBottom: 'var(--space-1)',
                                }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                — transforming ideas into digital reality
                            </motion.span>
                        </div>
                        <div className="divider" />

                        {/* Subtitle */}
                        <motion.p
                            variants={itemVariants}
                            style={{
                                fontSize: 'var(--text-lg)',
                                color: 'var(--text-secondary)',
                                maxWidth: 600,
                                marginTop: 'var(--space-4)',
                            }}
                        >
                            I specialize in building complete digital experiences, from stunning frontends
                            to powerful backends, all with a focus on performance and user experience.
                        </motion.p>
                    </motion.div>

                    {/* Service Cards Grid */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 'clamp(1rem, 3vw, 1.5rem)',
                        }}
                        className="skills-grid"
                    >
                        {services.map((service, index) => (
                            <ServiceCard key={service.title} service={service} index={index} />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        variants={itemVariants}
                        style={{
                            marginTop: 'var(--space-16)',
                            textAlign: 'center',
                        }}
                    >
                        <motion.p
                            style={{
                                color: 'var(--text-muted)',
                                fontSize: 'var(--text-sm)',
                                marginBottom: 'var(--space-4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 'var(--space-2)',
                            }}
                        >
                            <Terminal size={14} />
                            Always exploring new technologies
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                _
                            </motion.span>
                        </motion.p>

                        <motion.a
                            href="#contact"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                                color: 'var(--text-secondary)',
                                fontSize: 'var(--text-sm)',
                                textDecoration: 'none',
                                padding: 'var(--space-2) var(--space-4)',
                                border: '1px solid transparent',
                                borderRadius: 'var(--radius-full)',
                                transition: 'all 0.3s ease',
                            }}
                            whileHover={{
                                color: 'var(--text-primary)',
                                borderColor: 'var(--border-color)',
                                backgroundColor: 'rgba(255,255,255,0.05)',
                            }}
                        >
                            Let&apos;s build something together
                            <ChevronRight size={16} />
                        </motion.a>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
