"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Company/Tech SVG Icons
const CompanyIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    dell: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.9 14.3H6.1c-.2 0-.3-.1-.3-.3v-4c0-.2.1-.3.3-.3h11.8c.2 0 .3.1.3.3v4c0 .2-.1.3-.3.3z"/>
      </svg>
    ),
    intel: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.5 7.3v9.2h-1.2V7.3zm1.5 9.2h1.2V10h-1.2zM6.8 7.3H5.2L2.9 14.9l-2.4-7.6H-.7l3.1 9.2h1.3zm4.7 0H8.4v9.2h3.1c2.8 0 4.6-1.9 4.6-4.6s-1.8-4.6-4.6-4.6zm0 8H9.6V8.5h1.9c2 0 3.2 1.4 3.2 3.4s-1.2 3.4-3.2 3.4z"/>
      </svg>
    ),
    springer: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1 17.9c-4-.5-7-3.9-7-7.9 0-.6.1-1.2.2-1.8L9 15v1c0 1.1.9 2 2 2v1.9zm6.9-2.5c-.3-.8-1-1.4-1.9-1.4h-1v-3c0-.6-.5-1-1-1H8v-2h2c.6 0 1-.5 1-1V7h2c1.1 0 2-.9 2-2v-.4c2.9 1.2 5 4.1 5 7.4 0 2.1-.8 4-2.1 5.4z"/>
      </svg>
    ),
    blockchain: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm0 2.2l7 3.1v5.7c0 4.8-3.4 9.4-7 10.5-3.6-1.1-7-5.7-7-10.5V6.3l7-3.1zM12 7l-4 2v4l4 2 4-2V9l-4-2zm0 2l2 1v2l-2 1-2-1v-2l2-1z"/>
      </svg>
    ),
    unb: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 3L1 9l4 2.2v6L12 21l7-3.8v-6l2-1.1V17h2V9L12 3zm6.8 6L12 12.7 5.2 9 12 5.3 18.8 9zM17 15.9l-5 2.7-5-2.7v-4.2l5 2.7 5-2.7v4.2z"/>
      </svg>
    ),
  };
  return icons[name.toLowerCase()] || null;
};

// Tag configuration
const tagConfig: Record<string, { color: string; glow?: boolean; icon?: string }> = {
  ppml: { color: "#DB61A2", glow: true },
  privacy: { color: "#DB61A2" },
  research: { color: "#A371F7", glow: true },
  rag: { color: "#58A6FF", glow: true },
  llm: { color: "#58A6FF" },
  dell: { color: "#007DB8", glow: true, icon: "dell" },
  intel: { color: "#0071C5", glow: true, icon: "intel" },
  springer: { color: "#3FB950", glow: true, icon: "springer" },
  ml: { color: "#F0883E" },
  blockchain: { color: "#D29922", glow: true, icon: "blockchain" },
  analytics: { color: "#A371F7" },
  lead: { color: "#3FB950" },
  dl: { color: "#F0883E" },
  nlp: { color: "#58A6FF" },
  fastapi: { color: "#3FB950" },
  unb: { color: "#F85149", glow: true, icon: "unb" },
  cic: { color: "#DB61A2" },
  sc24: { color: "#FF6B35", glow: true },  // SuperCompute 2024
  dtw: { color: "#00C9A7", glow: true },   // Dell Technologies World
};

const experiences = [
  {
    id: "unb",
    date: "MAY 2026",
    role: "Research Assistant - PPML",
    org: "University of New Brunswick",
    dept: "CIC - Canadian Institute for Cybersecurity",
    status: "UPCOMING",
    desc: "Privacy-Preserving Machine Learning Research",
    tags: ["ppml", "privacy", "research", "unb"],
    highlight: true,
  },
  {
    id: "metrum",
    date: "2024 - NOW",
    role: "Lead Software Engineer",
    org: "Metrum AI",
    dept: "Engineering",
    status: "ACTIVE",
    desc: "RAG Agentic Workflows for Dell & Intel | SC24 (SuperCompute) Demo | DTW 2024",
    tags: ["rag", "llm", "dell", "intel", "sc24", "dtw"],
  },
  {
    id: "vidyashilp",
    date: "2023 - 2024",
    role: "Research Associate",
    org: "Vidyashilp University",
    dept: "Research",
    status: "COMPLETED",
    desc: "Springer LNNS Publication | DS Teaching Assistant",
    tags: ["research", "springer", "ml"],
  },
  {
    id: "evueme",
    date: "2023 - 2024",
    role: "ML Developer",
    org: "EvueMe",
    dept: "AI Division",
    status: "COMPLETED",
    desc: "AI HR Bot Development | Dashboard API Pipeline",
    tags: ["dl", "nlp", "fastapi"],
  },
  {
    id: "sirpi",
    date: "2021 - 2023",
    role: "Data Scientist",
    org: "Sirpi",
    dept: "Data Analytics",
    status: "COMPLETED",
    desc: "Team Lead - Proofify (Blockchain) | IUDX Analytics (Gov. India)",
    tags: ["blockchain", "analytics", "lead"],
  },
];

function EnhancedTag({ tag }: { tag: string }) {
  const config = tagConfig[tag] || { color: "#8B949E" };
  
  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -1 }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide transition-all cursor-default"
      style={{
        backgroundColor: `${config.color}15`,
        border: `1px solid ${config.color}40`,
        color: config.color,
        boxShadow: config.glow ? `0 0 8px ${config.color}30` : undefined,
      }}
    >
      {config.icon && <CompanyIcon name={config.icon} />}
      {tag}
    </motion.span>
  );
}

export function Journey() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-[var(--term-bg-elevated)] relative" id="journey">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[var(--term-pink)] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[var(--term-green)] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12 md:mb-16"
        >
          <span className="text-[var(--term-text-subtle)] text-xs sm:text-sm">// Career Timeline</span>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-[var(--term-text)] mt-2 mb-3 sm:mb-4">
            <span className="text-[var(--term-green)]">$</span> history <span className="text-[var(--term-yellow)]">--career</span>
          </h2>
          <p className="text-[var(--term-text-muted)] max-w-2xl text-sm sm:text-base">
            From Data Science to Lead Software Engineering, building AI systems for enterprise clients.
          </p>
        </motion.div>

        {/* Timeline - Vertical layout */}
        <div className="relative">
          {/* Center line - desktop only */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--term-pink)] via-[var(--term-cyan)] to-[var(--term-green)] hidden lg:block" />
          
          {/* Left line - mobile/tablet */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--term-pink)] via-[var(--term-cyan)] to-[var(--term-green)] lg:hidden" />

          {/* Experience cards */}
          <div className="space-y-6 lg:space-y-0">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const statusColors = {
                UPCOMING: { bg: "var(--term-pink)", text: "#fff" },
                ACTIVE: { bg: "var(--term-green)", text: "#000" },
                COMPLETED: { bg: "var(--term-bg-surface)", text: "var(--term-text-muted)" },
              };
              const statusStyle = statusColors[exp.status as keyof typeof statusColors];

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${index > 0 ? "lg:mt-[-80px]" : ""}`}
                >
                  {/* Timeline dot - mobile (left side) */}
                  <div 
                    className="absolute left-4 sm:left-6 top-6 w-3 h-3 -ml-1.5 rounded-full border-2 lg:hidden z-10"
                    style={{ 
                      borderColor: exp.highlight ? "var(--term-pink)" : "var(--term-cyan)",
                      background: "var(--term-bg)",
                    }}
                  />
                  
                  {/* Timeline dot - desktop (center) */}
                  <div className="absolute left-1/2 top-8 w-4 h-4 -ml-2 rounded-full border-2 hidden lg:block z-10"
                    style={{ 
                      borderColor: exp.highlight ? "var(--term-pink)" : "var(--term-cyan)",
                      background: "var(--term-bg)",
                    }}
                  >
                    {exp.highlight && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[var(--term-pink)]"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Card - alternating sides on desktop, left-aligned on mobile */}
                  <div className={`pl-10 sm:pl-14 lg:pl-0 ${isLeft ? "lg:col-start-1" : "lg:col-start-2"}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`relative p-4 sm:p-6 rounded-xl border transition-all ${
                        exp.highlight 
                          ? "bg-gradient-to-br from-[var(--term-pink)]/10 to-transparent border-[var(--term-pink)]/50 shadow-[0_0_30px_rgba(219,97,162,0.15)]"
                          : exp.status === "ACTIVE"
                          ? "bg-[var(--term-bg)] border-[var(--term-green)]/50 shadow-[0_0_20px_rgba(63,185,80,0.1)]"
                          : "bg-[var(--term-bg)] border-[var(--term-border)] hover:border-[var(--term-border-bright)]"
                      }`}
                    >
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span 
                              className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-bold uppercase whitespace-nowrap"
                              style={{ background: statusStyle.bg, color: statusStyle.text }}
                            >
                              {exp.status}
                            </span>
                            <span className="text-[var(--term-text-muted)] text-xs sm:text-sm">{exp.date}</span>
                          </div>
                          <h3 className={`text-base sm:text-xl font-bold ${exp.highlight ? "text-[var(--term-pink)]" : "text-[var(--term-cyan)]"}`}>
                            {exp.role}
                          </h3>
                          <p className="text-[var(--term-text-muted)] text-xs sm:text-sm break-words">
                            {exp.org} <span className="text-[var(--term-text-subtle)]">/ {exp.dept}</span>
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[var(--term-text)] text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                        {exp.desc}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {exp.tags.map((tag) => (
                          <EnhancedTag key={tag} tag={tag} />
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty cell for alternating layout */}
                  {isLeft && <div className="hidden lg:block" />}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Education footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 sm:mt-12 md:mt-16 text-center px-4"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-[var(--term-bg)] border border-[var(--term-border)] rounded-xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--term-purple)]/20 border border-[var(--term-purple)]/40 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--term-purple)]">
                <path d="M12 3L1 9l4 2.2v6L12 21l7-3.8v-6l2-1.1V17h2V9L12 3zm6.8 6L12 12.7 5.2 9 12 5.3 18.8 9zM17 15.9l-5 2.7-5-2.7v-4.2l5 2.7 5-2.7v4.2z"/>
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-[var(--term-purple)] font-semibold text-sm sm:text-base">B.E. Computer Engineering</p>
              <p className="text-[var(--term-text-muted)] text-xs sm:text-sm">Pune University | 2019-2023 | CGPA: 8.56</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
