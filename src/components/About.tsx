"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-8"
        >
          About
        </motion.h2>

        <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            20 years building software, the last three spent exclusively on AI
            architecture for compliance. I started with an Electrical Engineering
            degree at Jadavpur University, picked up an{" "}
            <span className="text-foreground font-medium">MS in Computer Science from IIT Chicago (4.0 GPA)</span>{" "}
            in distributed &amp; cloud computing, then spent 13+ years at PwC scaling
            global platforms across 100+ territories before leading cloud
            migration at Hyland.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Today at Vialto Partners I architect agentic AI, multi-agent
            orchestration, and RAG pipelines for regulatory compliance —
            systems where accuracy isn&apos;t optional. That&apos;s translated to a
            60% cost reduction, a FEM EMEA Product Innovation Award, and an
            engineering team I built from scratch across the UK and India.
          </motion.p>
        </div>

        {/* Inline stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-accent"
        >
          <span>60% cost ↓</span>
          <span>·</span>
          <span>FEM EMEA Award</span>
          <span>·</span>
          <span>UK + India team</span>
        </motion.div>

        {/* Education inline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm">
            <span className="text-accent font-bold">/</span>
            <span>MS CS — Illinois Institute of Technology (4.0)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm">
            <span className="text-accent font-bold">/</span>
            <span>BE EE — Jadavpur University</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
