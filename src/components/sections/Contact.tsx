"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TerminalWindow } from "@/components/ui/TerminalWindow";

const contacts = [
  { protocol: "mailto", address: "aryansakhala@gmail.com", label: "Email" },
  { protocol: "https", address: "github.com/AryanSakhala", label: "GitHub" },
  { protocol: "https", address: "linkedin.com/in/AryanSakhala", label: "LinkedIn" },
  { protocol: "https", address: "pypi.org/user/AryanSakhala", label: "PyPI" },
  { protocol: "https", address: "youtube.com/@aryansakhala3930", label: "YouTube" },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section ref={ref} className="section-padding" id="contact">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <span className="text-[var(--term-text-subtle)] text-sm">// Contact</span>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-[var(--term-text)] mt-2">
            <span className="text-[var(--term-green)]">$</span> ping <span className="text-[var(--term-cyan)]">aryan.sakhala</span>
          </h2>
        </motion.div>

        {/* Terminal */}
        <TerminalWindow title="contact --list">
          <div className="space-y-4">
            {/* Ping header */}
            <div className="pb-4 border-b border-[var(--term-border)]">
              <div className="text-[var(--term-green)]">PING aryan.sakhala - Connection established</div>
              <div className="text-[var(--term-text-muted)]">Ready for incoming connections...</div>
            </div>

            {/* Contact list */}
            <div className="space-y-1 sm:space-y-2">
              {contacts.map((contact, index) => (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group"
                >
                  <a
                    href={contact.protocol === "mailto" ? `mailto:${contact.address}` : `https://${contact.address}`}
                    target={contact.protocol === "mailto" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex flex-wrap sm:flex-nowrap items-center gap-1 sm:gap-4 p-2 sm:p-3 rounded border border-transparent hover:border-[var(--term-border)] hover:bg-[var(--term-bg-surface)] transition-all"
                  >
                    <span className="text-[var(--term-purple)] text-xs sm:text-base w-10 sm:w-16">[{String(index).padStart(2, "0")}]</span>
                    <span className="text-[var(--term-yellow)] text-xs sm:text-base hidden sm:inline">{contact.protocol}://</span>
                    <span className="text-[var(--term-cyan)] flex-1 group-hover:underline text-xs sm:text-base break-all">{contact.address}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopy(contact.protocol === "mailto" ? contact.address : `https://${contact.address}`, index);
                      }}
                      className="text-[var(--term-text-subtle)] hover:text-[var(--term-green)] transition-colors text-xs sm:text-sm ml-auto sm:ml-0"
                    >
                      {copiedIndex === index ? (
                        <span className="text-[var(--term-green)]">✓</span>
                      ) : (
                        <span className="hidden sm:inline">[copy]</span>
                      )}
                      {copiedIndex !== index && <span className="sm:hidden">📋</span>}
                    </button>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[var(--term-border)] text-[var(--term-text-subtle)]">
              <span className="text-[var(--term-green)]">$</span> echo "Let's build something great together"
              <div className="text-[var(--term-text)] mt-1">Let's build something great together</div>
            </div>
          </div>
        </TerminalWindow>

        {/* Quick action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <a
            href="mailto:aryansakhala@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--term-green)]/10 border border-[var(--term-green)]/30 rounded-lg hover:bg-[var(--term-green)]/20 hover:border-[var(--term-green)]/50 transition-all text-[var(--term-green)]"
          >
            <span className="text-[var(--term-text-muted)]">$</span>
            <span>ssh aryan@collaborate</span>
            <span className="text-[var(--term-text-subtle)]">--now</span>
          </a>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 pt-8 border-t border-[var(--term-border)] text-center"
        >
          <div className="text-[var(--term-text-subtle)] text-sm">
            <span className="text-[var(--term-green)]">#</span> Built by Aryan Sakhala
          </div>
          <div className="text-[var(--term-text-subtle)] text-xs mt-1">
            Next.js + TypeScript + Tailwind + Framer Motion
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
