"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDown, Mail, Github, Linkedin } from "lucide-react";

const roles = [
  "Lead Software Engineer",
  "AI/ML Architect",
  "RAG Systems Builder",
];

export function Hero({ onOpenResume }: { onOpenResume: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const [currentRole, setCurrentRole] = useState(0);

  // Simple role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--warm-100)] via-[var(--warm-50)] to-[var(--warm-50)]" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--warm-400) 1px, transparent 1px),
            linear-gradient(90deg, var(--warm-400) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--warm-100)] border border-[var(--warm-300)] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success)]" />
          </span>
          <span className="text-sm text-[var(--warm-600)]">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--warm-900)] mb-6 tracking-tight"
        >
          Aryan Sakhala
        </motion.h1>

        {/* Role with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-10 mb-8 overflow-hidden"
        >
          <motion.p
            key={currentRole}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xl md:text-2xl text-[var(--warm-600)] font-medium"
          >
            {roles[currentRole]}
          </motion.p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-[var(--warm-500)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building production AI systems at Dell & Intel. 
          Specializing in RAG-based agentic workflows, LLM orchestration, 
          and scalable ML infrastructure.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={onOpenResume}
            className="btn btn-primary shadow-soft"
          >
            View Resume
          </button>
          <a
            href="mailto:aryansakhala@gmail.com"
            className="btn btn-secondary"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-4"
        >
          {[
            { icon: Github, href: "https://github.com/AryanSakhala", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/AryanSakhala", label: "LinkedIn" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[var(--warm-100)] border border-[var(--warm-300)] hover:border-[var(--accent-400)] hover:bg-[var(--accent-50)] transition-all duration-200"
              aria-label={label}
            >
              <Icon className="w-5 h-5 text-[var(--warm-600)]" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[var(--warm-400)]"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
