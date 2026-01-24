"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { Mail, Github, Linkedin, FileText, ArrowDown, Sparkles } from "lucide-react";
import { playHoverSound } from "@/lib/sounds";

const roles = [
  "Lead Software Engineer",
  "AI/ML Architect", 
  "RAG Systems Builder",
  "Full-Stack Developer",
];

const techStack = [
  { name: "Dell", color: "#007DB8" },
  { name: "Intel", color: "#0071C5" },
  { name: "Springer", color: "#1D4289" },
  { name: "LLM", color: "#10B981" },
  { name: "RAG", color: "#8B5CF6" },
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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Typing effect
  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2500);
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
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity, scale }}
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(203,166,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(203,166,247,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ctp-surface0)]/60 border border-[var(--ctp-surface2)]/50 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ctp-green)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ctp-green)]" />
          </span>
          <span className="text-sm font-medium text-[var(--ctp-subtext1)]">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name with refined typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
            <span className="inline-block bg-gradient-to-r from-[var(--ctp-mauve)] via-[var(--ctp-blue)] to-[var(--ctp-sapphire)] bg-clip-text text-transparent">
              Aryan
            </span>
            <br className="md:hidden" />
            <span className="text-[var(--ctp-text)]"> Sakhala</span>
          </h1>
        </motion.div>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="h-10 md:h-12 flex items-center justify-center mb-8"
        >
          <div className="flex items-center gap-2 text-lg md:text-2xl font-mono">
            <Sparkles className="w-5 h-5 text-[var(--ctp-yellow)]" />
            <span className="text-[var(--ctp-subtext1)]">{displayText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="w-[3px] h-6 bg-[var(--ctp-mauve)]"
            />
          </div>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              onMouseEnter={() => playHoverSound()}
            >
              <Badge
                variant="outline"
                className="px-4 py-1.5 text-sm font-medium border-[var(--ctp-surface2)] hover:border-[var(--ctp-mauve)] bg-[var(--ctp-surface0)]/40 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-default"
                style={{
                  borderColor: `${tech.color}40`,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: tech.color }}
                />
                {tech.name}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <InteractiveButton
            onClick={onOpenResume}
            className="bg-[var(--ctp-mauve)] text-[var(--ctp-crust)] hover:bg-[var(--ctp-lavender)] px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-[var(--ctp-mauve)]/20"
          >
            <FileText className="w-5 h-5 mr-2" />
            View Resume
          </InteractiveButton>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button
              variant="outline"
              asChild
              className="border-[var(--ctp-surface2)] hover:border-[var(--ctp-mauve)] px-8 py-6 text-base rounded-xl bg-[var(--ctp-surface0)]/40 backdrop-blur-sm"
            >
              <a href="mailto:aryansakhala@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex justify-center gap-3"
        >
          {[
            { icon: Github, href: "https://github.com/AryanSakhala", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/AryanSakhala", label: "LinkedIn" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => playHoverSound()}
              className="p-3 rounded-xl bg-[var(--ctp-surface0)]/50 border border-[var(--ctp-surface1)] hover:border-[var(--ctp-mauve)] backdrop-blur-sm transition-colors duration-300"
              aria-label={label}
            >
              <Icon className="w-5 h-5 text-[var(--ctp-subtext1)] hover:text-[var(--ctp-text)]" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

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
          className="flex flex-col items-center gap-2 text-[var(--ctp-overlay0)]"
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
