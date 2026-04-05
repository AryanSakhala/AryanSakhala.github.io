"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

// Neural network / AI-themed geometric background
export function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    const colors = [
      "rgba(203, 166, 247, 0.6)", // mauve
      "rgba(137, 180, 250, 0.6)", // blue
      "rgba(148, 226, 213, 0.5)", // teal
      "rgba(245, 194, 231, 0.4)", // pink
      "rgba(166, 227, 161, 0.4)", // green
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      const nodeCount = Math.min(40, Math.floor((canvas.width * canvas.height) / 25000));
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = "rgba(30, 30, 46, 0.02)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200) {
            const opacity = (1 - dist / 200) * 0.15;
            ctx.strokeStyle = `rgba(203, 166, 247, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      nodes.forEach((node) => {
        // Draw glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, "transparent");
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw node
        ctx.beginPath();
        ctx.fillStyle = node.color;
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Canvas for neural network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
      />

      {/* Coordinate grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--ctp-mauve) 1px, transparent 1px),
            linear-gradient(90deg, var(--ctp-mauve) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Floating coordinate labels */}
      <motion.div
        className="absolute top-20 left-8 text-xs font-mono text-[var(--ctp-overlay0)] opacity-30"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        x: 0, y: 0
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-8 text-xs font-mono text-[var(--ctp-overlay0)] opacity-30"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        NEURAL_NET.active
      </motion.div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--ctp-base)] via-transparent to-[var(--ctp-base)] opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--ctp-base)] via-transparent to-[var(--ctp-base)] opacity-40" />

      {/* Accent glow orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
        style={{
          background: "radial-gradient(circle, var(--ctp-mauve) 0%, transparent 70%)",
          top: "-10%",
          left: "-5%",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
        style={{
          background: "radial-gradient(circle, var(--ctp-blue) 0%, transparent 70%)",
          bottom: "10%",
          right: "-5%",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
        style={{
          background: "radial-gradient(circle, var(--ctp-teal) 0%, transparent 70%)",
          top: "50%",
          left: "30%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
}
