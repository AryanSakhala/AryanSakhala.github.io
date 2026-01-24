"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPostBySlug, blogPosts } from "@/content/blog";

// Dynamic import for blog content components
import dynamic from "next/dynamic";

// Map slugs to their content components
const blogContentComponents: Record<
  string,
  React.ComponentType<Record<string, never>>
> = {
  "building-rag-systems": dynamic(
    () => import("@/content/blog/posts/building-rag-systems")
  ),
  "celery-distributed-tasks": dynamic(
    () => import("@/content/blog/posts/celery-distributed-tasks")
  ),
  "intel-amx-cpu-acceleration": dynamic(
    () => import("@/content/blog/posts/intel-amx-cpu-acceleration")
  ),
  "ecs-fargate-serverless-containers": dynamic(
    () => import("@/content/blog/posts/ecs-fargate-serverless-containers")
  ),
};

export default function BlogPostClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);
  const ContentComponent = blogContentComponents[slug];

  // Find next/prev posts for navigation
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-6xl font-bold text-[var(--blog-text)] mb-4"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            404
          </h1>
          <p
            className="text-[var(--blog-text-muted)] mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Entry not found.
          </p>
          <Link
            href="/blog"
            className="text-[var(--blog-accent)] hover:underline"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            BACK TO ENTRIES
          </Link>
        </div>
      </main>
    );
  }

  const figureNumber = `FIG_${String(currentIndex + 1).padStart(3, "0")}`;

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--blog-border)] bg-[var(--blog-bg)] sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[var(--blog-text-muted)] hover:text-[var(--blog-text)] transition-colors text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ALL ENTRIES</span>
          </Link>

          <span
            className="text-sm text-[var(--blog-accent)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {figureNumber}
          </span>
        </div>
      </header>

      {/* Article */}
      <article>
        {/* Hero */}
        <motion.header
          className="border-b border-[var(--blog-border)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
            {/* Meta info */}
            <div
              className="flex items-center gap-4 text-xs text-[var(--blog-text-muted)] mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span>{post.date}</span>
              <span className="text-[var(--blog-border)]">|</span>
              <span>{post.readTime} read</span>
              <span className="text-[var(--blog-border)]">|</span>
              <span className="text-[var(--blog-accent)]">
                [{post.tags.join(", ")}]
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--blog-text)] mb-6 uppercase tracking-wide leading-tight"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {post.title}
            </h1>

            {/* Dotted separator */}
            <div
              className="text-[var(--blog-border)] text-xs overflow-hidden"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {"░".repeat(80)}
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          className="max-w-3xl mx-auto px-6 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="prose prose-lg max-w-none"
            style={{
              fontFamily: "var(--font-serif)",
              "--tw-prose-body": "var(--blog-text)",
              "--tw-prose-headings": "var(--blog-text)",
              "--tw-prose-links": "var(--blog-accent)",
              "--tw-prose-bold": "var(--blog-text)",
              "--tw-prose-code": "var(--blog-accent)",
              "--tw-prose-pre-bg": "var(--blog-code-bg)",
              "--tw-prose-quotes": "var(--blog-text-muted)",
              "--tw-prose-quote-borders": "var(--blog-accent)",
              "--tw-prose-hr": "var(--blog-border)",
            } as React.CSSProperties}
          >
            <style jsx global>{`
              .blog-theme .prose h2,
              .blog-theme .prose h3 {
                font-family: var(--font-mono);
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-top: 2.5rem;
                margin-bottom: 1rem;
              }

              .blog-theme .prose h2 {
                font-size: 1.25rem;
                border-left: 3px solid var(--blog-accent);
                padding-left: 1rem;
              }

              .blog-theme .prose h3 {
                font-size: 1rem;
                color: var(--blog-text-muted);
              }

              .blog-theme .prose p {
                text-align: justify;
                line-height: 1.8;
                margin-bottom: 1.5rem;
              }

              .blog-theme .prose p:first-of-type::first-letter {
                font-size: 3.5rem;
                font-weight: bold;
                float: left;
                line-height: 1;
                margin-right: 0.5rem;
                margin-top: 0.1rem;
                color: var(--blog-accent);
                font-family: var(--font-mono);
              }

              .blog-theme .prose code {
                font-family: var(--font-mono);
                background: var(--blog-code-bg);
                padding: 0.2rem 0.4rem;
                border-radius: 3px;
                font-size: 0.9em;
              }

              .blog-theme .prose pre {
                background: var(--blog-code-bg);
                border: 1px solid var(--blog-border);
                border-radius: 0;
                padding: 1.5rem;
                overflow-x: auto;
              }

              .blog-theme .prose pre code {
                background: transparent;
                padding: 0;
                font-size: 0.85rem;
                color: var(--blog-text);
              }

              .blog-theme .prose blockquote {
                border-left: 3px solid var(--blog-accent);
                padding-left: 1.5rem;
                font-style: italic;
                color: var(--blog-text-muted);
              }

              .blog-theme .prose ul,
              .blog-theme .prose ol {
                padding-left: 1.5rem;
              }

              .blog-theme .prose li {
                margin-bottom: 0.5rem;
              }

              .blog-theme .prose li::marker {
                color: var(--blog-accent);
              }

              .blog-theme .prose strong {
                color: var(--blog-text);
              }

              .blog-theme .prose a {
                color: var(--blog-accent);
                text-decoration: none;
                border-bottom: 1px solid transparent;
                transition: border-color 0.2s;
              }

              .blog-theme .prose a:hover {
                border-bottom-color: var(--blog-accent);
              }
            `}</style>

            {ContentComponent ? (
              <ContentComponent />
            ) : (
              <p className="text-[var(--blog-text-muted)]">
                Content component not found. Create it at{" "}
                <code>@/content/blog/posts/{slug}.tsx</code>
              </p>
            )}
          </div>
        </motion.div>

        {/* Separator */}
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="text-center text-[var(--blog-border)] text-xs py-8"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {"░".repeat(40)}
          </div>
        </div>

        {/* Navigation */}
        <motion.nav
          className="border-t border-[var(--blog-border)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group p-4 border border-[var(--blog-border)] hover:border-[var(--blog-accent)] transition-colors"
                >
                  <span
                    className="text-xs text-[var(--blog-text-muted)] mb-2 block uppercase"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <ArrowLeft className="w-3 h-3 inline mr-1" />
                    Previous
                  </span>
                  <span
                    className="text-[var(--blog-text)] group-hover:text-[var(--blog-accent)] transition-colors line-clamp-1 text-sm"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost && (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group p-4 border border-[var(--blog-border)] hover:border-[var(--blog-accent)] transition-colors text-right md:col-start-2"
                >
                  <span
                    className="text-xs text-[var(--blog-text-muted)] mb-2 block uppercase"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Next
                    <ArrowRight className="w-3 h-3 inline ml-1" />
                  </span>
                  <span
                    className="text-[var(--blog-text)] group-hover:text-[var(--blog-accent)] transition-colors line-clamp-1 text-sm"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </motion.nav>
      </article>

      {/* Footer */}
      <footer className="border-t border-[var(--blog-border)]">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div
            className="flex items-center justify-center text-xs text-[var(--blog-text-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="uppercase tracking-widest">
              End of {figureNumber}
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
