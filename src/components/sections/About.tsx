"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Cpu, Brain, Database, Rocket, BookOpen, Award } from "lucide-react";
import { playHoverSound } from "@/lib/sounds";

const highlights = [
  {
    icon: Cpu,
    title: "RAG-based Agentic Workflows",
    description: "Building production-grade AI systems for Dell & Intel with multi-agent orchestration",
    stat: "3+",
    statLabel: "Enterprise Deployments",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Brain,
    title: "Multi-Modal AI",
    description: "SuperCompute 2024 showcase featuring cutting-edge architectures and inference optimization",
    stat: "SC24",
    statLabel: "Conference Demo",
    gradient: "from-purple-500/20 to-pink-500/10",
  },
  {
    icon: Database,
    title: "Full-Stack Engineering",
    description: "End-to-end pipelines from data ingestion to production deployment with MLOps best practices",
    stat: "10+",
    statLabel: "Production Systems",
    gradient: "from-teal-500/20 to-emerald-500/10",
  },
  {
    icon: Rocket,
    title: "5+ Years Experience",
    description: "From early-stage startups to Fortune 500 enterprise-scale solutions",
    stat: "5+",
    statLabel: "Years in Industry",
    gradient: "from-orange-500/20 to-amber-500/10",
  },
  {
    icon: BookOpen,
    title: "Research & Publications",
    description: "Springer LNNS publication on ESG metrics analysis using machine learning techniques",
    stat: "1",
    statLabel: "Published Paper",
    gradient: "from-green-500/20 to-lime-500/10",
  },
  {
    icon: Award,
    title: "Technical Leadership",
    description: "Led cross-functional teams delivering high-impact AI/ML solutions across multiple domains",
    stat: "7+",
    statLabel: "Engineers Mentored",
    gradient: "from-pink-500/20 to-rose-500/10",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 relative" id="about">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--ctp-mauve)]/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-sm font-mono text-[var(--ctp-mauve)] uppercase tracking-[0.2em] mb-4"
          >
            About Me
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-[var(--ctp-text)]">Building </span>
            <span className="bg-gradient-to-r from-[var(--ctp-mauve)] to-[var(--ctp-blue)] bg-clip-text text-transparent">
              Intelligent
            </span>
            <br />
            <span className="text-[var(--ctp-text)]">Systems</span>
          </h2>
          
          <p className="text-lg text-[var(--ctp-subtext0)] max-w-2xl mx-auto leading-relaxed">
            Lead Software Engineer specializing in AI/ML infrastructure,
            RAG-based agentic systems, and scalable software architecture.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => playHoverSound()}
              >
                <Card className="group h-full bg-[var(--ctp-surface0)]/30 border-[var(--ctp-surface1)]/50 hover:border-[var(--ctp-surface2)] backdrop-blur-sm transition-all duration-500 overflow-hidden">
                  <CardContent className="p-6 relative h-full flex flex-col">
                    {/* Gradient background on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-[var(--ctp-surface1)]/50 group-hover:bg-[var(--ctp-surface1)] transition-colors">
                          <Icon className="w-6 h-6 text-[var(--ctp-mauve)]" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[var(--ctp-text)]">
                            {item.stat}
                          </div>
                          <div className="text-xs text-[var(--ctp-overlay0)] uppercase tracking-wider">
                            {item.statLabel}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-[var(--ctp-text)] mb-2 group-hover:text-[var(--ctp-mauve)] transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-[var(--ctp-subtext0)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
