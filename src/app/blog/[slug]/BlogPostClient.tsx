"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import { ArrowLeft, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { getPostBySlug, blogPosts } from "@/content/blog";
import { Badge } from "@/components/ui/badge";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { Separator } from "@/components/ui/separator";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
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
      <main className="relative min-h-screen flex items-center justify-center">
        <AuroraBackground />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-mono font-bold text-[var(--ctp-text)] mb-4">
            404
          </h1>
          <p className="text-[var(--ctp-subtext0)] mb-6">Post not found.</p>
          <Link
            href="/blog"
            className="text-[var(--ctp-mauve)] hover:underline font-mono"
          >
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <AuroraBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 bg-[var(--ctp-base)]/80 backdrop-blur-xl border-b border-[var(--ctp-surface1)]/50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[var(--ctp-subtext1)] hover:text-[var(--ctp-text)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-mono">all posts</span>
          </Link>

          <span className="text-sm font-mono text-[var(--ctp-overlay1)]">
            {post.readTime} read
          </span>
        </div>
      </header>

      {/* Article content */}
      <article className="relative z-10 pt-24 pb-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Post header */}
          <motion.header variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-[var(--ctp-surface1)] text-[var(--ctp-subtext1)] border-none"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-[var(--ctp-text)] mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-[var(--ctp-overlay1)] font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </motion.header>

          <Separator className="mb-12 bg-[var(--ctp-surface1)]" />

          {/* Post content - loaded from separate component */}
          <motion.div
            variants={itemVariants}
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-mono prose-headings:text-[var(--ctp-text)]
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-2 prose-h2:border-[var(--ctp-mauve)] prose-h2:pl-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-[var(--ctp-subtext1)]
              prose-p:text-[var(--ctp-subtext0)] prose-p:leading-relaxed
              prose-a:text-[var(--ctp-blue)] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[var(--ctp-text)]
              prose-code:text-[var(--ctp-peach)] prose-code:bg-[var(--ctp-surface0)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[var(--ctp-crust)] prose-pre:border prose-pre:border-[var(--ctp-surface1)]
              prose-blockquote:border-[var(--ctp-mauve)] prose-blockquote:text-[var(--ctp-subtext1)]
              prose-ul:text-[var(--ctp-subtext0)] prose-ol:text-[var(--ctp-subtext0)]
              prose-li:marker:text-[var(--ctp-overlay0)]"
          >
            {ContentComponent ? (
              <ContentComponent />
            ) : (
              <p className="text-[var(--ctp-overlay0)]">
                Content not found. Create the content component at{" "}
                <code>@/content/blog/posts/{slug}.tsx</code>
              </p>
            )}
          </motion.div>

          <Separator className="my-12 bg-[var(--ctp-surface1)]" />

          {/* Post navigation */}
          <motion.nav
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group p-4 rounded-lg bg-[var(--ctp-surface0)]/40 border border-[var(--ctp-surface1)]/30 hover:border-[var(--ctp-mauve)]/40 transition-all"
              >
                <span className="text-xs font-mono text-[var(--ctp-overlay0)] mb-1 block">
                  Previous
                </span>
                <span className="text-[var(--ctp-text)] group-hover:text-[var(--ctp-mauve)] transition-colors line-clamp-1">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group p-4 rounded-lg bg-[var(--ctp-surface0)]/40 border border-[var(--ctp-surface1)]/30 hover:border-[var(--ctp-mauve)]/40 transition-all text-right md:col-start-2"
              >
                <span className="text-xs font-mono text-[var(--ctp-overlay0)] mb-1 block">
                  Next
                </span>
                <span className="text-[var(--ctp-text)] group-hover:text-[var(--ctp-mauve)] transition-colors flex items-center justify-end gap-1 line-clamp-1">
                  {nextPost.title}
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </span>
              </Link>
            )}
          </motion.nav>
        </motion.div>
      </article>
    </main>
  );
}
