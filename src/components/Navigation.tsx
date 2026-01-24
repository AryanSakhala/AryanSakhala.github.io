"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navigation({
  onOpenResume,
}: {
  onOpenResume: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-gradient-to-r from-[var(--ctp-mauve)] via-[var(--ctp-blue)] to-[var(--ctp-teal)]"
        style={{
          scaleX: useTransform(
            useScroll().scrollYProgress,
            [0, 1],
            [0, 1]
          ),
          transformOrigin: "left",
        }}
      />

      {/* Desktop navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `rgba(30, 30, 46, ${v})`
          ),
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-[var(--ctp-text)] font-mono"
          >
            <span className="text-[var(--ctp-mauve)]">&lt;</span>
            AS
            <span className="text-[var(--ctp-mauve)]">/&gt;</span>
          </motion.a>

          {/* Desktop links */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-6"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-[var(--ctp-mauve)]"
                    : "text-[var(--ctp-subtext1)] hover:text-[var(--ctp-text)]"
                }`}
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={onOpenResume}
              size="sm"
              className="bg-[var(--ctp-mauve)] text-[var(--ctp-crust)] hover:bg-[var(--ctp-lavender)] transition-all duration-300"
            >
              Resume
            </Button>
          </motion.div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[var(--ctp-text)]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-[var(--ctp-surface1)]"
          >
            <div className="flex flex-col gap-4 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.href.slice(1)
                      ? "text-[var(--ctp-mauve)]"
                      : "text-[var(--ctp-subtext1)] hover:text-[var(--ctp-text)]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Button
                onClick={() => {
                  onOpenResume();
                  setIsOpen(false);
                }}
                size="sm"
                className="bg-[var(--ctp-mauve)] text-[var(--ctp-crust)] hover:bg-[var(--ctp-lavender)] transition-all duration-300 w-fit"
              >
                Resume
              </Button>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
