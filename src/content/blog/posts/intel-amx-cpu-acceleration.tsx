"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// ============================================================================
// SECTION HEADER COMPONENT
// ============================================================================
function SectionHeader({ title, type }: { title: string; type: "layman" | "technical" }) {
  return (
    <div className={`my-8 py-3 px-4 rounded-lg border-l-4 ${
      type === "layman" 
        ? "bg-[#58A6FF]/10 border-[#58A6FF]" 
        : "bg-[#3FB950]/10 border-[#3FB950]"
    }`}>
      <span className={`text-xs font-mono uppercase tracking-wider ${
        type === "layman" ? "text-[#58A6FF]" : "text-[#3FB950]"
      }`}>
        {type === "layman" ? "// LAYMAN UNDERSTANDING" : "// TECHNICAL DEEP DIVE"}
      </span>
      <h3 className="text-lg font-bold text-[#E6EDF3] mt-1">{title}</h3>
    </div>
  );
}

function IllustrationLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-6">
      <span className="text-xs text-[#F0883E] uppercase tracking-[0.15em] font-mono">
        Illustration
      </span>
      <p className="text-sm text-[#8B949E] mt-1">{children}</p>
    </div>
  );
}

// ============================================================================
// LAYMAN ILLUSTRATION: Kitchen Analogy
// ============================================================================
function KitchenAnalogyAnimation() {
  const [method, setMethod] = useState<"old" | "new">("old");

  useEffect(() => {
    const timer = setInterval(() => {
      setMethod((prev) => (prev === "old" ? "new" : "old"));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        Think of it like cooking: one ingredient at a time vs. everything in one pot
      </IllustrationLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Old Way */}
        <motion.div
          animate={{ opacity: method === "old" ? 1 : 0.4 }}
          className="p-5 bg-[#161B22] rounded-lg border border-[#30363D]"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">👨‍🍳</span>
            <span className="text-sm font-mono text-[#E6EDF3]">Traditional CPU</span>
          </div>
          <div className="space-y-2">
            {["Chop onions", "Then carrots", "Then potatoes", "Then meat..."].map((step, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: method === "old" ? [0.3, 1, 0.3] : 0.3,
                  x: method === "old" ? [0, 5, 0] : 0,
                }}
                transition={{ delay: i * 0.3, duration: 1, repeat: method === "old" ? Infinity : 0 }}
                className="text-xs text-[#8B949E] flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#F85149]" />
                {step}
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#F85149]">One thing at a time = Slow</p>
        </motion.div>

        {/* New Way */}
        <motion.div
          animate={{ 
            opacity: method === "new" ? 1 : 0.4,
            borderColor: method === "new" ? "#3FB950" : "#30363D"
          }}
          className="p-5 bg-[#161B22] rounded-lg border-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🍳</span>
            <span className="text-sm font-mono text-[#E6EDF3]">AMX CPU</span>
          </div>
          <motion.div
            animate={{
              scale: method === "new" ? [1, 1.05, 1] : 1,
              boxShadow: method === "new" ? "0 0 20px rgba(63, 185, 80, 0.3)" : "none",
            }}
            transition={{ duration: 1, repeat: method === "new" ? Infinity : 0 }}
            className="p-4 bg-[#3FB950]/20 rounded-lg text-center"
          >
            <div className="grid grid-cols-2 gap-2 mb-2">
              {["🧅", "🥕", "🥔", "🥩"].map((emoji, i) => (
                <span key={i} className="text-xl">{emoji}</span>
              ))}
            </div>
            <p className="text-xs text-[#3FB950]">All at once in one pot!</p>
          </motion.div>
          <p className="mt-4 text-xs text-[#3FB950]">Everything together = Fast</p>
        </motion.div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#E6EDF3]">
          {method === "old" 
            ? "Traditional CPUs process numbers one by one, like a chef cooking each ingredient separately" 
            : "AMX processes entire blocks of numbers at once, like throwing everything in a big pot together"}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// TECHNICAL ILLUSTRATION: Tile Matrix Multiplication
// ============================================================================
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
      <IllustrationLabel>
        AMX Tile Architecture: Loading matrices into specialized tile registers
      </IllustrationLabel>

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
      <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <span className="text-sm font-medium" style={{ color: steps[step].color }}>
          {steps[step].label}
        </span>
        <p className="text-xs text-[#8B949E] mt-1">{steps[step].desc}</p>
      </motion.div>

      <div className="mt-6 p-4 bg-[#161B22] rounded-lg">
        <p className="text-xs text-[#8B949E] font-mono text-center">
          Key Instruction: <code className="text-[#58A6FF]">TDPBF16PS</code> - Tile Dot Product of BF16 values, accumulated into packed single precision
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// LAYMAN ILLUSTRATION: BF16 as Shorthand
// ============================================================================
function BF16ShorthandAnimation() {
  const [useShorthand, setUseShorthand] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setUseShorthand((prev) => !prev);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        BF16 is like using shorthand: faster to write, same meaning
      </IllustrationLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Writing */}
        <motion.div
          animate={{ opacity: useShorthand ? 0.4 : 1 }}
          className="p-5 bg-[#161B22] rounded-lg"
        >
          <div className="text-xs text-[#F85149] font-mono mb-3">Full Precision (FP32)</div>
          <div className="space-y-2">
            <div className="p-3 bg-[#0D1117] rounded text-center">
              <span className="text-sm text-[#8B949E] font-mono">3.14159265358979...</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">📝</span>
              <span className="text-xs text-[#8B949E]">Like writing every decimal place</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-[#F85149]">More detail, but slower</p>
        </motion.div>

        {/* Shorthand */}
        <motion.div
          animate={{ 
            opacity: useShorthand ? 1 : 0.4,
            borderColor: useShorthand ? "#3FB950" : "#30363D"
          }}
          className="p-5 bg-[#161B22] rounded-lg border-2"
        >
          <div className="text-xs text-[#3FB950] font-mono mb-3">Brain Float 16 (BF16)</div>
          <div className="space-y-2">
            <motion.div 
              animate={{ boxShadow: useShorthand ? "0 0 15px rgba(63, 185, 80, 0.3)" : "none" }}
              className="p-3 bg-[#0D1117] rounded text-center border border-[#3FB950]/30"
            >
              <span className="text-sm text-[#3FB950] font-mono">3.14</span>
            </motion.div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-xs text-[#8B949E]">Just enough precision for AI</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-[#3FB950]">Good enough precision, much faster</p>
        </motion.div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#E6EDF3]">
          {useShorthand 
            ? "BF16 keeps the important part (range) and shortens the rest - perfect for AI!" 
            : "Full precision is exact but takes longer to process"}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// TECHNICAL ILLUSTRATION: BF16 Data Flow
// ============================================================================
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
      <IllustrationLabel>
        Without AMX, BF16 requires costly conversion. With AMX, it's native.
      </IllustrationLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Without AMX */}
        <div className="p-4 bg-[#161B22] rounded-lg">
          <div className="text-xs text-[#F85149] font-mono mb-4 text-center">Without AMX (Software Emulation)</div>
          <div className="space-y-3">
            <motion.div animate={{ opacity: stage === 0 ? 1 : 0.4 }} className="flex items-center gap-2">
              <div className="w-16 text-right text-[10px] text-[#8B949E]">BF16</div>
              <div className="h-6 flex-1 bg-[#58A6FF]/20 rounded flex items-center justify-center text-[10px] text-[#58A6FF]">
                Input Data
              </div>
            </motion.div>
            <motion.div animate={{ opacity: stage === 1 ? 1 : 0.4 }} className="text-center">
              <span className="text-[10px] text-[#F85149]">↓ Convert to FP32 (overhead) ↓</span>
            </motion.div>
            <motion.div animate={{ opacity: stage === 1 ? 1 : 0.4 }} className="flex items-center gap-2">
              <div className="w-16 text-right text-[10px] text-[#8B949E]">FP32</div>
              <div className="h-8 flex-1 bg-[#F85149]/20 rounded flex items-center justify-center text-[10px] text-[#F85149]">
                Compute (2x memory)
              </div>
            </motion.div>
            <motion.div animate={{ opacity: stage === 2 ? 1 : 0.4 }} className="text-center">
              <span className="text-[10px] text-[#F85149]">↓ Convert back to BF16 ↓</span>
            </motion.div>
            <motion.div animate={{ opacity: stage === 2 ? 1 : 0.4 }} className="flex items-center gap-2">
              <div className="w-16 text-right text-[10px] text-[#8B949E]">BF16</div>
              <div className="h-6 flex-1 bg-[#8B949E]/20 rounded flex items-center justify-center text-[10px] text-[#8B949E]">
                Output
              </div>
            </motion.div>
          </div>
        </div>

        {/* With AMX */}
        <div className="p-4 bg-[#161B22] rounded-lg border border-[#3FB950]/30">
          <div className="text-xs text-[#3FB950] font-mono mb-4 text-center">With AMX (Hardware Native)</div>
          <div className="space-y-4">
            <motion.div animate={{ opacity: stage === 0 ? 1 : 0.6 }} className="flex items-center gap-2">
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
                Native BF16 Compute (TMUL)
              </div>
            </motion.div>
            <motion.div animate={{ opacity: stage === 2 ? 1 : 0.6 }} className="flex items-center gap-2">
              <div className="w-16 text-right text-[10px] text-[#8B949E]">BF16</div>
              <div className="h-6 flex-1 bg-[#3FB950]/20 rounded flex items-center justify-center text-[10px] text-[#3FB950]">
                Direct Output
              </div>
            </motion.div>
          </div>
          <div className="mt-4 text-center text-[10px] text-[#3FB950]">
            No conversion = No overhead
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// LAYMAN ILLUSTRATION: Assembly Line
// ============================================================================
function AssemblyLineAnimation() {
  const [workers, setWorkers] = useState<boolean[]>(Array(6).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkers((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * 6);
        next[idx] = !next[idx];
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        AsyncInferQueue: Like having multiple workers on an assembly line
      </IllustrationLabel>

      <div className="flex justify-center gap-3 mb-6">
        {workers.map((active, i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: active ? "#3FB950" : "#21262D",
              scale: active ? 1.1 : 1,
            }}
            className="w-14 h-14 rounded-lg flex flex-col items-center justify-center"
          >
            <span className="text-xl">{active ? "🔧" : "💤"}</span>
            <span className="text-[10px] text-white font-mono">W{i + 1}</span>
          </motion.div>
        ))}
      </div>

      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">📦</span>
            <span className="text-xs text-[#8B949E]">Tasks come in</span>
          </div>
          <span className="text-[#58A6FF]">→</span>
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <span className="text-xs text-[#8B949E]">Workers process in parallel</span>
          </div>
          <span className="text-[#3FB950]">→</span>
          <div className="flex items-center gap-2">
            <span className="text-lg">✅</span>
            <span className="text-xs text-[#8B949E]">Results collected</span>
          </div>
        </div>
        <p className="text-sm text-[#E6EDF3]">
          Multiple workers = Tasks done simultaneously = Faster overall!
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// TECHNICAL ILLUSTRATION: AsyncInferQueue
// ============================================================================
function AsyncQueueConceptAnimation() {
  const [activeSlots, setActiveSlots] = useState<boolean[]>(Array(8).fill(false));

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlots((prev) => {
        const next = [...prev];
        const inactiveIndices = prev.map((v, i) => (!v ? i : -1)).filter((i) => i !== -1);
        const activeIndices = prev.map((v, i) => (v ? i : -1)).filter((i) => i !== -1);

        if (inactiveIndices.length > 0 && Math.random() > 0.3) {
          const idx = inactiveIndices[Math.floor(Math.random() * inactiveIndices.length)];
          next[idx] = true;
        }

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
      <IllustrationLabel>
        OpenVINO AsyncInferQueue: Parallel inference slots bypass Python's GIL
      </IllustrationLabel>

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

      <div className="mt-6 p-4 bg-[#161B22] rounded-lg">
        <p className="text-xs text-[#8B949E] font-mono text-center">
          Python GIL: Global Interpreter Lock - prevents true multithreading in Python
          <br />
          <span className="text-[#3FB950]">AsyncInferQueue sidesteps this by running at C++ level</span>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// LAYMAN ILLUSTRATION: Toolbox Hierarchy
// ============================================================================
function ToolboxAnimation() {
  const [selectedTool, setSelectedTool] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedTool((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const tools = [
    { name: "AMX", emoji: "🔧", desc: "Best tool - handles whole projects", color: "#58A6FF" },
    { name: "AVX-512 VNNI", emoji: "🔨", desc: "Good for specific patterns", color: "#3FB950" },
    { name: "AVX-512", emoji: "🪛", desc: "General purpose, wide", color: "#F0883E" },
    { name: "AVX2", emoji: "🔩", desc: "Basic but reliable", color: "#A371F7" },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        oneDNN automatically picks the best tool from your CPU's toolbox
      </IllustrationLabel>

      <div className="flex justify-center gap-4 flex-wrap">
        {tools.map((tool, i) => (
          <motion.div
            key={i}
            animate={{
              scale: selectedTool === i ? 1.1 : 1,
              borderColor: selectedTool === i ? tool.color : "#30363D",
              boxShadow: selectedTool === i ? `0 0 20px ${tool.color}40` : "none",
            }}
            className="p-4 bg-[#161B22] rounded-lg border-2 text-center w-32"
          >
            <span className="text-3xl">{tool.emoji}</span>
            <p className="text-sm font-mono mt-2" style={{ color: tool.color }}>{tool.name}</p>
            <p className="text-[10px] text-[#8B949E] mt-1">{tool.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#E6EDF3]">
          oneDNN (Intel's library) automatically selects: 
          <span className="font-mono ml-2" style={{ color: tools[selectedTool].color }}>
            {tools[selectedTool].name}
          </span>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// TECHNICAL ILLUSTRATION: oneDNN ISA Hierarchy
// ============================================================================
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
      <IllustrationLabel>
        ONEDNN_MAX_CPU_ISA controls which instruction sets are available
      </IllustrationLabel>

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
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#F85149]">
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

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function IntelAmxCpuAcceleration() {
  return (
    <>
      <p>
        When we think about AI acceleration, dedicated GPUs dominate the conversation. However, Intel's 
        <strong> Advanced Matrix Extensions (AMX)</strong> represent a fundamental shift—bringing specialized 
        matrix multiplication hardware directly into the CPU silicon. This guide breaks down AMX from 
        beginner-friendly concepts to technical deep dives.
      </p>

      {/* ================================================================== */}
      {/* TOPIC 1: What is AMX? */}
      {/* ================================================================== */}
      <h2>What is AMX?</h2>

      <SectionHeader title="The Simple Explanation" type="layman" />
      
      <p>
        Imagine you need to add up a grocery list. Traditional CPUs work like adding items one by one: 
        apples, then oranges, then bread, then milk. AMX is like having a calculator that can add your 
        entire shopping cart at once.
      </p>

      <p>
        AI models are basically giant math problems - millions of multiplications and additions. AMX is 
        special hardware inside newer Intel CPUs that can do many of these calculations simultaneously, 
        making AI programs run much faster without needing an expensive graphics card.
      </p>

      <KitchenAnalogyAnimation />

      <SectionHeader title="Under the Hood" type="technical" />

      <p>
        AMX introduces a new paradigm: <strong>tile-based matrix operations</strong>. Instead of 
        processing vectors (one-dimensional arrays), AMX operates on tiles—two-dimensional matrix 
        blocks that fit entirely within dedicated tile registers.
      </p>

      <p>
        The key innovation is the <strong>TMUL (Tile Matrix Multiply) unit</strong>—specialized 
        silicon dedicated exclusively to matrix operations. A single <code>TDPBF16PS</code> instruction 
        performs a complete tile multiplication, replacing hundreds of traditional instructions.
      </p>

      <AMXTileVisualization />

      {/* ================================================================== */}
      {/* TOPIC 2: BF16 Data Format */}
      {/* ================================================================== */}
      <h2>BF16: The Perfect Precision</h2>

      <SectionHeader title="Why Less Precision is Better" type="layman" />

      <p>
        When you calculate tips at a restaurant, do you need to know the answer to 15 decimal places? 
        No - rounding to the nearest cent is fine. BF16 (Brain Float 16) works the same way for AI.
      </p>

      <p>
        Traditional computers use 32 bits to store numbers, giving extreme precision. But AI doesn't 
        need that much detail. BF16 uses only 16 bits - half the space - while keeping enough accuracy 
        for AI to work perfectly. Less data to move around = faster processing.
      </p>

      <BF16ShorthandAnimation />

      <SectionHeader title="Native BF16 Hardware Support" type="technical" />

      <p>
        AMX processes BF16 natively in hardware. Without AMX, BF16 operations must be emulated: 
        convert BF16 → FP32, compute, convert FP32 → BF16. This conversion overhead negates BF16's 
        memory benefits.
      </p>

      <p>
        With AMX's native support, data stays in BF16 format throughout the computation pipeline. 
        The TMUL unit handles BF16 multiplication and accumulation directly, eliminating conversion 
        latency and maximizing memory bandwidth utilization.
      </p>

      <BF16DataFlowAnimation />

      {/* ================================================================== */}
      {/* TOPIC 3: Parallel Processing */}
      {/* ================================================================== */}
      <h2>Processing Multiple Tasks</h2>

      <SectionHeader title="The Assembly Line Concept" type="layman" />

      <p>
        Think of a car factory. If one worker builds an entire car alone, it takes forever. But with 
        an assembly line, many workers handle different cars simultaneously. The factory produces 
        many more cars per hour.
      </p>

      <p>
        Python (the programming language used for most AI) has a limitation - only one thing can 
        truly run at a time. <code>AsyncInferQueue</code> is like moving the work to a separate 
        factory floor where multiple workers can operate freely.
      </p>

      <AssemblyLineAnimation />

      <SectionHeader title="Bypassing Python's GIL" type="technical" />

      <p>
        Python's <strong>Global Interpreter Lock (GIL)</strong> prevents true multi-threaded 
        execution. For AI inference, this creates a bottleneck—even with fast AMX hardware, 
        Python can only process one request at a time.
      </p>

      <p>
        <code>AsyncInferQueue</code> from OpenVINO solves this by managing requests at the C++ level. 
        Inference executes in parallel threads completely outside Python's control, fully saturating 
        AMX capabilities.
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

      {/* ================================================================== */}
      {/* TOPIC 4: oneDNN & ISA */}
      {/* ================================================================== */}
      <h2>The Software Layer: oneDNN</h2>

      <SectionHeader title="Automatic Optimization" type="layman" />

      <p>
        You don't need to know how your car engine works to drive. Similarly, oneDNN (Intel's 
        software library) automatically uses the best CPU features available. When you run an AI 
        model, oneDNN checks what your CPU supports and picks the fastest method.
      </p>

      <p>
        It's like having a smart GPS that automatically picks the fastest route based on current 
        traffic conditions. You just tell it where to go; it handles the rest.
      </p>

      <ToolboxAnimation />

      <SectionHeader title="Instruction Set Hierarchy" type="technical" />

      <p>
        oneDNN abstracts hardware complexity through its primitive selection mechanism. When 
        compiling operations, it queries available ISAs (Instruction Set Architectures) and 
        selects optimal implementations.
      </p>

      <p>
        The <code>ONEDNN_MAX_CPU_ISA</code> environment variable provides explicit control:
      </p>

      <pre>
        <code>{`# Enable all instructions including AMX
export ONEDNN_MAX_CPU_ISA=DEFAULT

# Disable AMX, use only AVX-512
export ONEDNN_MAX_CPU_ISA=AVX512_CORE_VNNI

# Fallback to basic AVX2
export ONEDNN_MAX_CPU_ISA=AVX2`}</code>
      </pre>

      <OneDNNISAVisualization />

      {/* ================================================================== */}
      {/* KEY TAKEAWAYS */}
      {/* ================================================================== */}
      <h2>Key Takeaways</h2>

      <ol>
        <li>
          <strong>AMX processes matrix blocks, not individual numbers</strong> — This architectural 
          difference enables massive parallelism for AI workloads
        </li>
        <li>
          <strong>BF16 is native, not emulated</strong> — No conversion overhead means full 
          memory bandwidth utilization
        </li>
        <li>
          <strong>AsyncInferQueue unlocks true parallelism</strong> — Bypassing Python's GIL is 
          essential to saturate AMX capabilities
        </li>
        <li>
          <strong>oneDNN handles complexity automatically</strong> — Frameworks use optimal 
          instructions without manual configuration
        </li>
      </ol>

      <blockquote>
        AMX transforms modern Intel CPUs into capable AI inference engines. It doesn't replace 
        GPUs for training, but fundamentally changes the economics of CPU-based inference.
      </blockquote>
    </>
  );
}
