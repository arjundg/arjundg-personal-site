"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    category: "AI & LLM",
    skills: ["Agentic AI", "RAG", "Multi-Agent Orchestration", "LLMs", "Prompt Engineering", "Fine-Tuning"],
  },
  {
    category: "Cloud",
    skills: ["Azure", "AWS", "Docker", "Kubernetes", "Event-Driven"],
  },
  {
    category: "Engineering",
    skills: ["C#", "Python", "Java", "Node.js", "React", "REST APIs"],
  },
  {
    category: "Leadership",
    skills: ["Team Building", "Agile", "Stakeholder Management"],
  },
];

const certifications = [
  "TOGAF 9.2",
  "PMP",
  "Claude Code in Action",
  "Building with Claude API",
  "API Security Architect",
  "MicroMasters Business Mgmt (IIMBx)",
  "Agile PM (Google)",
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-10"
        >
          Skills & Certifications
        </motion.h2>

        {/* Skills - compact inline grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.08 * index }}
            >
              <h3 className="text-accent font-mono text-sm font-medium mb-2 flex items-center gap-2">
                <span className="text-accent/50">/</span>
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-2.5 py-1 bg-card border border-card-border rounded-md text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications - compact row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          {certifications.map((cert) => (
            <span
              key={cert}
              className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-medium"
            >
              {cert}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
