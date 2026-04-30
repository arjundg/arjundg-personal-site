"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const primary = [
  {
    company: "Vialto Partners",
    role: "Dev Lead / AI Solution Architect",
    period: "Oct 2022 – Present",
    tenure: "3+ yrs",
    highlights: [
      "Redesigned VialtoComp platform end-to-end",
      "Built agentic AI systems for regulatory compliance",
      "60% cost reduction through architecture optimization",
      "FEM EMEA Product Innovation Award",
      "Built team from scratch across UK & India",
    ],
  },
  {
    company: "PwC India / PwC US",
    role: "Senior Technical Program Manager",
    period: "Dec 2007 – Aug 2021",
    tenure: "14 yrs",
    highlights: [
      "Global cloud migrations across 100+ territories",
      "NextGen landing zones for enterprise workloads",
      "Recognition from Global CIO",
    ],
  },
];

const secondary = [
  { company: "Hyland Software", role: "Software Engineering Manager", period: "2021–2022" },
  { company: "Computer Associates", role: "Associate Software Engineer", period: "2006–2007" },
  { company: "Infosys Technologies", role: "Software Engineer", period: "2005–2006" },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-12"
        >
          Experience
        </motion.h2>

        <div className="relative pl-8 border-l-2 border-accent/30">
          {/* Primary roles — full cards */}
          {primary.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="relative mb-10"
            >
              {/* Node */}
              <div className="absolute -left-[calc(2rem+5px)] w-3 h-3 bg-accent rounded-full ring-4 ring-background" />

              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-sm text-accent font-mono font-medium">{exp.period}</span>
                <span className="text-xs text-muted-foreground font-mono">{exp.tenure}</span>
              </div>
              <h3 className="text-xl font-bold mt-1">{exp.company}</h3>
              <p className="text-muted-foreground text-sm">{exp.role}</p>
              <ul className="mt-3 space-y-1">
                {exp.highlights.map((h) => (
                  <li key={h} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-0.5 shrink-0">/</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Secondary roles — compressed one-liners */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="relative space-y-2 pt-2"
          >
            <div className="absolute -left-[calc(2rem+5px)] top-2 w-3 h-3 bg-card-border rounded-full ring-4 ring-background" />
            {secondary.map((exp) => (
              <p key={exp.company} className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{exp.company}</span>
                {" · "}
                <span>{exp.role}</span>
                {" · "}
                <span className="font-mono text-xs">{exp.period}</span>
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
