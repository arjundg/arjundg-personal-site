"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * A decorative system-diagram motif: nodes connected by orthogonal paths.
 * Used as section dividers and background accents — the "Arjun thing."
 */

interface NodePathDividerProps {
  className?: string;
}

export function NodePathDivider({ className = "" }: NodePathDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={`flex items-center justify-center py-8 ${className}`}>
      <motion.svg
        width="200"
        height="24"
        viewBox="0 0 200 24"
        fill="none"
        className="text-accent"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Left node */}
        <motion.circle
          cx="12" cy="12" r="3"
          fill="currentColor"
          variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: 0.1 } } }}
        />
        {/* Path left to center */}
        <motion.path
          d="M15 12 H70"
          stroke="currentColor"
          strokeWidth="1.5"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.4, delay: 0.2 } } }}
        />
        {/* Center junction - vertical tick */}
        <motion.path
          d="M70 4 V20"
          stroke="currentColor"
          strokeWidth="1.5"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.2, delay: 0.5 } } }}
        />
        {/* Center node */}
        <motion.rect
          x="94" y="6" width="12" height="12"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { delay: 0.6 } } }}
        />
        <motion.circle
          cx="100" cy="12" r="2"
          fill="currentColor"
          variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: 0.7 } } }}
        />
        {/* Path center to right */}
        <motion.path
          d="M106 12 H130 V12"
          stroke="currentColor"
          strokeWidth="1.5"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.4, delay: 0.7 } } }}
        />
        {/* Right junction */}
        <motion.path
          d="M130 4 V20"
          stroke="currentColor"
          strokeWidth="1.5"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.2, delay: 0.9 } } }}
        />
        <motion.path
          d="M130 12 H185"
          stroke="currentColor"
          strokeWidth="1.5"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.4, delay: 1.0 } } }}
        />
        {/* Right node */}
        <motion.circle
          cx="188" cy="12" r="3"
          fill="currentColor"
          variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: 1.2 } } }}
        />
      </motion.svg>
    </div>
  );
}

interface BlueprintGridProps {
  className?: string;
}

/**
 * Subtle background pattern: a blueprint-style grid with scattered nodes,
 * used behind hero and section backgrounds.
 */
export function BlueprintGrid({ className = "" }: BlueprintGridProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg width="100%" height="100%" className="opacity-[0.035] dark:opacity-[0.06]">
        <defs>
          <pattern id="blueprint-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            {/* Grid lines */}
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
            {/* Node dot at intersection */}
            <circle cx="0" cy="0" r="1.5" className="fill-accent" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
      </svg>
      {/* Scattered "component" boxes */}
      <div className="absolute top-[15%] right-[10%] w-16 h-10 border border-accent/20 rounded-sm" />
      <div className="absolute top-[15%] right-[10%] translate-x-8 translate-y-10 w-px h-12 bg-accent/15" />
      <div className="absolute bottom-[20%] left-[8%] w-12 h-12 border border-accent/15 rounded-sm" />
      <div className="absolute bottom-[20%] left-[8%] translate-x-12 translate-y-6 w-16 h-px bg-accent/15" />
    </div>
  );
}
