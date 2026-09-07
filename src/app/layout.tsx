import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/ui/SmoothScroll";
import Background from "@/components/ui/Background";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import RouteTransitionHandler from "@/components/ui/RouteTransitionHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  ),
  title: "Klyrhon Aurel | Portfolio",
  description:
    "Personal portfolio showcasing my projects, skills, and experience as a developer.",
  keywords: ["software engineer", "full stack developer", "ai developer", "philippines", "Klyrhon Aurel", "portfolio"],
  authors: [{ name: "Klyrhon Aurel", url: "https://github.com/KlyrhonMiko" }],
  creator: "Klyrhon Aurel",
  openGraph: {
    title: "Klyrhon Aurel | Software Engineer & AI Developer",
    description: "Personal portfolio showcasing my projects, skills, and experience as a full stack and AI developer in the Philippines.",
    url: "/",
    siteName: "Klyrhon Aurel Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klyrhon Aurel | Software Engineer & AI Developer",
    description: "Personal portfolio showcasing my projects, skills, and experience as a full stack and AI developer in the Philippines.",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icons/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Background />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
        <RouteTransitionHandler />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
