"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AcademicCapIcon } from "@heroicons/react/24/outline";

const education = [
  {
    degree: "MS Computer Science",
    institution: "Illinois Institute of Technology, Chicago",
    period: "2010 – 2013",
    details: "4.0 GPA • Specialization in Distributed & Cloud Computing",
  },
  {
    degree: "BE Electrical Engineering",
    institution: "Jadavpur University, Kolkata",
    period: "2001 – 2005",
    details: "",
  },
];

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-12 text-center"
        >
          Education
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-card border border-card-border rounded-xl p-6 flex gap-4"
            >
              <div className="shrink-0">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <AcademicCapIcon className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">{edu.degree}</h3>
                <p className="text-muted-foreground">{edu.institution}</p>
                <p className="text-sm text-accent mt-1">{edu.period}</p>
                {edu.details && (
                  <p className="text-sm text-muted-foreground mt-2">{edu.details}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
