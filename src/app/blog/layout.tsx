import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Blog & Learnings",
  description:
    "Technical deep-dives on Intel AMX CPU acceleration, Celery distributed task queues, AWS ECS Fargate, RAG systems, and production ML architecture by Aryan Sakhala.",
  keywords: [
    "Tech Blog",
    "Intel AMX",
    "Intel Advanced Matrix Extensions",
    "CPU AI Acceleration",
    "Celery Python",
    "Distributed Task Queue",
    "AWS ECS",
    "AWS Fargate",
    "Serverless Containers",
    "RAG Systems",
    "Retrieval Augmented Generation",
    "LLM Architecture",
    "Vector Databases",
    "Machine Learning Blog",
    "AI Engineering",
    "Python Tutorials",
    "DevOps",
    "ML Infrastructure",
    "Aryan Sakhala Blog",
  ],
  openGraph: {
    title: "Technical Blog | Aryan Sakhala",
    description:
      "Deep technical articles on Intel AMX, Celery, AWS ECS Fargate, RAG systems, and production ML by Aryan Sakhala.",
    type: "website",
    url: "https://aryansakhala.netlify.app/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Blog | Aryan Sakhala",
    description:
      "Deep technical articles on Intel AMX, Celery, AWS ECS Fargate, RAG systems, and production ML.",
  },
  alternates: {
    canonical: "https://aryansakhala.netlify.app/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
