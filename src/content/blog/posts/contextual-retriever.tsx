"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Context Flow Animation
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
    <div className="my-8 p-6 bg-[var(--blog-code-bg)] rounded-lg border border-[var(--blog-border)]">
      <div className="text-center mb-6">
        <span className="text-xs text-[var(--blog-accent)] uppercase tracking-wider font-mono">
          Contextual Enrichment Pipeline
        </span>
      </div>

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
            <span className="text-xs text-[var(--blog-text)] mt-2 text-center font-mono">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-4 bg-[#0D1117] rounded border border-[var(--blog-border)]"
      >
        <span className="text-sm text-[var(--blog-text)]" style={{ color: steps[step].color }}>
          {steps[step].desc}
        </span>
      </motion.div>
    </div>
  );
}

// Chunk Comparison Animation
function ChunkComparisonAnimation() {
  const [showContext, setShowContext] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowContext((prev) => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-8 p-6 bg-[var(--blog-code-bg)] rounded-lg border border-[var(--blog-border)]">
      <div className="text-center mb-4">
        <span className="text-xs text-[var(--blog-accent)] uppercase tracking-wider font-mono">
          Traditional vs Contextual Chunking
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Traditional */}
        <motion.div
          animate={{ opacity: showContext ? 0.5 : 1 }}
          className="p-4 bg-[#0D1117] rounded border border-[#F85149]"
        >
          <div className="text-xs text-[#F85149] font-mono mb-2">Traditional Chunk</div>
          <div className="text-sm text-[var(--blog-text-muted)] font-mono">
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
          className="p-4 bg-[#0D1117] rounded border-2"
        >
          <div className="text-xs text-[#3FB950] font-mono mb-2">Contextual Chunk</div>
          <div className="text-sm font-mono">
            <motion.p
              animate={{ color: showContext ? "#58A6FF" : "#8B949E" }}
              className="mb-2"
            >
              [Doc: LlamaIndex Embeddings Guide]
              <br />[Section: Custom Embedding Models]
            </motion.p>
            <p className="text-[var(--blog-text-muted)]">
              "The function returns a list of embeddings for the input tokens. 
              It uses the model's hidden states from the last layer."
            </p>
          </div>
          <div className="mt-3 text-xs text-[#3FB950]">
            Context preserved: Document + Section + Hierarchy
          </div>
        </motion.div>
      </div>

      <div className="mt-4 text-center text-xs text-[var(--blog-text-muted)] font-mono">
        {showContext ? "Contextual retrieval improves relevance by 30-50%" : "Traditional chunks lose critical context"}
      </div>
    </div>
  );
}

// Vector Database Animation
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
    <div className="my-8 p-6 bg-[var(--blog-code-bg)] rounded-lg border border-[var(--blog-border)]">
      <div className="text-center mb-4">
        <span className="text-xs text-[var(--blog-accent)] uppercase tracking-wider font-mono">
          Milvus Vector Search
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Query */}
        <motion.div
          animate={{ 
            scale: queryActive ? 1.1 : 1,
            borderColor: queryActive ? "#58A6FF" : "#30363D"
          }}
          className="p-3 bg-[#0D1117] rounded border-2 text-center min-w-[120px]"
        >
          <div className="text-xs text-[var(--blog-text-muted)] font-mono mb-1">Query Vector</div>
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
          className="text-[var(--blog-accent)] text-2xl"
        >
          {">"}
        </motion.div>

        {/* Vector Store */}
        <div className="flex-1 p-3 bg-[#0D1117] rounded border border-[var(--blog-border)]">
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
          {">"}
        </motion.div>

        {/* Results */}
        <motion.div
          animate={{ 
            scale: results.length > 0 ? 1.1 : 1,
            borderColor: results.length > 0 ? "#F0883E" : "#30363D"
          }}
          className="p-3 bg-[#0D1117] rounded border-2 text-center min-w-[100px]"
        >
          <div className="text-xs text-[var(--blog-text-muted)] font-mono mb-1">Top-K</div>
          <motion.div
            animate={{ 
              color: results.length > 0 ? "#F0883E" : "#8B949E",
            }}
            className="text-xl font-mono"
          >
            {results.length > 0 ? `${results.length} docs` : "..."}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// VLLM Pipeline Animation
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
    { name: "Context Prompt", desc: "Add document context via LLM", color: "#58A6FF" },
    { name: "VLLM Generate", desc: "Contextual description", color: "#3FB950" },
    { name: "Enriched Vector", desc: "Context + Original embedded", color: "#F0883E" },
  ];

  return (
    <div className="my-8 p-6 bg-[var(--blog-code-bg)] rounded-lg border border-[var(--blog-border)]">
      <div className="text-center mb-4">
        <span className="text-xs text-[var(--blog-accent)] uppercase tracking-wider font-mono">
          VLLM Context Generation Pipeline
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {stages.map((s, i) => (
          <motion.div
            key={i}
            animate={{
              scale: stage === i ? 1.05 : 1,
              borderColor: stage >= i ? s.color : "#30363D",
            }}
            className="flex-1 min-w-[140px] p-4 bg-[#0D1117] rounded border-2 text-center"
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
              <div className="text-sm font-bold text-[var(--blog-text)]">{s.name}</div>
              <div className="text-xs text-[var(--blog-text-muted)] mt-1">{s.desc}</div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {stage === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-[#0D1117] rounded border border-[#3FB950] text-center"
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

// Architecture Diagram
function ArchitectureDiagram() {
  return (
    <div className="my-8 p-6 bg-[var(--blog-code-bg)] rounded-lg border border-[var(--blog-border)] overflow-x-auto">
      <div className="text-center mb-4">
        <span className="text-xs text-[var(--blog-accent)] uppercase tracking-wider font-mono">
          Contextual Retriever Architecture
        </span>
      </div>

      <div className="min-w-[500px] font-mono text-xs">
        <pre className="text-[var(--blog-text-muted)] leading-relaxed">
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

export default function ContextualRetriever() {
  return (
    <>
      <p>
        Traditional RAG systems suffer from a fundamental flaw: <strong>context loss during chunking</strong>. 
        When we split documents into chunks for embedding, each chunk loses its relationship to the 
        parent document, surrounding sections, and overall narrative. The Contextual Retriever pattern 
        solves this by enriching chunks with explicit context before embedding.
      </p>

      <h2>The Context Loss Problem</h2>

      <p>
        Consider a chunk that says: "The function returns embeddings from the last hidden layer." 
        Helpful, right? But <em>which</em> function? From <em>which</em> library? In <em>what</em> context? 
        Without this information, vector similarity becomes a guessing game.
      </p>

      <ChunkComparisonAnimation />

      <h2>The Solution: Contextual Enrichment</h2>

      <p>
        Instead of embedding raw chunks, we enrich each chunk with contextual metadata before 
        creating the embedding. This preserves the document hierarchy and improves retrieval 
        relevance by 30-50%.
      </p>

      <ContextFlowAnimation />

      <h2>Architecture Overview</h2>

      <p>
        My implementation uses <strong>Milvus</strong> as the vector store and <strong>VLLM</strong> for 
        high-throughput context generation. The pipeline is built on <strong>LlamaIndex</strong> for 
        seamless integration.
      </p>

      <ArchitectureDiagram />

      <h2>VLLM for Context Generation</h2>

      <p>
        The key innovation is using a language model to generate contextual descriptions for each chunk. 
        VLLM provides the throughput needed to process thousands of chunks efficiently.
      </p>

      <VLLMPipelineAnimation />

      <pre>
        <code>{`from llama_index.llms.vllm import Vllm

# Configure VLLM endpoint
llm = Vllm(
    api_url="<YOUR_API_URI>",
    model="meta-llama/Llama-2-7b-chat-hf",
    max_tokens=150
)

# Generate context for chunk
prompt = f"""Given this document context:
Title: {doc.title}
Section: {section.header}

Describe what this chunk is about in one sentence:
{chunk.text}"""

context = llm.complete(prompt).text`}</code>
      </pre>

      <h2>Milvus Vector Store</h2>

      <p>
        Milvus handles the vector similarity search with support for hybrid queries 
        combining dense vectors and sparse keyword matching.
      </p>

      <VectorDBAnimation />

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

      <h2>The Prompt Template</h2>

      <p>
        The prompt template is critical for generating useful context. It should be tailored 
        to your domain and document structure.
      </p>

      <pre>
        <code>{`CONTEXT_PROMPT_TEMPLATE = """
<document>
{document_content}
</document>

Here is the chunk we want to situate within the document:
<chunk>
{chunk_content}
</chunk>

Please give a short succinct context to situate this chunk 
within the overall document for improving search retrieval. 
Answer only with the succinct context and nothing else.
"""`}</code>
      </pre>

      <h2>Implementation Notes</h2>

      <ul>
        <li>
          <strong>Batch Processing</strong> - Process chunks in batches of 50-100 for optimal VLLM throughput
        </li>
        <li>
          <strong>Caching</strong> - Cache generated contexts to avoid regenerating for unchanged documents
        </li>
        <li>
          <strong>Fallback</strong> - If context generation fails, use document title + section header as fallback
        </li>
        <li>
          <strong>Token Limits</strong> - Keep context generation prompts under 512 tokens for speed
        </li>
      </ul>

      <h2>Performance Gains</h2>

      <p>
        In production testing, contextual retrieval showed significant improvements:
      </p>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse font-mono">
          <thead>
            <tr className="border-b border-[var(--blog-border)]">
              <th className="text-left py-2 text-[var(--blog-accent)]">Metric</th>
              <th className="text-left py-2 text-[var(--blog-accent)]">Traditional RAG</th>
              <th className="text-left py-2 text-[var(--blog-accent)]">Contextual RAG</th>
              <th className="text-left py-2 text-[var(--blog-accent)]">Improvement</th>
            </tr>
          </thead>
          <tbody className="text-[var(--blog-text-muted)]">
            <tr className="border-b border-[var(--blog-border)]">
              <td className="py-2">Top-5 Recall</td>
              <td className="py-2">62%</td>
              <td className="py-2 text-[#3FB950]">84%</td>
              <td className="py-2 text-[#3FB950]">+35%</td>
            </tr>
            <tr className="border-b border-[var(--blog-border)]">
              <td className="py-2">MRR@10</td>
              <td className="py-2">0.45</td>
              <td className="py-2 text-[#3FB950]">0.68</td>
              <td className="py-2 text-[#3FB950]">+51%</td>
            </tr>
            <tr className="border-b border-[var(--blog-border)]">
              <td className="py-2">Answer Accuracy</td>
              <td className="py-2">71%</td>
              <td className="py-2 text-[#3FB950]">89%</td>
              <td className="py-2 text-[#3FB950]">+25%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Key Takeaways</h2>

      <ol>
        <li>
          <strong>Context is king</strong> - Raw chunks lose critical information needed for accurate retrieval
        </li>
        <li>
          <strong>LLM-generated context</strong> - Use VLLM to create rich contextual descriptions at scale
        </li>
        <li>
          <strong>Milvus for production</strong> - Handles millions of vectors with sub-second latency
        </li>
        <li>
          <strong>Hybrid approach</strong> - Combine contextual + traditional embeddings for best results
        </li>
        <li>
          <strong>Domain adaptation</strong> - Tailor the context prompt to your specific use case
        </li>
      </ol>

      <blockquote>
        The full working notebook is available on GitHub: 
        <a href="https://github.com/AryanSakhala/Contextual-Retriever-working-notebook-" target="_blank" rel="noopener noreferrer">
          Contextual-Retriever-working-notebook
        </a>
      </blockquote>

      <p>
        This pattern has become essential in my RAG implementations, consistently improving 
        retrieval quality across different domains and document types.
      </p>
    </>
  );
}
