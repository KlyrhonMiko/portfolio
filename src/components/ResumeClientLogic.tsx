"use client";

import { useRouter } from "next/navigation";
import { handleSmoothNavigation } from "../utils/navigation";

export function ResumeBackButton() {
  const router = useRouter();
  
  return (
    <a 
      href="/"
      onClick={(e) => handleSmoothNavigation(e, "/", null, router)}
      className="inline-flex items-center gap-2 text-gray-600 hover:text-black font-medium transition-colors cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      Back to Portfolio
    </a>
  );
}
