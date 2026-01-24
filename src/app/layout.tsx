import type { Metadata } from "next";
import { Outfit, JetBrains_Mono, Fira_Code } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira",
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
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} ${firaCode.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
