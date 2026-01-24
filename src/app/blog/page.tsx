"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/content/blog";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--blog-border)] bg-[var(--blog-bg)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--blog-text-muted)] hover:text-[var(--blog-text)] transition-colors text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK</span>
          </Link>

          <span
            className="text-sm text-[var(--blog-text-muted)] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Aryan Sakhala
          </span>
        </div>
      </header>

      {/* Hero section */}
      <section className="border-b border-[var(--blog-border)]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--blog-text)] mb-4 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              MY LEARNINGS
            </h1>

            <p
              className="text-lg text-[var(--blog-text-muted)] max-w-2xl leading-relaxed"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Technical deep-dives, architecture patterns, and lessons learned from building production systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog posts grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section label */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 mb-10"
          >
            <span
              className="text-xs text-[var(--blog-accent)] uppercase tracking-widest"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ENTRIES
            </span>
            <div className="flex-1 border-t border-dashed border-[var(--blog-border)]" />
            <span
              className="text-xs text-[var(--blog-text-muted)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {String(blogPosts.length).padStart(2, "0")} ITEMS
            </span>
          </motion.div>

          {/* Grid Layout - 3 columns on large, 2 on medium, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="h-full p-6 border border-[var(--blog-border)] rounded-lg bg-[var(--blog-bg)] hover:bg-[var(--blog-bg-alt)] hover:border-[var(--blog-accent)]/30 transition-all duration-300 flex flex-col">
                    {/* Top row - figure number and arrow */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-[var(--blog-accent)] text-xs"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        FIG_{String(index + 1).padStart(3, "0")}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[var(--blog-border)] group-hover:text-[var(--blog-accent)] transition-colors" />
                    </div>

                    {/* Title */}
                    <h2
                      className="text-lg font-bold text-[var(--blog-text)] mb-3 group-hover:text-[var(--blog-accent)] transition-colors line-clamp-2"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p
                      className="text-sm text-[var(--blog-text-muted)] mb-4 leading-relaxed line-clamp-3 flex-1"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {post.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded bg-[var(--blog-bg-alt)] text-[var(--blog-text-muted)] border border-[var(--blog-border)]"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer - date and read time */}
                    <div
                      className="flex items-center justify-between text-xs text-[var(--blog-text-muted)] pt-4 border-t border-[var(--blog-border)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      <span>{post.date}</span>
                      <span className="text-[var(--blog-accent)]">{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--blog-border)] mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div
            className="text-center text-xs text-[var(--blog-text-muted)] uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            End of Entries
          </div>
        </div>
      </footer>
    </main>
  );
}
