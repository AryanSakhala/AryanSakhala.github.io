// JSON-LD Structured Data for SEO

export function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aryan Sakhala",
    jobTitle: "Lead Software Engineer",
    description:
      "AI/ML Engineer specializing in RAG-based Agentic Workflows, LLM Systems, and Multi-Agent Architecture. Working with Dell Technologies & Intel.",
    url: "https://aryansakhala.netlify.app",
    sameAs: [
      "https://github.com/AryanSakhala",
      "https://linkedin.com/in/aryan-sakhala-990b46176",
      "https://pypi.org/user/ryansakhala",
      "https://youtube.com/@aryansakhala3930",
    ],
    email: "ryansakhala@gmail.com",
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "RAG Systems",
      "Large Language Models",
      "Python",
      "PyTorch",
      "LangChain",
      "FastAPI",
      "Intel AMX",
      "Multi-Agent Systems",
      "Vector Databases",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Metrum AI",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Pune University",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aryan Sakhala Portfolio",
    description:
      "Portfolio and technical blog of Aryan Sakhala - AI/ML Engineer & RAG Specialist",
    url: "https://aryansakhala.netlify.app",
    author: {
      "@type": "Person",
      name: "Aryan Sakhala",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://aryansakhala.netlify.app/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BlogPostJsonLdProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
}

export function BlogPostJsonLd({
  title,
  description,
  date,
  slug,
  tags,
}: BlogPostJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: "Aryan Sakhala",
      url: "https://aryansakhala.netlify.app",
    },
    publisher: {
      "@type": "Person",
      name: "Aryan Sakhala",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://aryansakhala.netlify.app/blog/${slug}`,
    },
    keywords: tags.join(", "),
    articleSection: "Technology",
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BlogListJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Aryan Sakhala Technical Blog",
    description:
      "Technical deep-dives on Intel AMX, Celery, AWS ECS Fargate, RAG systems, and production ML architecture.",
    url: "https://aryansakhala.netlify.app/blog",
    author: {
      "@type": "Person",
      name: "Aryan Sakhala",
    },
    blogPost: [
      {
        "@type": "BlogPosting",
        headline: "Intel AMX: CPU-Based AI Acceleration",
        description:
          "Leveraging Intel Advanced Matrix Extensions for ML inference optimization without dedicated GPU hardware.",
        url: "https://aryansakhala.netlify.app/blog/intel-amx-cpu-acceleration",
        keywords: "Intel AMX, CPU, ML Inference, Optimization",
      },
      {
        "@type": "BlogPosting",
        headline: "Celery: Distributed Task Queues at Scale",
        description:
          "Mastering asynchronous task processing with Celery, Redis, and RabbitMQ for high-throughput distributed systems.",
        url: "https://aryansakhala.netlify.app/blog/celery-distributed-tasks",
        keywords: "Celery, Python, Distributed Systems, Redis",
      },
      {
        "@type": "BlogPosting",
        headline: "ECS + Fargate: Serverless Container Orchestration",
        description:
          "Deploying and scaling containerized applications on AWS with ECS Fargate for zero-infrastructure management.",
        url: "https://aryansakhala.netlify.app/blog/ecs-fargate-serverless-containers",
        keywords: "AWS, ECS, Fargate, Containers, DevOps",
      },
      {
        "@type": "BlogPosting",
        headline: "Contextual Retrieval with VLLM and LlamaIndex",
        description:
          "Advanced contextual retrieval using VLLM for efficient LLM inference and LlamaIndex for robust data indexing.",
        url: "https://aryansakhala.netlify.app/blog/contextual-retriever",
        keywords: "RAG, VLLM, LlamaIndex, Contextual Retrieval",
      },
      {
        "@type": "BlogPosting",
        headline: "SEAL: Homomorphic Encryption from Scratch",
        description:
          "Complete guide to homomorphic encryption using Microsoft SEAL, Ring-LWE security, and BFV vs CKKS schemes.",
        url: "https://aryansakhala.netlify.app/blog/seal-homomorphic-encryption",
        keywords: "Homomorphic Encryption, SEAL, Privacy, Cryptography",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
