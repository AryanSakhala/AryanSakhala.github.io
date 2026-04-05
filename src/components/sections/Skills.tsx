"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// Project data following: Problem → Architecture → Tech → Scale → Outcome
const projects = [
  {
    id: "agentic_rag",
    name: "Agentic RAG System",
    cluster: "AI Systems Core",
    clusterColor: "var(--term-cyan)",
    problem: "Enterprise document retrieval lacked contextual understanding, leading to irrelevant search results across large corpora.",
    architecture: "Multi-agent orchestration with distributed task queues, vector similarity search, and LLM-powered reasoning chains.",
    scale: "Production deployment for enterprise clients with async pipeline processing",
    outcome: "Contextual retrieval accuracy improved significantly with sub-second query response times across large document sets.",
    techStack: [
      { name: "LangChain", where: "LLM workflow orchestration" },
      { name: "LlamaIndex", where: "Data ingestion & retrieval pipelines" },
      { name: "OpenAI API", where: "LLM inference layer" },
      { name: "Vector DBs", where: "Semantic search & embeddings" },
      { name: "FastAPI", where: "API layer for LLM + Celery tasks" },
      { name: "Celery", where: "Async task queue for LLM pipelines" },
      { name: "Redis", where: "Queue backend & state management" },
      { name: "PostgreSQL", where: "Persistent storage for logs & results" },
      { name: "Docker", where: "Containerized deployment" },
      { name: "Prompt Eng", where: "Control & optimize LLM outputs" },
      { name: "Multi-Agent", where: "Distributed reasoning across agents" },
      { name: "Python", where: "Core backend language" },
    ],
  },
  {
    id: "cv_benchmark",
    name: "Computer Vision Benchmark Platform",
    cluster: "Vision Stack",
    clusterColor: "var(--term-orange)",
    problem: "No standardized way to benchmark CV inference across CPU (AMX/non-AMX) and GPU backends with real-time concurrency scaling.",
    architecture: "Dockerized multi-backend system — OpenVINO async workers (AMX/CPU), GPU HTTP inference server, Celery coordinator, with real-time metrics via Prometheus.",
    scale: "Tested on Dell PowerEdge R770 (256 cores, dual NVIDIA RTX PRO 6000) processing concurrent video streams at scale",
    outcome: "Identified and fixed critical memory leaks (5000-frame replication bug), oneDNN logging disk exhaustion, and Celery visibility timeout infinite-loop — enabling reliable multi-hour benchmark runs.",
    techStack: [
      { name: "PyTorch", where: "Model training & GPU inference" },
      { name: "OpenCV", where: "Video & frame processing" },
      { name: "Computer Vision", where: "YOLOv12 detection + tracking" },
      { name: "OpenVINO", where: "CPU/AMX async inference backend" },
      { name: "Docker", where: "Multi-container orchestration" },
      { name: "Python", where: "Backend services & benchmarking" },
      { name: "FastAPI", where: "REST API coordination layer" },
      { name: "Celery", where: "Distributed benchmark orchestration" },
      { name: "Redis", where: "Task queue & caching" },
      { name: "PostgreSQL", where: "Results persistence & analytics" },
      { name: "Pandas", where: "Data processing & reporting" },
    ],
  },
  {
    id: "qat_crypto",
    name: "QAT Hardware Crypto Acceleration",
    cluster: "Backend Infra",
    clusterColor: "var(--term-green)",
    problem: "TLS handshake throughput bottlenecked by CPU-bound RSA/ECDSA signing — limiting connections per second for vector database workloads.",
    architecture: "QAT Engine/Provider plugged into OpenSSL → HAProxy TLS termination in front of Qdrant. Rustls PoC via patched async crypto provider for benchmark replication.",
    scale: "4x Intel QAT Gen4 devices on dual-socket Xeon 6760P, achieving 58K+ RSA-2048 signs/s (56x over software)",
    outcome: "Successfully replicated Intel's benchmark chart (118% for ECDSA P-384). Built and patched C engine with weak symbol stubs for cross-version compatibility.",
    techStack: [
      { name: "OpenSSL", where: "Crypto library integration" },
      { name: "C", where: "Engine & provider source modification" },
      { name: "Docker", where: "Qdrant containerization" },
      { name: "HAProxy", where: "TLS termination with QAT offload" },
      { name: "Linux", where: "Kernel module & driver management" },
      { name: "Rust", where: "Rustls async crypto benchmarks" },
      { name: "Python", where: "Automation & scripting" },
      { name: "AWS", where: "Cloud deployment baseline" },
    ],
  },
  {
    id: "kafka_logging",
    name: "BBU-RRH Real-Time Logging System",
    cluster: "Backend Infra",
    clusterColor: "var(--term-green)",
    problem: "Telecom BBU-RRH systems generated high-volume logs with no real-time streaming or structured analysis pipeline.",
    architecture: "Kafka-based log ingestion with topic partitioning, consumer groups for parallel processing, and structured data transformation.",
    scale: "Real-time streaming across distributed telecom infrastructure",
    outcome: "Enabled real-time log monitoring and structured analysis for telecom operations.",
    techStack: [
      { name: "Kafka", where: "Real-time log streaming" },
      { name: "Python", where: "Consumer & processing logic" },
      { name: "Pandas", where: "Data processing & transformations" },
      { name: "Docker", where: "Containerized deployment" },
      { name: "Linux", where: "Dev & deployment environment" },
    ],
  },
  {
    id: "player_analytics",
    name: "Player Performance Analytics",
    cluster: "Vision Stack",
    clusterColor: "var(--term-orange)",
    problem: "Sports analytics teams lacked automated player tracking and performance quantification from video footage.",
    architecture: "YOLO-based detection pipeline with tracking algorithms, feeding into ML models for performance classification and statistical analysis.",
    scale: "Multi-video batch processing with real-time dashboard visualization",
    outcome: "Automated player tracking and statistical performance analysis from raw video footage.",
    techStack: [
      { name: "PyTorch", where: "Model training for detection" },
      { name: "OpenCV", where: "Video processing pipeline" },
      { name: "Computer Vision", where: "Player detection & tracking" },
      { name: "Scikit-learn", where: "Traditional ML classification" },
      { name: "Pandas", where: "Statistical analysis" },
      { name: "Streamlit", where: "Interactive analytics dashboard" },
      { name: "Python", where: "Core processing language" },
    ],
  },
  {
    id: "stt_benchmarking",
    name: "STT Benchmarking on Cloud",
    cluster: "DevOps",
    clusterColor: "var(--term-purple)",
    problem: "No reproducible benchmark framework for comparing speech-to-text models across different cloud GPU configurations.",
    architecture: "Containerized Whisper inference pipeline deployed on AWS with parameterized GPU selection and automated metric collection.",
    scale: "Multi-GPU cloud benchmarking across various instance types",
    outcome: "Reproducible STT performance baselines across cloud GPU tiers.",
    techStack: [
      { name: "PyTorch", where: "Whisper model inference" },
      { name: "AWS", where: "Cloud compute & GPU instances" },
      { name: "Docker", where: "Reproducible environments" },
      { name: "Python", where: "Benchmark orchestration" },
      { name: "Linux", where: "Deployment environment" },
    ],
  },
  {
    id: "frontend_apps",
    name: "Production Web Applications",
    cluster: "Frontend",
    clusterColor: "var(--term-pink)",
    problem: "Need for modern, performant web interfaces for AI dashboards, e-commerce platforms, and portfolio showcases.",
    architecture: "Next.js with SSR/SSG, React component architecture, TypeScript for type safety, and integrated payment systems.",
    scale: "Production-deployed applications serving real users",
    outcome: "Responsive, SEO-optimized web applications with premium design and smooth interactions.",
    techStack: [
      { name: "React", where: "UI component layer" },
      { name: "TypeScript", where: "Typed frontend development" },
      { name: "Next.js", where: "SSR + structured frontend" },
      { name: "Streamlit", where: "Rapid ML demo UIs" },
    ],
  },
];

// Cluster colors for pattern recognition grouping
const clusterInfo = [
  { name: "AI Systems Core", icon: "🧠", color: "var(--term-cyan)", techs: ["LangChain", "LlamaIndex", "Vector DBs", "Prompt Eng", "Multi-Agent", "OpenAI API"] },
  { name: "Backend Infra", icon: "⚙️", color: "var(--term-green)", techs: ["FastAPI", "Celery", "Redis", "PostgreSQL"] },
  { name: "Vision Stack", icon: "🎥", color: "var(--term-orange)", techs: ["PyTorch", "OpenCV", "Computer Vision", "OpenVINO"] },
  { name: "DevOps", icon: "📦", color: "var(--term-purple)", techs: ["Docker", "AWS", "Linux"] },
];

function TechTag({ name, where, color }: { name: string; where: string; color: string }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative inline-block">
      <motion.span
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-xs cursor-default transition-all"
        style={{
          background: `color-mix(in srgb, ${color} 15%, transparent)`,
          border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
          color: color,
        }}
        whileHover={{ scale: 1.05, borderColor: `color-mix(in srgb, ${color} 60%, transparent)` }}
      >
        {name}
      </motion.span>
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-md text-[10px] whitespace-nowrap pointer-events-none"
          style={{
            background: 'var(--term-bg-surface)',
            border: '1px solid var(--term-border-bright)',
            color: 'var(--term-text)',
            boxShadow: `0 4px 12px rgba(0,0,0,0.4)`,
          }}
        >
          {where}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 -mt-1"
            style={{
              background: 'var(--term-bg-surface)',
              borderRight: '1px solid var(--term-border-bright)',
              borderBottom: '1px solid var(--term-border-bright)',
            }}
          />
        </motion.div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative group"
    >
      {/* Card glow on hover */}
      <div
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
        style={{ background: `linear-gradient(135deg, ${project.clusterColor}30, transparent)` }}
      />

      <div
        className="relative bg-[var(--term-bg-elevated)] border border-[var(--term-border)] rounded-xl overflow-hidden hover:border-[var(--term-border-bright)] transition-all cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Header */}
        <div
          className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[var(--term-border)] flex items-center justify-between"
          style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${project.clusterColor} 5%, var(--term-bg-elevated)), var(--term-bg-elevated))` }}
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] sm:text-xs uppercase tracking-wider font-medium"
                style={{ color: project.clusterColor }}
              >
                {project.cluster}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-[var(--term-text)] truncate">
              {project.name}
            </h3>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            className="text-[var(--term-text-muted)] text-sm flex-shrink-0 ml-2"
          >
            ▾
          </motion.span>
        </div>

        {/* Problem → Outcome summary */}
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="mb-3">
            <span className="text-[10px] text-[var(--term-text-subtle)] uppercase tracking-wider">Problem</span>
            <p className="text-xs sm:text-sm text-[var(--term-text-muted)] mt-0.5 leading-relaxed line-clamp-2">
              {project.problem}
            </p>
          </div>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.techStack.slice(0, expanded ? undefined : 6).map((tech) => (
              <TechTag
                key={tech.name}
                name={tech.name}
                where={tech.where}
                color={project.clusterColor}
              />
            ))}
            {!expanded && project.techStack.length > 6 && (
              <span className="text-[10px] text-[var(--term-text-subtle)] self-center ml-1">
                +{project.techStack.length - 6} more
              </span>
            )}
          </div>
        </div>

        {/* Expanded Details */}
        <motion.div
          initial={false}
          animate={{
            height: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 border-t border-[var(--term-border)]">
            <div className="pt-3">
              <span className="text-[10px] text-[var(--term-text-subtle)] uppercase tracking-wider">Architecture</span>
              <p className="text-xs sm:text-sm text-[var(--term-text-muted)] mt-0.5 leading-relaxed">
                {project.architecture}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-[var(--term-text-subtle)] uppercase tracking-wider">Scale</span>
              <p className="text-xs sm:text-sm text-[var(--term-text-muted)] mt-0.5 leading-relaxed">
                {project.scale}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider" style={{ color: project.clusterColor }}>Outcome</span>
              <p className="text-xs sm:text-sm text-[var(--term-text)] mt-0.5 leading-relaxed font-medium">
                {project.outcome}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding relative" id="skills">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--term-cyan)] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--term-purple)] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="text-[var(--term-text-subtle)] text-xs sm:text-sm uppercase tracking-widest">// Technical Arsenal</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            <span className="text-[var(--term-cyan)]">Skills</span>{" "}
            <span className="text-[var(--term-text)]">→</span>{" "}
            <span className="text-[var(--term-green)]">Projects</span>
          </h2>
          <p className="text-[var(--term-text-muted)] max-w-2xl mx-auto text-sm sm:text-base px-4">
            Each skill mapped to real projects. Hover tech tags to see exactly where and how each technology was applied.
          </p>
        </motion.div>

        {/* Pattern Recognition Clusters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 sm:mb-10 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3"
        >
          {clusterInfo.map((cluster, i) => (
            <motion.div
              key={cluster.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
              className="p-3 sm:p-4 bg-[var(--term-bg-elevated)] border border-[var(--term-border)] rounded-lg sm:rounded-xl hover:border-[var(--term-border-bright)] transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{cluster.icon}</span>
                <span className="text-xs sm:text-sm font-semibold" style={{ color: cluster.color }}>
                  {cluster.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {cluster.techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded"
                    style={{
                      background: `color-mix(in srgb, ${cluster.color} 10%, transparent)`,
                      color: `color-mix(in srgb, ${cluster.color} 80%, white)`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4"
        >
          {[
            { value: "29+", label: "Technologies", color: "var(--term-cyan)" },
            { value: "5+", label: "Years Exp", color: "var(--term-green)" },
            { value: "10+", label: "Projects", color: "var(--term-orange)" },
            { value: "4", label: "Tech Clusters", color: "var(--term-purple)" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
              className="text-center p-3 sm:p-4 md:p-6 bg-[var(--term-bg-elevated)] border border-[var(--term-border)] rounded-lg sm:rounded-xl hover:border-[var(--term-border-bright)] transition-colors"
            >
              <div
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-[var(--term-text-muted)]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
