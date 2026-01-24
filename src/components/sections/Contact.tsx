"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, ExternalLink, Youtube, Send } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/AryanSakhala",
    color: "var(--ctp-text)",
    handle: "@AryanSakhala",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/AryanSakhala",
    color: "var(--ctp-blue)",
    handle: "AryanSakhala",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:aryansakhala@gmail.com",
    color: "var(--ctp-red)",
    handle: "aryansakhala@gmail.com",
  },
  {
    name: "PyPI",
    icon: ExternalLink,
    href: "https://pypi.org/user/AryanSakhala/",
    color: "var(--ctp-peach)",
    handle: "AryanSakhala",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@aryansakhala3930?si=JXhkkPE3LLON0EVE",
    color: "var(--ctp-maroon)",
    handle: "@aryansakhala3930",
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section ref={ref} className="py-24 px-6" id="contact">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-[var(--ctp-surface2)] text-[var(--ctp-subtext0)]"
          >
            <span className="text-[var(--ctp-mauve)] mr-2">//</span>
            connect.ts
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Let&apos;s Build Together
          </h2>
          <p className="text-[var(--ctp-subtext1)] max-w-xl mx-auto text-lg">
            Open for collaborations, opportunities, and interesting conversations
            about AI, software, and innovation.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <Button
            asChild
            size="lg"
            className="bg-[var(--ctp-mauve)] text-[var(--ctp-crust)] hover:bg-[var(--ctp-lavender)] transition-all duration-300 gap-2 px-8 py-6 text-lg font-semibold"
          >
            <a href="mailto:aryansakhala@gmail.com">
              <Send className="w-5 h-5" />
              Start a Conversation
            </a>
          </Button>
        </motion.div>

        {/* Social links grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="p-5 rounded-xl bg-[var(--ctp-surface0)]/50 border border-[var(--ctp-surface1)] hover:border-[var(--ctp-surface2)] transition-all duration-300 group flex items-center gap-4"
              >
                <div
                  className="p-3 rounded-xl transition-all duration-300"
                  style={{
                    background: `${link.color}15`,
                    border: `1px solid ${link.color}25`,
                  }}
                >
                  <Icon
                    className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: link.color }}
                  />
                </div>
                <div>
                  <div className="font-semibold text-[var(--ctp-text)] group-hover:text-[var(--ctp-mauve)] transition-colors">
                    {link.name}
                  </div>
                  <div className="text-sm text-[var(--ctp-subtext0)] font-mono truncate">
                    {link.handle}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-[var(--ctp-surface1)] text-center"
        >
          <p className="text-[var(--ctp-subtext0)] text-sm font-mono">
            <span className="text-[var(--ctp-green)]">&gt;</span> Designed &
            Built by{" "}
            <span className="text-[var(--ctp-mauve)]">Aryan Sakhala</span>
          </p>
          <p className="text-[var(--ctp-overlay0)] text-xs mt-2 font-mono">
            React + Next.js + Tailwind + shadcn/ui + Framer Motion
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
