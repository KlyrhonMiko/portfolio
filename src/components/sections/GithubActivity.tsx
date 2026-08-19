"use client";

import { GitHubCalendar } from 'react-github-calendar';
import { motion } from "framer-motion";
import { useSmartInView } from "@/hooks/useSmartInView";
import { useRef, useEffect, useState } from "react";

export default function GithubActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const isAnimInView = useSmartInView(ref, { once: true, margin: "-80px" });
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectLastHalfYear = (contributions: any[]) => {
    if (isMobile) {
      return contributions.slice(-140);
    }
    return contributions;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isAnimInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full flex flex-col"
    >
      <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <h3 className="text-2xl md:text-4xl font-bold text-heading tracking-tight">
          GitHub Activity
        </h3>
        <p className="text-lg text-body lg:text-right max-w-md">
          My open source contributions, personal projects, and daily coding activity.
        </p>
      </div>

      <div className="w-full flex lg:justify-start justify-center py-8">
        <div className="w-fit overflow-x-auto min-h-[160px] sm:min-h-[180px] flex items-center">
          {mounted && (
            <GitHubCalendar
              username="KlyrhonMiko"
              colorScheme="light"
              blockSize={isMobile ? 11 : 14}
              blockMargin={isMobile ? 3 : 5}
              fontSize={isMobile ? 12 : 14}
              transformData={selectLastHalfYear}
              theme={{
                light: ['var(--cal-0)', 'var(--cal-1)', 'var(--cal-2)', 'var(--cal-3)', 'var(--cal-4)'],
                dark: ['var(--cal-0)', 'var(--cal-1)', 'var(--cal-2)', 'var(--cal-3)', 'var(--cal-4)'],
              }}
              showWeekdayLabels={true}
              labels={{
                totalCount: '{{count}} contributions in the last year',
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
