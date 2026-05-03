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
    featured: false,
    mark: "C/AI",
    category: "For Architects & Engineers",
    bgClass: "bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-700",
    accent: "bg-indigo-500",
  },
  {
    title: "ArchSketch",
    description:
      "Interactive architecture and system design sketching app for diagrams and system design.",
    tech: ["Next.js", "Vercel", "Design Tool"],
    link: "https://archsketch.vercel.app/",
    featured: false,
    mark: "AS",
    category: "For Architects & Engineers",
    bgClass: "bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700",
    accent: "bg-amber-500",
  },
  {
    title: "MindMaze",
    description:
      "Interactive puzzle and game application designed to challenge with brain-teasing mechanics.",
    tech: ["Web App", "Games", "Interactive"],
    link: "https://mindmaze.web.app",
    featured: false,
    mark: "MM",
    category: "For Children / Education",
    bgClass: "bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-700",
    accent: "bg-rose-500",
  },
  {
    title: "QuackCode",
    description:
      'Educational coding game for children featuring "Dilly the Duck" — teaching programming through zone-based puzzle levels.',
    tech: ["React", "Gamified Learning", "Education"],
    link: "#",
    featured: false,
    mark: "QC",
    category: "For Children / Education",
    bgClass: "bg-gray-50 dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700",
    accent: "bg-emerald-500",
  },
  {
    title: "GoEasyFigures",
    description:
      "Free calculators for finance and wellness: tax, mortgage, retirement, BMI, calorie planning.",
    tech: ["Web App", "Calculator Tools", "Finance"],
    link: "https://goeasyfigures.com",
    featured: false,
    mark: "GEF",
    category: "For Consumers",
    bgClass: "bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-700",
    accent: "bg-sky-500",
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = Array.from(new Set(projects.map((p) => p.category || "Other")));

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

        <div className="space-y-8">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="text-xl font-semibold mb-4">{cat}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects
                  .filter((p) => (p.category || "Other") === cat)
                  .map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.06 * index }}
                      onClick={() => project.link !== "#" && window.open(project.link, "_blank")}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") && project.link !== "#" && window.open(project.link, "_blank")
                      }
                      role={project.link !== "#" ? "link" : undefined}
                      tabIndex={project.link !== "#" ? 0 : -1}
                      className={`relative rounded-lg overflow-hidden transition-all group cursor-pointer ${
                        project.bgClass ?? "bg-card border-2 border-card-border hover:border-accent/60"
                      }`}
                    >
                      <div className="px-5 pt-5 pb-3 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {project.accent && <span className={`w-2 h-6 rounded ${project.accent}`} />}
                          <span className={`text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-100`}>{project.mark}</span>
                        </div>
                        {project.link !== "#" && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-1.5 rounded transition-colors text-muted-foreground hover:text-accent`}
                            aria-label={`Visit ${project.title}`}
                          >
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <div className="px-5 pb-5 font-sans">
                        <h4 className={`text-lg font-bold group-hover:text-accent transition-colors text-gray-900 dark:text-gray-100`}>{project.title}</h4>
                        <p className="text-sm mt-2 leading-relaxed text-gray-700 dark:text-gray-300">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {project.tech.map((t) => (
                            <span key={t} className={`text-xs px-2 py-0.5 rounded font-medium bg-accent/10 text-accent`}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
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
