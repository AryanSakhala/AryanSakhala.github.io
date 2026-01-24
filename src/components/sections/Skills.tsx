"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "AI & Machine Learning",
    color: "var(--ctp-mauve)",
    skills: [
      { name: "PyTorch", level: 95 },
      { name: "TensorFlow", level: 90 },
      { name: "Scikit-learn", level: 95 },
      { name: "Pandas", level: 98 },
      { name: "Computer Vision", level: 85 },
      { name: "NLP", level: 90 },
    ],
  },
  {
    title: "LLM & RAG Systems",
    color: "var(--ctp-blue)",
    skills: [
      { name: "LangChain", level: 95 },
      { name: "LlamaIndex", level: 90 },
      { name: "OpenAI API", level: 95 },
      { name: "Vector DBs", level: 92 },
      { name: "Prompt Engineering", level: 95 },
      { name: "Multi-Agent", level: 88 },
    ],
  },
  {
    title: "Backend & Infrastructure",
    color: "var(--ctp-green)",
    skills: [
      { name: "Python", level: 98 },
      { name: "FastAPI", level: 95 },
      { name: "PostgreSQL", level: 90 },
      { name: "Docker", level: 88 },
      { name: "AWS", level: 85 },
      { name: "Redis", level: 85 },
    ],
  },
  {
    title: "Frontend & Tools",
    color: "var(--ctp-peach)",
    skills: [
      { name: "React", level: 85 },
      { name: "TypeScript", level: 82 },
      { name: "Next.js", level: 80 },
      { name: "Streamlit", level: 95 },
      { name: "Git", level: 92 },
      { name: "Linux", level: 88 },
    ],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={ref} className="py-24 px-6 relative" id="skills">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--ctp-green) 1px, transparent 1px),
            linear-gradient(90deg, var(--ctp-green) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-[var(--ctp-surface2)] text-[var(--ctp-subtext0)] font-mono"
          >
            NEURAL_INTERFACE.exe
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Tech Arsenal
          </h2>
          <p className="text-[var(--ctp-subtext1)] max-w-xl mx-auto">
            Core technologies and frameworks powering my solutions
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="p-6 rounded-2xl bg-[var(--ctp-surface0)]/50 border border-[var(--ctp-surface1)] backdrop-blur-sm relative overflow-hidden group"
            >
              {/* Scan line effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${category.color}05 50%, transparent 100%)`,
                    animation: "scan 2s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: category.color,
                    boxShadow: `0 0 10px ${category.color}`,
                  }}
                />
                <h3
                  className="font-mono font-semibold text-lg"
                  style={{ color: category.color }}
                >
                  {category.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: catIndex * 0.1 + skillIndex * 0.05 + 0.3,
                    }}
                    className="group/skill"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[var(--ctp-text)] text-sm font-medium">
                        {skill.name}
                      </span>
                      <span className="text-[var(--ctp-subtext0)] text-xs font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-[var(--ctp-surface1)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          delay: catIndex * 0.1 + skillIndex * 0.05 + 0.4,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full relative"
                        style={{
                          background: `linear-gradient(90deg, ${category.color}60, ${category.color})`,
                        }}
                      >
                        {/* Glow effect */}
                        <div
                          className="absolute right-0 top-0 bottom-0 w-4 blur-sm"
                          style={{ background: category.color }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status bar */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex justify-center"
        >
          <div className="px-6 py-3 rounded-full glass font-mono text-xs text-[var(--ctp-subtext0)] flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--ctp-green)] animate-pulse" />
              SYSTEMS ONLINE
            </span>
            <span className="text-[var(--ctp-surface2)]">|</span>
            <span>PROFICIENCY: 92%</span>
            <span className="text-[var(--ctp-surface2)]">|</span>
            <span>MODULES: 24</span>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </section>
  );
}
