"use client";

import { motion } from "framer-motion";

interface MonogramProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

/**
 * AKD monogram built from architecture-diagram geometry:
 * letterforms constructed with nodes (dots) and orthogonal paths (lines).
 */
export function Monogram({ size = 48, className = "", animated = true }: MonogramProps) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, delay: i * 0.15, ease: "easeInOut" },
    }),
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, delay: 0.6 + i * 0.08, ease: "easeOut" },
    }),
  };

  const Wrapper = animated ? motion.svg : "svg";
  const Path = animated ? motion.path : "path";
  const Circle = animated ? motion.circle : "circle";

  const wrapperProps = animated ? { initial: "hidden", animate: "visible" } : {};

  return (
    <Wrapper
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-label="AKD monogram"
      {...wrapperProps}
    >
      {/* A — two angled strokes meeting at apex + crossbar */}
      <Path
        d="M4 52 L14 12 L24 52"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
        custom={0}
        variants={animated ? pathVariants : undefined}
      />
      <Path
        d="M8 38 L20 38"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        custom={1}
        variants={animated ? pathVariants : undefined}
      />

      {/* K — vertical + two angled strokes */}
      <Path
        d="M28 12 L28 52"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
        custom={2}
        variants={animated ? pathVariants : undefined}
      />
      <Path
        d="M28 32 L40 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
        custom={3}
        variants={animated ? pathVariants : undefined}
      />
      <Path
        d="M28 32 L40 52"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
        custom={4}
        variants={animated ? pathVariants : undefined}
      />

      {/* D — vertical + arc */}
      <Path
        d="M46 12 L46 52"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
        custom={5}
        variants={animated ? pathVariants : undefined}
      />
      <Path
        d="M46 12 C62 12 62 52 46 52"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
        fill="none"
        custom={6}
        variants={animated ? pathVariants : undefined}
      />

      {/* Architecture nodes at key intersections */}
      <Circle cx="14" cy="12" r="2.5" fill="var(--accent, currentColor)" custom={0} variants={animated ? dotVariants : undefined} />
      <Circle cx="28" cy="32" r="2.5" fill="var(--accent, currentColor)" custom={1} variants={animated ? dotVariants : undefined} />
      <Circle cx="40" cy="12" r="2.5" fill="var(--accent, currentColor)" custom={2} variants={animated ? dotVariants : undefined} />
      <Circle cx="40" cy="52" r="2.5" fill="var(--accent, currentColor)" custom={3} variants={animated ? dotVariants : undefined} />
      <Circle cx="46" cy="12" r="2.5" fill="var(--accent, currentColor)" custom={4} variants={animated ? dotVariants : undefined} />
      <Circle cx="46" cy="52" r="2.5" fill="var(--accent, currentColor)" custom={5} variants={animated ? dotVariants : undefined} />
    </Wrapper>
  );
}
