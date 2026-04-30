"use client";

import { motion } from "framer-motion";
import { BlueprintGrid } from "./SystemMotif";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Blueprint grid background */}
      <BlueprintGrid />

      {/* Signature diagonal accent — sharper */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 right-0 w-2/5 h-full bg-accent/[0.04] dark:bg-accent/[0.06] skew-x-[-8deg] origin-top-right" />
        <div className="absolute bottom-0 right-16 w-px h-48 bg-gradient-to-t from-accent/50 to-transparent hidden md:block" />
        <div className="absolute top-24 right-16 w-px h-24 bg-gradient-to-b from-accent/30 to-transparent hidden md:block" />
        {/* Horizontal connector line */}
        <div className="absolute top-24 right-16 w-24 h-px bg-accent/20 hidden md:block" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-10 h-0.5 bg-accent" />
            <span className="text-accent text-sm font-mono tracking-wider uppercase">
              London, UK
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-2 leading-[0.9]"
          >
            Arjun K
            <br />
            <span className="text-accent">Dasgupta</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-muted-foreground font-mono tracking-tight mt-3 mb-6"
          >
            AI Solution Architect &amp; Engineering Leader
          </motion.p>

          {/* THE typographic moment — display serif, italic */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="relative font-display italic text-2xl sm:text-3xl md:text-4xl leading-[1.2] text-foreground/90 max-w-xl mb-10 pl-5 border-l-[3px] border-accent"
          >
            Building AI systems for regulated industries where getting it wrong
            isn&apos;t an option.
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 bg-accent text-white rounded font-medium hover:bg-accent-hover transition-colors"
            >
              View Projects
            </a>
            <a
              href="/cv.pdf"
              download
              className="px-6 py-3 border border-card-border rounded font-medium hover:bg-muted transition-colors"
            >
              Download CV
            </a>
            <a
              href="https://linkedin.com/in/arjunkdasgupta"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-card-border rounded font-medium hover:bg-muted transition-colors"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-accent rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
