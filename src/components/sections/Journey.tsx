"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, GraduationCap, Briefcase, Rocket, FlaskConical, Sparkles } from "lucide-react";

const experiences = [
  {
    year: "May 2026",
    role: "Research Assistant - PPML",
    company: "University of New Brunswick (CIC)",
    icon: Sparkles,
    highlights: [
      "Privacy-Preserving Machine Learning Research",
      "Canadian Institute for Cybersecurity",
    ],
    tags: ["PPML", "Privacy", "Research"],
    isUpcoming: true,
  },
  {
    year: "2024 - Present",
    role: "Lead Software Engineer",
    company: "Metrum AI",
    icon: Rocket,
    highlights: [
      "RAG-based Agentic Workflows for Dell & Intel",
      "SuperCompute 2024 Multi-Modal AI Showcase",
    ],
    tags: ["LangChain", "RAG", "Dell", "Intel"],
  },
  {
    year: "2023 - 2024",
    role: "Research Associate",
    company: "Vidyashilp University",
    icon: FlaskConical,
    highlights: [
      "ML/DS Research Publications (Springer LNNS)",
      "Teaching Assistant for Data Science",
    ],
    tags: ["Research", "Springer", "Teaching"],
  },
  {
    year: "2023 - 2024",
    role: "ML Developer",
    company: "EvueMe Selection Robot",
    icon: Building2,
    highlights: [
      "Deep Learning for AI-based HR Bot",
      "Dashboard API & Database Pipeline",
    ],
    tags: ["Deep Learning", "NLP", "FastAPI"],
  },
  {
    year: "2021 - 2023",
    role: "Data Scientist",
    company: "Sirpi",
    icon: Briefcase,
    highlights: [
      "Led 7-member team for Proofify (Blockchain)",
      "Analytics for IUDX (Gov. of India)",
    ],
    tags: ["Blockchain", "Team Lead"],
  },
  {
    year: "2019 - 2023",
    role: "B.E. Computer Engineering",
    company: "Pune University",
    icon: GraduationCap,
    highlights: ["CGPA: 8.56", "AI/ML Specialization"],
    tags: ["CS", "AI/ML"],
  },
];

export function Journey() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-[var(--warm-100)]" id="journey">
      <div className="container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[var(--accent-500)] uppercase tracking-widest mb-4 block">
            Experience
          </span>
          <h2 className="text-[var(--warm-900)] mb-4">
            Professional Journey
          </h2>
          <p className="text-[var(--warm-500)] max-w-2xl mx-auto text-lg">
            From research to production, building intelligent systems across industries.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            
            return (
              <motion.div
                key={exp.year + exp.company}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-[11px] top-12 bottom-0 w-[2px] bg-[var(--warm-300)]" />
                )}

                {/* Timeline dot */}
                <div 
                  className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                    exp.isUpcoming 
                      ? 'bg-[var(--accent-500)] ring-4 ring-[var(--accent-100)]' 
                      : 'bg-[var(--warm-300)]'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${exp.isUpcoming ? 'bg-white' : 'bg-[var(--warm-500)]'}`} />
                </div>

                {/* Content */}
                <div 
                  className={`p-6 rounded-xl bg-white border transition-all duration-300 hover:shadow-soft ${
                    exp.isUpcoming 
                      ? 'border-[var(--accent-300)] ring-1 ring-[var(--accent-100)]' 
                      : 'border-[var(--warm-200)] hover:border-[var(--warm-300)]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      exp.isUpcoming 
                        ? 'bg-[var(--accent-100)]' 
                        : 'bg-[var(--warm-100)]'
                    }`}>
                      <Icon className={`w-5 h-5 ${exp.isUpcoming ? 'text-[var(--accent-600)]' : 'text-[var(--warm-500)]'}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <span className={`text-sm font-medium ${
                          exp.isUpcoming ? 'text-[var(--accent-600)]' : 'text-[var(--warm-500)]'
                        }`}>
                          {exp.year}
                        </span>
                        {exp.isUpcoming && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--accent-500)] text-white">
                            Upcoming
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-[var(--warm-800)] mb-1">
                        {exp.role}
                      </h3>
                      
                      <p className="text-[var(--warm-500)] text-sm mb-3">
                        {exp.company}
                      </p>

                      <ul className="space-y-1 mb-4">
                        {exp.highlights.map((h) => (
                          <li key={h} className="text-sm text-[var(--warm-600)] flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-[var(--warm-400)] mt-2 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-md bg-[var(--warm-100)] text-[var(--warm-600)] border border-[var(--warm-200)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
