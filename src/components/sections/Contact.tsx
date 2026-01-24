"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, ExternalLink, Youtube, ArrowUpRight } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/AryanSakhala",
    handle: "@AryanSakhala",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/AryanSakhala",
    handle: "AryanSakhala",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:aryansakhala@gmail.com",
    handle: "aryansakhala@gmail.com",
  },
  {
    name: "PyPI",
    icon: ExternalLink,
    href: "https://pypi.org/user/AryanSakhala/",
    handle: "AryanSakhala",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://youtube.com/@aryansakhala3930",
    handle: "@aryansakhala3930",
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-[var(--warm-100)]" id="contact">
      <div className="container-narrow text-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-sm font-medium text-[var(--accent-500)] uppercase tracking-widest mb-4 block">
            Contact
          </span>
          <h2 className="text-[var(--warm-900)] mb-4">
            Let's Build Together
          </h2>
          <p className="text-[var(--warm-500)] text-lg mb-8">
            Open for collaborations, opportunities, and interesting conversations
            about AI, software, and innovation.
          </p>

          <a
            href="mailto:aryansakhala@gmail.com"
            className="btn btn-primary shadow-soft inline-flex"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
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
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[var(--warm-200)] hover:border-[var(--accent-300)] hover:bg-[var(--accent-50)] transition-all duration-200 group"
              >
                <Icon className="w-4 h-4 text-[var(--warm-500)] group-hover:text-[var(--accent-600)]" />
                <span className="text-sm text-[var(--warm-600)] group-hover:text-[var(--accent-600)]">
                  {link.name}
                </span>
                <ArrowUpRight className="w-3 h-3 text-[var(--warm-400)] group-hover:text-[var(--accent-500)]" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-[var(--warm-300)]"
        >
          <p className="text-sm text-[var(--warm-500)]">
            Designed & Built by Aryan Sakhala
          </p>
          <p className="text-xs text-[var(--warm-400)] mt-1">
            Next.js + Tailwind CSS + Framer Motion
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
