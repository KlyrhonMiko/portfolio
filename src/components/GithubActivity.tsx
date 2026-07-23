"use client";

import { GitHubCalendar } from 'react-github-calendar';
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function GithubActivity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-16 sm:mb-20"
    >
      <div className="mb-10 text-center">
        <h3 className="text-xl font-bold text-heading sm:text-2xl md:text-3xl">
          GitHub <span className="text-gradient-animated">Activity</span>
        </h3>
        <p className="mt-2 text-body">
          My personal projects, open source contributions, and daily coding activity
        </p>
      </div>

      <div className="mx-auto w-fit max-w-full overflow-hidden rounded-2xl border border-border-light bg-surface p-6 sm:p-8 shadow-sm transition-shadow duration-500 hover:shadow-md hover:shadow-primary/5">
        <div className="flex justify-center w-full">
          <div className="w-full">
            <GitHubCalendar
              username="KlyrhonMiko"
              colorScheme="light"
              theme={{
                light: ['#f0f7f3', '#b8d8c7', '#7ec8b8', '#6db38a', '#5a9c76'],
                dark: ['#1a2420', '#1e3a2b', '#2d5a40', '#3b7d58', '#4d9c6c'],
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
          </div>
        </div>
      </div>
    </motion.div>
  );
}
