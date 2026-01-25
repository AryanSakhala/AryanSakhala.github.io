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
// LAYMAN ILLUSTRATION: Library Book Analogy
// ============================================================================
function LibraryBookAnimation() {
  const [hasContext, setHasContext] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setHasContext((prev) => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        Finding information: with vs without context
      </IllustrationLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Without Context */}
        <motion.div
          animate={{ opacity: hasContext ? 0.4 : 1 }}
          className="p-5 bg-[#161B22] rounded-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📄</span>
            <span className="text-sm font-mono text-[#E6EDF3]">Without Context</span>
          </div>
          <div className="p-4 bg-[#0D1117] rounded border border-[#F85149]/30 mb-4">
            <p className="text-sm text-[#8B949E] italic">
              "The function returns embeddings from the last hidden layer."
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#F85149]">
              <span>❓</span> Which function?
            </div>
            <div className="flex items-center gap-2 text-xs text-[#F85149]">
              <span>❓</span> What library?
            </div>
            <div className="flex items-center gap-2 text-xs text-[#F85149]">
              <span>❓</span> What topic?
            </div>
          </div>
          <p className="mt-4 text-xs text-[#F85149]">Like a page torn from a book - useless alone</p>
        </motion.div>

        {/* With Context */}
        <motion.div
          animate={{ 
            opacity: hasContext ? 1 : 0.4,
            borderColor: hasContext ? "#3FB950" : "#30363D"
          }}
          className="p-5 bg-[#161B22] rounded-lg border-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📚</span>
            <span className="text-sm font-mono text-[#E6EDF3]">With Context</span>
          </div>
          <motion.div 
            animate={{ boxShadow: hasContext ? "0 0 15px rgba(63, 185, 80, 0.2)" : "none" }}
            className="p-4 bg-[#0D1117] rounded border border-[#3FB950]/30 mb-4"
          >
            <p className="text-xs text-[#58A6FF] mb-2">
              📖 Book: LlamaIndex Documentation
              <br />📑 Chapter: Custom Embedding Models
            </p>
            <p className="text-sm text-[#8B949E] italic">
              "The function returns embeddings from the last hidden layer."
            </p>
          </motion.div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#3FB950]">
              <span>✓</span> LlamaIndex's embed function
            </div>
            <div className="flex items-center gap-2 text-xs text-[#3FB950]">
              <span>✓</span> About custom models
            </div>
            <div className="flex items-center gap-2 text-xs text-[#3FB950]">
              <span>✓</span> Technical documentation
            </div>
          </div>
          <p className="mt-4 text-xs text-[#3FB950]">Now we know exactly what this is about!</p>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// TECHNICAL ILLUSTRATION: Chunk Comparison
// ============================================================================
function ChunkComparisonAnimation() {
  const [showContext, setShowContext] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowContext((prev) => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        Traditional chunking loses hierarchy. Contextual chunking preserves it.
      </IllustrationLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Traditional */}
        <motion.div
          animate={{ opacity: showContext ? 0.5 : 1 }}
          className="p-4 bg-[#161B22] rounded border border-[#F85149]"
        >
          <div className="text-xs text-[#F85149] font-mono mb-2">Traditional Chunk</div>
          <div className="text-sm text-[#8B949E] font-mono p-3 bg-[#0D1117] rounded">
            <p>"The function returns a list of embeddings for the input tokens. 
            It uses the model's hidden states from the last layer."</p>
          </div>
          <div className="mt-3 text-xs text-[#F85149]">
            Missing: What function? Which model? What context?
          </div>
        </motion.div>

        {/* Contextual */}
        <motion.div
          animate={{ 
            opacity: showContext ? 1 : 0.5,
            borderColor: showContext ? "#3FB950" : "#30363D"
          }}
          className="p-4 bg-[#161B22] rounded border-2"
        >
          <div className="text-xs text-[#3FB950] font-mono mb-2">Contextual Chunk</div>
          <div className="text-sm font-mono p-3 bg-[#0D1117] rounded">
            <motion.div
              animate={{ color: showContext ? "#58A6FF" : "#8B949E" }}
              className="mb-2 text-xs"
            >
              [Doc: LlamaIndex Embeddings Guide]
              <br />[Section: Custom Embedding Models]
            </motion.div>
            <p className="text-[#8B949E]">
              "The function returns a list of embeddings for the input tokens. 
              It uses the model's hidden states from the last layer."
            </p>
          </div>
          <div className="mt-3 text-xs text-[#3FB950]">
            Context preserved: Document + Section + Hierarchy
          </div>
        </motion.div>
      </div>

      <div className="mt-6 p-4 bg-[#161B22] rounded-lg">
        <p className="text-xs text-[#8B949E] font-mono text-center">
          Vector embedding captures semantic meaning. 
          <span className="text-[#3FB950]"> With context, embeddings become far more precise.</span>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// LAYMAN ILLUSTRATION: Assembly Line Context
// ============================================================================
function ContextPipelineAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { emoji: "📄", label: "Raw Chunk", desc: "Just the text", color: "#8B949E" },
    { emoji: "📖", label: "Add Document", desc: "Which document?", color: "#58A6FF" },
    { emoji: "📑", label: "Add Section", desc: "Which section?", color: "#3FB950" },
    { emoji: "🔗", label: "Add Neighbors", desc: "Nearby content?", color: "#F0883E" },
    { emoji: "✨", label: "Enriched!", desc: "Full context", color: "#A371F7" },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        Building context step by step, like adding ingredients to a recipe
      </IllustrationLabel>

      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            animate={{
              scale: step === i ? 1.1 : 1,
              opacity: step >= i ? 1 : 0.3,
            }}
            className="flex flex-col items-center min-w-[80px]"
          >
            <motion.div
              animate={{
                backgroundColor: step >= i ? s.color : "#21262D",
                boxShadow: step === i ? `0 0 20px ${s.color}` : "none",
              }}
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            >
              {s.emoji}
            </motion.div>
            <span className="text-xs text-[#E6EDF3] mt-2 text-center font-mono">
              {s.label}
            </span>
            <span className="text-[10px] text-[#8B949E] text-center">
              {s.desc}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 text-center p-4 bg-[#161B22] rounded"
      >
        <span className="text-sm" style={{ color: steps[step].color }}>
          Step {step + 1}: {steps[step].desc}
        </span>
      </motion.div>
    </div>
  );
}

// ============================================================================
// TECHNICAL ILLUSTRATION: Context Flow Pipeline
// ============================================================================
function ContextFlowAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: "Raw Chunk", desc: "Isolated text without context", color: "#8B949E" },
    { label: "Document Context", desc: "Add document title & summary", color: "#58A6FF" },
    { label: "Section Context", desc: "Add section headers", color: "#3FB950" },
    { label: "Neighbor Context", desc: "Add surrounding chunks", color: "#F0883E" },
    { label: "Enriched Chunk", desc: "Full contextual embedding", color: "#A371F7" },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        Contextual Enrichment Pipeline: Each stage adds semantic information
      </IllustrationLabel>

      <div className="flex items-center justify-between gap-2 mb-6 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            animate={{
              scale: step === i ? 1.1 : 1,
              opacity: step >= i ? 1 : 0.3,
            }}
            className="flex flex-col items-center min-w-[100px]"
          >
            <motion.div
              animate={{
                backgroundColor: step >= i ? s.color : "#21262D",
                boxShadow: step === i ? `0 0 20px ${s.color}` : "none",
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
            >
              {i + 1}
            </motion.div>
            <span className="text-xs text-[#E6EDF3] mt-2 text-center font-mono">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-4 bg-[#161B22] rounded border border-[#30363D]"
      >
        <span className="text-sm" style={{ color: steps[step].color }}>
          {steps[step].desc}
        </span>
      </motion.div>
    </div>
  );
}

// ============================================================================
// LAYMAN ILLUSTRATION: Search Comparison
// ============================================================================
function SearchComparisonAnimation() {
  const [useContextual, setUseContextual] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setUseContextual((prev) => !prev);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        Searching for "how to embed documents" - which results are better?
      </IllustrationLabel>

      <div className="space-y-4">
        <div className="p-4 bg-[#161B22] rounded text-center">
          <span className="text-sm text-[#58A6FF] font-mono">🔍 Query: "how to embed documents"</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Traditional Results */}
          <motion.div
            animate={{ opacity: useContextual ? 0.4 : 1 }}
            className="p-4 bg-[#161B22] rounded border border-[#30363D]"
          >
            <div className="text-xs text-[#F85149] font-mono mb-3">Traditional Search Results</div>
            <div className="space-y-2">
              <div className="p-2 bg-[#0D1117] rounded text-xs text-[#8B949E]">
                "The embed() function takes input..."
              </div>
              <div className="p-2 bg-[#0D1117] rounded text-xs text-[#8B949E]">
                "Documents can be processed..."
              </div>
              <div className="p-2 bg-[#0D1117] rounded text-xs text-[#8B949E]">
                "Embedding vectors represent..."
              </div>
            </div>
            <p className="mt-3 text-xs text-[#F85149]">
              Generic results - may or may not be relevant
            </p>
          </motion.div>

          {/* Contextual Results */}
          <motion.div
            animate={{ 
              opacity: useContextual ? 1 : 0.4,
              borderColor: useContextual ? "#3FB950" : "#30363D"
            }}
            className="p-4 bg-[#161B22] rounded border-2"
          >
            <div className="text-xs text-[#3FB950] font-mono mb-3">Contextual Search Results</div>
            <div className="space-y-2">
              <motion.div 
                animate={{ boxShadow: useContextual ? "0 0 10px rgba(63, 185, 80, 0.3)" : "none" }}
                className="p-2 bg-[#0D1117] rounded text-xs border border-[#3FB950]/30"
              >
                <span className="text-[#58A6FF]">[LlamaIndex Docs → Embeddings]</span>
                <br />"The embed() function takes input..."
              </motion.div>
              <div className="p-2 bg-[#0D1117] rounded text-xs border border-[#3FB950]/30">
                <span className="text-[#58A6FF]">[OpenAI API → Embeddings Guide]</span>
                <br />"Documents can be processed..."
              </div>
              <div className="p-2 bg-[#0D1117] rounded text-xs border border-[#3FB950]/30">
                <span className="text-[#58A6FF]">[Vector DB Tutorial → Getting Started]</span>
                <br />"Embedding vectors represent..."
              </div>
            </div>
            <p className="mt-3 text-xs text-[#3FB950]">
              Context tells us exactly where each result comes from
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TECHNICAL ILLUSTRATION: Vector DB Animation
// ============================================================================
function VectorDBAnimation() {
  const [queryActive, setQueryActive] = useState(false);
  const [results, setResults] = useState<number[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQueryActive(true);
      setTimeout(() => {
        setResults([2, 5, 8, 11, 14]);
        setTimeout(() => {
          setQueryActive(false);
          setResults([]);
        }, 2000);
      }, 1000);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        Milvus Vector Search: Query vector finds nearest neighbors in embedding space
      </IllustrationLabel>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Query */}
        <motion.div
          animate={{ 
            scale: queryActive ? 1.1 : 1,
            borderColor: queryActive ? "#58A6FF" : "#30363D"
          }}
          className="p-3 bg-[#161B22] rounded border-2 text-center min-w-[120px]"
        >
          <div className="text-xs text-[#8B949E] font-mono mb-1">Query Vector</div>
          <motion.div
            animate={{ 
              color: queryActive ? "#58A6FF" : "#8B949E",
              textShadow: queryActive ? "0 0 10px #58A6FF" : "none"
            }}
            className="text-xl font-mono"
          >
            [0.23, ...]
          </motion.div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          animate={{ x: queryActive ? [0, 10, 0] : 0 }}
          transition={{ repeat: queryActive ? Infinity : 0, duration: 0.5 }}
          className="text-[#58A6FF] text-2xl"
        >
          →
        </motion.div>

        {/* Vector Store */}
        <div className="flex-1 p-3 bg-[#161B22] rounded border border-[#30363D] min-w-[200px]">
          <div className="text-xs text-[#3FB950] font-mono mb-2">Milvus Collection</div>
          <div className="grid grid-cols-4 gap-1">
            {Array(16).fill(0).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: results.includes(i) ? "#3FB950" : "#21262D",
                  scale: results.includes(i) ? 1.2 : 1,
                }}
                className="w-6 h-6 rounded flex items-center justify-center text-[10px] text-white font-mono"
              >
                {i}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <motion.div
          animate={{ x: results.length > 0 ? [0, 10, 0] : 0 }}
          transition={{ repeat: results.length > 0 ? Infinity : 0, duration: 0.5 }}
          className="text-[#3FB950] text-2xl"
        >
          →
        </motion.div>

        {/* Results */}
        <motion.div
          animate={{ 
            scale: results.length > 0 ? 1.1 : 1,
            borderColor: results.length > 0 ? "#F0883E" : "#30363D"
          }}
          className="p-3 bg-[#161B22] rounded border-2 text-center min-w-[100px]"
        >
          <div className="text-xs text-[#8B949E] font-mono mb-1">Top-K</div>
          <motion.div
            animate={{ color: results.length > 0 ? "#F0883E" : "#8B949E" }}
            className="text-xl font-mono"
          >
            {results.length > 0 ? `${results.length} docs` : "..."}
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-6 p-4 bg-[#161B22] rounded-lg">
        <p className="text-xs text-[#8B949E] font-mono text-center">
          <code className="text-[#58A6FF]">COSINE</code> similarity finds semantically similar chunks.
          <span className="text-[#3FB950]"> Contextual embeddings make similarity more meaningful.</span>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// LAYMAN ILLUSTRATION: LLM as Context Generator
// ============================================================================
function LLMContextAnimation() {
  const [generating, setGenerating] = useState(false);
  const [context, setContext] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setGenerating(true);
      setContext("");
      
      const fullContext = "This chunk discusses LlamaIndex embedding functions for custom model integration...";
      let i = 0;
      
      const typeTimer = setInterval(() => {
        if (i < fullContext.length) {
          setContext(fullContext.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typeTimer);
          setTimeout(() => setGenerating(false), 1500);
        }
      }, 50);
      
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        An AI reads the chunk and explains what it's about
      </IllustrationLabel>

      <div className="max-w-xl mx-auto space-y-4">
        {/* Input */}
        <div className="p-4 bg-[#161B22] rounded">
          <div className="text-xs text-[#8B949E] font-mono mb-2">📄 Raw Chunk:</div>
          <p className="text-sm text-[#E6EDF3] italic">
            "The function returns embeddings from the hidden layer..."
          </p>
        </div>

        {/* Processing */}
        <div className="flex justify-center">
          <motion.div
            animate={{
              scale: generating ? [1, 1.1, 1] : 1,
              boxShadow: generating ? "0 0 20px rgba(163, 113, 247, 0.5)" : "none",
            }}
            transition={{ repeat: generating ? Infinity : 0, duration: 0.5 }}
            className="p-4 bg-[#A371F7]/20 rounded-lg text-center"
          >
            <span className="text-2xl">🤖</span>
            <p className="text-xs text-[#A371F7] font-mono mt-2">
              {generating ? "VLLM generating context..." : "VLLM ready"}
            </p>
          </motion.div>
        </div>

        {/* Output */}
        <div className="p-4 bg-[#161B22] rounded border border-[#3FB950]/30">
          <div className="text-xs text-[#3FB950] font-mono mb-2">✨ Generated Context:</div>
          <p className="text-sm text-[#E6EDF3] font-mono min-h-[40px]">
            {context || "Waiting..."}
            {generating && <span className="animate-pulse">|</span>}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TECHNICAL ILLUSTRATION: VLLM Pipeline
// ============================================================================
function VLLMPipelineAnimation() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const stages = [
    { name: "Chunk", desc: "Raw text chunk", color: "#8B949E" },
    { name: "Context Prompt", desc: "Document context + chunk", color: "#58A6FF" },
    { name: "VLLM Generate", desc: "LLM produces description", color: "#3FB950" },
    { name: "Enriched Vector", desc: "Context + Original embedded", color: "#F0883E" },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        VLLM Context Generation Pipeline: Batch processing for throughput
      </IllustrationLabel>

      <div className="flex flex-wrap justify-center gap-2">
        {stages.map((s, i) => (
          <motion.div
            key={i}
            animate={{
              scale: stage === i ? 1.05 : 1,
              borderColor: stage >= i ? s.color : "#30363D",
            }}
            className="flex-1 min-w-[140px] p-4 bg-[#161B22] rounded border-2 text-center"
          >
            <motion.div
              animate={{ 
                opacity: stage >= i ? 1 : 0.3,
                y: stage === i ? [0, -5, 0] : 0
              }}
              transition={{ repeat: stage === i ? Infinity : 0, duration: 1 }}
            >
              <div className="text-xs font-mono mb-2" style={{ color: s.color }}>
                Step {i + 1}
              </div>
              <div className="text-sm font-bold text-[#E6EDF3]">{s.name}</div>
              <div className="text-xs text-[#8B949E] mt-1">{s.desc}</div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {stage === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-[#161B22] rounded border border-[#3FB950] text-center"
        >
          <span className="text-xs text-[#3FB950] font-mono">
            VLLM: "This chunk discusses embedding functions in the LlamaIndex documentation, 
            specifically covering custom model integration..."
          </span>
        </motion.div>
      )}
    </div>
  );
}

// ============================================================================
// ARCHITECTURE DIAGRAM
// ============================================================================
function ArchitectureDiagram() {
  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D] overflow-x-auto">
      <IllustrationLabel>
        Complete Contextual Retriever Architecture
      </IllustrationLabel>

      <div className="min-w-[500px] font-mono text-xs">
        <pre className="text-[#8B949E] leading-relaxed">
{`+----------------+     +----------------+     +----------------+
|   Documents    | --> |   Chunking     | --> |   VLLM         |
|   (PDF, MD)    |     |   (Semantic)   |     |   Context Gen  |
+----------------+     +----------------+     +----------------+
                                                     |
                                                     v
+----------------+     +----------------+     +----------------+
|   Query        | --> |   Similarity   | <-- |   Milvus       |
|   (User Input) |     |   Search       |     |   Vector Store |
+----------------+     +----------------+     +----------------+
                              |
                              v
                       +----------------+
                       |   LlamaIndex   |
                       |   Response     |
                       +----------------+`}
        </pre>
      </div>
    </div>
  );
}

// ============================================================================
// TABLE OF CONTENTS
// ============================================================================
function TableOfContents() {
  const topics = [
    { num: "01", title: "The Context Loss Problem", desc: "Why traditional chunking fails" },
    { num: "02", title: "Contextual Enrichment", desc: "The solution that actually works" },
    { num: "03", title: "Generating Context with VLLM", desc: "Using AI to describe your chunks" },
    { num: "04", title: "Vector Storage with Milvus", desc: "Searching through millions of vectors" },
  ];

  return (
    <div className="my-10 p-6 bg-[#161B22] rounded-lg border border-[#30363D]">
      <div className="text-xs text-[#58A6FF] font-mono uppercase tracking-wider mb-4">
        What We'll Cover
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <div key={topic.num} className="flex gap-3 items-start">
            <span className="text-[#58A6FF] font-mono text-sm">{topic.num}</span>
            <div>
              <p className="text-sm text-[#E6EDF3] font-medium">{topic.title}</p>
              <p className="text-xs text-[#8B949E]">{topic.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ContextualRetriever() {
  return (
    <>
      <p>
        If you've built a RAG system, you've probably noticed something frustrating: sometimes 
        the search returns chunks that seem relevant but aren't quite right. The words match, 
        but the context is off.
      </p>

      <p>
        This happens because of <strong>context loss during chunking</strong>. When we split 
        documents into smaller pieces for embedding, each piece loses its relationship to the 
        bigger picture. The Contextual Retriever pattern fixes this by adding context back 
        before we embed anything.
      </p>

      <p>
        I'll walk through both the intuition and the technical implementation. Feel free to 
        skip to whatever section is most useful to you.
      </p>

      <TableOfContents />

      {/* ================================================================== */}
      {/* TOPIC 1: The Problem */}
      {/* ================================================================== */}
      <h2>01. The Context Loss Problem</h2>

      <SectionHeader title="The Torn Page Problem" type="layman" />

      <p>
        Imagine you find a single page on the ground. It says: "The function returns embeddings 
        from the last hidden layer." Is this about Python? JavaScript? Machine learning? 
        Database queries? Without knowing which book this page came from, you're just guessing.
      </p>

      <p>
        This is exactly what happens in traditional RAG systems. We chop documents into small 
        pieces (chunks) to search through them, but each piece loses the context of where it 
        came from. It's like tearing pages out of books and throwing them in a pile.
      </p>

      <LibraryBookAnimation />

      <SectionHeader title="Vector Similarity Without Context" type="technical" />

      <p>
        When chunks are embedded without context, the vector space becomes ambiguous. A chunk 
        saying "The function returns embeddings" could match queries about any embedding 
        function in any library. The embedding model captures the words, but not the semantic 
        scope.
      </p>

      <p>
        This leads to low recall and irrelevant results. The right chunk exists in your 
        database, but the query vector doesn't find it because the embedding space is too 
        crowded with similar-but-wrong matches.
      </p>

      <ChunkComparisonAnimation />

      {/* ================================================================== */}
      {/* TOPIC 2: The Solution */}
      {/* ================================================================== */}
      <h2>02. The Solution: Contextual Enrichment</h2>

      <SectionHeader title="Adding the Book Title to Every Page" type="layman" />

      <p>
        The fix is simple in concept. Before saving each chunk, we add a header that explains 
        where it came from. It's like writing the book title and chapter name at the top of 
        every page. Anyone finding that page now knows exactly what book it's from.
      </p>

      <p>
        We use an AI (specifically VLLM, which is a fast language model) to read each chunk 
        and write a short description of what it's about. This description gets stored with 
        the chunk, making searches much more accurate.
      </p>

      <ContextPipelineAnimation />

      <SectionHeader title="The Enrichment Pipeline" type="technical" />

      <p>
        The contextual enrichment pipeline operates in stages. Each stage adds more semantic 
        information to the chunk:
      </p>

      <ol>
        <li><strong>Document context:</strong> Title, summary, document type</li>
        <li><strong>Section context:</strong> Headers, subsection hierarchy</li>
        <li><strong>Neighbor context:</strong> Surrounding chunks for narrative flow</li>
        <li><strong>LLM-generated description:</strong> Semantic summary of the chunk's purpose</li>
      </ol>

      <ContextFlowAnimation />

      <p>
        The enriched text is then embedded. The resulting vector captures not just the chunk's 
        content, but its semantic position within the document hierarchy.
      </p>

      {/* ================================================================== */}
      {/* TOPIC 3: VLLM for Context Generation */}
      {/* ================================================================== */}
      <h2>03. Generating Context with VLLM</h2>

      <SectionHeader title="AI as Your Librarian" type="layman" />

      <p>
        Think of VLLM as a super-fast librarian. For every page in your library, this 
        librarian writes a quick note: "This page is from the Python documentation, 
        specifically about how the embed function works with custom models."
      </p>

      <p>
        VLLM is designed to do this very quickly. It can process thousands of chunks per 
        minute, making it practical even for large document collections.
      </p>

      <LLMContextAnimation />

      <SectionHeader title="High-Throughput Context Generation" type="technical" />

      <p>
        VLLM provides the throughput needed for production-scale context generation. The key 
        configuration involves batch processing, model selection, and token limits:
      </p>

      <pre>
        <code>{`from llama_index.llms.vllm import Vllm

# Configure VLLM endpoint for high throughput
llm = Vllm(
    api_url="<YOUR_API_URI>",
    model="meta-llama/Llama-2-7b-chat-hf",
    max_tokens=150  # Keep context descriptions concise
)

# The prompt template is critical
CONTEXT_PROMPT = f"""Given this document context:
Title: {doc.title}
Section: {section.header}

Describe what this chunk is about in one sentence:
{chunk.text}"""

context = llm.complete(CONTEXT_PROMPT).text`}</code>
      </pre>

      <VLLMPipelineAnimation />

      {/* ================================================================== */}
      {/* TOPIC 4: Vector Storage with Milvus */}
      {/* ================================================================== */}
      <h2>04. Vector Storage with Milvus</h2>

      <SectionHeader title="A Smart Filing Cabinet" type="layman" />

      <p>
        Milvus is like a magical filing cabinet. Instead of organizing files alphabetically, 
        it organizes them by meaning. When you search for "how to embed documents," it 
        instantly finds all the pages that talk about embedding, even if they use 
        different words.
      </p>

      <p>
        With contextual enrichment, each file now has a label saying what book it came from. 
        The filing cabinet gives you much better results because it knows the full context 
        of each page.
      </p>

      <SearchComparisonAnimation />

      <SectionHeader title="Vector Similarity Search" type="technical" />

      <p>
        Milvus handles vector similarity search with support for hybrid queries that combine 
        dense vectors and sparse keyword matching. The enriched context improves both:
      </p>

      <pre>
        <code>{`from pymilvus import connections, Collection

# Connect to Milvus
connections.connect("default", host="localhost", port="19530")

# Create collection with contextual field
collection = Collection(
    "contextual_chunks",
    schema=CollectionSchema([
        FieldSchema("id", DataType.INT64, is_primary=True),
        FieldSchema("embedding", DataType.FLOAT_VECTOR, dim=768),
        FieldSchema("context", DataType.VARCHAR, max_length=500),
        FieldSchema("chunk_text", DataType.VARCHAR, max_length=2000),
        FieldSchema("doc_title", DataType.VARCHAR, max_length=200),
    ])
)

# Search with context-aware similarity
results = collection.search(
    data=[query_embedding],
    anns_field="embedding",
    param={"metric_type": "COSINE", "params": {"nprobe": 10}},
    limit=5,
    output_fields=["context", "chunk_text", "doc_title"]
)`}</code>
      </pre>

      <VectorDBAnimation />

      {/* ================================================================== */}
      {/* ARCHITECTURE OVERVIEW */}
      {/* ================================================================== */}
      <h2>Complete Architecture</h2>

      <p>
        Here's how all the pieces fit together. Document processing feeds into VLLM for 
        context generation, which flows into Milvus for vector storage. LlamaIndex 
        orchestrates the queries:
      </p>

      <ArchitectureDiagram />

      {/* ================================================================== */}
      {/* KEY TAKEAWAYS */}
      {/* ================================================================== */}
      <h2>Wrapping Up</h2>

      <p>
        If you take away just a few things from this post, let it be these:
      </p>

      <ol>
        <li>
          <strong>Context is king.</strong> Raw chunks lose the document hierarchy that makes 
          them meaningful. Adding context back dramatically improves search relevance.
        </li>
        <li>
          <strong>LLM-generated descriptions work.</strong> VLLM produces semantic descriptions 
          at scale, transforming ambiguous chunks into well-labeled content.
        </li>
        <li>
          <strong>Milvus handles production scale.</strong> Vector databases like Milvus handle 
          millions of vectors with sub-second latency, essential for real-time RAG.
        </li>
        <li>
          <strong>The enrichment pipeline matters.</strong> Document context, section headers, 
          and neighbor chunks all contribute to embedding quality.
        </li>
      </ol>

      <blockquote>
        The full working notebook is available on GitHub: 
        <a href="https://github.com/AryanSakhala/Contextual-Retriever-working-notebook-" target="_blank" rel="noopener noreferrer">
          Contextual-Retriever-working-notebook
        </a>
      </blockquote>

      <p>
        This pattern has become essential in my RAG implementations. It consistently improves 
        retrieval quality across different domains and document types. Give it a try and 
        see the difference for yourself.
      </p>
    </>
  );
}
