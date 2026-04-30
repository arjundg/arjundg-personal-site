"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const projects = [
  {
    title: "ConformAI",
    description:
      "AI-powered EU AI Act compliance platform. Helps organizations assess and document AI system compliance with regulatory frameworks.",
    tech: ["React", "Vite", "Node.js", "Azure AI", "GPT-4o", "RAG"],
    link: "https://conformai.vercel.app",
    featured: true,
    mark: "C/AI",
  },
  {
    title: "GoEasyFigures",
    description:
      "Free calculators for finance and wellness: tax, mortgage, retirement, BMI, calorie planning.",
    tech: ["Web App", "Calculator Tools", "Finance"],
    link: "https://goeasyfigures.com",
    featured: false,
    mark: "GEF",
  },
  {
    title: "MindMaze",
    description:
      "Interactive puzzle and game application designed to challenge with brain-teasing mechanics.",
    tech: ["Web App", "Games", "Interactive"],
    link: "https://mindmaze.web.app",
    featured: false,
    mark: "MM",
  },
  {
    title: "QuackCode",
    description:
      'Educational coding game for children featuring "Dilly the Duck" — teaching programming through zone-based puzzle levels.',
    tech: ["React", "Gamified Learning", "Education"],
    link: "#",
    featured: false,
    mark: "QC",
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground mb-10"
        >
          Live products and side projects — proof that I ship.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className={`relative rounded-lg overflow-hidden transition-all group ${
                project.featured
                  ? "bg-foreground text-background border-2 border-foreground"
                  : "bg-card border-2 border-card-border hover:border-accent/60"
              }`}
            >
              {/* Typographic mark header */}
              <div className={`px-5 pt-5 pb-3 flex items-start justify-between`}>
                <span
                  className={`font-mono text-2xl font-bold tracking-tight ${
                    project.featured ? "text-accent" : "text-accent"
                  }`}
                >
                  {project.mark}
                </span>
                {project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-1.5 rounded transition-colors ${
                      project.featured
                        ? "text-background/60 hover:text-accent"
                        : "text-muted-foreground hover:text-accent"
                    }`}
                    aria-label={`Visit ${project.title}`}
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Content */}
              <div className="px-5 pb-5">
                <h3
                  className={`text-lg font-bold group-hover:text-accent transition-colors ${
                    project.featured ? "text-background" : ""
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-sm mt-2 leading-relaxed ${
                    project.featured ? "text-background/70" : "text-muted-foreground"
                  }`}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className={`text-xs px-2 py-0.5 rounded font-medium ${
                        project.featured
                          ? "bg-accent/20 text-accent"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-muted-foreground mt-10 text-sm italic"
        >
          More coming soon — Architecture case studies, AI agent demos, and more.
        </motion.p>
      </div>
    </section>
  );
}
