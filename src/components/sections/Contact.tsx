"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, ExternalLink, Youtube, ArrowUpRight } from "lucide-react";
import { playHoverSound } from "@/lib/sounds";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/AryanSakhala",
    handle: "@AryanSakhala",
    description: "Open source projects & contributions",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/AryanSakhala",
    handle: "AryanSakhala",
    description: "Professional network & updates",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:aryansakhala@gmail.com",
    handle: "aryansakhala@gmail.com",
    description: "Direct contact for opportunities",
  },
  {
    name: "PyPI",
    icon: ExternalLink,
    href: "https://pypi.org/user/AryanSakhala/",
    handle: "AryanSakhala",
    description: "Python packages & libraries",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@aryansakhala3930?si=JXhkkPE3LLON0EVE",
    handle: "@aryansakhala3930",
    description: "Tech tutorials & demos",
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 relative" id="contact">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ctp-crust)] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-sm font-mono text-[var(--ctp-pink)] uppercase tracking-[0.2em] mb-4"
          >
            Contact
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-[var(--ctp-text)]">Let&apos;s Build</span>
            <br />
            <span className="bg-gradient-to-r from-[var(--ctp-pink)] to-[var(--ctp-mauve)] bg-clip-text text-transparent">
              Something Great
            </span>
          </h2>

          <p className="text-lg text-[var(--ctp-subtext0)] max-w-xl mx-auto mb-10">
            Open for collaborations, opportunities, and conversations
            about AI, software, and innovation.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button
              asChild
              className="bg-gradient-to-r from-[var(--ctp-mauve)] to-[var(--ctp-pink)] text-[var(--ctp-crust)] px-10 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-[var(--ctp-mauve)]/20 hover:shadow-xl hover:shadow-[var(--ctp-mauve)]/30 transition-shadow"
            >
              <a href="mailto:aryansakhala@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => playHoverSound()}
                className="group p-5 rounded-xl bg-[var(--ctp-surface0)]/30 border border-[var(--ctp-surface1)]/50 hover:border-[var(--ctp-surface2)] backdrop-blur-sm transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-lg bg-[var(--ctp-surface1)]/50 group-hover:bg-[var(--ctp-surface1)] transition-colors">
                    <Icon className="w-5 h-5 text-[var(--ctp-subtext1)] group-hover:text-[var(--ctp-mauve)] transition-colors" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--ctp-overlay0)] group-hover:text-[var(--ctp-mauve)] transition-colors" />
                </div>

                <h3 className="font-semibold text-[var(--ctp-text)] group-hover:text-[var(--ctp-mauve)] transition-colors mb-1">
                  {link.name}
                </h3>
                <p className="text-xs text-[var(--ctp-subtext0)] mb-2">
                  {link.description}
                </p>
                <p className="text-xs font-mono text-[var(--ctp-overlay0)] truncate">
                  {link.handle}
                </p>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-[var(--ctp-surface1)]/50 text-center"
        >
          <p className="text-[var(--ctp-subtext0)] text-sm mb-2">
            Designed & Built by{" "}
            <span className="text-[var(--ctp-text)] font-medium">
              Aryan Sakhala
            </span>
          </p>
          <p className="text-[var(--ctp-overlay0)] text-xs font-mono">
            Next.js + Tailwind CSS + shadcn/ui + Framer Motion
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
