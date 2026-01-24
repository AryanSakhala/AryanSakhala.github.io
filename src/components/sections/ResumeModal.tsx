"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Mail, MapPin, Calendar, ExternalLink } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const experiences = [
  {
    role: "Research Assistant - PPML",
    company: "University of New Brunswick (CIC)",
    period: "May 2026",
    highlights: ["Privacy-Preserving Machine Learning Research"],
    isUpcoming: true,
  },
  {
    role: "Lead Software Engineer",
    company: "Metrum AI",
    period: "2024 - Present",
    highlights: [
      "RAG-based Agentic Workflows for Dell & Intel",
      "SuperCompute 2024 Multi-Modal AI Showcase",
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

const skills = [
  "Python", "PyTorch", "TensorFlow", "LangChain", "LlamaIndex",
  "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker", "AWS"
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
            className="absolute inset-0 bg-[var(--warm-900)]/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-soft-lg"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[var(--warm-200)] px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-semibold text-[var(--warm-800)]">Resume</h2>
              <div className="flex items-center gap-2">
                <a
                  href="/Aryan Sakhala Resume.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--accent-500)] rounded-lg hover:bg-[var(--accent-600)] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[var(--warm-100)] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-[var(--warm-500)]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Personal Info */}
              <section>
                <h1 className="text-3xl font-bold text-[var(--warm-900)] mb-2">
                  Aryan Sakhala
                </h1>
                <p className="text-lg text-[var(--accent-600)] font-medium mb-4">
                  Lead Software Engineer
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-[var(--warm-500)]">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    aryansakhala@gmail.com
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    India / Canada
                  </span>
                </div>
              </section>

              {/* Summary */}
              <section>
                <h3 className="text-sm font-semibold text-[var(--warm-400)] uppercase tracking-widest mb-3">
                  Summary
                </h3>
                <p className="text-[var(--warm-600)] leading-relaxed">
                  Lead Software Engineer with 5+ years of experience specializing in AI/ML infrastructure,
                  RAG-based agentic systems, and scalable software architecture. Built production-grade
                  AI systems for Dell, Intel, and enterprise clients.
                </p>
              </section>

              {/* Experience */}
              <section>
                <h3 className="text-sm font-semibold text-[var(--warm-400)] uppercase tracking-widest mb-4">
                  Experience
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div
                      key={exp.company}
                      className={`relative pl-4 border-l-2 ${
                        exp.isUpcoming
                          ? 'border-[var(--accent-400)]'
                          : 'border-[var(--warm-200)]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-[var(--warm-800)]">
                          {exp.role}
                        </h4>
                        {exp.isUpcoming && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--accent-100)] text-[var(--accent-600)]">
                            Upcoming
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--warm-500)] mb-2">
                        {exp.company} <span className="mx-1">|</span>
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {exp.period}
                      </p>
                      <ul className="space-y-1">
                        {exp.highlights.map((h) => (
                          <li key={h} className="text-sm text-[var(--warm-600)] flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-[var(--warm-400)] mt-2 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-sm font-semibold text-[var(--warm-400)] uppercase tracking-widest mb-3">
                  Education
                </h3>
                <div className="pl-4 border-l-2 border-[var(--warm-200)]">
                  <h4 className="font-semibold text-[var(--warm-800)]">
                    B.E. Computer Engineering
                  </h4>
                  <p className="text-sm text-[var(--warm-500)]">
                    Pune University | 2019 - 2023 | CGPA: 8.56
                  </p>
                  <p className="text-sm text-[var(--warm-600)] mt-1">
                    Honors: AI/ML Specialization
                  </p>
                </div>
              </section>

              {/* Skills */}
              <section>
                <h3 className="text-sm font-semibold text-[var(--warm-400)] uppercase tracking-widest mb-3">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm rounded-lg bg-[var(--warm-100)] text-[var(--warm-700)] border border-[var(--warm-200)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Links */}
              <section className="pt-4 border-t border-[var(--warm-200)]">
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/AryanSakhala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-[var(--accent-600)] hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/AryanSakhala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-[var(--accent-600)] hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://pypi.org/user/AryanSakhala/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-[var(--accent-600)] hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    PyPI
                  </a>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
