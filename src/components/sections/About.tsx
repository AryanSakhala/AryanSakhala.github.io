"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Brain, Database, Rocket, BookOpen, Award } from "lucide-react";

const highlights = [
  {
    icon: Cpu,
    title: "RAG-based Agentic Workflows",
    description: "Building production-grade AI systems for Dell & Intel",
    color: "var(--ctp-blue)",
  },
  {
    icon: Brain,
    title: "Multi-Modal AI",
    description: "SuperCompute 2024 showcase with cutting-edge architectures",
    color: "var(--ctp-mauve)",
  },
  {
    icon: Database,
    title: "Full-Stack Engineering",
    description: "End-to-end pipelines from data to deployment",
    color: "var(--ctp-teal)",
  },
  {
    icon: Rocket,
    title: "5+ Years Experience",
    description: "From startups to enterprise-scale solutions",
    color: "var(--ctp-peach)",
  },
  {
    icon: BookOpen,
    title: "Research & Publications",
    description: "Springer LNNS publication on ESG + ML",
    color: "var(--ctp-green)",
  },
  {
    icon: Award,
    title: "Leadership",
    description: "Led cross-functional teams of 7+ engineers",
    color: "var(--ctp-pink)",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section ref={ref} className="py-24 px-6" id="about">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-[var(--ctp-surface2)] text-[var(--ctp-subtext0)]"
          >
            <span className="text-[var(--ctp-green)] mr-2">//</span>
            about.me
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Building the Future
          </h2>
          <p className="text-[var(--ctp-subtext1)] max-w-2xl mx-auto text-lg">
            Lead Software Engineer specializing in AI/ML infrastructure,
            RAG-based systems, and scalable software architecture.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            const isLarge = index === 0 || index === 3;

            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className={isLarge ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <Card className="h-full bg-[var(--ctp-surface0)]/50 border-[var(--ctp-surface1)] hover:border-[var(--ctp-surface2)] transition-all duration-500 group overflow-hidden">
                  <CardContent className="p-6 relative">
                    {/* Gradient blob on hover */}
                    <div
                      className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{ background: item.color }}
                    />

                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: item.color }}
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-[var(--ctp-text)] mb-2 group-hover:text-[var(--ctp-mauve)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[var(--ctp-subtext0)] text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "5+", label: "Years Experience" },
            { value: "10+", label: "Projects Delivered" },
            { value: "7+", label: "Team Members Led" },
            { value: "1", label: "Research Publication" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl glass"
            >
              <div className="text-3xl font-bold text-[var(--ctp-mauve)] mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--ctp-subtext0)] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
