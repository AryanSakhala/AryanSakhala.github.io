"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { MatrixRain } from "@/components/effects/MatrixRain";
import { Building2, GraduationCap, Briefcase, Rocket, FlaskConical, Sparkles } from "lucide-react";

const experiences = [
  {
    year: "MAY 2026",
    role: "Research Assistant - PPML",
    company: "University of New Brunswick (CIC)",
    icon: Sparkles,
    color: "var(--ctp-pink)",
    highlights: [
      "Privacy-Preserving Machine Learning Research",
      "Canadian Institute for Cybersecurity (CIC)",
    ],
    tags: ["PPML", "Privacy", "Research", "CIC", "UNB"],
    isUpcoming: true,
  },
  {
    year: "2024 - NOW",
    role: "Lead Software Engineer",
    company: "Metrum AI",
    icon: Rocket,
    color: "var(--ctp-mauve)",
    highlights: [
      "RAG-based Agentic Workflows for Dell & Intel",
      "SuperCompute 2024 Multi-Modal AI Showcase",
    ],
    tags: ["LangChain", "RAG", "Multi-Agent", "Dell", "Intel"],
  },
  {
    year: "2023 - 2024",
    role: "Research Associate",
    company: "Vidyashilp University",
    icon: FlaskConical,
    color: "var(--ctp-green)",
    highlights: [
      "ML/DS Research Publications (Springer LNNS)",
      "Teaching Assistant for Data Science courses",
    ],
    tags: ["Research", "ML", "Springer", "Teaching"],
  },
  {
    year: "2023 - 2024",
    role: "ML Developer",
    company: "EvueMe Selection Robot",
    icon: Building2,
    color: "var(--ctp-blue)",
    highlights: [
      "Deep Learning for AI-based HR Bot",
      "Dashboard API & Database Pipeline",
    ],
    tags: ["Deep Learning", "NLP", "FastAPI", "PostgreSQL"],
  },
  {
    year: "2021 - 2023",
    role: "Data Scientist",
    company: "Sirpi",
    icon: Briefcase,
    color: "var(--ctp-peach)",
    highlights: [
      "Led 7-member team for Proofify (Blockchain)",
      "Analytics for IUDX (Gov. of India)",
    ],
    tags: ["Blockchain", "Analytics", "Team Lead", "IUDX"],
  },
  {
    year: "2019 - 2023",
    role: "B.E. Computer Engineering",
    company: "Pune University",
    icon: GraduationCap,
    color: "var(--ctp-teal)",
    highlights: ["CGPA: 8.56", "Honors: AI/ML Specialization"],
    tags: ["CS Fundamentals", "AI/ML", "Honors"],
  },
];

export function Journey() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
      id="journey"
    >
      {/* Matrix rain background */}
      <div className="absolute inset-0 bg-[var(--ctp-crust)]">
        <MatrixRain opacity={0.15} />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ctp-base)] via-transparent to-[var(--ctp-base)]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-[var(--ctp-green)]/30 text-[var(--ctp-green)] bg-[var(--ctp-green)]/5"
          >
            <span className="font-mono mr-2">&gt;</span>
            career.timeline
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--ctp-text)] mb-4">
            <span className="text-[var(--ctp-green)]">$</span> Journey
          </h2>
          <p className="text-[var(--ctp-subtext0)] font-mono text-sm">
            cat ~/experience/*.log | grep --color=always
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--ctp-green)] via-[var(--ctp-mauve)] to-[var(--ctp-blue)]" />

          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={exp.year + exp.company}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-4 h-4 rounded-full border-2"
                    style={{
                      borderColor: exp.color,
                      background: `linear-gradient(135deg, ${exp.color}30, ${exp.color}10)`,
                      boxShadow: `0 0 20px ${exp.color}50`,
                    }}
                  />
                </div>

                {/* Content card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:pr-8 md:text-right" : "md:pl-8"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 group relative overflow-hidden ${
                      (exp as { isUpcoming?: boolean }).isUpcoming
                        ? "bg-gradient-to-br from-[var(--ctp-surface0)]/90 to-[var(--ctp-pink)]/10 border-[var(--ctp-pink)]/30 hover:border-[var(--ctp-pink)]/50"
                        : "bg-[var(--ctp-surface0)]/80 border-[var(--ctp-surface1)] hover:border-[var(--ctp-surface2)]"
                    }`}
                    style={(exp as { isUpcoming?: boolean }).isUpcoming ? {
                      boxShadow: `0 0 30px ${exp.color}20, 0 0 60px ${exp.color}10`,
                    } : {}}
                  >
                    {/* Upcoming glow effect */}
                    {(exp as { isUpcoming?: boolean }).isUpcoming && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--ctp-pink)]/10 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    
                    {/* Year badge */}
                    <div
                      className={`flex items-center gap-2 mb-3 ${
                        isLeft ? "md:justify-end" : ""
                      }`}
                    >
                      {(exp as { isUpcoming?: boolean }).isUpcoming && (
                        <Badge className="font-mono text-xs bg-[var(--ctp-pink)] text-[var(--ctp-crust)] animate-pulse">
                          UPCOMING
                        </Badge>
                      )}
                      <Badge
                        className="font-mono text-xs"
                        style={{
                          background: `${exp.color}20`,
                          color: exp.color,
                          border: `1px solid ${exp.color}30`,
                        }}
                      >
                        {exp.year}
                      </Badge>
                    </div>

                    {/* Role & Company */}
                    <div
                      className={`flex items-start gap-3 mb-3 ${
                        isLeft ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className="p-2 rounded-lg shrink-0"
                        style={{
                          background: `${exp.color}15`,
                          border: `1px solid ${exp.color}25`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: exp.color }} />
                      </div>
                      <div className={isLeft ? "md:text-right" : ""}>
                        <h3 className="font-semibold text-[var(--ctp-text)] text-lg">
                          {exp.role}
                        </h3>
                        <p className="text-[var(--ctp-subtext0)] text-sm">
                          @ {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul
                      className={`space-y-1 mb-4 ${
                        isLeft ? "md:text-right" : ""
                      }`}
                    >
                      {exp.highlights.map((h) => (
                        <li
                          key={h}
                          className="text-[var(--ctp-subtext1)] text-sm flex items-center gap-2"
                          style={
                            isLeft
                              ? { justifyContent: "flex-end" }
                              : {}
                          }
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: exp.color }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div
                      className={`flex flex-wrap gap-2 ${
                        isLeft ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-mono rounded bg-[var(--ctp-surface1)] text-[var(--ctp-subtext0)] border border-[var(--ctp-surface2)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
