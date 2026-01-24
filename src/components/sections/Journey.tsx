"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

const experiences = [
  {
    id: "unb",
    date: "2026-05",
    role: "Research Assistant - PPML",
    org: "University of New Brunswick",
    dept: "CIC",
    status: "UPCOMING",
    desc: ["Privacy-Preserving ML Research", "Canadian Institute for Cybersecurity"],
    tags: ["ppml", "privacy", "research"],
  },
  {
    id: "metrum",
    date: "2024-NOW",
    role: "Lead Software Engineer",
    org: "Metrum AI",
    dept: "Engineering",
    status: "ACTIVE",
    desc: ["RAG Agentic Workflows (Dell, Intel)", "SuperCompute 2024 Demo"],
    tags: ["rag", "llm", "dell", "intel"],
  },
  {
    id: "vidyashilp",
    date: "2023-2024",
    role: "Research Associate",
    org: "Vidyashilp University",
    dept: "Research",
    status: "COMPLETED",
    desc: ["Springer LNNS Publication", "DS Teaching Assistant"],
    tags: ["research", "springer", "ml"],
  },
  {
    id: "evueme",
    date: "2023-2024",
    role: "ML Developer",
    org: "EvueMe",
    dept: "AI",
    status: "COMPLETED",
    desc: ["AI HR Bot Development", "Dashboard API Pipeline"],
    tags: ["dl", "nlp", "fastapi"],
  },
  {
    id: "sirpi",
    date: "2021-2023",
    role: "Data Scientist",
    org: "Sirpi",
    dept: "Data",
    status: "COMPLETED",
    desc: ["Team Lead - Proofify (Blockchain)", "IUDX Analytics (Gov. India)"],
    tags: ["blockchain", "analytics", "lead"],
  },
];

export function Journey() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setVisibleItems((prev) => {
          if (prev >= experiences.length) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 300);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="section-padding bg-[var(--term-bg-elevated)] relative" id="journey">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-[var(--term-text-subtle)]"># Experience</span>
          <h2 className="text-3xl text-[var(--term-text)] mt-2">
            <span className="text-[var(--term-green)]">$</span> history <span className="text-[var(--term-yellow)]">--career</span>
          </h2>
        </motion.div>

        {/* Terminal with history */}
        <TerminalWindow title="history --career | less">
          <div className="space-y-1">
            {/* Header row */}
            <div className="text-[var(--term-text-subtle)] border-b border-[var(--term-border)] pb-2 mb-4 grid grid-cols-12 gap-2 text-sm">
              <span className="col-span-2">DATE</span>
              <span className="col-span-3">ROLE</span>
              <span className="col-span-2">ORG</span>
              <span className="col-span-2">STATUS</span>
              <span className="col-span-3">TAGS</span>
            </div>

            {/* Experience rows */}
            {experiences.slice(0, visibleItems).map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-12 gap-2 py-3 border-b border-[var(--term-border)]/50 hover:bg-[var(--term-bg-surface)] transition-colors group cursor-pointer"
              >
                <span className={`col-span-2 ${exp.status === "UPCOMING" ? "text-[var(--term-pink)]" : exp.status === "ACTIVE" ? "text-[var(--term-green)]" : "text-[var(--term-text-muted)]"}`}>
                  {exp.date}
                </span>
                <span className="col-span-3 text-[var(--term-cyan)] group-hover:text-[var(--term-text)]">
                  {exp.role}
                </span>
                <span className="col-span-2 text-[var(--term-text-muted)]">
                  {exp.org}
                </span>
                <span className={`col-span-2 ${
                  exp.status === "UPCOMING" ? "text-[var(--term-pink)]" : 
                  exp.status === "ACTIVE" ? "text-[var(--term-green)]" : 
                  "text-[var(--term-text-subtle)]"
                }`}>
                  [{exp.status}]
                </span>
                <span className="col-span-3 text-[var(--term-yellow)] text-sm">
                  {exp.tags.map((t) => `#${t}`).join(" ")}
                </span>
              </motion.div>
            ))}

            {/* Loading indicator */}
            {visibleItems < experiences.length && (
              <div className="text-[var(--term-text-subtle)] animate-pulse py-2">
                Loading...
              </div>
            )}

            {/* Footer */}
            {visibleItems >= experiences.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-4 text-[var(--term-text-subtle)]"
              >
                <span className="text-[var(--term-green)]">$</span> <span className="text-[var(--term-text-muted)]">{experiences.length} entries displayed</span>
              </motion.div>
            )}
          </div>
        </TerminalWindow>

        {/* Expanded details - horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <div className="text-[var(--term-text-subtle)] mb-4">
            <span className="text-[var(--term-green)]">$</span> cat details/*.md <span className="text-[var(--term-yellow)]">| head</span>
          </div>
          
          <div className="scroll-horizontal pb-4">
            <div className="flex gap-4" style={{ width: "max-content" }}>
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className={`w-[300px] p-4 border rounded-lg bg-[var(--term-bg)] flex-shrink-0 ${
                    exp.status === "UPCOMING" 
                      ? "border-[var(--term-pink)]/50" 
                      : exp.status === "ACTIVE" 
                      ? "border-[var(--term-green)]/50" 
                      : "border-[var(--term-border)]"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs rounded ${
                      exp.status === "UPCOMING" 
                        ? "bg-[var(--term-pink)]/20 text-[var(--term-pink)]" 
                        : exp.status === "ACTIVE" 
                        ? "bg-[var(--term-green)]/20 text-[var(--term-green)]" 
                        : "bg-[var(--term-bg-surface)] text-[var(--term-text-subtle)]"
                    }`}>
                      {exp.status}
                    </span>
                    <span className="text-[var(--term-text-subtle)] text-sm">{exp.date}</span>
                  </div>
                  
                  <h3 className="text-[var(--term-cyan)] font-medium mb-1">{exp.role}</h3>
                  <p className="text-[var(--term-text-muted)] text-sm mb-3">@ {exp.org} / {exp.dept}</p>
                  
                  <ul className="space-y-1">
                    {exp.desc.map((d, i) => (
                      <li key={i} className="text-sm text-[var(--term-text)] flex items-start gap-2">
                        <span className="text-[var(--term-green)]">-</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center text-[var(--term-text-subtle)] text-sm mt-2">
            <span className="text-[var(--term-yellow)]">Scroll horizontally</span> to view all
          </div>
        </motion.div>
      </div>
    </section>
  );
}
