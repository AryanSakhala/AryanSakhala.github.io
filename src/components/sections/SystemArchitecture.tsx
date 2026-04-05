"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const architectures = [
  {
    id: "rag",
    title: "Agentic RAG Pipeline",
    subtitle: "Multi-Agent Distributed Reasoning",
    color: "#58A6FF",
    nodes: [
      { id: "client", label: "Client Request", x: 50, y: 10, type: "input" },
      { id: "fastapi", label: "FastAPI Gateway", x: 50, y: 25, type: "service" },
      { id: "celery", label: "Celery Queue", x: 25, y: 42, type: "queue" },
      { id: "agents", label: "Multi-Agent\nOrchestrator", x: 75, y: 42, type: "core" },
      { id: "llm", label: "LLM Inference\n(OpenAI)", x: 85, y: 62, type: "service" },
      { id: "vectordb", label: "Vector DB\nEmbeddings", x: 50, y: 62, type: "data" },
      { id: "llamaindex", label: "LlamaIndex\nRetrieval", x: 15, y: 62, type: "service" },
      { id: "redis", label: "Redis Cache", x: 25, y: 80, type: "infra" },
      { id: "postgres", label: "PostgreSQL", x: 75, y: 80, type: "data" },
    ],
    connections: [
      ["client", "fastapi"],
      ["fastapi", "celery"],
      ["fastapi", "agents"],
      ["celery", "llamaindex"],
      ["agents", "llm"],
      ["agents", "vectordb"],
      ["llamaindex", "vectordb"],
      ["llamaindex", "redis"],
      ["agents", "postgres"],
    ],
  },
  {
    id: "cv",
    title: "CV Benchmark Platform",
    subtitle: "Multi-Backend Inference Pipeline",
    color: "#F0883E",
    nodes: [
      { id: "api", label: "API Server", x: 50, y: 10, type: "input" },
      { id: "coordinator", label: "Celery\nCoordinator", x: 50, y: 28, type: "core" },
      { id: "worker_amx", label: "AMX Worker\nOpenVINO Async", x: 15, y: 48, type: "service" },
      { id: "worker_cpu", label: "CPU Worker\nOpenVINO Direct", x: 50, y: 48, type: "service" },
      { id: "worker_gpu", label: "GPU Worker\nHTTP → GPU Srv", x: 85, y: 48, type: "service" },
      { id: "gpu_server", label: "YOLO GPU\nInference", x: 85, y: 68, type: "core" },
      { id: "redis", label: "Redis Queue", x: 15, y: 72, type: "queue" },
      { id: "prometheus", label: "Prometheus\nMetrics", x: 50, y: 72, type: "infra" },
      { id: "postgres", label: "PostgreSQL\nResults", x: 50, y: 90, type: "data" },
    ],
    connections: [
      ["api", "coordinator"],
      ["coordinator", "worker_amx"],
      ["coordinator", "worker_cpu"],
      ["coordinator", "worker_gpu"],
      ["worker_gpu", "gpu_server"],
      ["coordinator", "redis"],
      ["worker_amx", "prometheus"],
      ["worker_cpu", "prometheus"],
      ["worker_gpu", "prometheus"],
      ["api", "postgres"],
    ],
  },
  {
    id: "qat",
    title: "QAT TLS Acceleration",
    subtitle: "Hardware Crypto Offload Stack",
    color: "#3FB950",
    nodes: [
      { id: "client", label: "HTTPS Client", x: 50, y: 8, type: "input" },
      { id: "haproxy", label: "HAProxy\nTLS Termination", x: 50, y: 25, type: "core" },
      { id: "engine", label: "QAT Engine\n(qatengine.so)", x: 20, y: 44, type: "service" },
      { id: "openssl", label: "OpenSSL 3.x\nlibcrypto", x: 50, y: 44, type: "service" },
      { id: "provider", label: "QAT Provider\n(qatprovider.so)", x: 80, y: 44, type: "service" },
      { id: "qatlib", label: "qatlib\nVFIO Driver", x: 50, y: 64, type: "infra" },
      { id: "qat_hw", label: "QAT 4xxx\nHardware", x: 50, y: 82, type: "core" },
      { id: "qdrant", label: "Qdrant\nVector DB", x: 85, y: 25, type: "data" },
    ],
    connections: [
      ["client", "haproxy"],
      ["haproxy", "openssl"],
      ["openssl", "engine"],
      ["openssl", "provider"],
      ["engine", "qatlib"],
      ["provider", "qatlib"],
      ["qatlib", "qat_hw"],
      ["haproxy", "qdrant"],
    ],
  },
];

const typeStyles: Record<string, { bg: string; border: string }> = {
  input: { bg: "rgba(88, 166, 255, 0.15)", border: "rgba(88, 166, 255, 0.4)" },
  core: { bg: "rgba(63, 185, 80, 0.15)", border: "rgba(63, 185, 80, 0.4)" },
  service: { bg: "rgba(240, 136, 62, 0.15)", border: "rgba(240, 136, 62, 0.3)" },
  queue: { bg: "rgba(163, 113, 247, 0.15)", border: "rgba(163, 113, 247, 0.3)" },
  data: { bg: "rgba(210, 153, 34, 0.15)", border: "rgba(210, 153, 34, 0.3)" },
  infra: { bg: "rgba(139, 148, 158, 0.1)", border: "rgba(139, 148, 158, 0.3)" },
};

function ArchitectureDiagram({ arch }: { arch: typeof architectures[0] }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const isConnected = (nodeId: string) => {
    if (!hoveredNode) return false;
    return arch.connections.some(
      ([a, b]) => (a === hoveredNode && b === nodeId) || (b === hoveredNode && a === nodeId)
    );
  };

  return (
    <div className="relative w-full" style={{ paddingBottom: "90%" }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connection lines */}
        {arch.connections.map(([fromId, toId], i) => {
          const from = arch.nodes.find((n) => n.id === fromId);
          const to = arch.nodes.find((n) => n.id === toId);
          if (!from || !to) return null;

          const isActive = hoveredNode && (fromId === hoveredNode || toId === hoveredNode);
          const isDimmed = hoveredNode && !isActive;

          return (
            <line
              key={`${fromId}-${toId}-${i}`}
              x1={from.x}
              y1={from.y + 4}
              x2={to.x}
              y2={to.y}
              stroke={isActive ? arch.color : isDimmed ? "#21262D" : "#30363D"}
              strokeWidth={isActive ? 0.5 : 0.3}
              strokeDasharray={isActive ? "none" : "1 1"}
              opacity={isDimmed ? 0.3 : 0.7}
              style={{ transition: "all 0.3s ease" }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {arch.nodes.map((node, i) => {
        const style = typeStyles[node.type];
        const active = hoveredNode === node.id;
        const connected = isConnected(node.id);
        const dimmed = hoveredNode && !active && !connected;

        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute flex items-center justify-center cursor-pointer"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              width: "clamp(60px, 18%, 100px)",
              zIndex: active ? 10 : 1,
            }}
          >
            <div
              className="w-full px-2 py-1.5 rounded-md text-center transition-all duration-200"
              style={{
                background: style.bg,
                border: `1px solid ${active ? arch.color : style.border}`,
                boxShadow: active ? `0 0 15px ${arch.color}30` : "none",
                opacity: dimmed ? 0.3 : 1,
                transform: active ? "scale(1.08)" : "scale(1)",
              }}
            >
              <span
                className="text-[7px] sm:text-[8px] md:text-[9px] font-mono leading-tight block whitespace-pre-line"
                style={{ color: active ? arch.color : "#E6EDF3" }}
              >
                {node.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function SystemArchitecture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeArch, setActiveArch] = useState(0);

  return (
    <section ref={ref} className="section-padding relative" id="architecture">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[var(--term-green)] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[var(--term-orange)] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-[var(--term-text-subtle)] text-xs sm:text-sm uppercase tracking-widest">
            // System Design
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            <span className="text-[var(--term-green)]">Architecture</span>{" "}
            <span className="text-[var(--term-text)]">Diagrams</span>
          </h2>
          <p className="text-[var(--term-text-muted)] max-w-2xl mx-auto text-sm sm:text-base px-4">
            Interactive system architecture diagrams from production projects.
            Hover nodes to explore component relationships.
          </p>
        </motion.div>

        {/* Architecture selector tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8"
        >
          {architectures.map((arch, i) => (
            <motion.button
              key={arch.id}
              onClick={() => setActiveArch(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-mono transition-all"
              style={{
                background:
                  activeArch === i
                    ? `color-mix(in srgb, ${arch.color} 15%, var(--term-bg-elevated))`
                    : "var(--term-bg-elevated)",
                border: `1px solid ${activeArch === i ? arch.color : "var(--term-border)"}`,
                color: activeArch === i ? arch.color : "var(--term-text-muted)",
                boxShadow: activeArch === i ? `0 0 15px ${arch.color}15` : "none",
              }}
            >
              {arch.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Active architecture diagram */}
        <motion.div
          key={architectures[activeArch].id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[var(--term-bg-elevated)] border border-[var(--term-border)] rounded-xl overflow-hidden"
        >
          {/* Diagram header */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[var(--term-border)] flex items-center justify-between">
            <div>
              <h3
                className="text-sm sm:text-lg font-semibold"
                style={{ color: architectures[activeArch].color }}
              >
                {architectures[activeArch].title}
              </h3>
              <p className="text-[10px] sm:text-xs text-[var(--term-text-subtle)]">
                {architectures[activeArch].subtitle}
              </p>
            </div>
            {/* Legend */}
            <div className="hidden sm:flex items-center gap-3">
              {[
                { label: "Core", color: typeStyles.core.border },
                { label: "Service", color: typeStyles.service.border },
                { label: "Data", color: typeStyles.data.border },
                { label: "Infra", color: typeStyles.infra.border },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[10px] text-[var(--term-text-subtle)]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagram */}
          <div className="p-4 sm:p-8">
            <ArchitectureDiagram arch={architectures[activeArch]} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
