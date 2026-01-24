"use client";

import { Crimson_Pro, JetBrains_Mono } from "next/font/google";

// Serif font for body text (editorial style)
const crimsonPro = Crimson_Pro({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

// Monospace for headings and labels
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${crimsonPro.variable} ${jetbrainsMono.variable} blog-theme`}>
      <style jsx global>{`
        .blog-theme {
          --blog-bg: #FAF9F6;
          --blog-bg-alt: #F0EDE6;
          --blog-text: #1a1a2e;
          --blog-text-muted: #4a4a5a;
          --blog-accent: #4361EE;
          --blog-accent-light: #6B7FFF;
          --blog-border: #D4D0C8;
          --blog-code-bg: #EDEAE3;
        }

        .blog-theme {
          background: var(--blog-bg);
          color: var(--blog-text);
          min-height: 100vh;
          font-family: var(--font-serif), Georgia, 'Times New Roman', serif;
        }

        .blog-theme h1,
        .blog-theme h2,
        .blog-theme h3,
        .blog-theme h4,
        .blog-theme h5,
        .blog-theme h6 {
          font-family: var(--font-mono), 'Courier New', monospace;
          letter-spacing: 0.05em;
        }

        .blog-theme code,
        .blog-theme pre {
          font-family: var(--font-mono), 'Courier New', monospace;
        }

        .blog-theme ::selection {
          background: var(--blog-accent);
          color: white;
        }

        .blog-theme ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .blog-theme ::-webkit-scrollbar-track {
          background: var(--blog-bg-alt);
        }

        .blog-theme ::-webkit-scrollbar-thumb {
          background: var(--blog-border);
          border-radius: 4px;
        }

        .blog-theme ::-webkit-scrollbar-thumb:hover {
          background: var(--blog-text-muted);
        }
      `}</style>
      {children}
    </div>
  );
}
