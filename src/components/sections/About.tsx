"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

const configData = `# ~/.config/aryan/profile.yaml

name: "Aryan Sakhala"
role: "Lead Software Engineer"
location: "India -> Canada (2026)"

focus:
  - "RAG-based Agentic Workflows"
  - "Multi-Modal AI Systems"
  - "Production ML Infrastructure"

clients:
  - name: "Dell Technologies"
    type: "Enterprise AI"
  - name: "Intel Corporation"  
    type: "CPU Optimization"
  - name: "Springer Publications"
    type: "Research"

stats:
  years_experience: 5
  projects_delivered: 10+
  team_members_led: 7
  publications: 1

supercompute_2024:
  event: "SC24 Demo"
  project: "Multi-Modal AI Showcase"
  status: "featured"`;

const systemInfo = `ARYAN SAKHALA - System Information
===================================
OS:       Developer v5.0
Uptime:   5+ years
Shell:    /bin/engineer
Terminal: AI/ML Specialist

PROCESSES RUNNING:
  PID   NAME              CPU   MEM
  001   rag-workflows     95%   HIGH
  002   llm-orchestration 90%   HIGH  
  003   team-leadership   88%   MED
  004   research          85%   MED

NETWORK:
  Dell Technologies    [CONNECTED]
  Intel Corporation    [CONNECTED]
  UNB Research         [PENDING]`;

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding" id="about">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-[var(--term-text-subtle)]"># About</span>
          <h2 className="text-3xl text-[var(--term-text)] mt-2">
            <span className="text-[var(--term-green)]">$</span> cat <span className="text-[var(--term-orange)]">~/.config/aryan/profile.yaml</span>
          </h2>
        </motion.div>

        {/* Two terminals side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Config file */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TerminalWindow title="profile.yaml">
              <pre className="text-sm leading-relaxed whitespace-pre-wrap">
                {configData.split("\n").map((line, i) => {
                  if (line.startsWith("#")) {
                    return <div key={i} className="text-[var(--term-text-subtle)]">{line}</div>;
                  }
                  if (line.includes(":") && !line.includes('":')) {
                    const [key, ...rest] = line.split(":");
                    return (
                      <div key={i}>
                        <span className="text-[var(--term-purple)]">{key}</span>
                        <span className="text-[var(--term-text)]">:</span>
                        <span className="text-[var(--term-orange)]">{rest.join(":")}</span>
                      </div>
                    );
                  }
                  if (line.trim().startsWith("-")) {
                    return (
                      <div key={i}>
                        <span className="text-[var(--term-text-subtle)]">  - </span>
                        <span className="text-[var(--term-cyan)]">{line.trim().slice(2)}</span>
                      </div>
                    );
                  }
                  return <div key={i} className="text-[var(--term-text)]">{line}</div>;
                })}
              </pre>
            </TerminalWindow>
          </motion.div>

          {/* System info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TerminalWindow title="neofetch">
              <pre className="text-sm leading-relaxed whitespace-pre-wrap">
                {systemInfo.split("\n").map((line, i) => {
                  if (line.includes("===")) {
                    return <div key={i} className="text-[var(--term-cyan)]">{line}</div>;
                  }
                  if (line.includes("[CONNECTED]")) {
                    return (
                      <div key={i}>
                        <span className="text-[var(--term-text-muted)]">{line.replace("[CONNECTED]", "")}</span>
                        <span className="text-[var(--term-green)]">[CONNECTED]</span>
                      </div>
                    );
                  }
                  if (line.includes("[PENDING]")) {
                    return (
                      <div key={i}>
                        <span className="text-[var(--term-text-muted)]">{line.replace("[PENDING]", "")}</span>
                        <span className="text-[var(--term-yellow)] animate-pulse">[PENDING]</span>
                      </div>
                    );
                  }
                  if (line.includes(":")) {
                    const [key, ...rest] = line.split(":");
                    return (
                      <div key={i}>
                        <span className="text-[var(--term-purple)]">{key}</span>
                        <span className="text-[var(--term-text)]">:</span>
                        <span className="text-[var(--term-text-muted)]">{rest.join(":")}</span>
                      </div>
                    );
                  }
                  if (line.includes("HIGH")) {
                    return <div key={i} className="text-[var(--term-green)]">{line}</div>;
                  }
                  if (line.includes("MED")) {
                    return <div key={i} className="text-[var(--term-yellow)]">{line}</div>;
                  }
                  return <div key={i} className="text-[var(--term-text)]">{line}</div>;
                })}
              </pre>
            </TerminalWindow>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
