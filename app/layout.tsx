'use client';

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';

// Dynamically import the 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/canvas/Scene3D'), {
    ssr: false,
    loading: () => null,
});

// Dynamically import the loading screen
const LoadingScreen = dynamic(() => import('@/components/ui/LoadingScreen'), {
    ssr: false,
});

// Dynamically import the Tetris Easter egg
const TetrisGame = dynamic(() => import('@/components/ui/TetrisGame'), {
    ssr: false,
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-inter',
    display: 'swap',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate minimum loading time for smooth experience
        const minLoadTime = 2000;
        const startTime = Date.now();

        const handleLoad = () => {
            const elapsed = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadTime - elapsed);

            setTimeout(() => {
                setIsLoading(false);
            }, remainingTime);
        };

        // Check if document is already loaded
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    return (
        <html lang="en" className={inter.variable}>
            <head>
                <title>Klyrhon Aurel | Portfolio</title>
                <meta name="description" content="A minimal, modern portfolio showcasing development skills with expertise in React, Next.js, and modern web technologies." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                {/* Loading Screen Overlay */}
                <LoadingScreen isLoading={isLoading} />

                {/* 3D Background Canvas */}
                <div className="canvas-container">
                    <Scene3D isLoading={isLoading} />
                </div>

                {/* Main Content - fade in after loading */}
                <main
                    className="main-content"
                    style={{
                        opacity: isLoading ? 0 : 1,
                        transition: 'opacity 0.6s ease-out',
                        transitionDelay: isLoading ? '0s' : '0.3s',
                    }}
                >
                    {children}
                </main>

                {/* Tetris Easter Egg - Activate with Konami Code: ↑↑↓↓←→←→BA */}
                <TetrisGame />
            </body>
        </html>
    );
}

