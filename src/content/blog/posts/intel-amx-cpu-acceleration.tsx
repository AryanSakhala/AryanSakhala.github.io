"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Animated Matrix Multiplication Visualization
function MatrixMultiplyAnimation() {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-8 p-6 bg-[var(--blog-code-bg)] rounded-lg border border-[var(--blog-border)]">
      <div className="text-center mb-4">
        <span className="text-xs text-[var(--blog-accent)] uppercase tracking-wider font-mono">
          AMX Tile Matrix Multiplication
        </span>
      </div>
      
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {/* Matrix A */}
        <motion.div
          animate={{ 
            scale: step === 0 ? 1.05 : 1,
            borderColor: step === 0 ? "#58A6FF" : "#30363D"
          }}
          className="grid grid-cols-4 gap-1 p-3 border-2 rounded-lg bg-[#0D1117]"
        >
          <span className="text-[10px] text-[var(--blog-accent)] col-span-4 mb-1 font-mono">Tile A (16x32)</span>
          {Array(16).fill(0).map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                backgroundColor: step === 0 ? "#58A6FF" : "#21262D",
                scale: step === 0 ? [1, 1.1, 1] : 1
              }}
              transition={{ delay: i * 0.02 }}
              className="w-4 h-4 rounded-sm flex items-center justify-center text-[8px] text-white"
            >
              {i + 1}
            </motion.div>
          ))}
        </motion.div>

        {/* Operator */}
        <motion.span 
          animate={{ scale: step === 1 ? 1.3 : 1 }}
          className="text-2xl text-[var(--blog-accent)]"
        >
          x
        </motion.span>

        {/* Matrix B */}
        <motion.div
          animate={{ 
            scale: step === 1 ? 1.05 : 1,
            borderColor: step === 1 ? "#3FB950" : "#30363D"
          }}
          className="grid grid-cols-4 gap-1 p-3 border-2 rounded-lg bg-[#0D1117]"
        >
          <span className="text-[10px] text-[#3FB950] col-span-4 mb-1 font-mono">Tile B (32x16)</span>
          {Array(16).fill(0).map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                backgroundColor: step === 1 ? "#3FB950" : "#21262D",
                scale: step === 1 ? [1, 1.1, 1] : 1
              }}
              transition={{ delay: i * 0.02 }}
              className="w-4 h-4 rounded-sm flex items-center justify-center text-[8px] text-white"
            >
              {String.fromCharCode(65 + i)}
            </motion.div>
          ))}
        </motion.div>

        {/* Equals */}
        <motion.span 
          animate={{ scale: step === 2 ? 1.3 : 1 }}
          className="text-2xl text-[var(--blog-text-muted)]"
        >
          =
        </motion.span>

        {/* Result Matrix */}
        <motion.div
          animate={{ 
            scale: step >= 2 ? 1.05 : 1,
            borderColor: step >= 2 ? "#F0883E" : "#30363D"
          }}
          className="grid grid-cols-4 gap-1 p-3 border-2 rounded-lg bg-[#0D1117]"
        >
          <span className="text-[10px] text-[#F0883E] col-span-4 mb-1 font-mono">Tile C (16x16)</span>
          {Array(16).fill(0).map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                backgroundColor: step >= 2 ? "#F0883E" : "#21262D",
                scale: step === 2 ? [1, 1.2, 1] : 1
              }}
              transition={{ delay: i * 0.03 }}
              className="w-4 h-4 rounded-sm flex items-center justify-center text-[8px] text-white font-bold"
            >
              {step >= 2 ? "R" : "?"}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mt-4 text-sm text-[var(--blog-text-muted)] font-mono"
      >
        {step === 0 && "Loading Tile A (BF16 values)..."}
        {step === 1 && "Loading Tile B (BF16 values)..."}
        {step === 2 && "TMUL instruction executing..."}
        {step === 3 && "One AMX instruction = 512 operations!"}
      </motion.div>
    </div>
  );
}

// Performance Comparison Bar Chart
function PerformanceChart() {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const data = [
    { label: "CPU (No AMX)", fps: 156, color: "#8B949E", width: "17%" },
    { label: "CPU + AMX", fps: 864, color: "#58A6FF", width: "95%" },
    { label: "GPU (RTX)", fps: 3600, color: "#3FB950", width: "100%" },
  ];

  return (
    <div className="my-8 p-6 bg-[var(--blog-code-bg)] rounded-lg border border-[var(--blog-border)]">
      <div className="text-center mb-6">
        <span className="text-xs text-[var(--blog-accent)] uppercase tracking-wider font-mono">
          Real-World YOLOv11 Inference Performance
        </span>
      </div>
      
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={item.label} className="flex items-center gap-4">
            <span className="w-28 text-xs text-[var(--blog-text-muted)] font-mono text-right">
              {item.label}
            </span>
            <div className="flex-1 h-8 bg-[#0D1117] rounded overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: animate ? item.width : 0 }}
                transition={{ duration: 1.5, delay: i * 0.3, ease: "easeOut" }}
                style={{ backgroundColor: item.color }}
                className="h-full rounded flex items-center justify-end pr-2"
              >
                <span className="text-xs font-bold text-white font-mono">
                  {item.fps} FPS
                </span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-6 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: "#58A6FF" }} />
          <span className="text-[var(--blog-text-muted)]">4.6x AMX Speedup</span>
        </div>
      </div>
    </div>
  );
}

// ISA Hierarchy Diagram
function ISAHierarchy() {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  const levels = [
    { name: "AMX-BF16", desc: "Tile Matrix Operations", color: "#58A6FF", enabled: true },
    { name: "AVX-512 VNNI", desc: "Vector Neural Network", color: "#3FB950", enabled: true },
    { name: "AVX-512", desc: "512-bit SIMD", color: "#F0883E", enabled: true },
    { name: "AVX2", desc: "256-bit SIMD", color: "#A371F7", enabled: true },
  ];

  return (
    <div className="my-8 p-6 bg-[var(--blog-code-bg)] rounded-lg border border-[var(--blog-border)]">
      <div className="text-center mb-4">
        <span className="text-xs text-[var(--blog-accent)] uppercase tracking-wider font-mono">
          ONEDNN_MAX_CPU_ISA Instruction Set Hierarchy
        </span>
      </div>

      <div className="flex flex-col gap-2 max-w-md mx-auto">
        {levels.map((level, i) => (
          <motion.div
            key={level.name}
            onHoverStart={() => setHoveredLevel(i)}
            onHoverEnd={() => setHoveredLevel(null)}
            animate={{
              scale: hoveredLevel === i ? 1.02 : 1,
              borderColor: hoveredLevel !== null && hoveredLevel < i ? "#F85149" : level.color,
            }}
            className="flex items-center justify-between p-3 rounded border-2 bg-[#0D1117] cursor-pointer"
            style={{ borderColor: level.color }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  backgroundColor: hoveredLevel !== null && hoveredLevel < i ? "#F85149" : level.color,
                }}
                className="w-3 h-3 rounded-full"
              />
              <span className="font-mono text-sm text-[var(--blog-text)]">{level.name}</span>
            </div>
            <span className="text-xs text-[var(--blog-text-muted)]">{level.desc}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center text-xs text-[var(--blog-text-muted)] font-mono">
        Hover to see disabled instructions when limiting ISA
      </div>
    </div>
  );
}

// Async Queue Animation
function AsyncQueueAnimation() {
  const [frames, setFrames] = useState<number[]>([]);
  const [processing, setProcessing] = useState<number[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    let frameId = 0;
    const interval = setInterval(() => {
      // Add new frame
      if (frames.length < 8) {
        setFrames(prev => [...prev, frameId++]);
      }
      
      // Move to processing (simulate queue)
      if (frames.length > 0 && processing.length < 4) {
        setFrames(prev => prev.slice(1));
        setProcessing(prev => [...prev, frameId - frames.length]);
      }
      
      // Complete processing
      if (processing.length > 0) {
        setProcessing(prev => prev.slice(1));
        setCompleted(prev => [...prev.slice(-7), prev.length]);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [frames.length, processing.length]);

  return (
    <div className="my-8 p-6 bg-[var(--blog-code-bg)] rounded-lg border border-[var(--blog-border)]">
      <div className="text-center mb-4">
        <span className="text-xs text-[var(--blog-accent)] uppercase tracking-wider font-mono">
          AsyncInferQueue Pipeline
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Input Queue */}
        <div className="flex-1">
          <div className="text-[10px] text-[var(--blog-text-muted)] font-mono mb-2">Input Queue</div>
          <div className="flex gap-1 h-8">
            {[0,1,2,3,4,5,6,7].map((i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: frames.includes(i) ? "#58A6FF" : "#21262D",
                  scale: frames.includes(i) ? 1 : 0.8,
                }}
                className="w-6 h-6 rounded flex items-center justify-center text-[10px] text-white font-mono"
              >
                {frames.includes(i) ? "F" : ""}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="text-[var(--blog-accent)]">
          {">"}
        </motion.div>

        {/* Processing */}
        <div className="flex-1">
          <div className="text-[10px] text-[#3FB950] font-mono mb-2">Processing (4 slots)</div>
          <div className="flex gap-1 h-8">
            {[0,1,2,3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: processing.length > i ? "#3FB950" : "#21262D",
                  rotate: processing.length > i ? [0, 180, 360] : 0,
                }}
                transition={{ duration: 0.5 }}
                className="w-6 h-6 rounded flex items-center justify-center text-[10px] text-white font-mono"
              >
                {processing.length > i ? "P" : ""}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.5 }} className="text-[#3FB950]">
          {">"}
        </motion.div>

        {/* Completed */}
        <div className="flex-1">
          <div className="text-[10px] text-[#F0883E] font-mono mb-2">Completed</div>
          <div className="flex gap-1 h-8 items-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="text-[#F0883E] font-mono text-lg"
            >
              {completed.length}
            </motion.div>
            <span className="text-[10px] text-[var(--blog-text-muted)]">frames</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Architecture Diagram
function ArchitectureDiagram() {
  return (
    <div className="my-8 p-6 bg-[var(--blog-code-bg)] rounded-lg border border-[var(--blog-border)] overflow-x-auto">
      <div className="text-center mb-4">
        <span className="text-xs text-[var(--blog-accent)] uppercase tracking-wider font-mono">
          CV Benchmark System Architecture
        </span>
      </div>

      <div className="min-w-[600px] font-mono text-xs">
        <pre className="text-[var(--blog-text-muted)] leading-relaxed">
{`+------------------+     HTTP/REST      +------------------+     Redis/Celery    +------------------+
|                  |  ----------------> |                  |  ----------------> |                  |
|   Frontend UI    |                    |   FastAPI        |                    |  Celery Workers  |
|   (React/Next)   |  <---------------- |   Control Plane  |  <---------------- |  (Python)        |
|   localhost:5173 |     JSON Response  |   localhost:8080 |     Task Results   |                  |
+------------------+                    +------------------+                    +------------------+
                                                |                                      |
                                                v                                      v
                                        +------------------+                   +------------------+
                                        |   Valkey/Redis   |                   |  Inference       |
                                        |   Task Broker    |                   |  Backends        |
                                        |   localhost:6379 |                   |  OpenVINO/PyTorch|
                                        +------------------+                   +------------------+`}
        </pre>
      </div>
    </div>
  );
}

export default function IntelAmxCpuAcceleration() {
  return (
    <>
      <p>
        When we think of AI acceleration, GPUs typically dominate the conversation. 
        However, Intel's <strong>Advanced Matrix Extensions (AMX)</strong> have changed the game 
        for CPU-based inference. After building a complete CV benchmarking system for 
        <strong> Dell Technologies</strong>, I've witnessed firsthand how AMX delivers 
        <strong> 4.6x performance gains</strong> for real-time computer vision.
      </p>

      <h2>The Problem: GPU vs CPU Trade-offs</h2>

      <p>
        Most enterprises face a dilemma: GPUs offer unmatched throughput but come with 
        significant costs - hardware acquisition, power consumption, and infrastructure 
        complexity. CPUs are ubiquitous but traditionally too slow for real-time AI. 
        AMX bridges this gap.
      </p>

      <PerformanceChart />

      <h2>What is Intel AMX?</h2>

      <p>
        AMX introduces dedicated matrix multiplication units (TMUL) directly into the CPU silicon. 
        Unlike traditional SIMD instructions that process vectors, AMX operates on 
        <strong> entire matrix tiles</strong> - performing 16x32 x 32x16 operations 
        in a single instruction.
      </p>

      <MatrixMultiplyAnimation />

      <p>
        The key insight is that neural networks are fundamentally matrix operations. 
        Convolutions, fully-connected layers, and attention mechanisms all reduce to 
        matrix multiplications. By accelerating this primitive, AMX accelerates everything.
      </p>

      <h2>BF16: The Secret Sauce</h2>

      <p>
        AMX pairs with Brain Float 16 (BF16), a numeric format that maintains the dynamic 
        range of FP32 while using half the memory. This enables:
      </p>

      <ul>
        <li><strong>2x memory bandwidth</strong> - More data per cache line</li>
        <li><strong>Native tile operations</strong> - 32 BF16 values per tile row</li>
        <li><strong>No conversion overhead</strong> - Direct BF16 computation</li>
      </ul>

      <blockquote>
        Without AMX, BF16 operations require software emulation: convert to FP32, 
        compute, convert back. With AMX, it's a single native instruction.
      </blockquote>

      <h2>Controlling ISA Selection</h2>

      <p>
        The <code>ONEDNN_MAX_CPU_ISA</code> environment variable controls which instruction 
        sets oneDNN (Intel's deep learning library) can use. This is crucial for 
        fair benchmarking - we need to isolate AMX's contribution.
      </p>

      <ISAHierarchy />

      <pre>
        <code>{`# Enable AMX (maximum performance)
ONEDNN_MAX_CPU_ISA=DEFAULT

# Disable AMX (baseline comparison)  
ONEDNN_MAX_CPU_ISA=AVX512_CORE_VNNI`}</code>
      </pre>

      <h2>The AsyncInferQueue Pattern</h2>

      <p>
        Raw AMX speed means nothing if you can't feed it fast enough. Python's Global 
        Interpreter Lock (GIL) would normally bottleneck inference. The solution is 
        OpenVINO's <code>AsyncInferQueue</code>.
      </p>

      <AsyncQueueAnimation />

      <pre>
        <code>{`# Create queue with 16 parallel inference slots
async_queue = AsyncInferQueue(compiled_model, num_requests=16)

# Submit all frames (non-blocking, GIL released!)
for frame in preprocessed_frames:
    async_queue.start_async({0: frame})

# Wait for completion
async_queue.wait_all()

# Result: 128 concurrent inferences (8 threads x 16 requests)`}</code>
      </pre>

      <h2>System Architecture</h2>

      <p>
        The complete benchmarking system uses Celery for distributed task execution, 
        with separate worker containers for AMX and non-AMX scenarios. This ensures 
        true hardware isolation.
      </p>

      <ArchitectureDiagram />

      <h2>Worker Specialization</h2>

      <p>
        We use separate Docker containers because <code>ONEDNN_MAX_CPU_ISA</code> is read at 
        process startup and cached. You cannot toggle AMX dynamically within a running Python process.
      </p>

      <pre>
        <code>{`# docker-compose.yaml

worker-amx:
  environment:
    - ONEDNN_MAX_CPU_ISA=DEFAULT        # AMX enabled
    - OPENVINO_PRECISION=bf16
  command: celery worker --queues=cv_amx

worker-no-amx:
  environment:
    - ONEDNN_MAX_CPU_ISA=AVX512_CORE_VNNI  # AMX disabled
    - OPENVINO_PRECISION=bf16
  command: celery worker --queues=cv_no_amx`}</code>
      </pre>

      <h2>Real-World Results</h2>

      <p>
        Running YOLOv11 segmentation (640x640 input) on race car detection:
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse font-mono">
          <thead>
            <tr className="border-b border-[var(--blog-border)]">
              <th className="text-left py-2 text-[var(--blog-accent)]">Scenario</th>
              <th className="text-left py-2 text-[var(--blog-accent)]">Hardware</th>
              <th className="text-left py-2 text-[var(--blog-accent)]">Precision</th>
              <th className="text-left py-2 text-[var(--blog-accent)]">FPS</th>
              <th className="text-left py-2 text-[var(--blog-accent)]">Speedup</th>
            </tr>
          </thead>
          <tbody className="text-[var(--blog-text-muted)]">
            <tr className="border-b border-[var(--blog-border)]">
              <td className="py-2">CPU</td>
              <td className="py-2">Intel (no AMX)</td>
              <td className="py-2">BF16</td>
              <td className="py-2">156</td>
              <td className="py-2">1x (baseline)</td>
            </tr>
            <tr className="border-b border-[var(--blog-border)] text-[var(--blog-accent)]">
              <td className="py-2 font-bold">CPU_OPTIMIZED</td>
              <td className="py-2">Intel AMX</td>
              <td className="py-2">BF16</td>
              <td className="py-2 font-bold">864</td>
              <td className="py-2 font-bold">4.6x</td>
            </tr>
            <tr className="border-b border-[var(--blog-border)]">
              <td className="py-2">GPU</td>
              <td className="py-2">NVIDIA RTX</td>
              <td className="py-2">FP16</td>
              <td className="py-2">3600</td>
              <td className="py-2">23x</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Key Takeaways</h2>

      <ol>
        <li>
          <strong>AMX delivers real gains</strong> - 4.6x isn't marketing hype, it's measured 
          production performance
        </li>
        <li>
          <strong>BF16 is essential</strong> - Without it, you're leaving performance on the table
        </li>
        <li>
          <strong>AsyncInferQueue unlocks parallelism</strong> - Bypass Python's GIL 
          with OpenVINO's async API
        </li>
        <li>
          <strong>Container isolation matters</strong> - ISA selection is process-level, 
          use separate containers
        </li>
        <li>
          <strong>CPU can compete</strong> - For many workloads, AMX makes GPUs optional
        </li>
      </ol>

      <p>
        This work was presented at <strong>SuperCompute 2024 (SC24)</strong> as part of 
        Dell Technologies' multi-modal AI showcase, demonstrating enterprise-grade 
        CPU-based inference at scale.
      </p>
    </>
  );
}
