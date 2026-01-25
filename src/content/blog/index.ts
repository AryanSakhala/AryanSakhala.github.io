// Blog post metadata and content structure
// Add new blog posts here - they will automatically appear in the listing

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

// Registry of all blog posts
// Add new posts to this array - the content lives in separate component files
export const blogPosts: BlogPost[] = [
  {
    slug: "seal-homomorphic-encryption",
    title: "SEAL: Homomorphic Encryption from Scratch",
    description:
      "A complete guide to homomorphic encryption using Microsoft SEAL. Learn Ring-LWE security, SEAL parameters (poly_modulus, coeff_modulus, plain_modulus), scale factors, and BFV vs CKKS schemes.",
    date: "2026-01-25",
    readTime: "25 min",
    tags: ["Homomorphic Encryption", "SEAL", "Ring-LWE", "BFV", "CKKS", "Privacy", "Cryptography", "PPML"],
    featured: true,
  },
  {
    slug: "intel-amx-cpu-acceleration",
    title: "Intel AMX: Understanding CPU-Based Matrix Acceleration",
    description:
      "A deep exploration of Intel's Advanced Matrix Extensions. How tile-based operations differ from vector processing, the role of BF16, and how oneDNN bridges hardware and software for AI inference.",
    date: "2026-01-23",
    readTime: "15 min",
    tags: ["Intel AMX", "CPU", "Matrix Computation", "oneDNN", "BF16", "AVX-512"],
  },
  {
    slug: "contextual-retriever",
    title: "Contextual Retrieval with VLLM and LlamaIndex",
    description:
      "A comprehensive guide to implementing advanced contextual retrieval using VLLM for efficient LLM inference and LlamaIndex for robust data indexing. Solve the context loss problem in RAG systems.",
    date: "2026-01-25",
    readTime: "12 min",
    tags: ["RAG", "LLM", "VLLM", "LlamaIndex", "Milvus", "Contextual Retrieval", "Vector DB"],
  },
  {
    slug: "celery-distributed-tasks",
    title: "Celery: Distributed Task Queues at Scale",
    description:
      "Mastering asynchronous task processing with Celery, Redis, and RabbitMQ for high-throughput distributed systems.",
    date: "2026-01-22",
    readTime: "10 min",
    tags: ["Celery", "Python", "Distributed Systems", "Redis"],
  },
  {
    slug: "ecs-fargate-serverless-containers",
    title: "ECS + Fargate: Serverless Container Orchestration",
    description:
      "Deploying and scaling containerized applications on AWS with ECS Fargate for zero-infrastructure management.",
    date: "2026-01-24",
    readTime: "9 min",
    tags: ["AWS", "ECS", "Fargate", "Containers", "DevOps"],
  },
];

// Helper to get a single post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Helper to get all slugs for static generation
export function getAllSlugs(): string[] {
  return blogPosts.map((post) => post.slug);
}
