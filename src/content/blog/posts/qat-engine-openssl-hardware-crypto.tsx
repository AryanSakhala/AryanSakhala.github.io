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
    { label: "Application (HAProxy / Rustls)", color: "#58A6FF", desc: "TLS handshake requests" },
    { label: "OpenSSL 3.x", color: "#A371F7", desc: "Crypto dispatch layer" },
    { label: "QAT Engine / Provider", color: "#F0883E", desc: "Intercepts & redirects to HW" },
    { label: "qatlib (VFIO)", color: "#3FB950", desc: "Kernel driver interface" },
    { label: "QAT 4xxx Hardware", color: "#F85149", desc: "Crypto in silicon" },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <div className="text-center mb-6">
        <span className="text-xs text-[#F0883E] uppercase tracking-[0.15em] font-mono">
          Data Flow Visualization
        </span>
        <p className="text-sm text-[#8B949E] mt-1">How a crypto operation flows from app to hardware</p>
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
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: step >= i ? layer.color : "#30363D" }}
              />
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
                  ← active
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

      <div className="mt-6 text-center">
        <span className="text-sm" style={{ color: layers[step].color }}>
          {layers[step].label}
        </span>
        <p className="text-xs text-[#8B949E] mt-1">{layers[step].desc}</p>
      </div>
    </div>
  );
}

// Benchmark results visualization
function BenchmarkResults() {
  const data = [
    { label: "Software (Ring)", value: 1035, max: 60000, color: "#F85149" },
    { label: "AWS-LC", value: 1743, max: 60000, color: "#D29922" },
    { label: "OpenSSL SW", value: 1744, max: 60000, color: "#A371F7" },
    { label: "QAT HW", value: 58629, max: 60000, color: "#3FB950" },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <div className="text-center mb-6">
        <span className="text-xs text-[#3FB950] uppercase tracking-[0.15em] font-mono">
          RSA-2048 Sign Performance
        </span>
        <p className="text-sm text-[#8B949E] mt-1">Operations per second (higher is better)</p>
      </div>

      <div className="space-y-4 max-w-lg mx-auto">
        {data.map((item, i) => (
          <div key={item.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#E6EDF3] font-mono">{item.label}</span>
              <span style={{ color: item.color }}>{item.value.toLocaleString()} ops/s</span>
            </div>
            <div className="h-3 bg-[#21262D] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / item.max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-[#161B22] rounded-lg text-center">
        <span className="text-sm text-[#3FB950] font-mono">56.6x speedup</span>
        <span className="text-xs text-[#8B949E] ml-2">QAT HW vs Ring software baseline</span>
      </div>
    </div>
  );
}

export default function QatEngineOpensslHardwareCrypto() {
  return (
    <>
      <p>
        When we think about TLS performance, we usually accept that cryptographic operations are
        just &quot;expensive&quot; — a cost of doing business for secure connections. But Intel&apos;s{" "}
        <strong>QuickAssist Technology (QAT)</strong> changes that equation entirely. This is the
        story of building, patching, and deploying the QAT Engine to offload crypto operations from
        CPU to dedicated hardware — achieving a 56x speedup on RSA-2048 signing.
      </p>

      <h2>The Problem</h2>

      <p>
        Every TLS handshake requires the server to perform a <strong>private key signing operation</strong>.
        For RSA-2048, this is a modular exponentiation (<code>m^d mod n</code>). On a standard CPU,
        a single core manages about <strong>1,000–1,700 signs per second</strong>. For high-throughput
        services — think a vector database like Qdrant serving thousands of concurrent connections — this
        becomes the bottleneck.
      </p>

      <p>
        Intel QAT is a dedicated co-processor that sits on the motherboard alongside the CPU. Instead
        of the CPU doing the signing math, you send the numbers to QAT hardware, it computes the result
        in silicon, and sends the answer back.
      </p>

      <QATArchitectureFlow />

      <h2>The Codebase: QAT Engine v2.0.0b</h2>

      <p>
        The QAT Engine repository (~60,000 lines of C + docs + patches) builds two outputs from the
        same codebase:
      </p>

      <ul>
        <li><strong>qatengine.so</strong> — OpenSSL Engine API (legacy, used by HAProxy/NGINX)</li>
        <li><strong>qatprovider.so</strong> — OpenSSL 3.x Provider API (modern, used by Rustls)</li>
      </ul>

      <p>
        The build flag <code>--enable-qat_provider</code> switches which output you get. Both share 
        the same core C files for QAT hardware interaction.
      </p>

      <h2>Phase 1: Building from Source — The Linker Error</h2>

      <p>
        Building against the system&apos;s in-tree qatlib 24.02.0:
      </p>

      <pre><code>{`./autogen.sh
./configure --with-qat_hw_dir=/usr
make -j$(nproc)

# Result: undefined symbol: icp_sal_AsymGetInflightRequests`}</code></pre>

      <p>
        The function <code>icp_sal_AsymGetInflightRequests()</code> is used for congestion
        management — checking how many crypto operations are in-flight on the hardware. It was added
        in qatlib <strong>24.09.0+</strong>, but our system had <strong>24.02.0</strong>. The header
        was shipped, but the implementation wasn&apos;t linked into libqat.so.
      </p>

      <h3>The Fix: Weak Symbol Stubs</h3>

      <p>
        We added weak symbol fallbacks in <code>e_qat.c</code>:
      </p>

      <pre><code>{`#ifdef QAT_HW_INTREE
__attribute__((weak))
CpaStatus icp_sal_AsymGetInflightRequests(
    CpaInstanceHandle instanceHandle,
    Cpa32U *maxInflightRequests,
    Cpa32U *numInflightRequests)
{
    if (maxInflightRequests) *maxInflightRequests = 1;
    if (numInflightRequests) *numInflightRequests = 0;
    return CPA_STATUS_SUCCESS;
}
#endif`}</code></pre>

      <p>
        The <code>__attribute__((weak))</code> trick means: if the real qatlib provides these symbols
        at runtime, they override our stubs. If not, our stubs return &quot;no congestion&quot; so the
        engine loads fine. This is safe because it just disables congestion-based throttling.
      </p>

      <h2>Phase 2: Qdrant + HAProxy Integration</h2>

      <p>
        Qdrant itself does <strong>zero cryptography</strong>. The integration puts HAProxy as a TLS
        termination proxy in front of Qdrant:
      </p>

      <pre><code>{`Client (HTTPS) → HAProxy :8443 → Qdrant :6333 (HTTP)
                     │
                     └── ssl-engine qatengine algo RSA
                         (offloads TLS signing to QAT HW)`}</code></pre>

      <p>
        HAProxy was rebuilt from source with <code>USE_ENGINE=1</code> since the system package
        didn&apos;t include engine support. Qdrant required CPU limiting (<code>--cpus=8</code>)
        because its Actix-rt framework panics on 256-core systems.
      </p>

      <h2>Phase 3: Rustls PoC — Replicating Intel's Benchmark</h2>

      <p>
        The benchmark path uses patched Rust crates for async QAT offload:
      </p>

      <pre><code>{`crypto_bench_async (Rust/Tokio binary)
    → rustls-openssl (patched crate)
        → qatprovider.so (OpenSSL 3.x Provider)
            → OpenSSL 3.5.0 (built from source)
                → qatlib (VFIO)
                    → QAT 4xxx Hardware`}</code></pre>

      <p>
        This required building OpenSSL 3.5.0 from source, rebuilding the QAT code as a Provider
        (not Engine), and applying two patches from the rustls-poc directory:
      </p>

      <ul>
        <li><strong>rustls.patch</strong> — Adds async non-blocking sign support to rustls v0.23.33</li>
        <li><strong>rustls-openssl.patch</strong> — Adds async-jobs feature, batched worker loop, and the benchmark binary</li>
      </ul>

      <h2>Phase 4: Device Optimization</h2>

      <p>
        The system had 4 QAT Gen4 devices across 2 NUMA nodes, but only 2 were configured for
        crypto (<code>sym;asym</code>) — the other 2 were set to data compression (<code>dc</code>).
        Reconfiguring all 4 to <code>sym;asym</code> via sysfs doubled the crypto capacity:
      </p>

      <pre><code>{`# Bring down, reconfigure, bring up
echo down > /sys/bus/pci/devices/XXXX/qat/state
echo asym > /sys/bus/pci/devices/XXXX/qat/cfg_services
echo up   > /sys/bus/pci/devices/XXXX/qat/state`}</code></pre>

      <BenchmarkResults />

      <h2>The Driver Architecture — In-Tree vs Out-of-Tree</h2>

      <p>
        Understanding the two driver types is critical:
      </p>

      <ul>
        <li><strong>In-Tree (qatlib)</strong> — Ships with the Linux kernel, uses VFIO for
          userspace access via Virtual Functions, managed by <code>qatmgr</code>. Requires IOMMU
          enabled. Uses a shared memory allocator (causes contention under multi-threading).</li>
        <li><strong>Out-of-Tree (OOT)</strong> — Downloaded from Intel separately, uses UIO/USDM
          with thread-specific DMA allocators (zero contention). Requires IOMMU <strong>disabled</strong>
          in PF mode.</li>
      </ul>

      <p>
        We attempted the OOT driver for its thread-specific USDM allocator but hit:
        <code>Cannot use PF with IOMMU enabled and SVM off</code>. The system&apos;s IOMMU
        couldn&apos;t be disabled without a reboot, so we proceeded with the in-tree driver.
      </p>

      <h2>Final Results</h2>

      <pre><code>{`Algorithm         | Software (Ring) | QAT HW        | Speedup
RSA-2048 Sign     | 1,035 ops/s     | 58,629 ops/s   | 56.6x
ECDSA P-384 Sign  | 896 ops/s       | 57,881 ops/s   | 64.6x

vs Intel Chart Reference:
RSA-2048:   58,629 → 84% of ~70,000 target
ECDSA P-384: 57,881 → 118% of ~49,000 (exceeded!)`}</code></pre>

      <h2>Key Files and Their Roles</h2>

      <ul>
        <li><code>e_qat.c</code> — Engine entry point, the only file we modified (weak symbol stubs)</li>
        <li><code>qat_hw_rsa.c</code> — RSA sign/verify via QAT hardware CPA API</li>
        <li><code>qat_hw_ec.c</code> — ECDSA sign/verify and ECDH key agreement</li>
        <li><code>qat_hw_polling.c</code> — Background thread polling for completed QAT operations</li>
        <li><code>qat_prov_init.c</code> — Provider entry point for OpenSSL 3.x</li>
        <li><code>configure.ac</code> — Autoconf detection of in-tree vs OOT driver</li>
      </ul>

      <h2>Lessons Learned</h2>

      <ul>
        <li>Weak symbols are a powerful C technique for cross-version library compatibility.</li>
        <li>The OpenSSL Engine vs Provider API distinction matters — Engine is legacy but widely used, Provider is modern but requires OpenSSL 3.x.</li>
        <li>IOMMU configuration is a hard constraint for OOT driver PF mode — plan for this at the infrastructure level.</li>
        <li>Sysfs device reconfiguration is volatile — it resets on reboot. Production deployments need a systemd unit or udev rule.</li>
        <li>Multi-thread scaling under the in-tree driver degrades due to shared allocator contention — 2 threads performed worse than 1 thread on both RSA and ECDSA.</li>
      </ul>
    </>
  );
}
