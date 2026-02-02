"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { TerminalWindow, Prompt, Command, Flag, Cursor, Output } from "@/components/ui/TerminalWindow";
import { playKeySound, playReturnSound, playBootSound } from "@/lib/sounds";

const commands = [
  { prompt: "$ ", command: "whoami", output: "aryan.sakhala" },
  { prompt: "$ ", command: "cat", args: "role.txt", output: "Lead Software Engineer @ Metrum AI" },
  { prompt: "$ ", command: "echo", args: "$EXPERTISE", output: "RAG | LLM | Multi-Agent Systems | Dell | Intel" },
];

// Enhanced ASCII art with daemon-style visibility
const daemonAscii = `
 ██████╗ ██████╗ ██╗   ██╗ █████╗ ███╗   ██╗
██╔═══██╗██╔══██╗╚██╗ ██╔╝██╔══██╗████╗  ██║
███████║██████╔╝ ╚████╔╝ ███████║██╔██╗ ██║
██╔══██║██╔══██╗  ╚██╔╝  ██╔══██║██║╚██╗██║
██║  ██║██║  ██║   ██║   ██║  ██║██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝
                                            
███████╗ █████╗ ██╗  ██╗██╗  ██╗ █████╗ ██╗     █████╗ 
██╔════╝██╔══██╗██║ ██╔╝██║  ██║██╔══██╗██║    ██╔══██╗
███████╗███████║█████╔╝ ███████║███████║██║    ███████║
╚════██║██╔══██║██╔═██╗ ██╔══██║██╔══██║██║    ██╔══██║
███████║██║  ██║██║  ██╗██║  ██║██║  ██║███████╗██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝`;

// Fun easter egg facts
const easterEggs = [
  "// 3.5+ years building production AI systems",
  "// Contributed to systems used by 1000+ enterprises",
  "// Currently researching PPML @ UNB",
  "// vim > emacs (fight me)",
];

export function Hero({ onOpenResume }: { onOpenResume: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [easterEgg, setEasterEgg] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [typingText, setTypingText] = useState<Record<number, string>>({});
  const [soundEnabled, setSoundEnabled] = useState(false);
  const hasInteracted = useRef(false);

  // Enable sound after first user interaction (browser requirement)
  const enableSound = useCallback(() => {
    if (!hasInteracted.current) {
      hasInteracted.current = true;
      setSoundEnabled(true);
      playBootSound();
    }
  }, []);

  // Listen for first interaction
  useEffect(() => {
    const handleInteraction = () => enableSound();
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    window.addEventListener("touchstart", handleInteraction, { once: true });
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [enableSound]);

  // Typing effect with sound
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = "";
    
    const typeNextChar = () => {
      if (lineIndex >= commands.length) {
        setTypingComplete(true);
        return;
      }

      const cmd = commands[lineIndex];
      const fullText = cmd.command + (cmd.args ? " " + cmd.args : "");
      
      if (charIndex < fullText.length) {
        currentLine += fullText[charIndex];
        setTypingText(prev => ({ ...prev, [lineIndex]: currentLine }));
        
        // Play key sound
        if (soundEnabled) {
          playKeySound();
        }
        
        charIndex++;
        setTimeout(typeNextChar, 50 + Math.random() * 30); // Variable typing speed
      } else {
        // Line complete - play return sound and show output
        if (soundEnabled) {
          playReturnSound();
        }
        
        setVisibleLines(prev => prev + 1);
        lineIndex++;
        charIndex = 0;
        currentLine = "";
        
        if (lineIndex < commands.length) {
          setTimeout(typeNextChar, 600); // Pause between commands
        } else {
          setTypingComplete(true);
        }
      }
    };

    // Start typing after initial delay
    const startTimer = setTimeout(() => {
      typeNextChar();
    }, 1000);

    return () => clearTimeout(startTimer);
  }, [soundEnabled]);

  // Easter egg rotation
  useEffect(() => {
    const eggTimer = setInterval(() => {
      setEasterEgg((prev) => (prev + 1) % easterEggs.length);
    }, 4000);
    return () => clearInterval(eggTimer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--term-cyan)]/5 via-transparent to-[var(--term-bg)]" />

      {/* Floating daemon indicator */}
      <motion.div
        className="absolute top-8 left-8 flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-[var(--term-green)]"
          animate={{ 
            boxShadow: ["0 0 0 0 rgba(63, 185, 80, 0.5)", "0 0 0 8px rgba(63, 185, 80, 0)", "0 0 0 0 rgba(63, 185, 80, 0)"],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-xs text-[var(--term-green)]">PID: 31337</span>
        <span className="text-xs text-[var(--term-text-subtle)]">|</span>
        <span className="text-xs text-[var(--term-cyan)]">daemon active</span>
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Daemon-style ASCII Art Header - HIGHLY VISIBLE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 text-center"
        >
          {/* Mobile: Simple text */}
          <h1 className="sm:hidden text-4xl font-bold text-glow-cyan">
            <span className="text-[var(--term-cyan)]">ARYAN</span>{" "}
            <span className="text-[var(--term-green)]">SAKHALA</span>
          </h1>
          
          {/* Desktop: ASCII Art */}
          <motion.pre
            className="hidden sm:block text-[6px] md:text-[8px] lg:text-[10px] leading-[1.1] font-bold overflow-x-auto"
            style={{ 
              fontFamily: "monospace",
              letterSpacing: "-0.5px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {daemonAscii.split("\n").map((line, i) => (
              <motion.span
                key={i}
                className="block"
                style={{
                  background: "linear-gradient(90deg, var(--term-cyan), var(--term-green))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 30px rgba(88, 166, 255, 0.4), 0 0 60px rgba(63, 185, 80, 0.2)",
                  filter: "drop-shadow(0 0 2px rgba(88, 166, 255, 0.5))",
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {line}
              </motion.span>
            ))}
          </motion.pre>
          
          {/* Subtitle with typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4"
          >
            <span className="text-[var(--term-text-subtle)] text-sm sm:text-base">
              <span className="text-[var(--term-purple)]">const</span>{" "}
              <span className="text-[var(--term-cyan)]">role</span>{" "}
              <span className="text-[var(--term-text-subtle)]">=</span>{" "}
              <span className="text-[var(--term-orange)]">"Lead Software Engineer"</span>
              <span className="text-[var(--term-text-subtle)]">;</span>
            </span>
          </motion.div>
        </motion.div>

        {/* Main Terminal */}
        <TerminalWindow title="aryan@portfolio:~" className="glow-cyan">
          <div className="space-y-4">
            {/* Status line */}
            <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[var(--term-border)]">
              <span className="flex items-center gap-2">
                <motion.span 
                  className="w-2 h-2 rounded-full bg-[var(--term-green)]"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[var(--term-green)]">ONLINE</span>
              </span>
              <span className="text-[var(--term-text-subtle)]">|</span>
              <span className="text-[var(--term-text-muted)]">Available for opportunities</span>
              <span className="text-[var(--term-text-subtle)]">|</span>
              <button
                onClick={() => setShowSecret(!showSecret)}
                className="text-[var(--term-purple)] hover:text-[var(--term-pink)] transition-colors text-sm cursor-pointer"
              >
                [?]
              </button>
            </div>

            {/* Easter egg comment - rotating */}
            <motion.div
              key={easterEgg}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[var(--term-text-subtle)] text-sm italic"
            >
              {easterEggs[easterEgg]}
            </motion.div>

            {/* Command history with typing effect */}
            {commands.map((cmd, index) => {
              const isTyping = typingText[index] !== undefined && visibleLines === index;
              const isComplete = visibleLines > index;
              const currentTypedText = typingText[index] || "";
              
              if (!isTyping && !isComplete) return null;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <Prompt>{cmd.prompt}</Prompt>
                    {isComplete ? (
                      <>
                        <Command>{cmd.command}</Command>
                        {cmd.args && (
                          <>
                            {" "}
                            <Flag>{cmd.args}</Flag>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Command>
                          {currentTypedText.slice(0, cmd.command.length)}
                        </Command>
                        {currentTypedText.length > cmd.command.length && (
                          <>
                            {" "}
                            <Flag>{currentTypedText.slice(cmd.command.length + 1)}</Flag>
                          </>
                        )}
                        <span className="animate-pulse text-[var(--term-green)]">_</span>
                      </>
                    )}
                  </div>
                  {isComplete && <Output>{cmd.output}</Output>}
                </motion.div>
              );
            })}

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

            {/* Secret panel */}
            {showSecret && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 pt-4 border-t border-dashed border-[var(--term-pink)]/50"
              >
                <p className="text-[var(--term-pink)] text-sm mb-2">// Hidden achievements unlocked:</p>
                <ul className="text-sm space-y-1">
                  <li className="text-[var(--term-text-muted)]"><span className="text-[var(--term-green)]">+</span> Published in Springer LNNS</li>
                  <li className="text-[var(--term-text-muted)]"><span className="text-[var(--term-green)]">+</span> SuperCompute 2024 Demo Lead</li>
                  <li className="text-[var(--term-text-muted)]"><span className="text-[var(--term-green)]">+</span> Built systems for Fortune 500</li>
                  <li className="text-[var(--term-text-muted)]"><span className="text-[var(--term-green)]">+</span> Led 7-member dev team</li>
                </ul>
              </motion.div>
            )}
          </div>
        </TerminalWindow>

        {/* Action buttons as terminal commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          <button
            onClick={onOpenResume}
            className="group flex items-center gap-2 px-4 sm:px-6 py-3 bg-[var(--term-bg-surface)] border border-[var(--term-border)] rounded-lg hover:border-[var(--term-cyan)] hover:glow-cyan transition-all text-sm sm:text-base"
          >
            <span className="text-[var(--term-green)]">$</span>
            <span className="text-[var(--term-cyan)]">cat</span>
            <span className="text-[var(--term-text)]">resume.pdf</span>
          </button>

          <a
            href="mailto:ryansakhala@gmail.com"
            className="group flex items-center gap-2 px-4 sm:px-6 py-3 bg-[var(--term-bg-surface)] border border-[var(--term-border)] rounded-lg hover:border-[var(--term-green)] hover:glow-green transition-all text-sm sm:text-base"
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
            className="group flex items-center gap-2 px-4 sm:px-6 py-3 bg-[var(--term-bg-surface)] border border-[var(--term-border)] rounded-lg hover:border-[var(--term-purple)] transition-all text-sm sm:text-base"
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
          className="mt-12 sm:mt-16 text-center"
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
