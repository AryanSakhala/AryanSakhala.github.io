import { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/content/blog";
import BlogPostClient from "./BlogPostClient";

// Generate static params for all blog posts (required for static export)
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  // Create SEO-friendly keywords from tags
  const keywords = [
    ...post.tags,
    "Aryan Sakhala",
    "Technical Blog",
    "AI Engineering",
    "Software Development",
  ];

  return {
    title: post.title,
    description: post.description,
    keywords,
    authors: [{ name: "Aryan Sakhala" }],
    openGraph: {
      title: `${post.title} | Aryan Sakhala`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Aryan Sakhala"],
      tags: post.tags,
      url: `https://aryansakhala.netlify.app/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://aryansakhala.netlify.app/blog/${slug}`,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <BlogPostClient params={params} />;
}
