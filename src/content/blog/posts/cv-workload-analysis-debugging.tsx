"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Memory leak visualization
function MemoryLeakVisualization() {
  const [level, setLevel] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setLevel((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const streams = [
    { label: "1 stream", memory: "23.6 GB", pct: 15 },
    { label: "2 streams", memory: "47 GB", pct: 30 },
    { label: "4 streams", memory: "94 GB", pct: 60 },
    { label: "8 streams", memory: "189 GB", pct: 80 },
    { label: "16 streams", memory: "378 GB", pct: 95 },
    { label: "32 streams", memory: "OOM / Disk Full", pct: 100 },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <div className="text-center mb-6">
        <span className="text-xs text-[#F85149] uppercase tracking-[0.15em] font-mono">
          Memory Scaling Problem
        </span>
        <p className="text-sm text-[#8B949E] mt-1">
          5000-frame replication × N concurrent streams = exponential memory growth
        </p>
      </div>

      <div className="space-y-3 max-w-lg mx-auto">
        {streams.map((s, i) => (
          <div key={s.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#E6EDF3] font-mono">{s.label}</span>
              <span className={i <= level ? (i >= 4 ? "text-[#F85149]" : "text-[#D29922]") : "text-[#8B949E]"}>
                {s.memory}
              </span>
            </div>
            <div className="h-2.5 bg-[#21262D] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: i <= level ? `${s.pct}%` : "0%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  backgroundColor: i >= 5 ? "#F85149" : i >= 4 ? "#D29922" : "#F0883E",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-[#161B22] rounded-lg">
        <p className="text-xs text-[#8B949E] text-center">
          Each preprocessed frame: <code className="text-[#58A6FF]">4.9 MB</code> (shape [1, 3, 640, 640] float32)
          <br />
          <span className="text-[#F85149]">
            × 5000 frame replication × N concurrent streams = memory explosion
          </span>
        </p>
      </div>
    </div>
  );
}

// Bug chain visualization
function BugChainDiagram() {
  const [activeBug, setActiveBug] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBug((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const bugs = [
    {
      title: "Memory Leak",
      icon: "🧠",
      desc: "No gc.collect() between concurrency levels. 5000-frame replication per stream never freed.",
      color: "#F85149",
      fix: "Added explicit del + gc.collect() in benchmark loop and all backends",
    },
    {
      title: "Disk Exhaustion",
      icon: "💾",
      desc: "ONEDNN_VERBOSE=1 dumped millions of kernel trace lines to Docker JSON logs",
      color: "#D29922",
      fix: "Set ONEDNN_VERBOSE=0 and added Docker log rotation (max-size: 50m)",
    },
    {
      title: "Infinite Loop",
      icon: "🔄",
      desc: "Celery visibility_timeout (1h default) < batch runtime (3h). Redis redelivered completed tasks.",
      color: "#A371F7",
      fix: "Set visibility_timeout: 14400 (4 hours) in broker_transport_options",
    },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <div className="text-center mb-6">
        <span className="text-xs text-[#F0883E] uppercase tracking-[0.15em] font-mono">
          Three Critical Bugs Found
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bugs.map((bug, i) => (
          <motion.div
            key={bug.title}
            animate={{
              borderColor: activeBug === i ? bug.color : "#30363D",
              scale: activeBug === i ? 1.02 : 1,
            }}
            className="p-4 bg-[#161B22] rounded-lg border-2 transition-all"
          >
            <div className="text-2xl mb-2">{bug.icon}</div>
            <h4 className="text-sm font-mono font-bold mb-2" style={{ color: bug.color }}>
              {bug.title}
            </h4>
            <p className="text-xs text-[#8B949E] mb-3">{bug.desc}</p>
            <div className="p-2 bg-[#0D1117] rounded border border-[#3FB950]/30">
              <span className="text-[10px] text-[#3FB950] font-mono">FIX: </span>
              <span className="text-[10px] text-[#E6EDF3]">{bug.fix}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function CvWorkloadAnalysisDebugging() {
  return (
    <>
      <p>
        Production benchmark systems fail in ways that unit tests never catch. This is a
        deep-dive into debugging a computer vision benchmark platform processing concurrent video
        streams across CPU (AMX and non-AMX) and GPU backends — where we uncovered three
        interconnected bugs that caused disk exhaustion, infinite task loops, and memory explosions.
      </p>

      <h2>The System Under Test</h2>

      <p>
        The CV benchmark platform runs Dockerized, with a Celery coordinator dispatching benchmark
        scenarios to specialized workers:
      </p>

      <pre><code>{`┌─────────────────────────────────────────────────┐
│  API Server (FastAPI)                           │
│    └── Celery Coordinator                       │
│         ├── CV Worker (AMX) ─── OpenVINO Async  │
│         ├── CV Worker (CPU) ─── OpenVINO Direct │
│         └── CV Worker (GPU) ─── HTTP → GPU Srv  │
│                                                 │
│  Infrastructure: Redis │ PostgreSQL │ Prometheus │
└─────────────────────────────────────────────────┘`}</code></pre>

      <p>
        Each scenario runs at increasing concurrency levels (1, 2, 4, 8, 16, 32, 64 streams),
        processing 210 video frames through YOLO-based detection pipelines.
      </p>

      <h2>Bug 1: The Memory Leak — 5000-Frame Replication</h2>

      <p>
        The first symptom: at 64 concurrency, the system&apos;s disk would fill up completely.
        Investigation revealed the root cause wasn&apos;t disk — it was <strong>memory</strong>.
      </p>

      <h3>Root Cause Analysis</h3>

      <p>
        In <code>openvino_async.py</code>, the inference-only path replicates frames to ensure a
        minimum benchmark duration:
      </p>

      <pre><code>{`# openvino_async.py - The culprit
preprocessed = [self._preprocess_frame(frame) for frame in frames]

if inference_only:
    min_frames_for_benchmark = 5000
    iterations = max(1, min_frames_for_benchmark // len(preprocessed))
    if iterations > 1:
        preprocessed = preprocessed * iterations  # Replicate frames`}</code></pre>

      <p>
        Each preprocessed frame occupies <strong>4.9 MB</strong> (shape [1, 3, 640, 640] float32).
        With a 300-frame video, this replicates 16x to 4800 frames = <strong>23.6 GB per stream</strong>.
      </p>

      <MemoryLeakVisualization />

      <p>
        The multi-stream CPU/AMX path launches <code>num_streams</code> threads, each creating its
        own replicated set independently. At just 2 streams: 47 GB. At 4 streams: 94 GB. These
        numpy arrays need physical RAM, and when the system swaps, it fills the disk.
      </p>

      <h3>The Fix</h3>

      <p>
        Added explicit memory cleanup at four levels:
      </p>

      <pre><code>{`# 1. benchmark.py - Between concurrency levels
del video_results
gc.collect()

# 2. openvino_async.py - After distributing to threads
del preprocessed    # Free 23GB before inference starts
gc.collect()

# 3. vvl_gpu_http.py - After HTTP POST
del payload         # Free serialized frames
del preprocessed

# 4. openvino_direct.py - After batch distribution
del all_preprocessed
gc.collect()`}</code></pre>

      <h3>The Python Scoping Gotcha</h3>

      <p>
        After deploying the fix, we got <code>cannot access local variable &apos;gc&apos;</code>.
        The root cause: Python treats a variable as local for the <strong>entire function</strong>
        if there&apos;s any <code>import gc</code> anywhere inside it:
      </p>

      <pre><code>{`def _run_single_stream_level(self):
    gc.collect()       # Line 1465 - UnboundLocalError!
    # ... 50 lines later ...
    import gc          # Line 1521 - Python sees this and makes gc "local"
    gc.collect()       # This one works fine`}</code></pre>

      <p>
        Fix: removed all 4 local <code>import gc</code> statements, relying on the top-level import.
      </p>

      <h2>Bug 2: Disk Exhaustion — oneDNN Verbose Logging</h2>

      <p>
        Even after the memory fix, disk kept filling. Monitoring revealed the memory fix was
        working for RAM, but <strong>container logs</strong> were eating the disk.
      </p>

      <p>
        The Docker Compose configuration had <code>ONEDNN_VERBOSE=1</code> set for the workers.
        This dumps a log line for <strong>every single oneDNN kernel execution</strong> — at 30+
        concurrent streams with 210 frames and 50+ layers per frame, that generates millions of
        log lines flowing into Docker&apos;s JSON log files.
      </p>

      <h3>The Fix</h3>

      <pre><code>{`# docker-compose.yaml
environment:
  - ONEDNN_VERBOSE=0    # Was 1

# Also added log rotation
logging:
  driver: "json-file"
  options:
    max-size: "50m"
    max-file: "3"`}</code></pre>

      <h2>Bug 3: The Infinite Loop — Celery Visibility Timeout</h2>

      <p>
        The most subtle bug: after a CV batch completed successfully, it would immediately restart
        and run again — indefinitely:
      </p>

      <pre><code>{`05:40:15 - Task succeeded (took ~2h 37m)
05:40:15 - Task received  ← redelivered copy!  
08:17:20 - Task succeeded (took ~2h 37m)
08:17:20 - Task received  ← redelivered AGAIN`}</code></pre>

      <BugChainDiagram />

      <h3>Root Cause</h3>

      <p>
        The Celery configuration used <code>task_acks_late=True</code> (task not acknowledged until
        finished). But Celery&apos;s Redis broker has a default <code>visibility_timeout</code> of
        <strong>3600 seconds (1 hour)</strong>. A CV batch with 3 scenarios takes ~3 hours.
      </p>

      <p>
        The flow:
      </p>

      <ol>
        <li>Coordinator task starts, runs 3 CV scenarios (~3 hours total)</li>
        <li>After 1 hour, Redis thinks the message was lost (not acked within visibility timeout)</li>
        <li>Redis <strong>redelivers</strong> the message back to the queue</li>
        <li>When the original run finishes and acks, the worker picks up the redelivered copy</li>
        <li>The cycle repeats infinitely</li>
      </ol>

      <h3>The Fix</h3>

      <pre><code>{`# celery_app.py
broker_transport_options={"visibility_timeout": 14400},  # 4 hours`}</code></pre>

      <h2>GPU Utilization Analysis</h2>

      <p>
        Another investigation revealed why GPU utilization showed as 0% most of the time. The
        pattern was clear when monitoring over time:
      </p>

      <pre><code>{`16 streams (3360 frames):
  Preprocessing: 31.8s (CPU) — GPU idle
  Inference:      3.7s (GPU at 97%)
  → GPU busy only ~10% of the time

32 streams (6720 frames):
  Preprocessing: 61.5s (CPU) — GPU idle
  Inference:      ~5s  (GPU at 99%)
  → GPU busy only ~7% of the time`}</code></pre>

      <p>
        The root cause: preprocessing + serialization is entirely CPU-bound and dominates
        wall-clock time. The GPU model server only receives frames <em>after</em> the worker
        finishes preprocessing and HTTP serialization. The actual YOLO inference runs at ~3500 FPS
        combined — so it blasts through work in seconds and sits idle waiting for the next batch.
      </p>

      <h2>Docker Volume Path Bug</h2>

      <p>
        A separate issue caused OVMS (OpenVINO Model Server) containers to fail with
        <code>is a directory: permission denied</code>. Docker had created empty directories
        instead of mounting the actual entrypoint script file.
      </p>

      <p>
        Root cause: <code>./</code> relative paths in docker-compose.yaml resolve based on the
        working directory when <code>docker compose</code> was run. If run from a different
        directory, Docker creates the bind mount targets as empty directories instead of using
        the actual files.
      </p>

      <p>
        Fix: auto-detect the host project directory from the Docker socket API as a fallback,
        eliminating the need for manual path configuration on new servers.
      </p>

      <h2>Key Takeaways</h2>

      <ul>
        <li>Python&apos;s garbage collector doesn&apos;t guarantee immediate reclamation of large numpy/tensor arrays — explicit <code>del</code> + <code>gc.collect()</code> is essential for memory-critical workloads.</li>
        <li>Python&apos;s scoping rules can bite you: any <code>import</code> statement inside a function makes that name local for the <strong>entire</strong> function body, not just after the import line.</li>
        <li>Celery + Redis <code>visibility_timeout</code> must exceed maximum task runtime when using <code>task_acks_late=True</code> — this is a well-documented but easy-to-miss pitfall.</li>
        <li>Container log rotation is not optional for verbose workloads — a single <code>ONEDNN_VERBOSE=1</code> flag can generate gigabytes of logs per hour.</li>
        <li>GPU utilization metrics can be misleading — low utilization might mean the CPU preprocessing pipeline is the actual bottleneck, not the GPU.</li>
        <li>Docker bind mount paths with <code>./</code> are fragile — use absolute paths or auto-detection for portable deployments.</li>
      </ul>
    </>
  );
}
