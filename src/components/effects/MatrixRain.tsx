"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
  className?: string;
  opacity?: number;
}

export function MatrixRain({ className = "", opacity = 0.4 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let columns: number[];

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const columnCount = Math.ceil(canvas.width / fontSize);
      columns = new Array(columnCount).fill(0);
    };

    const draw = () => {
      ctx.fillStyle = `rgba(17, 17, 27, 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      columns.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;

        // Head character (bright green)
        ctx.fillStyle = "#a6e3a1";
        ctx.fillText(char, x, y);

        // Trail characters (dimmer)
        if (Math.random() > 0.98) {
          ctx.fillStyle = "rgba(166, 227, 161, 0.3)";
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize);
        }

        // Reset column or advance
        if (y > canvas.height && Math.random() > 0.975) {
          columns[i] = 0;
        } else {
          columns[i] = y + fontSize;
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity }}
    />
  );
}
