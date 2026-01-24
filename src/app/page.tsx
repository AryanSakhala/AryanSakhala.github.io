"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { ResumeModal } from "@/components/sections/ResumeModal";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--term-bg)]">
      {/* Navigation */}
      <Navigation onOpenResume={() => setIsResumeOpen(true)} />

      {/* Page sections */}
      <Hero onOpenResume={() => setIsResumeOpen(true)} />
      <About />
      <Journey />
      <Skills />
      <Contact />

      {/* Resume modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </main>
  );
}
