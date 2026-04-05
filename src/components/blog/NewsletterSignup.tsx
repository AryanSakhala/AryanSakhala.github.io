"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");

    // Simulate submission - replace with actual newsletter service
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For now, just show success (integrate with Mailchimp, Buttondown, etc.)
    setStatus("success");
    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-16 py-12 border-t border-b border-[var(--blog-border)]"
    >
      <div className="max-w-xl mx-auto text-center">
        <h3
          className="text-lg font-bold text-[var(--blog-text)] mb-3 uppercase tracking-[0.15em]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Signup for Updates:
        </h3>

        <p
          className="text-[var(--blog-text-muted)] mb-8 leading-relaxed italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          I promise to only email you cool shit. Draft chapters, progress updates,
          sneak peaks at illustrations I'm working on. Stuff like that.
        </p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 border border-[var(--blog-accent)] rounded bg-[var(--blog-accent)]/5"
          >
            <span
              className="text-[var(--blog-accent)] text-sm"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ✓ You're on the list. Thanks!
            </span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 justify-center flex-wrap">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL"
              required
              className="px-4 py-3 bg-[var(--blog-bg)] border border-[var(--blog-border)] text-[var(--blog-text)] placeholder:text-[var(--blog-text-muted)] focus:outline-none focus:border-[var(--blog-accent)] transition-colors w-64 text-sm tracking-wider"
              style={{ fontFamily: "var(--font-mono)" }}
              disabled={status === "submitting"}
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="px-6 py-3 bg-[var(--blog-text)] text-[var(--blog-bg)] hover:bg-[var(--blog-accent)] hover:text-[var(--blog-bg)] transition-colors text-sm font-medium tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {status === "submitting" ? "JOINING..." : "JOIN MAILING LIST"}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
