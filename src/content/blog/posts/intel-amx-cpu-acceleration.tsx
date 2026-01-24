export default function IntelAmxCpuAcceleration() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="mb-6 text-4xl text-[var(--blog-accent)] opacity-40"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {"[ ... ]"}
      </div>
      <h2
        className="text-xl font-bold text-[var(--blog-text)] mb-4 uppercase tracking-wider"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Work in Progress
      </h2>
      <p
        className="text-[var(--blog-text-muted)] max-w-md leading-relaxed"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        This entry is currently being written. Check back soon for insights on
        Intel AMX and CPU-based AI acceleration for ML inference.
      </p>
      <div
        className="mt-8 flex items-center gap-2 text-xs text-[var(--blog-text-muted)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span className="inline-block w-2 h-2 rounded-full bg-[var(--blog-accent)] animate-pulse" />
        DRAFTING...
      </div>
    </div>
  );
}
