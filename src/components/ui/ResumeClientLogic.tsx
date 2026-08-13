"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
