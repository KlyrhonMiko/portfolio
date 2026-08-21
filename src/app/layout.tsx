import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Klyrhon Aurel — Portfolio",
  description:
    "Personal portfolio showcasing my projects, skills, and experience as a developer.",
};

import SmoothScroll from "@/components/ui/SmoothScroll";
import Background from "@/components/ui/Background";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import RouteTransitionHandler from "@/components/ui/RouteTransitionHandler";

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
