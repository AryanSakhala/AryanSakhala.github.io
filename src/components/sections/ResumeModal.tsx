"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const resumeContent = `
================================================================================
                           ARYAN SAKHALA - RESUME
================================================================================

PROFILE
-------
> Lead Software Engineer | AI/ML Architect | RAG Systems Builder
> Location: India -> Canada (May 2026)
> Email: aryansakhala@gmail.com

EXPERIENCE
----------
[UPCOMING] 2026-05     Research Assistant - PPML
                       University of New Brunswick (CIC)
                       - Privacy-Preserving Machine Learning Research

[ACTIVE]   2024-NOW    Lead Software Engineer
                       Metrum AI
                       - RAG-based Agentic Workflows for Dell & Intel
                       - SuperCompute 2024 Multi-Modal AI Showcase
                       - Production-grade LLM pipeline architecture

[DONE]     2023-2024   Research Associate
                       Vidyashilp University
                       - Springer LNNS Publication (ESG + ML)
                       - Teaching Assistant for Data Science

[DONE]     2023-2024   ML Developer
                       EvueMe Selection Robot
                       - Deep Learning for AI-based HR Bot
                       - Dashboard API & Database Pipeline

[DONE]     2021-2023   Data Scientist
                       Sirpi
                       - Led 7-member team for Proofify (Blockchain)
                       - Analytics for IUDX (Gov. of India)

EDUCATION
---------
2019-2023  B.E. Computer Engineering
           Pune University
           CGPA: 8.56 | Honors: AI/ML Specialization

SKILLS
------
AI/ML:     PyTorch, TensorFlow, Scikit-learn, Pandas, CV, NLP
LLM/RAG:   LangChain, LlamaIndex, OpenAI, VectorDBs, Multi-Agent
Backend:   Python, FastAPI, PostgreSQL, Docker, AWS, Redis
Frontend:  React, TypeScript, Next.js, Streamlit

LINKS
-----
GitHub:    github.com/AryanSakhala
LinkedIn:  linkedin.com/in/AryanSakhala
PyPI:      pypi.org/user/AryanSakhala

================================================================================
                              END OF RESUME
================================================================================
`;

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
            className="absolute inset-0 bg-[var(--term-bg)]/95 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden px-2 sm:px-0"
          >
            {/* Actions bar */}
            <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
              <div className="text-[var(--term-text-muted)] text-sm sm:text-base truncate">
                <span className="text-[var(--term-green)]">$</span> cat resume.txt
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <a
                  href="/Aryan Sakhala Resume.pdf"
                  download
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-[var(--term-bg-surface)] border border-[var(--term-border)] rounded hover:border-[var(--term-green)] hover:text-[var(--term-green)] transition-colors"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">wget resume.pdf</span>
                  <span className="sm:hidden">PDF</span>
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 text-[var(--term-text-muted)] hover:text-[var(--term-red)] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Terminal with resume */}
            <TerminalWindow title="less resume.txt" className="max-h-[70vh] sm:max-h-[75vh] overflow-y-auto">
              <pre className="text-[10px] sm:text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-words">
                {resumeContent.split("\n").map((line, i) => {
                  if (line.includes("===")) {
                    return <div key={i} className="text-[var(--term-cyan)]">{line}</div>;
                  }
                  if (line.includes("---")) {
                    return <div key={i} className="text-[var(--term-text-subtle)]">{line}</div>;
                  }
                  if (line.startsWith(">")) {
                    return <div key={i} className="text-[var(--term-green)]">{line}</div>;
                  }
                  if (line.includes("[UPCOMING]")) {
                    return <div key={i} className="text-[var(--term-pink)]">{line}</div>;
                  }
                  if (line.includes("[ACTIVE]")) {
                    return <div key={i} className="text-[var(--term-green)]">{line}</div>;
                  }
                  if (line.includes("[DONE]")) {
                    return <div key={i} className="text-[var(--term-text-muted)]">{line}</div>;
                  }
                  if (line.match(/^[A-Z]+$/)) {
                    return <div key={i} className="text-[var(--term-yellow)] font-bold">{line}</div>;
                  }
                  if (line.includes(":") && !line.includes("http")) {
                    const colonIndex = line.indexOf(":");
                    return (
                      <div key={i}>
                        <span className="text-[var(--term-purple)]">{line.slice(0, colonIndex)}</span>
                        <span className="text-[var(--term-text)]">{line.slice(colonIndex)}</span>
                      </div>
                    );
                  }
                  return <div key={i} className="text-[var(--term-text)]">{line}</div>;
                })}
              </pre>
            </TerminalWindow>

            {/* Footer */}
            <div className="mt-3 sm:mt-4 text-center text-[var(--term-text-subtle)] text-xs sm:text-sm">
              <span className="hidden sm:inline">Press <span className="text-[var(--term-yellow)]">ESC</span> to close</span>
              <span className="sm:hidden">Tap outside to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
