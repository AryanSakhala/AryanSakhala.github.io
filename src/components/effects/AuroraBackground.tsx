"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--ctp-surface1) 1px, transparent 1px),
            linear-gradient(90deg, var(--ctp-surface1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Aurora blobs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
        style={{
          background: "radial-gradient(circle, var(--ctp-mauve) 0%, transparent 70%)",
          top: "-20%",
          left: "-10%",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-15"
        style={{
          background: "radial-gradient(circle, var(--ctp-blue) 0%, transparent 70%)",
          top: "30%",
          right: "-15%",
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, 40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
        style={{
          background: "radial-gradient(circle, var(--ctp-teal) 0%, transparent 70%)",
          bottom: "-10%",
          left: "20%",
        }}
        animate={{
          x: [0, 60, 30, 0],
          y: [0, -60, -30, 0],
          scale: [1, 1.2, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
        style={{
          background: "radial-gradient(circle, var(--ctp-pink) 0%, transparent 70%)",
          bottom: "20%",
          right: "10%",
        }}
        animate={{
          x: [0, -40, -20, 0],
          y: [0, 40, 20, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
