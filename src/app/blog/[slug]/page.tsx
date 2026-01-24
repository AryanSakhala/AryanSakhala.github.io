import { getAllSlugs } from "@/content/blog";
import BlogPostClient from "./BlogPostClient";

// Generate static params for all blog posts (required for static export)
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <BlogPostClient params={params} />;
}
