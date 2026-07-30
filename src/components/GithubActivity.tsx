"use client";

import { GitHubCalendar } from 'react-github-calendar';
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function GithubActivity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { resolvedTheme } = useTheme();
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
      animate={isInView ? { opacity: 1, y: 0 } : {}}
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
        <div className="w-fit overflow-x-auto">
          {mounted && (
            <GitHubCalendar
              username="KlyrhonMiko"
              colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
              blockSize={isMobile ? 11 : 14}
              blockMargin={isMobile ? 3 : 5}
              fontSize={isMobile ? 12 : 14}
              transformData={selectLastHalfYear}
              theme={{
                light: ['#f0f7f3', '#b8d8c7', '#7ec8b8', '#6db38a', '#5a9c76'],
                dark: ['#162B1F', '#21402E', '#305C42', '#3E7857', '#5A9C76'],
              }}
              showWeekdayLabels={true}
              tooltips={{
                activity: {
                  text: (activity) => {
                    const date = new Date(activity.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                    return `${activity.count === 0 ? 'No' : activity.count} contribution${activity.count === 1 ? '' : 's'} on ${date}`;
                  },
                },
              }}
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
