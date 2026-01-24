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
    slug: "building-rag-systems",
    title: "Building Production-Ready RAG Systems",
    description:
      "Deep dive into Retrieval Augmented Generation architecture, vector databases, and optimization strategies for enterprise-scale deployments.",
    date: "2026-01-20",
    readTime: "12 min",
    tags: ["RAG", "LLM", "Vector DB", "AI"],
    featured: true,
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
    slug: "intel-amx-cpu-acceleration",
    title: "Intel AMX: CPU-Based AI Acceleration",
    description:
      "Leveraging Intel Advanced Matrix Extensions for ML inference optimization without dedicated GPU hardware.",
    date: "2026-01-23",
    readTime: "8 min",
    tags: ["Intel AMX", "CPU", "ML Inference", "Optimization"],
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
