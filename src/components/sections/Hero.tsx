"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TerminalWindow, Prompt, Command, Flag, StringVal, Cursor, Output, Success } from "@/components/ui/TerminalWindow";

const commands = [
  { prompt: "$ ", command: "whoami", output: "aryan.sakhala" },
  { prompt: "$ ", command: "cat", args: "role.txt", output: "Lead Software Engineer @ Metrum AI" },
  { prompt: "$ ", command: "echo", args: "$EXPERTISE", output: "RAG | LLM | Multi-Agent Systems | Dell | Intel" },
];

export function Hero({ onOpenResume }: { onOpenResume: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= commands.length) {
          clearInterval(timer);
          setTypingComplete(true);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden grid-bg">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--term-bg)]/50 to-[var(--term-bg)]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* ASCII Art Header */}
        <motion.pre
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="text-[var(--term-green)] text-[8px] sm:text-[10px] leading-tight mb-8 text-center hidden sm:block"
        >
{`
    _                            ____        _    _           _       
   / \\   _ __ _   _  __ _ _ __  / ___|  __ _| | _| |__   __ _| | __ _ 
  / _ \\ | '__| | | |/ _\` | '_ \\ \\___ \\ / _\` | |/ / '_ \\ / _\` | |/ _\` |
 / ___ \\| |  | |_| | (_| | | | | ___) | (_| |   <| | | | (_| | | (_| |
/_/   \\_\\_|   \\__, |\\__,_|_| |_||____/ \\__,_|_|\\_\\_| |_|\\__,_|_|\\__,_|
              |___/                                                    
`}
        </motion.pre>

        {/* Main Terminal */}
        <TerminalWindow title="aryan@portfolio:~" className="glow-cyan">
          <div className="space-y-4">
            {/* Status line */}
            <div className="flex items-center gap-2 pb-4 border-b border-[var(--term-border)]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--term-green)] animate-pulse" />
                <span className="text-[var(--term-green)]">ONLINE</span>
              </span>
              <span className="text-[var(--term-text-subtle)]">|</span>
              <span className="text-[var(--term-text-muted)]">Available for opportunities</span>
            </div>

            {/* Command history */}
            {commands.slice(0, visibleLines).map((cmd, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <Prompt>{cmd.prompt}</Prompt>
                  <Command>{cmd.command}</Command>
                  {cmd.args && (
                    <>
                      {" "}
                      <Flag>{cmd.args}</Flag>
                    </>
                  )}
                </div>
                <Output>{cmd.output}</Output>
              </motion.div>
            ))}

            {/* Current prompt with cursor */}
            {typingComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Prompt>$ </Prompt>
                <Cursor />
              </motion.div>
            )}
          </div>
        </TerminalWindow>

        {/* Action buttons as terminal commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={onOpenResume}
            className="group flex items-center gap-2 px-6 py-3 bg-[var(--term-bg-surface)] border border-[var(--term-border)] rounded-lg hover:border-[var(--term-cyan)] hover:glow-cyan transition-all"
          >
            <span className="text-[var(--term-green)]">$</span>
            <span className="text-[var(--term-cyan)]">cat</span>
            <span className="text-[var(--term-text)]">resume.pdf</span>
          </button>

          <a
            href="mailto:aryansakhala@gmail.com"
            className="group flex items-center gap-2 px-6 py-3 bg-[var(--term-bg-surface)] border border-[var(--term-border)] rounded-lg hover:border-[var(--term-green)] hover:glow-green transition-all"
          >
            <span className="text-[var(--term-green)]">$</span>
            <span className="text-[var(--term-cyan)]">mail</span>
            <span className="text-[var(--term-orange)]">-s</span>
            <span className="text-[var(--term-text)]">"Hello"</span>
          </a>

          <a
            href="https://github.com/AryanSakhala"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 bg-[var(--term-bg-surface)] border border-[var(--term-border)] rounded-lg hover:border-[var(--term-purple)] transition-all"
          >
            <span className="text-[var(--term-green)]">$</span>
            <span className="text-[var(--term-cyan)]">git</span>
            <span className="text-[var(--term-text)]">clone</span>
            <span className="text-[var(--term-purple)]">@AryanSakhala</span>
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-16 text-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[var(--term-text-subtle)] text-sm"
          >
            <span className="text-[var(--term-green)]">$</span> scroll <span className="text-[var(--term-yellow)]">--down</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
