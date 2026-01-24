"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function TerminalWindow({ title = "bash", children, className = "" }: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`terminal-window ${className}`}
    >
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="terminal-dot red" />
          <div className="terminal-dot yellow" />
          <div className="terminal-dot green" />
        </div>
        <div className="terminal-title">{title}</div>
        <div className="w-[52px]" /> {/* Spacer for symmetry */}
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </motion.div>
  );
}

// Command line components
export function Prompt({ children }: { children?: ReactNode }) {
  return (
    <span className="prompt">
      {children || "$ "}
    </span>
  );
}

export function Command({ children }: { children: ReactNode }) {
  return <span className="command">{children}</span>;
}

export function Flag({ children }: { children: ReactNode }) {
  return <span className="flag">{children}</span>;
}

export function StringVal({ children }: { children: ReactNode }) {
  return <span className="string">"{children}"</span>;
}

export function Comment({ children }: { children: ReactNode }) {
  return <span className="comment"># {children}</span>;
}

export function Output({ children }: { children: ReactNode }) {
  return <div className="output">{children}</div>;
}

export function Success({ children }: { children: ReactNode }) {
  return <span className="success">{children}</span>;
}

export function Cursor() {
  return <span className="cursor" />;
}

// JSON-like output
export function JsonOutput({ data }: { data: Record<string, unknown> }) {
  const renderValue = (value: unknown, indent: number = 0): ReactNode => {
    const spaces = "  ".repeat(indent);
    
    if (typeof value === "string") {
      return <span className="string">"{value}"</span>;
    }
    if (typeof value === "number" || typeof value === "boolean") {
      return <span className="value">{String(value)}</span>;
    }
    if (Array.isArray(value)) {
      return (
        <>
          <span className="bracket">[</span>
          {value.map((item, i) => (
            <span key={i}>
              {"\n" + spaces + "  "}
              {renderValue(item, indent + 1)}
              {i < value.length - 1 ? "," : ""}
            </span>
          ))}
          {"\n" + spaces}<span className="bracket">]</span>
        </>
      );
    }
    if (typeof value === "object" && value !== null) {
      const entries = Object.entries(value);
      return (
        <>
          <span className="bracket">{"{"}</span>
          {entries.map(([key, val], i) => (
            <span key={key}>
              {"\n" + spaces + "  "}
              <span className="key">"{key}"</span>
              <span className="output">: </span>
              {renderValue(val, indent + 1)}
              {i < entries.length - 1 ? "," : ""}
            </span>
          ))}
          {"\n" + spaces}<span className="bracket">{"}"}</span>
        </>
      );
    }
    return <span className="output">{String(value)}</span>;
  };

  return (
    <pre className="text-sm leading-relaxed">
      {renderValue(data)}
    </pre>
  );
}
