"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { playHoverSound } from "@/lib/sounds";

const skillCategories = [
  {
    title: "AI & Machine Learning",
    gradient: "from-violet-500 to-purple-600",
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
    gradient: "from-blue-500 to-cyan-500",
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
    gradient: "from-emerald-500 to-teal-500",
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
    gradient: "from-orange-500 to-amber-500",
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

  return (
    <section ref={ref} className="py-32 px-6 relative" id="skills">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--ctp-blue)]/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
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
            className="inline-block text-sm font-mono text-[var(--ctp-blue)] uppercase tracking-[0.2em] mb-4"
          >
            Expertise
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-[var(--ctp-text)]">Technical</span>
            <br />
            <span className="bg-gradient-to-r from-[var(--ctp-blue)] to-[var(--ctp-teal)] bg-clip-text text-transparent">
              Proficiency
            </span>
          </h2>
          
          <p className="text-lg text-[var(--ctp-subtext0)] max-w-xl mx-auto">
            Core technologies and frameworks powering production-grade solutions
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              onMouseEnter={() => playHoverSound()}
              className="p-6 rounded-2xl bg-[var(--ctp-surface0)]/30 border border-[var(--ctp-surface1)]/50 backdrop-blur-sm hover:border-[var(--ctp-surface2)] transition-all duration-500 group"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-1 h-8 rounded-full bg-gradient-to-b ${category.gradient}`}
                />
                <h3 className="font-semibold text-lg text-[var(--ctp-text)]">
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
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[var(--ctp-text)] text-sm font-medium">
                        {skill.name}
                      </span>
                      <span className="text-[var(--ctp-overlay0)] text-xs font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-[var(--ctp-surface1)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          delay: catIndex * 0.1 + skillIndex * 0.05 + 0.4,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${category.gradient}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {[
            { label: "Technologies", value: "24+" },
            { label: "Frameworks", value: "12+" },
            { label: "Platforms", value: "8+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl bg-[var(--ctp-surface0)]/30 border border-[var(--ctp-surface1)]/30"
            >
              <div className="text-2xl font-bold text-[var(--ctp-text)] mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--ctp-overlay0)] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
