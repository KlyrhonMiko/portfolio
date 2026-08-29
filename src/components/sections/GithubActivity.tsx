"use client";

import dynamic from 'next/dynamic';
import React, { useEffect, useState, useMemo, useCallback } from "react";

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((mod) => mod.GitHubCalendar || (mod as any).default),
  { ssr: false }
);
const ActivityCalendar = dynamic(
  () => import('react-activity-calendar').then((mod) => mod.ActivityCalendar || (mod as any).default),
  { ssr: false }
);

// Stable theme object defined outside component to avoid re-creation
const calendarTheme = {
  light: ['var(--cal-0)', 'var(--cal-1)', 'var(--cal-2)', 'var(--cal-3)', 'var(--cal-4)'],
  dark: ['var(--cal-0)', 'var(--cal-1)', 'var(--cal-2)', 'var(--cal-3)', 'var(--cal-4)'],
};

const calendarLabels = {
  totalCount: '{{count}} contributions in the last year',
};

// Strip tooltip attributes from each block to reduce DOM overhead
const renderBlock = (block: React.ReactElement, _activity: any) => {
  return React.cloneElement(block, {
    title: undefined,
    "data-tooltip-id": undefined,
    "data-tooltip-content": undefined,
  });
};

export default React.memo(function GithubActivity({ githubData }: { githubData?: any[] | null }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Memoize transform function so the calendar doesn't get new props every render
  const selectOptimizedData = useCallback((contributions: any[]) => {
    if (isMobile) {
      return contributions.slice(-140);
    }
    return contributions;
  }, [isMobile]);

  // Memoize props object so the calendar doesn't re-render unnecessarily
  const calendarProps = useMemo(() => ({
    colorScheme: "light" as const,
    blockSize: isMobile ? 11 : 14,
    blockMargin: isMobile ? 3 : 5,
    fontSize: isMobile ? 12 : 14,
    theme: calendarTheme,
    showWeekdayLabels: true,
    labels: calendarLabels,
    renderBlock,
  }), [isMobile]);

  return (
    <div className="w-full flex flex-col">
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
            githubData ? (
              <ActivityCalendar
                data={selectOptimizedData(githubData)}
                {...calendarProps}
              />
            ) : (
              <GitHubCalendar
                username="KlyrhonMiko"
                transformData={selectOptimizedData}
                {...calendarProps}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
});
