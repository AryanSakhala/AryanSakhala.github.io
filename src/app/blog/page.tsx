"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/content/blog";
import { Badge } from "@/components/ui/badge";
import { AuroraBackground } from "@/components/effects/AuroraBackground";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const otherPosts = blogPosts.filter((post) => !post.featured);

  return (
    <main className="relative min-h-screen">
      <AuroraBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 bg-[var(--ctp-base)]/80 backdrop-blur-xl border-b border-[var(--ctp-surface1)]/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--ctp-subtext1)] hover:text-[var(--ctp-text)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-mono">back</span>
          </Link>

          <span className="text-xl font-bold text-[var(--ctp-text)] font-mono">
            <span className="text-[var(--ctp-mauve)]">&lt;</span>
            blog
            <span className="text-[var(--ctp-mauve)]">/&gt;</span>
          </span>

          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-20 px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Page title */}
          <motion.div variants={itemVariants} className="mb-16">
            <h1 className="text-4xl md:text-6xl font-mono font-bold text-[var(--ctp-text)] mb-4">
              <span className="text-[var(--ctp-overlay0)]">// </span>
              my_learnings
            </h1>
            <p className="text-lg text-[var(--ctp-subtext0)] max-w-2xl font-mono">
              Technical deep-dives, architecture patterns, and lessons from
              building production systems.
            </p>
          </motion.div>

          {/* Featured post */}
          {featuredPost && (
            <motion.div variants={itemVariants} className="mb-16">
              <span className="text-xs font-mono text-[var(--ctp-mauve)] mb-4 block uppercase tracking-widest">
                Featured
              </span>
              <Link href={`/blog/${featuredPost.slug}`}>
                <article className="group relative p-8 rounded-2xl bg-gradient-to-br from-[var(--ctp-surface0)]/60 to-[var(--ctp-crust)]/60 border border-[var(--ctp-surface1)]/50 backdrop-blur-sm hover:border-[var(--ctp-mauve)]/50 transition-all duration-500">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--ctp-mauve)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-[var(--ctp-text)] mb-3 group-hover:text-[var(--ctp-mauve)] transition-colors duration-300">
                        {featuredPost.title}
                      </h2>
                      <p className="text-[var(--ctp-subtext0)] mb-4 line-clamp-2">
                        {featuredPost.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {featuredPost.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-[var(--ctp-surface1)] text-[var(--ctp-subtext1)] border-none text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[var(--ctp-overlay1)] font-mono shrink-0">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {featuredPost.readTime}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-[var(--ctp-mauve)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          )}

          {/* Post grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {otherPosts.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <Link href={`/blog/${post.slug}`}>
                  <article className="group h-full p-6 rounded-xl bg-[var(--ctp-surface0)]/40 border border-[var(--ctp-surface1)]/30 backdrop-blur-sm hover:border-[var(--ctp-mauve)]/40 hover:bg-[var(--ctp-surface0)]/60 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 text-xs text-[var(--ctp-overlay1)] font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[var(--ctp-overlay0)] group-hover:text-[var(--ctp-mauve)] transition-colors" />
                    </div>

                    <h3 className="text-lg font-bold text-[var(--ctp-text)] mb-2 group-hover:text-[var(--ctp-mauve)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-[var(--ctp-subtext0)] mb-4 line-clamp-3">
                      {post.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-[var(--ctp-surface1)]/50 text-[var(--ctp-overlay1)] border-none text-xs py-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty state */}
          {blogPosts.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-20 text-[var(--ctp-overlay0)]"
            >
              <p className="font-mono text-lg">No posts yet.</p>
              <p className="text-sm mt-2">Check back soon.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
