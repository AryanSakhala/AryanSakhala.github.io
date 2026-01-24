"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Brain, Database, Rocket, BookOpen, Users } from "lucide-react";

const highlights = [
  {
    icon: Cpu,
    title: "RAG & Agentic AI",
    description: "Production-grade AI systems for Dell & Intel with multi-agent orchestration",
  },
  {
    icon: Brain,
    title: "Multi-Modal AI",
    description: "SuperCompute 2024 showcase featuring cutting-edge architectures",
  },
  {
    icon: Database,
    title: "Full-Stack ML",
    description: "End-to-end pipelines from data to deployment with MLOps",
  },
  {
    icon: Rocket,
    title: "5+ Years",
    description: "Experience from startups to Fortune 500 enterprise solutions",
  },
  {
    icon: BookOpen,
    title: "Research",
    description: "Springer LNNS publication on ESG + Machine Learning",
  },
  {
    icon: Users,
    title: "Leadership",
    description: "Led cross-functional teams of 7+ engineers",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-[var(--warm-50)]" id="about">
      <div className="container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[var(--accent-500)] uppercase tracking-widest mb-4 block">
            About
          </span>
          <h2 className="text-[var(--warm-900)] mb-4">
            Building Intelligent Systems
          </h2>
          <p className="text-[var(--warm-500)] max-w-2xl mx-auto text-lg">
            Lead Software Engineer specializing in AI/ML infrastructure,
            RAG-based agentic systems, and scalable software architecture.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white border border-[var(--warm-200)] hover:border-[var(--accent-300)] hover:shadow-soft-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--accent-50)] flex items-center justify-center mb-4 group-hover:bg-[var(--accent-100)] transition-colors">
                  <Icon className="w-6 h-6 text-[var(--accent-600)]" />
                </div>
                
                <h3 className="text-lg font-semibold text-[var(--warm-800)] mb-2">
                  {item.title}
                </h3>
                
                <p className="text-[var(--warm-500)] text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
