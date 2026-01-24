"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TerminalWindow, JsonOutput } from "@/components/ui/TerminalWindow";

const skillsData = {
  ai_ml: {
    name: "AI & Machine Learning",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "Computer Vision", "NLP"],
    proficiency: 95,
  },
  llm_rag: {
    name: "LLM & RAG Systems",
    items: ["LangChain", "LlamaIndex", "OpenAI", "VectorDBs", "PromptEng", "MultiAgent"],
    proficiency: 95,
  },
  backend: {
    name: "Backend & Infra",
    items: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "Redis"],
    proficiency: 92,
  },
  frontend: {
    name: "Frontend & Tools",
    items: ["React", "TypeScript", "Next.js", "Streamlit", "Git", "Linux"],
    proficiency: 85,
  },
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeEndpoint, setActiveEndpoint] = useState<string | null>(null);

  const handleHover = (key: string) => {
    setActiveEndpoint(key);
  };

  return (
    <section ref={ref} className="section-padding relative" id="skills">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-[var(--term-text-subtle)]"># Skills</span>
          <h2 className="text-3xl text-[var(--term-text)] mt-2">
            <span className="text-[var(--term-green)]">$</span> curl <span className="text-[var(--term-cyan)]">-X GET</span> <span className="text-[var(--term-orange)]">api/skills</span>
          </h2>
        </motion.div>

        {/* API Endpoints - Horizontal scroll container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-[var(--term-text-subtle)] mb-4">Available endpoints:</div>
          <div className="flex flex-wrap gap-3">
            {Object.entries(skillsData).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveEndpoint(activeEndpoint === key ? null : key)}
                onMouseEnter={() => handleHover(key)}
                className={`px-4 py-2 rounded border transition-all ${
                  activeEndpoint === key
                    ? "border-[var(--term-cyan)] bg-[var(--term-cyan)]/10 text-[var(--term-cyan)]"
                    : "border-[var(--term-border)] hover:border-[var(--term-border-bright)] text-[var(--term-text-muted)]"
                }`}
              >
                <span className="text-[var(--term-yellow)]">GET</span>{" "}
                <span>/skills/{key}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Response Terminal */}
        <TerminalWindow title={`curl -X GET https://aryan.dev/api/skills${activeEndpoint ? `/${activeEndpoint}` : ""}`}>
          {activeEndpoint ? (
            <motion.div
              key={activeEndpoint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <span className="text-[var(--term-green)]">HTTP/1.1 200 OK</span>
                <br />
                <span className="text-[var(--term-text-subtle)]">Content-Type: application/json</span>
              </div>
              <JsonOutput
                data={{
                  status: "success",
                  data: {
                    category: skillsData[activeEndpoint as keyof typeof skillsData].name,
                    skills: skillsData[activeEndpoint as keyof typeof skillsData].items,
                    proficiency: `${skillsData[activeEndpoint as keyof typeof skillsData].proficiency}%`,
                    verified: true,
                  },
                }}
              />
            </motion.div>
          ) : (
            <div>
              <div className="mb-4">
                <span className="text-[var(--term-green)]">HTTP/1.1 200 OK</span>
                <br />
                <span className="text-[var(--term-text-subtle)]">Content-Type: application/json</span>
              </div>
              <JsonOutput
                data={{
                  status: "success",
                  message: "Select an endpoint above to view skills",
                  available_endpoints: Object.keys(skillsData).map((k) => `/skills/${k}`),
                  total_skills: Object.values(skillsData).reduce((acc, cat) => acc + cat.items.length, 0),
                }}
              />
            </div>
          )}
        </TerminalWindow>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 grid grid-cols-3 gap-4"
        >
          {[
            { label: "Technologies", value: "24+", icon: ">" },
            { label: "Years Active", value: "5+", icon: "#" },
            { label: "Projects", value: "10+", icon: "*" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 border border-[var(--term-border)] rounded-lg bg-[var(--term-bg-elevated)] text-center"
            >
              <div className="text-2xl text-[var(--term-cyan)] mb-1">
                <span className="text-[var(--term-green)]">{stat.icon}</span> {stat.value}
              </div>
              <div className="text-sm text-[var(--term-text-muted)]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
