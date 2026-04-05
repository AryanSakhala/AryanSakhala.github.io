import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Clean sans-serif font for blog content - raylib-inspired clean style
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aryansakhala.netlify.app"),
  title: {
    default: "Aryan Sakhala | AI/ML Engineer & RAG Specialist | Dell & Intel",
    template: "%s | Aryan Sakhala",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  description:
    "Aryan Sakhala - Lead Software Engineer specializing in RAG-based Agentic AI Workflows, LLM Systems, Multi-Agent Architecture. Working with Dell Technologies & Intel. Expert in Python, PyTorch, LangChain, FastAPI. Building production AI systems at scale.",
  keywords: [
    "Aryan Sakhala",
    "Lead Software Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "RAG Systems",
    "Retrieval Augmented Generation",
    "LLM Engineer",
    "Large Language Models",
    "Multi-Agent Systems",
    "Dell Technologies",
    "Intel",
    "Intel AMX",
    "Python Developer",
    "PyTorch",
    "TensorFlow",
    "LangChain",
    "LlamaIndex",
    "Vector Databases",
    "FastAPI",
    "Full Stack Developer",
    "AI/ML Portfolio",
    "Software Engineer India",
    "Metrum AI",
    "SuperCompute SC24",
    "PPML Research",
    "Privacy Preserving Machine Learning",
  ],
  authors: [{ name: "Aryan Sakhala", url: "https://github.com/AryanSakhala" }],
  creator: "Aryan Sakhala",
  publisher: "Aryan Sakhala",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aryansakhala.netlify.app",
    siteName: "Aryan Sakhala Portfolio",
    title: "Aryan Sakhala | AI/ML Engineer & RAG Specialist",
    description:
      "Lead Software Engineer building RAG-based AI systems for Dell & Intel. Expert in LLM, Multi-Agent workflows, Python, and production ML infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aryan Sakhala - AI/ML Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Sakhala | AI/ML Engineer & RAG Specialist",
    description:
      "Lead Software Engineer building RAG-based AI systems for Dell & Intel. Expert in LLM, Multi-Agent workflows, and production ML.",
    images: ["/og-image.png"],
    creator: "@aryansakhala",
  },
  alternates: {
    canonical: "https://aryansakhala.netlify.app",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetbrainsMono.variable} ${inter.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
