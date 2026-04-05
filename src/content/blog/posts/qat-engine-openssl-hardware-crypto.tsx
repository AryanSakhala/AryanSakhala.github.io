"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Architecture diagram animation
function QATArchitectureFlow() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const layers = [
    { label: "Application Layer", emoji: "🌐", desc: "HAProxy / Rustls — initiates TLS handshake", color: "#58A6FF" },
    { label: "OpenSSL 3.x", emoji: "🔐", desc: "Crypto dispatch — routes operations", color: "#A371F7" },
    { label: "QAT Engine / Provider", emoji: "⚡", desc: "Intercepts & redirects to hardware", color: "#F0883E" },
    { label: "qatlib (VFIO)", emoji: "🔧", desc: "Kernel driver interface", color: "#3FB950" },
    { label: "QAT Hardware", emoji: "🧮", desc: "Dedicated crypto silicon", color: "#F85149" },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <div className="text-center mb-6">
        <span className="text-xs text-[#F0883E] uppercase tracking-[0.15em] font-mono">
          ⚙️ Data Flow Visualization
        </span>
        <p className="text-sm text-[#8B949E] mt-1">How a crypto operation flows from app → hardware</p>
      </div>

      <div className="max-w-md mx-auto space-y-2">
        {layers.map((layer, i) => (
          <div key={layer.label}>
            <motion.div
              animate={{
                borderColor: step === i ? layer.color : "#30363D",
                boxShadow: step === i ? `0 0 20px ${layer.color}30` : "none",
                scale: step === i ? 1.02 : 1,
              }}
              className="flex items-center gap-3 p-3 rounded-lg border bg-[#161B22] transition-all"
            >
              <span className="text-xl flex-shrink-0">{layer.emoji}</span>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-mono text-[#E6EDF3] block truncate">{layer.label}</span>
                <span className="text-[10px] text-[#8B949E]">{layer.desc}</span>
              </div>
              {step === i && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs"
                  style={{ color: layer.color }}
                >
                  ◀ active
                </motion.span>
              )}
            </motion.div>
            {i < layers.length - 1 && (
              <div className="flex justify-center py-0.5">
                <motion.span
                  animate={{ color: step > i ? "#3FB950" : "#30363D" }}
                  className="text-xs"
                >
                  ↓
                </motion.span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Driver comparison
function DriverComparison() {
  const [selected, setSelected] = useState<"intree" | "oot">("intree");

  return (
    <div className="my-10 p-6 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <div className="text-center mb-4">
        <span className="text-xs text-[#58A6FF] uppercase tracking-[0.15em] font-mono">
          🔀 Two Paths to QAT
        </span>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        {(["intree", "oot"] as const).map((type) => (
          <motion.button
            key={type}
            onClick={() => setSelected(type)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg text-xs font-mono transition-all"
            style={{
              background: selected === type ? (type === "intree" ? "#3FB95020" : "#58A6FF20") : "#161B22",
              border: `1px solid ${selected === type ? (type === "intree" ? "#3FB950" : "#58A6FF") : "#30363D"}`,
              color: selected === type ? (type === "intree" ? "#3FB950" : "#58A6FF") : "#8B949E",
            }}
          >
            {type === "intree" ? "📦 In-Tree (qatlib)" : "🔨 Out-of-Tree (OOT)"}
          </motion.button>
        ))}
      </div>

      <motion.div key={selected} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
        {selected === "intree" ? (
          <div className="space-y-2">
            {[
              { icon: "✅", text: "Ships with Linux kernel — no extra install" },
              { icon: "🔒", text: "Uses VFIO → requires IOMMU enabled" },
              { icon: "👥", text: "Shared memory allocator — contention under heavy threading" },
              { icon: "🛠️", text: "Managed by qatmgr daemon" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#E6EDF3]">
                <span className="flex-shrink-0">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {[
              { icon: "📥", text: "Downloaded separately from Intel — manual install" },
              { icon: "🔓", text: "Uses UIO/USDM → requires IOMMU disabled (PF mode)" },
              { icon: "🚀", text: "Thread-specific DMA allocators — zero contention" },
              { icon: "⚠️", text: "Can conflict with in-tree modules — careful cleanup needed" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-[#E6EDF3]">
                <span className="flex-shrink-0">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function QatEngineOpensslHardwareCrypto() {
  return (
    <>
      <p>
        When we think about TLS performance, we usually accept that cryptographic operations are
        just &quot;expensive&quot; — a cost of doing business for secure connections. But Intel&apos;s{" "}
        <strong>QuickAssist Technology (QAT)</strong> changes that equation entirely. This is what
        I learned from building, patching, and deploying the QAT Engine to offload crypto from
        CPU to dedicated hardware.
      </p>

      <h2>🧩 The Core Idea</h2>

      <p>
        Every TLS handshake requires the server to perform a <strong>private key signing operation</strong>.
        For RSA, this is modular exponentiation (<code>m^d mod n</code>). On a standard CPU,
        this is computationally expensive — especially when handling thousands of concurrent connections
        to services like a vector database (Qdrant).
      </p>

      <p>
        QAT is a dedicated co-processor on the motherboard. Instead of the CPU doing the crypto math,
        you offload it to QAT hardware that computes the result in silicon and returns the answer.
        The speedup is <strong>orders of magnitude</strong> over software.
      </p>

      <QATArchitectureFlow />

      <h2>🏗️ What the QAT Engine Codebase Does</h2>

      <p>
        The QAT Engine repository builds two outputs from the same C codebase:
      </p>

      <ul>
        <li><strong>qatengine.so</strong> — OpenSSL Engine API (legacy, used by HAProxy/NGINX)</li>
        <li><strong>qatprovider.so</strong> — OpenSSL 3.x Provider API (modern, used by Rustls)</li>
      </ul>

      <p>
        The build flag <code>--enable-qat_provider</code> switches which one you get. Both share
        the same core C files that interact with QAT hardware via Intel&apos;s CPA (Crypto Physical
        Acceleration) API.
      </p>

      <h2>🔧 Building from Source — The Linker Surprise</h2>

      <p>
        Building against the system&apos;s in-tree qatlib, the first error was a missing symbol:
      </p>

      <pre><code>{`./configure --with-qat_hw_dir=/usr
make -j$(nproc)

# Error: undefined symbol: icp_sal_AsymGetInflightRequests`}</code></pre>

      <p>
        This function is for <strong>congestion management</strong> — checking how many operations
        are queued on the hardware. It was added in a newer qatlib version than we had. The header
        declared it, but the shared library didn&apos;t include the implementation.
      </p>

      <h3>💡 The Fix: Weak Symbol Stubs</h3>

      <p>
        Instead of upgrading qatlib (which could break other dependencies), we used a C technique
        called <strong>weak symbols</strong>:
      </p>

      <pre><code>{`__attribute__((weak))
CpaStatus icp_sal_AsymGetInflightRequests(
    CpaInstanceHandle instanceHandle,
    Cpa32U *maxInflightRequests,
    Cpa32U *numInflightRequests)
{
    if (maxInflightRequests) *maxInflightRequests = 1;
    if (numInflightRequests) *numInflightRequests = 0;
    return CPA_STATUS_SUCCESS;
}`}</code></pre>

      <p>
        <code>__attribute__((weak))</code> means: if the real qatlib provides this symbol at
        runtime, it overrides our stub. If not, our stub returns &quot;no congestion.&quot; The
        engine loads and works fine — just without congestion-based throttling.
      </p>

      <h2>🌐 The Integration Pattern</h2>

      <p>
        Qdrant (vector database) itself does <strong>zero cryptography</strong>. The pattern puts
        HAProxy as a TLS proxy in front:
      </p>

      <pre><code>{`Client ──HTTPS──▶ HAProxy :8443 ──HTTP──▶ Qdrant :6333
                      │
                      └── ssl-engine qatengine algo RSA
                          (offloads signing to QAT HW)`}</code></pre>

      <p>
        HAProxy was rebuilt from source with <code>USE_ENGINE=1</code> since the distro package
        didn&apos;t include engine support.
      </p>

      <h2>🔬 The Rustls Benchmark Path</h2>

      <p>
        For benchmarking, a separate path uses patched Rust crates for async QAT offload:
      </p>

      <pre><code>{`crypto_bench_async (Rust/Tokio)
    → rustls-openssl (patched)
        → qatprovider.so
            → OpenSSL 3.x (built from source)
                → qatlib (VFIO)
                    → QAT Hardware`}</code></pre>

      <p>
        This required applying two patches from the rustls-poc directory:
      </p>

      <ul>
        <li><strong>rustls.patch</strong> — Adds async non-blocking sign support</li>
        <li><strong>rustls-openssl.patch</strong> — Adds async-jobs feature and the benchmark binary</li>
      </ul>

      <h2>⚙️ Device Configuration</h2>

      <p>
        QAT devices can be configured for different modes — crypto (<code>sym;asym</code>) or
        data compression (<code>dc</code>). The configuration lives in sysfs:
      </p>

      <pre><code>{`# Reconfigure a QAT device
echo down > /sys/bus/pci/devices/<BDF>/qat/state
echo asym > /sys/bus/pci/devices/<BDF>/qat/cfg_services
echo up   > /sys/bus/pci/devices/<BDF>/qat/state`}</code></pre>

      <blockquote>
        <p>
          ⚠️ <strong>Important:</strong> This configuration is volatile — it resets on reboot.
          Production deployments need a systemd unit or udev rule to persist it.
        </p>
      </blockquote>

      <DriverComparison />

      <h2>📂 Key Files and Their Roles</h2>

      <ul>
        <li>📄 <code>e_qat.c</code> — Engine entry point (where we added weak symbol stubs)</li>
        <li>🔑 <code>qat_hw_rsa.c</code> — RSA sign/verify via QAT hardware CPA API</li>
        <li>✍️ <code>qat_hw_ec.c</code> — ECDSA sign/verify and ECDH key agreement</li>
        <li>🔄 <code>qat_hw_polling.c</code> — Background polling thread for completed QAT ops</li>
        <li>🏭 <code>qat_prov_init.c</code> — Provider entry point for OpenSSL 3.x</li>
        <li>⚙️ <code>configure.ac</code> — Autoconf: detects in-tree vs OOT driver</li>
      </ul>

      <h2>🎓 Key Learnings</h2>

      <ul>
        <li><strong>Weak symbols</strong> are a powerful C technique for cross-version library compatibility without breaking builds.</li>
        <li>The <strong>Engine vs Provider</strong> API distinction in OpenSSL matters — Engine is legacy but widely deployed, Provider is modern but requires OpenSSL 3.x.</li>
        <li><strong>IOMMU</strong> is a hard constraint: in-tree driver needs it on, OOT PF mode needs it off. Plan this at the infrastructure level.</li>
        <li>Sysfs device reconfiguration is <strong>volatile</strong> — always persist with systemd for production.</li>
        <li>Multi-thread scaling under the in-tree driver can <strong>degrade</strong> due to the shared allocator — this is why the OOT driver with thread-specific USDM exists.</li>
        <li>HAProxy needs to be <strong>built from source</strong> with <code>USE_ENGINE=1</code> for QAT support — distro packages typically omit it.</li>
      </ul>
    </>
  );
}
