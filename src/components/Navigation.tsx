"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
  { label: "Blogs", href: "/blog" },
];

export function Navigation({ onOpenResume }: { onOpenResume: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Close mobile menu on resize
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
            ? "bg-[var(--warm-50)]/90 backdrop-blur-md border-b border-[var(--warm-200)] shadow-soft"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-semibold text-[var(--warm-800)] hover:text-[var(--accent-600)] transition-colors"
          >
            AS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm text-[var(--warm-600)] hover:text-[var(--accent-600)] transition-colors rounded-lg hover:bg-[var(--warm-100)]"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={onOpenResume}
              className="ml-2 px-4 py-2 text-sm font-medium text-white bg-[var(--accent-500)] rounded-lg hover:bg-[var(--accent-600)] transition-colors"
            >
              Resume
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--warm-100)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-[var(--warm-700)]" />
            ) : (
              <Menu className="w-5 h-5 text-[var(--warm-700)]" />
            )}
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
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[var(--warm-900)]/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 bottom-0 w-64 bg-[var(--warm-50)] border-l border-[var(--warm-200)] shadow-soft-lg p-6"
        >
          <div className="flex flex-col gap-2 mt-16">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-[var(--warm-700)] hover:text-[var(--accent-600)] hover:bg-[var(--warm-100)] rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenResume();
              }}
              className="mt-4 w-full py-3 text-center font-medium text-white bg-[var(--accent-500)] rounded-lg hover:bg-[var(--accent-600)] transition-colors"
            >
              Resume
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
