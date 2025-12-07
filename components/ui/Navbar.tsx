'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Code2 } from 'lucide-react';

const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
];

export default function NavbarComponent() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Determine active section
            const sections = navItems.map((item) => item.href.slice(1));
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
            }}
        >
            <Navbar
                expand="md"
                style={{
                    padding: 'var(--space-4) 0',
                    background: scrolled ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    transition: 'all var(--transition-base)',
                    borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
                }}
            >
                <Container className="container-custom">
                    <Navbar.Brand
                        href="#hero"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, '#hero')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                        }}
                    >
                        <Code2 size={20} />
                    </Navbar.Brand>

                    <Navbar.Toggle
                        aria-controls="navbar-nav"
                        style={{
                            border: '1px solid var(--border-color)',
                            padding: 'var(--space-2)',
                        }}
                    >
                        <span
                            style={{
                                display: 'block',
                                width: '20px',
                                height: '2px',
                                background: 'var(--text-primary)',
                                marginBottom: '4px',
                            }}
                        />
                        <span
                            style={{
                                display: 'block',
                                width: '20px',
                                height: '2px',
                                background: 'var(--text-primary)',
                                marginBottom: '4px',
                            }}
                        />
                        <span
                            style={{
                                display: 'block',
                                width: '20px',
                                height: '2px',
                                background: 'var(--text-primary)',
                            }}
                        />
                    </Navbar.Toggle>

                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ms-auto" style={{ gap: 'var(--space-2)' }}>
                            {navItems.map((item) => (
                                <Nav.Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, item.href)}
                                    style={{
                                        color:
                                            activeSection === item.href.slice(1)
                                                ? 'var(--text-primary)'
                                                : 'var(--text-secondary)',
                                        padding: 'var(--space-2) var(--space-4)',
                                        fontSize: 'var(--text-sm)',
                                        fontWeight: 500,
                                        position: 'relative',
                                    }}
                                >
                                    {item.name}
                                    {activeSection === item.href.slice(1) && (
                                        <motion.div
                                            layoutId="activeSection"
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 'var(--space-4)',
                                                right: 'var(--space-4)',
                                                height: '2px',
                                                background: 'var(--text-primary)',
                                            }}
                                        />
                                    )}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </motion.div>
    );
}
