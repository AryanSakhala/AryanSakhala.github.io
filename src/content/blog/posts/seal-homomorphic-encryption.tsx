"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// ============================================================================
// SECTION HEADER COMPONENT
// ============================================================================
function SectionHeader({ title, type }: { title: string; type: "layman" | "technical" | "code" }) {
  const colors = {
    layman: { bg: "bg-[#58A6FF]/10", border: "border-[#58A6FF]", text: "text-[#58A6FF]" },
    technical: { bg: "bg-[#3FB950]/10", border: "border-[#3FB950]", text: "text-[#3FB950]" },
    code: { bg: "bg-[#F0883E]/10", border: "border-[#F0883E]", text: "text-[#F0883E]" },
  };
  const labels = {
    layman: "// LAYMAN UNDERSTANDING",
    technical: "// TECHNICAL DEEP DIVE",
    code: "// CODE-LEVEL EXPLANATION",
  };

  return (
    <div className={`my-8 py-3 px-4 rounded-lg border-l-4 ${colors[type].bg} ${colors[type].border}`}>
      <span className={`text-xs font-mono uppercase tracking-wider ${colors[type].text}`}>
        {labels[type]}
      </span>
      <h3 className="text-lg font-bold text-[#E6EDF3] mt-1">{title}</h3>
    </div>
  );
}

function IllustrationLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-6">
      <span className="text-xs text-[#A371F7] uppercase tracking-[0.15em] font-mono">
        Illustration
      </span>
      <p className="text-sm text-[#8B949E] mt-1">{children}</p>
    </div>
  );
}

// ============================================================================
// TABLE OF CONTENTS
// ============================================================================
function TableOfContents() {
  const topics = [
    { num: "01", id: "what-is-he", title: "What is Homomorphic Encryption?", desc: "Computing on encrypted data" },
    { num: "02", id: "ring-lwe", title: "Ring-LWE: The Security Foundation", desc: "Why it's hard to break" },
    { num: "03", id: "seal-parameters", title: "SEAL Parameters Explained", desc: "poly_modulus, coeff_modulus, plain_modulus" },
    { num: "04", id: "plaintext-vs-modulus", title: "Plaintext vs Plain Modulus", desc: "The data vs the container" },
    { num: "05", id: "rt-vs-rq", title: "R_t vs R_q: Two Different Spaces", desc: "Plaintext space vs ciphertext space" },
    { num: "06", id: "scale-factor", title: "Scale Factor (CKKS)", desc: "Converting reals to integers" },
    { num: "07", id: "bfv-vs-ckks", title: "BFV vs CKKS Schemes", desc: "Exact integers vs approximate reals" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="my-10 p-6 bg-[#161B22] rounded-lg border border-[#30363D]">
      <div className="text-xs text-[#58A6FF] font-mono uppercase tracking-wider mb-4">
        What We'll Cover
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <button
            key={topic.num}
            onClick={() => scrollToSection(topic.id)}
            className="flex gap-3 items-start text-left hover:bg-[#21262D] p-2 rounded-lg transition-colors cursor-pointer group"
          >
            <span className="text-[#58A6FF] font-mono text-sm group-hover:text-[#79C0FF]">{topic.num}</span>
            <div>
              <p className="text-sm text-[#E6EDF3] font-medium group-hover:text-[#58A6FF] transition-colors">{topic.title}</p>
              <p className="text-xs text-[#8B949E]">{topic.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// ILLUSTRATION: Locked Diary Analogy
// ============================================================================
function LockedDiaryAnimation() {
  const [mode, setMode] = useState<"regular" | "homomorphic">("regular");

  useEffect(() => {
    const timer = setInterval(() => {
      setMode((prev) => (prev === "regular" ? "homomorphic" : "regular"));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        Regular encryption vs Homomorphic encryption
      </IllustrationLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Regular Encryption */}
        <motion.div
          animate={{ opacity: mode === "regular" ? 1 : 0.4 }}
          className="p-5 bg-[#161B22] rounded-lg border border-[#30363D]"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔐</span>
            <span className="text-sm font-mono text-[#E6EDF3]">Regular Encryption</span>
          </div>
          <div className="space-y-3">
            {["Unlock diary (decrypt)", "Do the math", "Lock again (encrypt)"].map((step, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: mode === "regular" ? [0.3, 1, 0.3] : 0.3,
                  x: mode === "regular" ? [0, 5, 0] : 0,
                }}
                transition={{ delay: i * 0.5, duration: 1.5, repeat: mode === "regular" ? Infinity : 0 }}
                className="text-xs text-[#8B949E] flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-[#F85149]/20 text-[#F85149] flex items-center justify-center text-[10px]">{i + 1}</span>
                {step}
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#F85149]">Data exposed while computing</p>
        </motion.div>

        {/* Homomorphic Encryption */}
        <motion.div
          animate={{ 
            opacity: mode === "homomorphic" ? 1 : 0.4,
            borderColor: mode === "homomorphic" ? "#3FB950" : "#30363D"
          }}
          className="p-5 bg-[#161B22] rounded-lg border-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔒</span>
            <span className="text-sm font-mono text-[#E6EDF3]">Homomorphic Encryption</span>
          </div>
          <motion.div
            animate={{
              scale: mode === "homomorphic" ? [1, 1.02, 1] : 1,
              boxShadow: mode === "homomorphic" ? "0 0 20px rgba(63, 185, 80, 0.2)" : "none",
            }}
            transition={{ duration: 1.5, repeat: mode === "homomorphic" ? Infinity : 0 }}
            className="p-4 bg-[#3FB950]/10 rounded-lg text-center border border-[#3FB950]/30"
          >
            <p className="text-sm text-[#3FB950]">Compute while locked!</p>
            <p className="text-xs text-[#8B949E] mt-2">5 + 3 = 8 (all encrypted)</p>
          </motion.div>
          <p className="mt-4 text-xs text-[#3FB950]">Data never exposed</p>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// ILLUSTRATION: LWE Problem
// ============================================================================
function LWEProblemAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        The LWE Problem: Given A and b, find s (it's hard!)
      </IllustrationLabel>

      <div className="max-w-md mx-auto space-y-4">
        <motion.div
          animate={{ opacity: step >= 0 ? 1 : 0.3, scale: step === 0 ? 1.02 : 1 }}
          className="p-4 bg-[#161B22] rounded-lg border border-[#58A6FF]/30"
        >
          <span className="text-xs text-[#58A6FF] font-mono">PUBLIC: Matrix A</span>
          <div className="font-mono text-sm text-[#E6EDF3] mt-2">A = [3, 5, 2]</div>
        </motion.div>

        <motion.div
          animate={{ opacity: step >= 1 ? 1 : 0.3, scale: step === 1 ? 1.02 : 1 }}
          className="p-4 bg-[#161B22] rounded-lg border border-[#F85149]/30"
        >
          <span className="text-xs text-[#F85149] font-mono">SECRET: Vector s (hidden!)</span>
          <div className="font-mono text-sm text-[#8B949E] mt-2">s = [?, ?, ?]</div>
        </motion.div>

        <motion.div
          animate={{ opacity: step >= 2 ? 1 : 0.3, scale: step === 2 ? 1.02 : 1 }}
          className="p-4 bg-[#161B22] rounded-lg border border-[#F0883E]/30"
        >
          <span className="text-xs text-[#F0883E] font-mono">SECRET: Small error e (hidden!)</span>
          <div className="font-mono text-sm text-[#8B949E] mt-2">e = small random noise</div>
        </motion.div>

        <motion.div
          animate={{ opacity: step >= 3 ? 1 : 0.3, scale: step === 3 ? 1.02 : 1 }}
          className="p-4 bg-[#161B22] rounded-lg border border-[#3FB950]/30"
        >
          <span className="text-xs text-[#3FB950] font-mono">PUBLIC: b = As + e mod q</span>
          <div className="font-mono text-sm text-[#E6EDF3] mt-2">b = [5, 1, 0]</div>
        </motion.div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#E6EDF3]">
          Challenge: Given A and b, find s
        </p>
        <p className="text-xs text-[#F85149] mt-1">
          The noise e makes this computationally hard!
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// ILLUSTRATION: Polynomial Ring
// ============================================================================
function PolynomialRingAnimation() {
  const [showReduction, setShowReduction] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowReduction((prev) => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        Polynomial reduction: X^N becomes -1
      </IllustrationLabel>

      <div className="max-w-lg mx-auto">
        <div className="p-4 bg-[#161B22] rounded-lg mb-4">
          <span className="text-xs text-[#8B949E] font-mono">Given: N = 4, so X^4 + 1 = 0</span>
          <div className="text-sm text-[#58A6FF] font-mono mt-2">
            Therefore: X^4 = -1
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            animate={{ opacity: showReduction ? 0.5 : 1 }}
            className="p-4 bg-[#161B22] rounded-lg"
          >
            <span className="text-xs text-[#F85149] font-mono">Before reduction:</span>
            <div className="font-mono text-sm text-[#E6EDF3] mt-2">
              5x^6 + 3x^2 + 2
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              opacity: showReduction ? 1 : 0.5,
              borderColor: showReduction ? "#3FB950" : "#30363D"
            }}
            className="p-4 bg-[#161B22] rounded-lg border-2"
          >
            <span className="text-xs text-[#3FB950] font-mono">After reduction:</span>
            <div className="font-mono text-sm text-[#E6EDF3] mt-2">
              5x^2 + 2
            </div>
            <div className="text-xs text-[#8B949E] mt-2">
              x^6 = x^4 * x^2 = -x^2
              <br />5(-x^2) + 3x^2 = -2x^2
              <br />-2 mod 7 = 5
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ILLUSTRATION: Parameter Hierarchy
// ============================================================================
function ParameterHierarchyAnimation() {
  const [activeParam, setActiveParam] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveParam((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const params = [
    { 
      name: "poly_modulus_degree (N)", 
      value: "8192", 
      desc: "Ring size, security level", 
      color: "#58A6FF",
      detail: "Must be power of 2: 4096, 8192, 16384..."
    },
    { 
      name: "coeff_modulus", 
      value: "[q1, q2, q3]", 
      desc: "Noise budget, ciphertext size", 
      color: "#3FB950",
      detail: "Product of primes, each ~60 bits"
    },
    { 
      name: "plain_modulus (t)", 
      value: "prime", 
      desc: "Plaintext range (BFV only)", 
      color: "#F0883E",
      detail: "~20 bits for batching"
    },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        SEAL's three key parameters
      </IllustrationLabel>

      <div className="space-y-4 max-w-md mx-auto">
        {params.map((param, i) => (
          <motion.div
            key={i}
            animate={{
              scale: activeParam === i ? 1.02 : 1,
              borderColor: activeParam === i ? param.color : "#30363D",
              boxShadow: activeParam === i ? `0 0 15px ${param.color}30` : "none",
            }}
            className="p-4 bg-[#161B22] rounded-lg border-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm font-mono" style={{ color: param.color }}>{param.name}</span>
                <p className="text-xs text-[#8B949E] mt-1">{param.desc}</p>
              </div>
              <span className="text-sm font-mono text-[#E6EDF3]">{param.value}</span>
            </div>
            {activeParam === i && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-xs text-[#8B949E] mt-2 pt-2 border-t border-[#30363D]"
              >
                {param.detail}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// ILLUSTRATION: Plaintext vs Plain Modulus
// ============================================================================
function PlaintextVsModulusAnimation() {
  const [showDifference, setShowDifference] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowDifference((prev) => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        Plain Modulus is the container, Plaintext is the item
      </IllustrationLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Plain Modulus */}
        <motion.div
          animate={{ 
            opacity: showDifference ? 0.5 : 1,
            borderColor: showDifference ? "#30363D" : "#F0883E"
          }}
          className="p-5 bg-[#161B22] rounded-lg border-2"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📦</span>
            <span className="text-sm font-mono text-[#F0883E]">Plain Modulus (t)</span>
          </div>
          <div className="p-3 bg-[#0D1117] rounded font-mono text-sm mb-3">
            <span className="text-[#8B949E]">parms.set_plain_modulus(</span>
            <span className="text-[#F0883E]">1024</span>
            <span className="text-[#8B949E]">);</span>
          </div>
          <p className="text-xs text-[#8B949E]">
            A <strong>parameter</strong>: defines range [0, 1023]
          </p>
          <p className="text-xs text-[#F0883E] mt-2">The SIZE of the container</p>
        </motion.div>

        {/* Plaintext */}
        <motion.div
          animate={{ 
            opacity: showDifference ? 1 : 0.5,
            borderColor: showDifference ? "#3FB950" : "#30363D"
          }}
          className="p-5 bg-[#161B22] rounded-lg border-2"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🔢</span>
            <span className="text-sm font-mono text-[#3FB950]">Plaintext</span>
          </div>
          <div className="p-3 bg-[#0D1117] rounded font-mono text-sm mb-3">
            <span className="text-[#8B949E]">Plaintext pt(</span>
            <span className="text-[#3FB950]">"123"</span>
            <span className="text-[#8B949E]">);</span>
          </div>
          <p className="text-xs text-[#8B949E]">
            The actual <strong>data</strong>: the number 123
          </p>
          <p className="text-xs text-[#3FB950] mt-2">The ITEM in the container</p>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// ILLUSTRATION: Data Flow (Plaintext Usage)
// ============================================================================
function DataFlowAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: "Your Data", value: "123", color: "#E6EDF3", desc: "Raw integer" },
    { label: "Plaintext", value: "pt(123)", color: "#58A6FF", desc: "Encoded" },
    { label: "Ciphertext", value: "Enc(123)", color: "#3FB950", desc: "Encrypted" },
    { label: "Compute", value: "Enc(246)", color: "#F0883E", desc: "123+123" },
    { label: "Result", value: "246", color: "#A371F7", desc: "Decrypted" },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        Complete data flow: Data to Plaintext to Ciphertext and back
      </IllustrationLabel>

      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              animate={{
                scale: step === i ? 1.1 : 1,
                opacity: step >= i ? 1 : 0.3,
                borderColor: step === i ? s.color : "#30363D",
              }}
              className="min-w-[100px] p-3 bg-[#161B22] rounded-lg border-2 text-center"
            >
              <div className="text-xs text-[#8B949E] mb-1">{s.label}</div>
              <div className="font-mono text-sm" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[10px] text-[#6E7681] mt-1">{s.desc}</div>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.span
                animate={{ opacity: step > i ? 1 : 0.3 }}
                className="mx-2 text-[#8B949E]"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// ILLUSTRATION: R_t vs R_q
// ============================================================================
function RtVsRqAnimation() {
  const [showRq, setShowRq] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowRq((prev) => !prev);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        R_t (small, for data) vs R_q (huge, for security)
      </IllustrationLabel>

      <div className="max-w-lg mx-auto space-y-6">
        {/* R_t */}
        <motion.div
          animate={{ 
            opacity: showRq ? 0.4 : 1,
            borderColor: showRq ? "#30363D" : "#58A6FF"
          }}
          className="p-5 bg-[#161B22] rounded-lg border-2"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-sm font-mono text-[#58A6FF]">R_t = Plaintext Space</span>
              <p className="text-xs text-[#8B949E] mt-1">Coefficients modulo t (plain_modulus)</p>
            </div>
            <span className="text-xs font-mono text-[#58A6FF] bg-[#58A6FF]/10 px-2 py-1 rounded">BFV only</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-4 bg-[#21262D] rounded-full overflow-hidden">
              <motion.div
                animate={{ width: showRq ? "10%" : "100%" }}
                className="h-full bg-[#58A6FF] rounded-full"
              />
            </div>
            <span className="text-xs font-mono text-[#8B949E]">~20 bits</span>
          </div>
          <p className="text-xs text-[#58A6FF] mt-2">Range: [0, 1,048,575]</p>
        </motion.div>

        {/* R_q */}
        <motion.div
          animate={{ 
            opacity: showRq ? 1 : 0.4,
            borderColor: showRq ? "#3FB950" : "#30363D"
          }}
          className="p-5 bg-[#161B22] rounded-lg border-2"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-sm font-mono text-[#3FB950]">R_q = Ciphertext Space</span>
              <p className="text-xs text-[#8B949E] mt-1">Coefficients modulo q (coeff_modulus)</p>
            </div>
            <span className="text-xs font-mono text-[#3FB950] bg-[#3FB950]/10 px-2 py-1 rounded">BFV + CKKS</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-4 bg-[#21262D] rounded-full overflow-hidden">
              <motion.div
                animate={{ width: showRq ? "100%" : "10%" }}
                className="h-full bg-[#3FB950] rounded-full"
              />
            </div>
            <span className="text-xs font-mono text-[#8B949E]">~180 bits</span>
          </div>
          <p className="text-xs text-[#3FB950] mt-2">Range: [0, 2^180 - 1] (astronomical!)</p>
        </motion.div>
      </div>

      <p className="text-center text-xs text-[#8B949E] mt-6">
        R_q must be huge for security. R_t only needs to hold your data.
      </p>
    </div>
  );
}

// ============================================================================
// ILLUSTRATION: Scale Factor
// ============================================================================
function ScaleFactorAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const realValue = 3.14159;
  const scale = Math.pow(2, 40);
  const scaled = Math.round(realValue * scale);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        CKKS uses scale factor to convert reals to integers
      </IllustrationLabel>

      <div className="max-w-md mx-auto space-y-4">
        <motion.div
          animate={{ 
            opacity: step >= 0 ? 1 : 0.3,
            borderColor: step === 0 ? "#58A6FF" : "#30363D"
          }}
          className="p-4 bg-[#161B22] rounded-lg border-2"
        >
          <span className="text-xs text-[#8B949E]">Real number (cannot encrypt directly)</span>
          <div className="font-mono text-xl text-[#58A6FF] mt-1">3.14159</div>
        </motion.div>

        <motion.div
          animate={{ opacity: step >= 1 ? 1 : 0.3, x: step === 1 ? 5 : 0 }}
          className="text-center"
        >
          <span className="text-xs text-[#8B949E]">× scale (2^40)</span>
        </motion.div>

        <motion.div
          animate={{ 
            opacity: step >= 2 ? 1 : 0.3,
            borderColor: step === 2 ? "#3FB950" : "#30363D"
          }}
          className="p-4 bg-[#161B22] rounded-lg border-2"
        >
          <span className="text-xs text-[#8B949E]">Scaled integer (can encrypt!)</span>
          <div className="font-mono text-lg text-[#3FB950] mt-1">3,454,327,123,456</div>
        </motion.div>

        <motion.div
          animate={{ opacity: step >= 3 ? 1 : 0.3, x: step === 3 ? 5 : 0 }}
          className="text-center"
        >
          <span className="text-xs text-[#8B949E]">After decryption: ÷ scale (2^40)</span>
        </motion.div>

        <motion.div
          animate={{ 
            opacity: step >= 3 ? 1 : 0.3,
            borderColor: step === 3 ? "#A371F7" : "#30363D"
          }}
          className="p-4 bg-[#161B22] rounded-lg border-2"
        >
          <span className="text-xs text-[#8B949E]">Back to real (approximately)</span>
          <div className="font-mono text-xl text-[#A371F7] mt-1">≈ 3.14159</div>
        </motion.div>
      </div>

      <p className="text-center text-xs text-[#8B949E] mt-6">
        2^40 provides ~12 decimal digits of precision
      </p>
    </div>
  );
}

// ============================================================================
// ILLUSTRATION: Rescaling After Multiplication
// ============================================================================
function RescalingAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        Multiplication doubles the scale. Rescaling fixes it.
      </IllustrationLabel>

      <div className="max-w-lg mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            animate={{ opacity: step >= 0 ? 1 : 0.3 }}
            className="p-3 bg-[#161B22] rounded-lg text-center"
          >
            <div className="text-xs text-[#8B949E]">Enc(3.14 × 2^40)</div>
          </motion.div>
          <motion.div
            animate={{ opacity: step >= 0 ? 1 : 0.3 }}
            className="p-3 bg-[#161B22] rounded-lg text-center"
          >
            <div className="text-xs text-[#8B949E]">Enc(2.86 × 2^40)</div>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: step >= 1 ? 1 : 0.3, y: step === 1 ? -5 : 0 }}
          className="text-center mb-4"
        >
          <span className="text-[#F0883E]">× multiply</span>
        </motion.div>

        <motion.div
          animate={{ 
            opacity: step >= 1 ? 1 : 0.3,
            borderColor: step === 1 ? "#F85149" : "#30363D"
          }}
          className="p-4 bg-[#161B22] rounded-lg border-2 text-center mb-4"
        >
          <div className="text-sm text-[#F85149]">Enc(8.98 × 2^80)</div>
          <div className="text-xs text-[#F85149] mt-1">Scale doubled! Too large!</div>
        </motion.div>

        <motion.div
          animate={{ opacity: step >= 2 ? 1 : 0.3, y: step === 2 ? -5 : 0 }}
          className="text-center mb-4"
        >
          <span className="text-[#3FB950]">rescale_to_next (÷ 2^40)</span>
        </motion.div>

        <motion.div
          animate={{ 
            opacity: step >= 3 ? 1 : 0.3,
            borderColor: step === 3 ? "#3FB950" : "#30363D",
            boxShadow: step === 3 ? "0 0 15px rgba(63, 185, 80, 0.3)" : "none"
          }}
          className="p-4 bg-[#161B22] rounded-lg border-2 text-center"
        >
          <div className="text-sm text-[#3FB950]">Enc(8.98 × 2^40)</div>
          <div className="text-xs text-[#3FB950] mt-1">Scale restored!</div>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// ILLUSTRATION: BFV vs CKKS
// ============================================================================
function BFVvsCKKSAnimation() {
  const [scheme, setScheme] = useState<"bfv" | "ckks">("bfv");

  useEffect(() => {
    const timer = setInterval(() => {
      setScheme((prev) => (prev === "bfv" ? "ckks" : "bfv"));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        BFV for exact integers, CKKS for approximate reals
      </IllustrationLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BFV */}
        <motion.div
          animate={{ 
            opacity: scheme === "bfv" ? 1 : 0.4,
            borderColor: scheme === "bfv" ? "#58A6FF" : "#30363D"
          }}
          className="p-5 bg-[#161B22] rounded-lg border-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🔢</span>
            <span className="text-sm font-mono text-[#58A6FF]">BFV Scheme</span>
          </div>
          <div className="space-y-2 mb-4">
            <div className="p-3 bg-[#0D1117] rounded font-mono text-sm">
              <span className="text-[#8B949E]">Input:</span> <span className="text-[#E6EDF3]">5, 3</span>
            </div>
            <div className="p-3 bg-[#0D1117] rounded font-mono text-sm">
              <span className="text-[#8B949E]">5 + 3 =</span> <span className="text-[#3FB950]">8</span>
            </div>
          </div>
          <p className="text-xs text-[#58A6FF]">Exact integers. Always precise.</p>
          <p className="text-xs text-[#8B949E] mt-2">Best for: counting, voting, databases</p>
        </motion.div>

        {/* CKKS */}
        <motion.div
          animate={{ 
            opacity: scheme === "ckks" ? 1 : 0.4,
            borderColor: scheme === "ckks" ? "#3FB950" : "#30363D"
          }}
          className="p-5 bg-[#161B22] rounded-lg border-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📊</span>
            <span className="text-sm font-mono text-[#3FB950]">CKKS Scheme</span>
          </div>
          <div className="space-y-2 mb-4">
            <div className="p-3 bg-[#0D1117] rounded font-mono text-sm">
              <span className="text-[#8B949E]">Input:</span> <span className="text-[#E6EDF3]">3.14, 2.86</span>
            </div>
            <div className="p-3 bg-[#0D1117] rounded font-mono text-sm">
              <span className="text-[#8B949E]">3.14 + 2.86 ≈</span> <span className="text-[#F0883E]">5.9999...</span>
            </div>
          </div>
          <p className="text-xs text-[#3FB950]">Approximate reals. Small rounding errors.</p>
          <p className="text-xs text-[#8B949E] mt-2">Best for: ML, signal processing, scientific</p>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// ILLUSTRATION: Noise Budget
// ============================================================================
function NoiseBudgetAnimation() {
  const [operations, setOperations] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setOperations((prev) => (prev + 1) % 6);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const budgetPercent = Math.max(0, 100 - operations * 18);
  const budgetColor = budgetPercent > 50 ? "#3FB950" : budgetPercent > 20 ? "#F0883E" : "#F85149";

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <IllustrationLabel>
        Each operation consumes noise budget
      </IllustrationLabel>

      <div className="max-w-md mx-auto">
        <div className="flex justify-between text-xs text-[#8B949E] mb-2">
          <span>Noise Budget</span>
          <span>{budgetPercent}%</span>
        </div>
        <div className="h-4 bg-[#161B22] rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${budgetPercent}%` }}
            className="h-full rounded-full"
            style={{ backgroundColor: budgetColor }}
          />
        </div>

        <div className="mt-6 space-y-2">
          {["Initial", "Add", "Add", "Multiply", "Multiply", "Exhausted!"].map((op, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: operations >= i ? 1 : 0.3,
                x: operations === i ? 5 : 0,
              }}
              className="flex items-center gap-3 text-sm"
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                operations > i ? "bg-[#3FB950]/20 text-[#3FB950]" : 
                operations === i ? "bg-[#58A6FF]/20 text-[#58A6FF]" : 
                "bg-[#21262D] text-[#8B949E]"
              }`}>
                {operations > i ? "✓" : i + 1}
              </span>
              <span className={operations >= i ? "text-[#E6EDF3]" : "text-[#8B949E]"}>{op}</span>
              {i > 0 && i < 5 && (
                <span className="text-xs text-[#F85149]">
                  {i < 3 ? "-10%" : "-25%"}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <p className="mt-4 text-xs text-[#8B949E] text-center">
          Multiplication consumes more budget than addition
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function SealHomomorphicEncryption() {
  return (
    <>
      <p>
        What if you could compute on data without ever seeing it? That's the promise of 
        <strong> Homomorphic Encryption (HE)</strong>. With HE, a cloud provider can run 
        calculations on your encrypted data and return encrypted results. They never see 
        your actual numbers.
      </p>

      <p>
        This guide walks through SEAL (Simple Encrypted Arithmetic Library) from the ground 
        up. We'll cover the math, the parameters, and the code. Each section starts simple, 
        then goes deep.
      </p>

      <TableOfContents />

      {/* ================================================================== */}
      {/* TOPIC 1: What is Homomorphic Encryption? */}
      {/* ================================================================== */}
      <h2 id="what-is-he">01. What is Homomorphic Encryption?</h2>

      <SectionHeader title="The Locked Diary" type="layman" />

      <p>
        Imagine you have a locked diary with your private numbers. With regular encryption, 
        to add numbers you must unlock the diary (decrypt), do the math while it's open, 
        then lock it again (encrypt). While it's open, anyone nearby can see your data.
      </p>

      <p>
        Homomorphic encryption is different. It lets you do math while the diary stays 
        locked. You can add numbers inside the locked diary, multiply them, and get correct 
        results when you finally unlock it. The diary never needs to be opened for computation.
      </p>

      <LockedDiaryAnimation />

      <p>
        Why does this matter? Privacy. A cloud provider can compute on your encrypted health 
        records, financial data, or personal information without ever seeing the actual values. 
        You get results. They get nothing.
      </p>

      <SectionHeader title="The Homomorphism Property" type="technical" />

      <p>
        In mathematics, a homomorphism preserves structure. For encryption, this means 
        operations on ciphertexts correspond to operations on plaintexts:
      </p>

      <ul>
        <li><code>Encrypt(a) + Encrypt(b) = Encrypt(a + b)</code></li>
        <li><code>Encrypt(a) × Encrypt(b) = Encrypt(a × b)</code></li>
      </ul>

      <p>
        There are different levels of homomorphic encryption:
      </p>

      <ul>
        <li><strong>Partially Homomorphic:</strong> Supports only addition (Paillier) or only multiplication (ElGamal)</li>
        <li><strong>Somewhat Homomorphic:</strong> Supports limited operations before noise becomes too large</li>
        <li><strong>Fully Homomorphic (FHE):</strong> Supports arbitrary arithmetic (addition and multiplication)</li>
      </ul>

      <p>
        SEAL implements FHE. Each operation adds noise to the ciphertext. Too much noise breaks 
        decryption. Parameter selection determines how many operations you can perform.
      </p>

      <NoiseBudgetAnimation />

      <SectionHeader title="Basic SEAL Flow" type="code" />

      <pre>
        <code>{`// STEP 1: Create encryption parameters
EncryptionParameters parms(scheme_type::bfv);
parms.set_poly_modulus_degree(8192);
parms.set_coeff_modulus(CoeffModulus::BFVDefault(8192));
parms.set_plain_modulus(PlainModulus::Batching(8192, 20));

// STEP 2: Create context (validates parameters)
SEALContext context(parms);

// STEP 3: Generate keys
KeyGenerator keygen(context);
SecretKey secret_key = keygen.secret_key();
PublicKey public_key;
keygen.create_public_key(public_key);

// STEP 4: Encrypt a number
Encryptor encryptor(context, public_key);
Plaintext pt("123");
Ciphertext ct;
encryptor.encrypt(pt, ct);  // ct = Encrypt(123)

// STEP 5: Compute on encrypted data (THE MAGIC!)
Evaluator evaluator(context);
evaluator.add_inplace(ct, ct);  // ct = Encrypt(123 + 123) = Encrypt(246)

// STEP 6: Decrypt to see result
Decryptor decryptor(context, secret_key);
Plaintext result;
decryptor.decrypt(ct, result);  // result = 246`}</code>
      </pre>

      {/* ================================================================== */}
      {/* TOPIC 2: Ring-LWE */}
      {/* ================================================================== */}
      <h2 id="ring-lwe">02. Ring-LWE: The Security Foundation</h2>

      <SectionHeader title="The Needle in a Haystack" type="layman" />

      <p>
        SEAL's security is based on a math problem that's hard to solve, even for quantum 
        computers. It's called Ring-LWE (Learning With Errors over polynomial rings).
      </p>

      <p>
        Think of it like this: I give you a locked box with some noise inside. You can hear 
        the noise, but you can't figure out what's making it. The noise obscures the secret.
      </p>

      <p>
        In Ring-LWE, the "noise" is small random errors added to the data. Even knowing most 
        of the information, finding the secret is computationally infeasible.
      </p>

      <LWEProblemAnimation />

      <SectionHeader title="LWE and Ring-LWE" type="technical" />

      <p>
        <strong>The LWE Problem:</strong> Given a random matrix A (public) and a vector 
        b = As + e mod q (public), where s is the secret and e is small random noise, 
        find s. This is believed to be hard even for quantum computers.
      </p>

      <p>
        <strong>Ring-LWE:</strong> Instead of vectors and matrices, we use polynomials. 
        This is more efficient for FHE because polynomial multiplication is faster than 
        matrix multiplication.
      </p>

      <p>
        The polynomial ring is defined as:
      </p>

      <pre>
        <code>{`R_q = ℤ_q[X]/(X^N + 1)

Where:
- ℤ_q: coefficients are integers modulo q
- [X]: polynomials with variable X  
- /(X^N + 1): reduce modulo X^N + 1
- N: poly_modulus_degree (must be power of 2)`}</code>
      </pre>

      <p>
        The key rule: <code>X^N = -1 (mod X^N + 1)</code>. This means whenever we see X^N, 
        we replace it with -1. This limits all polynomials to degree less than N.
      </p>

      <PolynomialRingAnimation />

      <SectionHeader title="Why X^N + 1?" type="code" />

      <p>
        The "+1" is crucial. Using X^N + 1 (a cyclotomic polynomial) provides:
      </p>

      <ul>
        <li><strong>Security:</strong> Ring-LWE hardness guarantees</li>
        <li><strong>Efficiency:</strong> Enables NTT (Number Theoretic Transform) for fast multiplication</li>
        <li><strong>Batching:</strong> Enables SIMD operations (process N values in parallel)</li>
      </ul>

      <pre>
        <code>{`// Example: Reduce 5x^6 + 3x^2 + 2 mod (X^4 + 1, 7)

// Step 1: Reduce polynomial (X^4 = -1)
// x^6 = x^4 * x^2 = (-1) * x^2 = -x^2
// 5x^6 = 5 * (-x^2) = -5x^2
// -5x^2 + 3x^2 = -2x^2

// Step 2: Reduce coefficients mod 7
// -2 mod 7 = 5

// Result: 5x^2 + 2`}</code>
      </pre>

      {/* ================================================================== */}
      {/* TOPIC 3: SEAL Parameters */}
      {/* ================================================================== */}
      <h2 id="seal-parameters">03. SEAL Parameters Explained</h2>

      <SectionHeader title="The Three Knobs" type="layman" />

      <p>
        SEAL has three main parameters that control security, performance, and how many 
        operations you can do. Think of them as knobs on a control panel:
      </p>

      <ul>
        <li><strong>poly_modulus_degree:</strong> The "ring size" knob. Bigger = more secure but slower.</li>
        <li><strong>coeff_modulus:</strong> The "noise budget" knob. More = more operations allowed.</li>
        <li><strong>plain_modulus:</strong> The "number range" knob (BFV only). Defines what numbers you can encrypt.</li>
      </ul>

      <ParameterHierarchyAnimation />

      <SectionHeader title="Parameter Details" type="technical" />

      <p><strong>poly_modulus_degree (N):</strong></p>
      <ul>
        <li>Must be a power of 2: 4096, 8192, 16384, 32768</li>
        <li>Controls ring size and security level</li>
        <li>Larger N = higher security but slower operations</li>
        <li>Also determines batching capacity (can process N values in parallel)</li>
      </ul>

      <pre>
        <code>{`// Security levels by poly_modulus_degree:
// 4096  → ~128-bit security (limited operations)
// 8192  → 128-bit security (standard)
// 16384 → 192-bit security
// 32768 → 256-bit security`}</code>
      </pre>

      <p><strong>coeff_modulus:</strong></p>
      <ul>
        <li>Product of primes: q = q1 × q2 × ... × qk</li>
        <li>Each prime is typically ~60 bits</li>
        <li>More primes = more noise budget (but larger ciphertexts)</li>
        <li>Total bit size is constrained by security requirements</li>
      </ul>

      <pre>
        <code>{`// For 128-bit security with N=8192:
parms.set_coeff_modulus(CoeffModulus::BFVDefault(8192));
// Returns ~180 bits total (3 primes of ~60 bits each)`}</code>
      </pre>

      <p><strong>plain_modulus (BFV only):</strong></p>
      <ul>
        <li>Must be prime and coprime with coeff_modulus</li>
        <li>Defines plaintext range: integers in [0, t-1]</li>
        <li>For batching: use PlainModulus::Batching(N, bit_size)</li>
      </ul>

      <pre>
        <code>{`// ~20-bit prime enables batching with 8192 slots
parms.set_plain_modulus(PlainModulus::Batching(8192, 20));
// Each slot can hold values 0 to ~1 million`}</code>
      </pre>

      <SectionHeader title="Complete Parameter Setup" type="code" />

      <pre>
        <code>{`// 128-bit secure BFV setup
EncryptionParameters parms(scheme_type::bfv);

// Ring size: 8192 (128-bit security, 8192 batching slots)
parms.set_poly_modulus_degree(8192);

// Noise budget: ~180 bits total
parms.set_coeff_modulus(CoeffModulus::BFVDefault(8192));

// Plaintext range: ~20-bit primes, enables batching
parms.set_plain_modulus(PlainModulus::Batching(8192, 20));

// Validate all parameters
SEALContext context(parms);

// Check if valid
if (!context.parameters_set()) {
    throw std::invalid_argument("Invalid parameters!");
}`}</code>
      </pre>

      {/* ================================================================== */}
      {/* TOPIC 4: Plaintext vs Plain Modulus */}
      {/* ================================================================== */}
      <h2 id="plaintext-vs-modulus">04. Plaintext vs Plain Modulus</h2>

      <SectionHeader title="The Container vs The Item" type="layman" />

      <p>
        This trips up a lot of people. <strong>Plain modulus</strong> and <strong>plaintext</strong> 
        sound similar but are completely different things.
      </p>

      <p>
        Think of it like a shipping container. The <strong>plain modulus</strong> is the size of 
        the container. It defines how big of an item you can fit. The <strong>plaintext</strong> 
        is the actual item you put inside the container.
      </p>

      <PlaintextVsModulusAnimation />

      <SectionHeader title="Where is Plaintext Used?" type="technical" />

      <p>
        Plaintext appears at specific points in the encryption workflow:
      </p>

      <ul>
        <li><strong>Before encryption:</strong> You create a Plaintext object containing your data</li>
        <li><strong>After decryption:</strong> The result comes back as a Plaintext object</li>
        <li><strong>With batching:</strong> You encode vectors into Plaintext, then decode back</li>
      </ul>

      <DataFlowAnimation />

      <SectionHeader title="Code Example" type="code" />

      <pre>
        <code>{`// Plain Modulus: the PARAMETER (container size)
parms.set_plain_modulus(1024);  // Values must be 0-1023

// Plaintext: the DATA (actual item)
Plaintext pt("123");  // The number 123

// Full flow:
// 1. Create plaintext with your data
Plaintext pt("123");

// 2. Encrypt plaintext → ciphertext
Ciphertext ct;
encryptor.encrypt(pt, ct);  // ct = Enc(123)

// 3. Compute on ciphertext
evaluator.add_inplace(ct, ct);  // ct = Enc(246)

// 4. Decrypt ciphertext → plaintext
Plaintext result;
decryptor.decrypt(ct, result);  // result = "246"`}</code>
      </pre>

      {/* ================================================================== */}
      {/* TOPIC 5: R_t vs R_q */}
      {/* ================================================================== */}
      <h2 id="rt-vs-rq">05. R_t vs R_q: Two Different Spaces</h2>

      <SectionHeader title="Small Box vs Huge Vault" type="layman" />

      <p>
        SEAL uses two different "spaces" for data. One is small and efficient (for your actual 
        data), the other is astronomically large (for security).
      </p>

      <p>
        <strong>R_t</strong> (plaintext space) is like a small filing cabinet. It only needs to 
        hold your actual numbers. If your numbers are 0-1000, a cabinet with 1000 slots is enough.
      </p>

      <p>
        <strong>R_q</strong> (ciphertext space) is like a massive underground vault. It needs to 
        be enormous to provide security. The noise and encryption overhead require huge numbers.
      </p>

      <RtVsRqAnimation />

      <SectionHeader title="The Two Polynomial Rings" type="technical" />

      <p>
        <strong>R_t = plaintext ring (BFV only):</strong>
      </p>
      <ul>
        <li>t = plain_modulus (a prime, e.g., 1024 or 2^20)</li>
        <li>Coefficients are modulo t</li>
        <li>Small: typically 20-60 bits</li>
        <li>Purpose: defines the range of values you can encrypt</li>
      </ul>

      <p>
        <strong>R_q = ciphertext ring (both BFV and CKKS):</strong>
      </p>
      <ul>
        <li>q = coeff_modulus (product of primes, e.g., q1 × q2 × q3)</li>
        <li>Coefficients are modulo q</li>
        <li>Huge: typically 180-300 bits</li>
        <li>Purpose: provides security and room for noise</li>
      </ul>

      <SectionHeader title="Code Comparison" type="code" />

      <pre>
        <code>{`// R_t: Plaintext space (BFV only)
parms.set_plain_modulus(PlainModulus::Batching(8192, 20));
// t ≈ 2^20 (a prime)
// Plaintexts: R_t = ℤ_t[X]/(X^8192 + 1)
// Range: [0, ~1,000,000]

// R_q: Ciphertext space (both BFV and CKKS)
parms.set_coeff_modulus(CoeffModulus::BFVDefault(8192));
// q ≈ 2^180 (product of 3 primes)
// Ciphertexts: R_q = ℤ_q[X]/(X^8192 + 1)
// Range: [0, 2^180 - 1]  ← ASTRONOMICAL!`}</code>
      </pre>

      {/* ================================================================== */}
      {/* TOPIC 6: Scale Factor */}
      {/* ================================================================== */}
      <h2 id="scale-factor">06. Scale Factor (CKKS Only)</h2>

      <SectionHeader title="The Decimal Problem" type="layman" />

      <p>
        CKKS works with real numbers like 3.14159. But here's the problem: polynomials only 
        understand integers. You can't directly encrypt a decimal.
      </p>

      <p>
        The solution is the <strong>scale factor</strong>. Multiply your decimal by a large 
        number (like 2^40) to turn it into an integer. After computation, divide by the same 
        number to get your decimal back.
      </p>

      <ScaleFactorAnimation />

      <SectionHeader title="How Scale Works" type="technical" />

      <p>
        The scale factor (typically 2^40) converts reals to integers:
      </p>

      <ul>
        <li><strong>Encoding:</strong> real × scale → integer (then encrypt)</li>
        <li><strong>Decoding:</strong> integer ÷ scale → real (after decrypt)</li>
        <li><strong>Precision:</strong> 2^40 gives ~12 decimal digits of precision</li>
      </ul>

      <p>
        <strong>The multiplication problem:</strong> When you multiply two scaled values, the 
        scales also multiply:
      </p>

      <pre>
        <code>{`Enc(3.14 × 2^40) × Enc(2.86 × 2^40)
= Enc(3.14 × 2.86 × 2^80)
= Enc(8.98 × 2^80)  ← Scale doubled!`}</code>
      </pre>

      <p>
        This is why CKKS requires <strong>rescaling</strong> after multiplication:
      </p>

      <RescalingAnimation />

      <SectionHeader title="CKKS Scale in Code" type="code" />

      <pre>
        <code>{`// Set scale factor
double scale = pow(2.0, 40);  // 2^40 ≈ 1 trillion

// Encode real numbers with scale
vector<double> vec = {3.14159, 2.71828};
Plaintext pt;
ckks_encoder.encode(vec, scale, pt);  // Multiply by scale

// Encrypt
Ciphertext ct;
encryptor.encrypt(pt, ct);

// After multiplication: MUST rescale
evaluator.multiply(ct1, ct2, ct_result);
evaluator.rescale_to_next_inplace(ct_result);  // Divide by scale

// Decode after decryption
vector<double> result;
decryptor.decrypt(ct, pt);
ckks_encoder.decode(pt, result);  // Divide by scale`}</code>
      </pre>

      {/* ================================================================== */}
      {/* TOPIC 7: BFV vs CKKS */}
      {/* ================================================================== */}
      <h2 id="bfv-vs-ckks">07. BFV vs CKKS Schemes</h2>

      <SectionHeader title="Calculator vs Scientific Calculator" type="layman" />

      <p>
        SEAL offers two schemes, each designed for different use cases:
      </p>

      <p>
        <strong>BFV</strong> is like a regular calculator. It works with whole numbers and 
        gives exact answers. 2 + 2 always equals 4, never 3.9999. Use it when you need 
        precise counting: votes, inventory, database queries.
      </p>

      <p>
        <strong>CKKS</strong> is like a scientific calculator. It works with decimals and 
        gives approximate answers. 2.5 + 2.3 might equal 4.7999 instead of 4.8. Use it when 
        small rounding errors don't matter: machine learning, averages, sensor data.
      </p>

      <BFVvsCKKSAnimation />

      <SectionHeader title="Scheme Comparison" type="technical" />

      <p><strong>BFV (Brakerski-Fan-Vercauteren):</strong></p>
      <ul>
        <li>Exact integer arithmetic</li>
        <li>Requires plain_modulus parameter</li>
        <li>Uses BatchEncoder for batching</li>
        <li>Input type: <code>vector&lt;uint64_t&gt;</code></li>
        <li>Best for: counting, voting, exact queries</li>
      </ul>

      <p><strong>CKKS (Cheon-Kim-Kim-Song):</strong></p>
      <ul>
        <li>Approximate real-number arithmetic</li>
        <li>No plain_modulus (uses scaling instead)</li>
        <li>Uses CKKSEncoder for encoding</li>
        <li>Input type: <code>vector&lt;double&gt;</code></li>
        <li>Best for: ML, signal processing, scientific computing</li>
      </ul>

      <SectionHeader title="Code Comparison" type="code" />

      <pre>
        <code>{`// ========== BFV EXAMPLE (Exact Integers) ==========
EncryptionParameters bfv_parms(scheme_type::bfv);
bfv_parms.set_poly_modulus_degree(8192);
bfv_parms.set_coeff_modulus(CoeffModulus::BFVDefault(8192));
bfv_parms.set_plain_modulus(PlainModulus::Batching(8192, 20));

SEALContext bfv_context(bfv_parms);
BatchEncoder batch_encoder(bfv_context);  // For integers

// Encode and encrypt integers
vector<uint64_t> vec = {1, 2, 3, 4, 5, 6, 7, 8};
Plaintext pt;
batch_encoder.encode(vec, pt);
encryptor.encrypt(pt, ct);

// Result is EXACT
// {1,2,3,4,5,6,7,8} + {1,2,3,4,5,6,7,8} = {2,4,6,8,10,12,14,16}`}</code>
      </pre>

      <pre>
        <code>{`// ========== CKKS EXAMPLE (Approximate Reals) ==========
EncryptionParameters ckks_parms(scheme_type::ckks);
ckks_parms.set_poly_modulus_degree(8192);
ckks_parms.set_coeff_modulus(
    CoeffModulus::Create(8192, {60, 40, 40, 60})
);
// Note: NO plain_modulus for CKKS!

SEALContext ckks_context(ckks_parms);
CKKSEncoder ckks_encoder(ckks_context);  // For reals

// Set scale for precision
double scale = pow(2.0, 40);  // ~12 decimal digits

// Encode and encrypt reals
vector<double> vec = {1.5, 2.3, 3.7, 4.1};
Plaintext pt;
ckks_encoder.encode(vec, scale, pt);
encryptor.encrypt(pt, ct);

// Result is APPROXIMATE
// {1.5, 2.3, 3.7, 4.1} + {0.5, 0.7, 0.3, 0.9} ≈ {2.0, 3.0, 4.0, 5.0}`}</code>
      </pre>

      {/* ================================================================== */}
      {/* WRAPPING UP */}
      {/* ================================================================== */}
      <h2>Wrapping Up</h2>

      <p>
        If you take away a few things from this post:
      </p>

      <ol>
        <li>
          <strong>Homomorphic encryption enables computation on encrypted data.</strong> The 
          data stays private throughout the computation.
        </li>
        <li>
          <strong>Ring-LWE provides the security.</strong> The noise makes it computationally 
          infeasible to recover the secret.
        </li>
        <li>
          <strong>Parameters control the trade-offs.</strong> poly_modulus_degree for security, 
          coeff_modulus for noise budget, plain_modulus for value range.
        </li>
        <li>
          <strong>Choose BFV for exact integers, CKKS for approximate reals.</strong> The 
          right scheme depends on your use case.
        </li>
      </ol>

      <blockquote>
        SEAL is available on GitHub: 
        <a href="https://github.com/microsoft/SEAL" target="_blank" rel="noopener noreferrer">
          microsoft/SEAL
        </a>
      </blockquote>

      <p>
        Homomorphic encryption is still computationally expensive compared to regular 
        computation, but it unlocks use cases that were previously impossible. When privacy 
        is non-negotiable, HE delivers.
      </p>
    </>
  );
}
