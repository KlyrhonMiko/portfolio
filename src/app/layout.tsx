import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";



import { ThemeProvider } from "@/components/ui/ThemeProvider";
import RouteTransitionHandler from "@/components/ui/RouteTransitionHandler";

const plex = IBM_Plex_Sans({ variable: "--font-plex", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.klyrhon.me"),
  title: "Klyrhon Aurel | Portfolio",
  description:
    "Selected software projects and field notes by Klyrhon Aurel, an independent web and mobile developer in the Philippines.",
  keywords: ["software engineer", "full stack developer", "ai developer", "philippines", "Klyrhon Aurel", "portfolio"],
  authors: [{ name: "Klyrhon Aurel", url: "https://github.com/KlyrhonMiko" }],
  creator: "Klyrhon Aurel",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${plex.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          {children}
        </ThemeProvider>
        <RouteTransitionHandler />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
