"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    company: "Vialto Partners",
    role: "Dev Lead / AI Solution Architect",
    period: "Oct 2022 – Present",
    featured: true,
    highlights: [
      "Redesigned VialtoComp platform end-to-end",
      "Built agentic AI systems for regulatory compliance",
      "60% cost reduction through architecture optimization",
      "FEM EMEA Product Innovation Award",
      "Built team from scratch across UK & India",
    ],
  },
  {
    company: "Hyland Software",
    role: "Software Engineering Manager",
    period: "Aug 2021 – Oct 2022",
    featured: true,
    highlights: [
      "Cloud migration of OnBase ECM platform",
      "Modernized legacy monolith to cloud-native",
    ],
  },
  {
    company: "PwC India / PwC US",
    role: "Senior Technical Program Manager",
    period: "Dec 2007 – Aug 2021",
    featured: true,
    highlights: [
      "Global cloud migrations across 100+ territories",
      "NextGen landing zones for enterprise workloads",
      "Recognition from Global CIO",
    ],
  },
  {
    company: "Computer Associates",
    role: "Associate Software Engineer",
    period: "2006 – 2007",
    featured: false,
    highlights: [],
  },
  {
    company: "Infosys Technologies",
    role: "Software Engineer",
    period: "2005 – 2006",
    featured: false,
    highlights: [],
  },
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
          {experiences.filter(e => e.featured).map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="relative mb-10 last:mb-0"
            >
              {/* Dot */}
              <div className="absolute -left-[calc(2rem+5px)] w-3 h-3 bg-accent rounded-full ring-4 ring-background" />

              <span className="text-sm text-accent font-mono font-medium">{exp.period}</span>
              <h3 className="text-lg font-bold mt-1">{exp.company}</h3>
              <p className="text-muted-foreground text-sm">{exp.role}</p>
              {exp.highlights.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {exp.highlights.map((h) => (
                    <li key={h} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-0.5 shrink-0">/</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}

          {/* Compressed early career */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="relative pt-2"
          >
            <div className="absolute -left-[calc(2rem+5px)] w-3 h-3 bg-card-border rounded-full ring-4 ring-background" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Earlier:</span>{" "}
              Computer Associates &amp; Infosys Technologies (2005–2007) — Enterprise software engineering foundations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
