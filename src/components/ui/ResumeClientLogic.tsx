"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { handleSmoothNavigation } from "@/utils/navigation";

export function ResumeBackButton() {
  const router = useRouter();
  
  return (
    <a 
      href="/"
      onClick={(e) => handleSmoothNavigation(e, "/", null, router)}
      className="inline-flex items-center gap-2 text-gray-600 hover:text-black font-medium transition-colors cursor-pointer"
    >
      <ArrowLeft className="w-5 h-5" />
      Back to Portfolio
    </a>
  );
}

export function DynamicDomainLink({ path, className = "hover:underline" }: { path: string; className?: string }) {
  const [domain, setDomain] = useState("klyrhon.me");
  const [protocol, setProtocol] = useState("https:");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.host);
      setProtocol(window.location.protocol);
    }
  }, []);

  const href = path ? `${protocol}//${domain}${path}` : `${protocol}//${domain}`;
  const display = path ? `${protocol}//${domain}${path}` : domain;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {display}
    </a>
  );
}

export function ResumeScaler({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(1123); // Default A4 height

  useEffect(() => {
    const updateScaleAndHeight = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth;
        const zoomFactor = 0.85; // Zoom out a little bit globally
        if (availableWidth < 794) {
          setScale((availableWidth / 794) * zoomFactor);
        } else {
          setScale(zoomFactor);
        }
      }
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    updateScaleAndHeight();
    window.addEventListener("resize", updateScaleAndHeight);
    
    // Also use a ResizeObserver to catch content changes (e.g. fonts loading)
    let observer: ResizeObserver | null = null;
    if (contentRef.current) {
      observer = new ResizeObserver(() => {
        updateScaleAndHeight();
      });
      observer.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateScaleAndHeight);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center overflow-hidden" style={{ height: contentHeight * scale }}>
      <div 
        ref={contentRef}
        className="origin-top" 
        style={{ transform: `scale(${scale})`, width: 794, minHeight: 1123 }}
      >
        {children}
      </div>
    </div>
  );
}
