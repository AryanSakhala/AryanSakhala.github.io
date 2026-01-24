"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "AI & Machine Learning",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "Computer Vision", "NLP"],
  },
  {
    title: "LLM & RAG Systems",
    skills: ["LangChain", "LlamaIndex", "OpenAI API", "Vector DBs", "Prompt Engineering", "Multi-Agent"],
  },
  {
    title: "Backend & Infrastructure",
    skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "Redis"],
  },
  {
    title: "Frontend & Tools",
    skills: ["React", "TypeScript", "Next.js", "Streamlit", "Git", "Linux"],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-[var(--warm-50)]" id="skills">
      <div className="container-wide">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[var(--accent-500)] uppercase tracking-widest mb-4 block">
            Expertise
          </span>
          <h2 className="text-[var(--warm-900)] mb-4">
            Technical Skills
          </h2>
          <p className="text-[var(--warm-500)] max-w-2xl mx-auto text-lg">
            Core technologies and frameworks powering production-grade solutions.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="p-6 rounded-xl bg-white border border-[var(--warm-200)]"
            >
              <h3 className="text-lg font-semibold text-[var(--warm-800)] mb-4">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 + 0.3 }}
                    className="px-3 py-1.5 text-sm rounded-lg bg-[var(--warm-100)] text-[var(--warm-700)] border border-[var(--warm-200)] hover:border-[var(--accent-300)] hover:bg-[var(--accent-50)] transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex justify-center gap-8 md:gap-16"
        >
          {[
            { value: "24+", label: "Technologies" },
            { value: "10+", label: "Projects" },
            { value: "5+", label: "Years" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[var(--accent-600)] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--warm-500)]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
