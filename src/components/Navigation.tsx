"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "about", href: "#about" },
  { label: "journey", href: "#journey" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
  { label: "blog", href: "/blog" },
];

export function Navigation({ onOpenResume }: { onOpenResume: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--term-bg)]/95 backdrop-blur-md border-b border-[var(--term-border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--term-text)] hover:text-[var(--term-green)] transition-colors"
          >
            <span className="text-[var(--term-green)]">~</span>
            <span>/aryan</span>
            <span className="text-[var(--term-text-subtle)]">$</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-2 text-sm transition-colors ${
                  item.label === "blog" 
                    ? "text-[var(--term-cyan)] border border-[var(--term-cyan)]/50 rounded hover:border-[var(--term-cyan)] hover:bg-[var(--term-cyan)]/10"
                    : "text-[var(--term-text-muted)] hover:text-[var(--term-cyan)]"
                }`}
              >
                <span className="text-[var(--term-text-subtle)]">./</span>
                {item.label}
              </Link>
            ))}
            <button
              onClick={onOpenResume}
              className="ml-4 px-4 py-2 text-sm text-[var(--term-bg)] bg-[var(--term-green)] rounded hover:bg-[var(--term-green)]/80 transition-colors"
            >
              resume.pdf
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[var(--term-text-muted)] hover:text-[var(--term-green)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-40 md:hidden"
      >
        <div
          className="absolute inset-0 bg-[var(--term-bg)]/90 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 bottom-0 w-64 bg-[var(--term-bg-elevated)] border-l border-[var(--term-border)] p-6"
        >
          <div className="flex flex-col gap-2 mt-16">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded transition-colors ${
                  item.label === "blog"
                    ? "text-[var(--term-cyan)] border border-[var(--term-cyan)]/50 hover:border-[var(--term-cyan)] hover:bg-[var(--term-cyan)]/10"
                    : "text-[var(--term-text-muted)] hover:text-[var(--term-cyan)] hover:bg-[var(--term-bg-surface)]"
                }`}
              >
                <span className="text-[var(--term-green)]">$</span> cd {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenResume();
              }}
              className="mt-4 w-full py-3 text-center text-[var(--term-bg)] bg-[var(--term-green)] rounded hover:bg-[var(--term-green)]/80 transition-colors"
            >
              cat resume.pdf
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
