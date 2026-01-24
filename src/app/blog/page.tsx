"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--blog-border)] bg-[var(--blog-bg)]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
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
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Pixel-style title */}
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--blog-text)] mb-6 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              MY LEARNINGS
            </h1>

            {/* Dotted separator */}
            <div
              className="text-[var(--blog-border)] text-xs mb-6 overflow-hidden"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {"░".repeat(80)}
            </div>

            <p
              className="text-lg md:text-xl text-[var(--blog-text-muted)] max-w-2xl leading-relaxed"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              A reference collection of technical deep-dives, architecture
              patterns, and lessons learned from building production systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog posts list */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section label */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 mb-8"
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

          {/* Posts */}
          <div className="space-y-0">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                variants={itemVariants}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="py-8 border-b border-[var(--blog-border)] hover:bg-[var(--blog-bg-alt)] transition-colors -mx-6 px-6">
                    <div className="flex items-start gap-6">
                      {/* Figure number */}
                      <div
                        className="shrink-0 text-[var(--blog-accent)] text-xs pt-1"
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        FIG_{String(index + 1).padStart(3, "0")}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h2
                          className="text-xl md:text-2xl font-bold text-[var(--blog-text)] mb-2 group-hover:text-[var(--blog-accent)] transition-colors"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          {post.title}
                        </h2>

                        <p
                          className="text-[var(--blog-text-muted)] mb-4 leading-relaxed line-clamp-2"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {post.description}
                        </p>

                        <div
                          className="flex items-center gap-4 text-xs text-[var(--blog-text-muted)]"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          <span>{post.date}</span>
                          <span className="text-[var(--blog-border)]">|</span>
                          <span>{post.readTime}</span>
                          <span className="text-[var(--blog-border)]">|</span>
                          <span className="text-[var(--blog-accent)]">
                            [{post.tags.slice(0, 2).join(", ")}]
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="shrink-0 text-[var(--blog-border)] group-hover:text-[var(--blog-accent)] transition-colors pt-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
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
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div
            className="flex items-center justify-between text-xs text-[var(--blog-text-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span>
              {"░".repeat(20)}
            </span>
            <span className="uppercase tracking-widest">
              End of Entries
            </span>
            <span>
              {"░".repeat(20)}
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
