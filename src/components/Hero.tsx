"use client";

import { motion } from "framer-motion";
import { Monogram } from "./Monogram";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="flex items-center justify-between gap-12">
          {/* Left: content */}
          <div className="max-w-2xl">
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

            {/* Typographic moment — display serif, italic */}
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

          {/* Right: deliberate geometric mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <Monogram size={180} className="text-foreground/10" animated />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
