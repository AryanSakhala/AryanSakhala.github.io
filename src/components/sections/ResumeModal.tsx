"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MatrixRain } from "@/components/effects/MatrixRain";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const experiences = [
  {
    role: "Lead Software Engineer",
    company: "Metrum AI",
    period: "2024 - Present",
    highlights: [
      "RAG-based Agentic Workflows for Dell & Intel",
      "SuperCompute 2024 Multi-Modal AI Showcase",
      "Production-grade LLM pipeline architecture",
    ],
  },
  {
    role: "Research Associate",
    company: "Vidyashilp University",
    period: "2023 - 2024",
    highlights: [
      "ML/DS Research Publications (Springer LNNS)",
      "Teaching Assistant for Data Science",
    ],
  },
  {
    role: "ML Developer",
    company: "EvueMe Selection Robot",
    period: "2023 - 2024",
    highlights: [
      "Deep Learning for AI-based HR Bot",
      "Dashboard API & Database Pipeline",
    ],
  },
  {
    role: "Data Scientist",
    company: "Sirpi",
    period: "2021 - 2023",
    highlights: [
      "Led 7-member team for Proofify (Blockchain)",
      "Analytics for IUDX (Gov. of India)",
    ],
  },
];

const techStack = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "LangChain",
  "LlamaIndex",
  "FastAPI",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Git",
];

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[var(--ctp-crust)]/95 backdrop-blur-md"
          >
            <MatrixRain opacity={0.1} />
          </motion.div>

          {/* Scan line overlay */}
          <div
            className="fixed inset-0 pointer-events-none z-[51]"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.1) 2px,
                rgba(0, 0, 0, 0.1) 4px
              )`,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative z-[52] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--ctp-base)] border border-[var(--ctp-green)]/30 shadow-2xl"
            style={{
              boxShadow: `0 0 60px rgba(166, 227, 161, 0.15)`,
            }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-[var(--ctp-surface1)] bg-[var(--ctp-base)]/95 backdrop-blur-sm">
              <div>
                <h2 className="text-2xl font-bold text-[var(--ctp-text)] glitch-text">
                  ARYAN SAKHALA
                </h2>
                <p className="text-[var(--ctp-green)] font-mono text-sm mt-1">
                  Lead Software Engineer | AI/ML Architect
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-[var(--ctp-green)]/30 text-[var(--ctp-green)] hover:bg-[var(--ctp-green)]/10"
                >
                  <a
                    href="/Aryan Sakhala Resume.pdf"
                    download
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-[var(--ctp-subtext0)] hover:text-[var(--ctp-text)] hover:bg-[var(--ctp-surface0)]"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Contact bar */}
              <div className="flex flex-wrap gap-4 text-sm font-mono text-[var(--ctp-subtext1)]">
                <a
                  href="mailto:aryansakhala@gmail.com"
                  className="hover:text-[var(--ctp-green)] transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  aryansakhala@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/AryanSakhala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--ctp-green)] transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/AryanSakhala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--ctp-green)] transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  GitHub
                </a>
              </div>

              {/* Experience */}
              <section>
                <h3 className="text-lg font-semibold text-[var(--ctp-green)] border-b border-[var(--ctp-green)]/30 pb-2 mb-4 font-mono">
                  // EXPERIENCE
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.role + exp.company}>
                      <div className="flex flex-wrap justify-between items-baseline gap-2 mb-2">
                        <div>
                          <span className="font-semibold text-[var(--ctp-text)]">
                            {exp.role}
                          </span>
                          <span className="text-[var(--ctp-subtext0)] mx-2">
                            @
                          </span>
                          <span className="text-[var(--ctp-mauve)]">
                            {exp.company}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="font-mono text-xs border-[var(--ctp-surface2)] text-[var(--ctp-subtext0)]"
                        >
                          {exp.period}
                        </Badge>
                      </div>
                      <ul className="space-y-1 pl-4">
                        {exp.highlights.map((h) => (
                          <li
                            key={h}
                            className="text-[var(--ctp-subtext1)] text-sm flex items-start gap-2"
                          >
                            <span className="text-[var(--ctp-green)] mt-1.5">
                              &gt;
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tech Stack */}
              <section>
                <h3 className="text-lg font-semibold text-[var(--ctp-green)] border-b border-[var(--ctp-green)]/30 pb-2 mb-4 font-mono">
                  // TECH_STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <Badge
                      key={tech}
                      className="bg-[var(--ctp-surface0)] text-[var(--ctp-text)] border border-[var(--ctp-surface2)] hover:border-[var(--ctp-green)] hover:bg-[var(--ctp-green)]/10 hover:text-[var(--ctp-green)] transition-all duration-300 font-mono text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-lg font-semibold text-[var(--ctp-green)] border-b border-[var(--ctp-green)]/30 pb-2 mb-4 font-mono">
                  // EDUCATION
                </h3>
                <div className="flex flex-wrap justify-between items-baseline gap-2">
                  <div>
                    <span className="font-semibold text-[var(--ctp-text)]">
                      B.E. Computer Engineering
                    </span>
                    <span className="text-[var(--ctp-subtext0)] mx-2">@</span>
                    <span className="text-[var(--ctp-mauve)]">
                      Pune University
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="font-mono text-xs border-[var(--ctp-surface2)] text-[var(--ctp-subtext0)]"
                  >
                    2019 - 2023
                  </Badge>
                </div>
                <p className="text-[var(--ctp-subtext1)] text-sm mt-2">
                  CGPA: 8.56 | Honors: AI/ML Specialization
                </p>
              </section>

              {/* Publications */}
              <section>
                <h3 className="text-lg font-semibold text-[var(--ctp-green)] border-b border-[var(--ctp-green)]/30 pb-2 mb-4 font-mono">
                  // PUBLICATIONS
                </h3>
                <div>
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <span className="font-semibold text-[var(--ctp-text)]">
                      Springer LNNS
                    </span>
                    <Badge
                      variant="outline"
                      className="font-mono text-xs border-[var(--ctp-surface2)] text-[var(--ctp-subtext0)]"
                    >
                      ISBM 2025
                    </Badge>
                  </div>
                  <p className="text-[var(--ctp-subtext1)] text-sm mt-1">
                    ESG + Machine Learning research publication | Bangkok,
                    Thailand
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
