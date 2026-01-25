"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPostBySlug, blogPosts } from "@/content/blog";
import { BlogPostJsonLd } from "@/components/seo/JsonLd";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";

// Dynamic import for blog content components
import dynamic from "next/dynamic";

// Map slugs to their content components
const blogContentComponents: Record<
  string,
  React.ComponentType<Record<string, never>>
> = {
  "intel-amx-cpu-acceleration": dynamic(
    () => import("@/content/blog/posts/intel-amx-cpu-acceleration")
  ),
  "contextual-retriever": dynamic(
    () => import("@/content/blog/posts/contextual-retriever")
  ),
  "celery-distributed-tasks": dynamic(
    () => import("@/content/blog/posts/celery-distributed-tasks")
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
      {/* SEO JSON-LD */}
      <BlogPostJsonLd
        title={post.title}
        description={post.description}
        date={post.date}
        slug={slug}
        tags={post.tags}
      />

      {/* Header - Sticky with solid background to prevent content overlap */}
      <header className="border-b border-[var(--blog-border)] sticky top-0 z-50" style={{ backgroundColor: '#0D1117' }}>
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
            className="prose prose-lg max-w-none blog-content"
            style={{
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
              /* Blog Content - raylib-inspired clean style */
              .blog-content {
                font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              }

              .blog-content p,
              .blog-content li {
                font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                font-size: 1.0625rem;
                line-height: 1.75;
                color: var(--blog-text);
                margin-bottom: 1.25rem;
                font-weight: 400;
              }

              .blog-content h2,
              .blog-content h3 {
                font-family: var(--font-mono);
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-top: 2.5rem;
                margin-bottom: 1rem;
                font-weight: 600;
              }

              .blog-content h2 {
                font-size: 0.8rem;
                border-left: 3px solid var(--blog-accent);
                padding-left: 1rem;
                color: var(--blog-text);
              }

              .blog-content h3 {
                font-size: 0.75rem;
                color: var(--blog-text-muted);
              }

              .blog-content p:first-of-type::first-letter {
                font-size: 3.5rem;
                font-weight: 700;
                float: left;
                line-height: 1;
                margin-right: 0.5rem;
                margin-top: 0.15rem;
                color: var(--blog-accent);
                font-family: var(--font-sans), sans-serif;
              }

              .blog-content code {
                font-family: var(--font-mono);
                background: var(--blog-code-bg);
                padding: 0.15rem 0.4rem;
                border-radius: 4px;
                font-size: 0.85em;
                color: var(--blog-accent);
              }

              .blog-content pre {
                background: var(--blog-code-bg);
                border: 1px solid var(--blog-border);
                border-radius: 4px;
                padding: 1.25rem;
                overflow-x: auto;
                margin: 1.5rem 0;
              }

              .blog-content pre code {
                background: transparent;
                padding: 0;
                font-size: 0.8rem;
                color: var(--blog-text);
                line-height: 1.5;
              }

              .blog-content blockquote {
                border-left: 3px solid var(--blog-accent);
                padding-left: 1.25rem;
                font-style: normal;
                color: var(--blog-text-muted);
                font-family: var(--font-sans), sans-serif;
                margin: 1.5rem 0;
              }

              .blog-content ul,
              .blog-content ol {
                padding-left: 1.5rem;
                margin: 1.25rem 0;
              }

              .blog-content li {
                margin-bottom: 0.5rem;
              }

              .blog-content li::marker {
                color: var(--blog-accent);
              }

              .blog-content strong {
                color: var(--blog-text);
                font-weight: 600;
              }

              .blog-content em {
                font-style: italic;
              }

              .blog-content a {
                color: var(--blog-accent);
                text-decoration: none;
                border-bottom: 1px solid transparent;
                transition: border-color 0.2s;
              }

              .blog-content a:hover {
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

        {/* Newsletter Signup */}
        <div className="max-w-3xl mx-auto px-6">
          <NewsletterSignup />
        </div>

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
