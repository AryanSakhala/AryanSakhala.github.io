"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Animated AMX Tile Visualization - No numbers, pure concept
function AMXTileVisualization() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: "Load Tile A", desc: "BF16 matrix loaded into tile register", color: "#58A6FF" },
    { label: "Load Tile B", desc: "Second matrix ready for multiplication", color: "#3FB950" },
    { label: "TMUL Execute", desc: "Single instruction multiplies entire tiles", color: "#F0883E" },
    { label: "Result Tile C", desc: "Complete matrix result in one operation", color: "#A371F7" },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <div className="text-center mb-6">
        <span className="text-xs text-[#58A6FF] uppercase tracking-[0.2em] font-mono">
          AMX Tile Matrix Multiplication
        </span>
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
        {/* Tile A */}
        <motion.div
          animate={{
            scale: step === 0 ? 1.05 : 1,
            borderColor: step === 0 ? "#58A6FF" : "#30363D",
            boxShadow: step === 0 ? "0 0 20px rgba(88, 166, 255, 0.3)" : "none",
          }}
          className="w-24 h-24 border-2 rounded-lg bg-[#161B22] flex flex-col items-center justify-center"
        >
          <span className="text-xs text-[#58A6FF] font-mono mb-1">Tile A</span>
          <div className="grid grid-cols-4 gap-0.5">
            {Array(16).fill(0).map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: step >= 0 ? 1 : 0.3 }}
                className="w-3 h-3 bg-[#58A6FF]/30 rounded-sm"
              />
            ))}
          </div>
        </motion.div>

        <motion.span
          animate={{ scale: step === 1 ? 1.3 : 1, color: step === 1 ? "#3FB950" : "#6E7681" }}
          className="text-2xl font-mono"
        >
          ×
        </motion.span>

        {/* Tile B */}
        <motion.div
          animate={{
            scale: step === 1 ? 1.05 : 1,
            borderColor: step === 1 ? "#3FB950" : "#30363D",
            boxShadow: step === 1 ? "0 0 20px rgba(63, 185, 80, 0.3)" : "none",
          }}
          className="w-24 h-24 border-2 rounded-lg bg-[#161B22] flex flex-col items-center justify-center"
        >
          <span className="text-xs text-[#3FB950] font-mono mb-1">Tile B</span>
          <div className="grid grid-cols-4 gap-0.5">
            {Array(16).fill(0).map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: step >= 1 ? 1 : 0.3 }}
                className="w-3 h-3 bg-[#3FB950]/30 rounded-sm"
              />
            ))}
          </div>
        </motion.div>

        <motion.span
          animate={{ scale: step === 2 ? 1.3 : 1, color: step >= 2 ? "#F0883E" : "#6E7681" }}
          className="text-2xl font-mono"
        >
          =
        </motion.span>

        {/* Result Tile */}
        <motion.div
          animate={{
            scale: step >= 2 ? 1.05 : 1,
            borderColor: step >= 2 ? "#F0883E" : "#30363D",
            boxShadow: step >= 2 ? "0 0 20px rgba(240, 136, 62, 0.3)" : "none",
          }}
          className="w-24 h-24 border-2 rounded-lg bg-[#161B22] flex flex-col items-center justify-center"
        >
          <span className="text-xs text-[#F0883E] font-mono mb-1">Result</span>
          <div className="grid grid-cols-4 gap-0.5">
            {Array(16).fill(0).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: step >= 2 ? 1 : 0.3,
                  backgroundColor: step >= 2 ? "rgba(240, 136, 62, 0.5)" : "rgba(240, 136, 62, 0.2)",
                }}
                transition={{ delay: step === 2 ? i * 0.03 : 0 }}
                className="w-3 h-3 rounded-sm"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Step indicator */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="text-sm font-medium" style={{ color: steps[step].color }}>
          {steps[step].label}
        </span>
        <p className="text-xs text-[#8B949E] mt-1">{steps[step].desc}</p>
      </motion.div>
    </div>
  );
}

// AVX-512 vs AMX Comparison - Conceptual, no numbers
function AVXvsAMXComparison() {
  const [showAMX, setShowAMX] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowAMX((prev) => !prev);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <div className="text-center mb-6">
        <span className="text-xs text-[#58A6FF] uppercase tracking-[0.2em] font-mono">
          Vector vs Matrix Processing
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AVX-512 */}
        <motion.div
          animate={{ opacity: showAMX ? 0.5 : 1 }}
          className="p-5 bg-[#161B22] rounded-lg border border-[#30363D]"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#F85149]" />
            <span className="text-sm font-mono text-[#E6EDF3]">AVX-512</span>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex gap-1">
              {Array(16).fill(0).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: !showAMX ? [0.3, 1, 0.3] : 0.3 }}
                  transition={{ delay: i * 0.1, duration: 0.5, repeat: !showAMX ? Infinity : 0 }}
                  className="w-4 h-4 bg-[#8B949E]/40 rounded-sm"
                />
              ))}
            </div>
            <p className="text-xs text-[#8B949E]">Processes one row at a time</p>
          </div>
          <div className="text-xs text-[#F85149]">
            Multiple instructions needed for matrix operations
          </div>
        </motion.div>

        {/* AMX */}
        <motion.div
          animate={{
            opacity: showAMX ? 1 : 0.5,
            borderColor: showAMX ? "#3FB950" : "#30363D",
          }}
          className="p-5 bg-[#161B22] rounded-lg border-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#3FB950]" />
            <span className="text-sm font-mono text-[#E6EDF3]">AMX</span>
          </div>
          <div className="space-y-2 mb-4">
            <motion.div
              animate={{
                boxShadow: showAMX ? "0 0 15px rgba(63, 185, 80, 0.4)" : "none",
              }}
              className="grid grid-cols-4 gap-1 w-fit"
            >
              {Array(16).fill(0).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    backgroundColor: showAMX ? "rgba(63, 185, 80, 0.5)" : "rgba(139, 148, 158, 0.3)",
                  }}
                  className="w-4 h-4 rounded-sm"
                />
              ))}
            </motion.div>
            <p className="text-xs text-[#8B949E]">Processes entire tile at once</p>
          </div>
          <div className="text-xs text-[#3FB950]">
            Single instruction for complete matrix multiply
          </div>
        </motion.div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-[#8B949E] font-mono">
          {showAMX ? "AMX: Native matrix operations" : "AVX-512: Sequential vector operations"}
        </p>
      </div>
    </div>
  );
}

// BF16 Data Flow Animation
function BF16DataFlowAnimation() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <div className="text-center mb-6">
        <span className="text-xs text-[#58A6FF] uppercase tracking-[0.2em] font-mono">
          BF16 Processing Comparison
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Without AMX */}
        <div className="p-4 bg-[#161B22] rounded-lg">
          <div className="text-xs text-[#F85149] font-mono mb-4 text-center">Without AMX</div>
          <div className="space-y-3">
            <motion.div
              animate={{ opacity: stage === 0 ? 1 : 0.4 }}
              className="flex items-center gap-2"
            >
              <div className="w-16 text-right text-[10px] text-[#8B949E]">BF16</div>
              <div className="h-6 flex-1 bg-[#58A6FF]/20 rounded flex items-center justify-center text-[10px] text-[#58A6FF]">
                Input Data
              </div>
            </motion.div>
            <motion.div animate={{ opacity: stage === 1 ? 1 : 0.4 }} className="text-center">
              <span className="text-[10px] text-[#F85149]">↓ Convert to FP32 ↓</span>
            </motion.div>
            <motion.div
              animate={{ opacity: stage === 1 ? 1 : 0.4 }}
              className="flex items-center gap-2"
            >
              <div className="w-16 text-right text-[10px] text-[#8B949E]">FP32</div>
              <div className="h-8 flex-1 bg-[#F85149]/20 rounded flex items-center justify-center text-[10px] text-[#F85149]">
                Compute (2x memory)
              </div>
            </motion.div>
            <motion.div animate={{ opacity: stage === 2 ? 1 : 0.4 }} className="text-center">
              <span className="text-[10px] text-[#F85149]">↓ Convert back to BF16 ↓</span>
            </motion.div>
            <motion.div
              animate={{ opacity: stage === 2 ? 1 : 0.4 }}
              className="flex items-center gap-2"
            >
              <div className="w-16 text-right text-[10px] text-[#8B949E]">BF16</div>
              <div className="h-6 flex-1 bg-[#8B949E]/20 rounded flex items-center justify-center text-[10px] text-[#8B949E]">
                Output
              </div>
            </motion.div>
          </div>
        </div>

        {/* With AMX */}
        <div className="p-4 bg-[#161B22] rounded-lg border border-[#3FB950]/30">
          <div className="text-xs text-[#3FB950] font-mono mb-4 text-center">With AMX</div>
          <div className="space-y-4">
            <motion.div
              animate={{ opacity: stage === 0 ? 1 : 0.6 }}
              className="flex items-center gap-2"
            >
              <div className="w-16 text-right text-[10px] text-[#8B949E]">BF16</div>
              <div className="h-6 flex-1 bg-[#58A6FF]/20 rounded flex items-center justify-center text-[10px] text-[#58A6FF]">
                Input Data
              </div>
            </motion.div>
            <motion.div
              animate={{
                opacity: stage === 1 ? 1 : 0.6,
                boxShadow: stage === 1 ? "0 0 15px rgba(63, 185, 80, 0.4)" : "none",
              }}
              className="flex items-center gap-2"
            >
              <div className="w-16 text-right text-[10px] text-[#8B949E]">BF16</div>
              <div className="h-8 flex-1 bg-[#3FB950]/30 rounded flex items-center justify-center text-[10px] text-[#3FB950] border border-[#3FB950]/50">
                Native BF16 Compute
              </div>
            </motion.div>
            <motion.div
              animate={{ opacity: stage === 2 ? 1 : 0.6 }}
              className="flex items-center gap-2"
            >
              <div className="w-16 text-right text-[10px] text-[#8B949E]">BF16</div>
              <div className="h-6 flex-1 bg-[#3FB950]/20 rounded flex items-center justify-center text-[10px] text-[#3FB950]">
                Direct Output
              </div>
            </motion.div>
          </div>
          <div className="mt-4 text-center text-[10px] text-[#3FB950]">
            No conversion overhead
          </div>
        </div>
      </div>
    </div>
  );
}

// oneDNN ISA Selection Visualization
function OneDNNISAVisualization() {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  const levels = [
    { name: "AMX-BF16", desc: "Tile Matrix Operations", color: "#58A6FF", icon: "◆" },
    { name: "AVX-512 VNNI", desc: "Vector Neural Network Instructions", color: "#3FB950", icon: "▲" },
    { name: "AVX-512", desc: "Wide Vector Processing", color: "#F0883E", icon: "●" },
    { name: "AVX2", desc: "Standard Vector Instructions", color: "#A371F7", icon: "■" },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <div className="text-center mb-6">
        <span className="text-xs text-[#58A6FF] uppercase tracking-[0.2em] font-mono">
          oneDNN Instruction Set Hierarchy
        </span>
      </div>

      <div className="max-w-md mx-auto space-y-3">
        {levels.map((level, i) => (
          <motion.div
            key={level.name}
            onHoverStart={() => setHoveredLevel(i)}
            onHoverEnd={() => setHoveredLevel(null)}
            animate={{
              x: hoveredLevel === i ? 10 : 0,
              borderColor: hoveredLevel !== null && hoveredLevel < i ? "#F85149" : level.color,
              opacity: hoveredLevel !== null && hoveredLevel < i ? 0.4 : 1,
            }}
            className="flex items-center gap-4 p-3 rounded-lg border bg-[#161B22] cursor-pointer transition-colors"
          >
            <span style={{ color: level.color }}>{level.icon}</span>
            <div className="flex-1">
              <span className="text-sm font-mono text-[#E6EDF3]">{level.name}</span>
              <p className="text-xs text-[#8B949E]">{level.desc}</p>
            </div>
            {hoveredLevel !== null && hoveredLevel < i && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-[#F85149]"
              >
                disabled
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-[#8B949E]">
          Hover to see how <code className="text-[#58A6FF]">ONEDNN_MAX_CPU_ISA</code> restricts available instructions
        </p>
      </div>
    </div>
  );
}

// AsyncInferQueue Concept Animation
function AsyncQueueConceptAnimation() {
  const [activeSlots, setActiveSlots] = useState<boolean[]>(Array(8).fill(false));

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlots((prev) => {
        const next = [...prev];
        const inactiveIndices = prev.map((v, i) => (!v ? i : -1)).filter((i) => i !== -1);
        const activeIndices = prev.map((v, i) => (v ? i : -1)).filter((i) => i !== -1);

        // Randomly activate one
        if (inactiveIndices.length > 0 && Math.random() > 0.3) {
          const idx = inactiveIndices[Math.floor(Math.random() * inactiveIndices.length)];
          next[idx] = true;
        }

        // Randomly complete one
        if (activeIndices.length > 0 && Math.random() > 0.5) {
          const idx = activeIndices[Math.floor(Math.random() * activeIndices.length)];
          next[idx] = false;
        }

        return next;
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <div className="text-center mb-6">
        <span className="text-xs text-[#58A6FF] uppercase tracking-[0.2em] font-mono">
          AsyncInferQueue: Parallel Inference Slots
        </span>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {activeSlots.map((active, i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: active ? "#3FB950" : "#21262D",
              scale: active ? 1.1 : 1,
              boxShadow: active ? "0 0 10px rgba(63, 185, 80, 0.5)" : "none",
            }}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono"
          >
            {active && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                className="text-white"
              >
                ⟳
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-[#E6EDF3]">
          Active: <span className="text-[#3FB950] font-mono">{activeSlots.filter(Boolean).length}</span> / 
          Available: <span className="text-[#8B949E] font-mono">{activeSlots.length}</span>
        </p>
        <p className="text-xs text-[#8B949E]">
          Multiple inference requests execute in parallel at C++ level, bypassing Python's GIL
        </p>
      </div>
    </div>
  );
}

export default function IntelAmxCpuAcceleration() {
  return (
    <>
      <p>
        When we think about AI acceleration, dedicated GPUs dominate the conversation. However, Intel's 
        <strong> Advanced Matrix Extensions (AMX)</strong> represent a fundamental shift—bringing specialized 
        matrix multiplication hardware directly into the CPU silicon. This deep dive explores how AMX works, 
        why it matters, and the supporting technologies that make it possible.
      </p>

      <h2>The Matrix Multiplication Bottleneck</h2>

      <p>
        Neural networks are, at their core, layers of matrix multiplications. Every convolution, 
        every fully-connected layer, every attention mechanism—they all reduce to matrices multiplied 
        together. Traditional CPUs handle these operations one element at a time, which creates a 
        fundamental performance bottleneck for AI workloads.
      </p>

      <p>
        Before AMX, Intel introduced <strong>AVX-512</strong> (Advanced Vector Extensions), which 
        processes data in parallel using wide vector registers. While powerful for many workloads, 
        AVX-512 still operates on vectors—one-dimensional arrays of data—requiring multiple 
        instructions to complete a matrix operation.
      </p>

      <AVXvsAMXComparison />

      <h2>What Makes AMX Different</h2>

      <p>
        AMX introduces a new paradigm: <strong>tile-based matrix operations</strong>. Instead of 
        processing vectors, AMX operates on two-dimensional tiles—small matrix blocks that fit 
        entirely within dedicated tile registers. A single AMX instruction can multiply two 
        tiles and accumulate the result, replacing what would otherwise require hundreds of 
        traditional instructions.
      </p>

      <AMXTileVisualization />

      <p>
        The key innovation is the <strong>TMUL (Tile Matrix Multiply) unit</strong>—specialized 
        silicon dedicated exclusively to matrix operations. When you load matrices into tile registers 
        and execute a <code>TDPBF16PS</code> instruction, the TMUL unit performs the entire 
        tile multiplication in parallel, fundamentally changing how the CPU handles matrix math.
      </p>

      <h2>The BF16 Advantage</h2>

      <p>
        AMX is designed to work natively with <strong>Brain Float 16 (BF16)</strong>, a 16-bit 
        floating-point format specifically optimized for neural networks. BF16 maintains the same 
        dynamic range as standard 32-bit floats but uses half the memory, enabling more data to 
        fit in cache and registers.
      </p>

      <BF16DataFlowAnimation />

      <p>
        The critical insight is this: without AMX hardware, BF16 operations must be emulated. 
        The CPU converts BF16 to FP32, performs the computation, then converts back—tripling 
        the work and negating the memory benefits. AMX eliminates this overhead entirely by 
        processing BF16 natively in hardware.
      </p>

      <h2>oneDNN: The Software Layer</h2>

      <p>
        Intel's <strong>oneAPI Deep Neural Network Library (oneDNN)</strong> serves as the bridge 
        between neural network frameworks and hardware capabilities. When you run inference with 
        PyTorch, TensorFlow, or OpenVINO on Intel CPUs, oneDNN automatically selects the optimal 
        implementation based on available instruction sets.
      </p>

      <OneDNNISAVisualization />

      <p>
        The <code>ONEDNN_MAX_CPU_ISA</code> environment variable controls which instructions 
        oneDNN can use. Setting it to <code>DEFAULT</code> enables AMX; restricting it to 
        <code>AVX512_CORE_VNNI</code> forces oneDNN to fall back to vector operations. This 
        is essential for benchmarking—it lets you isolate exactly what AMX contributes to performance.
      </p>

      <pre>
        <code>{`# Enable all instructions including AMX
export ONEDNN_MAX_CPU_ISA=DEFAULT

# Disable AMX, use only AVX-512
export ONEDNN_MAX_CPU_ISA=AVX512_CORE_VNNI`}</code>
      </pre>

      <h2>Bypassing Python's Limitations</h2>

      <p>
        Python's <strong>Global Interpreter Lock (GIL)</strong> prevents true multi-threaded 
        execution of Python code. For AI inference, this creates a bottleneck—even with fast 
        AMX hardware, if only one Python thread can execute at a time, you can't saturate 
        the CPU's capabilities.
      </p>

      <p>
        The solution is <strong>AsyncInferQueue</strong> from OpenVINO. This pattern submits 
        inference requests to a queue managed at the C++ level, completely bypassing Python's 
        threading limitations. Multiple requests execute in parallel on the actual hardware 
        while Python simply waits for results.
      </p>

      <AsyncQueueConceptAnimation />

      <pre>
        <code>{`# Create queue with multiple parallel inference slots
async_queue = AsyncInferQueue(compiled_model, jobs=16)

# Submit requests (non-blocking, GIL released)
for frame in preprocessed_frames:
    async_queue.start_async({0: frame})

# Wait for all completions
async_queue.wait_all()`}</code>
      </pre>

      <h2>The Instruction Set Hierarchy</h2>

      <p>
        Understanding the CPU instruction hierarchy clarifies why AMX matters. Each generation 
        builds on the previous:
      </p>

      <ul>
        <li>
          <strong>AVX2</strong> — Standard vector operations, processing multiple values per instruction
        </li>
        <li>
          <strong>AVX-512</strong> — Wider vectors, more values per instruction
        </li>
        <li>
          <strong>AVX-512 VNNI</strong> — Vector Neural Network Instructions, optimized dot products
        </li>
        <li>
          <strong>AMX</strong> — Tile-based matrix operations, native matrix multiplication
        </li>
      </ul>

      <p>
        Each level provides capabilities the previous cannot match. AVX-512 VNNI accelerates 
        specific neural network patterns, but AMX provides a fundamentally different approach—
        operating on entire matrix tiles rather than vectors of individual values.
      </p>

      <h2>When to Use AMX</h2>

      <p>
        AMX excels in scenarios where matrix operations dominate the workload:
      </p>

      <ul>
        <li>
          <strong>Inference workloads</strong> — The matrix multiplications in neural networks map 
          directly to AMX tile operations
        </li>
        <li>
          <strong>BF16 precision</strong> — When your model can operate at reduced precision without 
          quality loss, AMX's native BF16 support shines
        </li>
        <li>
          <strong>Throughput-oriented deployments</strong> — When processing many requests in parallel, 
          AMX's high throughput per core maximizes utilization
        </li>
        <li>
          <strong>CPU-only environments</strong> — When GPUs aren't available or cost-effective, 
          AMX brings matrix acceleration to standard server CPUs
        </li>
      </ul>

      <blockquote>
        AMX transforms modern Intel CPUs into capable AI inference engines. It doesn't replace GPUs 
        for training or highest-throughput scenarios, but it fundamentally changes the economics of 
        CPU-based inference.
      </blockquote>

      <h2>Key Takeaways</h2>

      <ol>
        <li>
          <strong>AMX operates on tiles, not vectors</strong> — This is a fundamental architectural 
          difference that enables massive parallelism for matrix operations
        </li>
        <li>
          <strong>BF16 is native</strong> — No conversion overhead means AMX fully leverages 
          reduced-precision benefits
        </li>
        <li>
          <strong>oneDNN abstracts the complexity</strong> — Frameworks automatically use AMX when 
          available through the oneDNN library
        </li>
        <li>
          <strong>AsyncInferQueue unlocks parallelism</strong> — Bypassing Python's GIL is essential 
          to saturate AMX capabilities
        </li>
        <li>
          <strong>Environment variables control behavior</strong> — ONEDNN_MAX_CPU_ISA lets you 
          enable, disable, or benchmark AMX specifically
        </li>
      </ol>

      <p>
        Understanding these concepts transforms how you approach CPU-based AI deployments. AMX isn't 
        just a faster instruction set—it's a different way of thinking about matrix computation, 
        bringing dedicated matrix hardware to the ubiquitous x86 architecture.
      </p>
    </>
  );
}
