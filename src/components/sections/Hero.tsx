"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, FileText, ExternalLink } from "lucide-react";

const roles = [
  "Lead Software Engineer",
  "AI/ML Architect",
  "RAG Systems Builder",
  "Full-Stack Developer",
];

export function Hero({ onOpenResume }: { onOpenResume: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Typing effect
  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl text-center"
      >
        {/* Terminal prompt */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="text-[var(--ctp-green)] font-mono text-sm">$</span>
          <span className="text-[var(--ctp-subtext1)] font-mono text-sm">
            whoami
          </span>
          <span className="text-[var(--ctp-mauve)] font-mono text-sm">
            --verbose
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
        >
          <span className="gradient-text">Aryan</span>{" "}
          <span className="text-[var(--ctp-text)]">Sakhala</span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          variants={itemVariants}
          className="h-12 flex items-center justify-center mb-8"
        >
          <span className="text-xl md:text-2xl font-mono text-[var(--ctp-subtext1)]">
            {">"} {displayText}
            <span className="animate-pulse text-[var(--ctp-green)]">_</span>
          </span>
        </motion.div>

        {/* Tags */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {["Dell", "Intel", "Springer", "Blockchain", "LLM"].map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-[var(--ctp-surface0)] text-[var(--ctp-text)] border border-[var(--ctp-surface2)] hover:border-[var(--ctp-mauve)] hover:bg-[var(--ctp-surface1)] transition-all duration-300 px-4 py-1.5 text-sm"
            >
              {tag}
            </Badge>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button
            onClick={onOpenResume}
            className="bg-[var(--ctp-mauve)] text-[var(--ctp-crust)] hover:bg-[var(--ctp-lavender)] transition-all duration-300 gap-2 px-6 py-5 text-base font-semibold"
          >
            <FileText className="w-4 h-4" />
            View Resume
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-[var(--ctp-surface2)] text-[var(--ctp-text)] hover:bg-[var(--ctp-surface0)] hover:border-[var(--ctp-mauve)] transition-all duration-300 gap-2 px-6 py-5 text-base"
          >
            <a
              href="mailto:aryansakhala@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </a>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4 mt-10"
        >
          {[
            { icon: Github, href: "https://github.com/AryanSakhala", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/AryanSakhala", label: "LinkedIn" },
            { icon: ExternalLink, href: "https://pypi.org/user/AryanSakhala/", label: "PyPI" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl glass glass-hover transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-5 h-5 text-[var(--ctp-subtext1)] hover:text-[var(--ctp-mauve)]" />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs font-mono text-[var(--ctp-overlay0)]">
              scroll
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-[var(--ctp-overlay0)] flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-[var(--ctp-mauve)]"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
