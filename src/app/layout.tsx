import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aryan Sakhala | Lead Software Engineer",
  description:
    "Lead Software Engineer specializing in AI/ML, RAG-based Agentic Workflows, and cutting-edge technology solutions.",
  keywords: [
    "Aryan Sakhala",
    "Software Engineer",
    "AI",
    "Machine Learning",
    "RAG",
    "LLM",
    "Full Stack Developer",
  ],
  authors: [{ name: "Aryan Sakhala" }],
  openGraph: {
    title: "Aryan Sakhala | Lead Software Engineer",
    description: "Lead Software Engineer specializing in AI/ML and RAG-based Agentic Workflows",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
