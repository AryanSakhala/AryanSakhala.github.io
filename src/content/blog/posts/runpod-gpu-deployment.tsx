"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Architecture visualization
function RunPodArchitecture() {
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const layers = [
    {
      name: "Template",
      emoji: "📋",
      desc: "Reusable blueprint — Docker image, env vars, ports, disk sizes",
      color: "#58A6FF",
      details: ["Docker image URL", "Environment variables", "Exposed ports", "Disk configuration"],
    },
    {
      name: "Pod",
      emoji: "🖥️",
      desc: "Running GPU instance created from a template",
      color: "#3FB950",
      details: ["GPU allocation", "Volume mounts", "Running containers", "SSH access"],
    },
    {
      name: "Endpoint",
      emoji: "🔗",
      desc: "Proxy URL that exposes your service to the outside",
      color: "#F0883E",
      details: ["https://<POD_ID>-<PORT>.proxy.runpod.net", "OpenAI-compatible API", "Direct IP for TCP"],
    },
  ];

  return (
    <div className="my-10 p-8 bg-[#0D1117] rounded-lg border border-[#30363D]">
      <div className="text-center mb-6">
        <span className="text-xs text-[#58A6FF] uppercase tracking-[0.15em] font-mono">
          🏗️ Three-Layer Architecture
        </span>
      </div>

      <div className="flex justify-center items-center gap-2 mb-8 flex-wrap">
        {layers.map((layer, i) => (
          <div key={layer.name} className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: activeLayer === i ? 1.05 : 1,
                borderColor: activeLayer === i ? layer.color : "#30363D",
                boxShadow: activeLayer === i ? `0 0 20px ${layer.color}30` : "none",
              }}
              className="px-4 py-3 bg-[#161B22] rounded-lg border-2 text-center cursor-pointer min-w-[100px]"
              onClick={() => setActiveLayer(i)}
            >
              <span className="text-2xl block mb-1">{layer.emoji}</span>
              <span className="text-xs font-mono" style={{ color: layer.color }}>{layer.name}</span>
            </motion.div>
            {i < layers.length - 1 && (
              <motion.span
                animate={{ color: activeLayer > i ? "#3FB950" : "#30363D" }}
                className="text-lg hidden sm:block"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>

      <motion.div
        key={activeLayer}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-[#161B22] rounded-lg border"
        style={{ borderColor: `${layers[activeLayer].color}40` }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{layers[activeLayer].emoji}</span>
          <span className="text-sm font-mono font-bold" style={{ color: layers[activeLayer].color }}>
            {layers[activeLayer].name}
          </span>
          <span className="text-xs text-[#8B949E]">— {layers[activeLayer].desc}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {layers[activeLayer].details.map((detail, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-[#E6EDF3]">
              <span style={{ color: layers[activeLayer].color }}>▸</span>
              <span className="font-mono text-[10px]">{detail}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Bug cards
function BugCard({ emoji, title, problem, fix, color }: {
  emoji: string; title: string; problem: string; fix: string; color: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: color }}
      className="p-5 bg-[#161B22] rounded-lg border border-[#30363D] transition-all"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{emoji}</span>
        <h4 className="text-sm font-mono font-bold" style={{ color }}>{title}</h4>
      </div>
      <div className="space-y-3">
        <div>
          <span className="text-[10px] text-[#F85149] uppercase tracking-wider font-mono">❌ Problem</span>
          <p className="text-xs text-[#8B949E] mt-1">{problem}</p>
        </div>
        <div>
          <span className="text-[10px] text-[#3FB950] uppercase tracking-wider font-mono">✅ Fix</span>
          <p className="text-xs text-[#E6EDF3] mt-1">{fix}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function RunpodGpuDeployment() {
  return (
    <>
      <p>
        When deploying large language models on GPU cloud infrastructure, understanding the mental
        model of how services like RunPod work is essential. This guide captures the architecture,
        the APIs, the pitfalls, and the debugging patterns learned from deploying a large parameter
        model on GPU cloud.
      </p>

      <RunPodArchitecture />

      <h2>🔌 The Two APIs</h2>

      <p>
        RunPod exposes two ways to interact:
      </p>

      <ul>
        <li>🖥️ <strong>CLI</strong> (<code>runpodctl</code>) — wraps GraphQL, convenient but has known bugs (e.g., ignores template disk sizes)</li>
        <li>🌐 <strong>REST API</strong> at <code>https://rest.runpod.io/v1/pods</code> — full control, more reliable for production</li>
      </ul>

      <h2>📡 The REST API Pod Create Call</h2>

      <p>
        The key fields in a pod creation request and what they control:
      </p>

      <pre><code>{`POST https://rest.runpod.io/v1/pods
Authorization: Bearer <API_KEY>
Content-Type: application/json

{
  "name": "model-deployment",
  "imageName": "vllm/vllm-openai:latest",
  "gpuTypeIds": ["NVIDIA B200"],
  "gpuCount": 1,
  "containerDiskInGb": 100,      ← ephemeral, wiped on restart
  "volumeInGb": 100,             ← persistent, survives restarts
  "volumeMountPath": "/root/.cache/huggingface",
  "ports": ["8000/http", "22/tcp"],
  "cloudType": "SECURE"
}`}</code></pre>

      <div className="my-8 p-6 bg-[#0D1117] rounded-lg border border-[#30363D]">
        <div className="text-xs text-[#58A6FF] font-mono uppercase tracking-wider mb-4">📋 Field Reference</div>
        <div className="space-y-3">
          {[
            { icon: "💾", field: "containerDiskInGb", desc: "Ephemeral disk — wiped on restart. Must fit Docker image + model weights. Default is only 20-50GB!" },
            { icon: "📦", field: "volumeInGb", desc: "Persistent disk — survives restarts. Mounted at volumeMountPath." },
            { icon: "📂", field: "volumeMountPath", desc: "Set to /root/.cache/huggingface so model downloads persist across restarts." },
            { icon: "🔌", field: "ports", desc: "http ports get RunPod proxy URL. tcp ports provide direct IP access (SSH)." },
            { icon: "🎮", field: "gpuTypeIds", desc: "Array of GPU type strings. Can list multiple as fallbacks." },
          ].map((item) => (
            <div key={item.field} className="flex items-start gap-3">
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <div>
                <code className="text-xs text-[#58A6FF]">{item.field}</code>
                <p className="text-xs text-[#8B949E] mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2>🐳 Docker Entrypoint vs CMD</h2>

      <p>
        Understanding Docker&apos;s ENTRYPOINT and CMD interaction is critical when injecting
        environment fixes. The final command is <code>ENTRYPOINT + CMD</code>:
      </p>

      <pre><code>{`# Normal vLLM image:
ENTRYPOINT: ["python3", "-m", "vllm.entrypoints.openai.api_server"]
CMD: (args from dockerStartCmd)
→ python3 -m vllm.entrypoints.openai.api_server --model ...

# Override pattern (for env fixes):
ENTRYPOINT: ["bash", "-c"]           ← override
CMD: ["export LD_LIBRARY_PATH=... && python3 -m vllm..."]
→ bash -c "export LD_LIBRARY_PATH=... && python3 -m vllm..."`}</code></pre>

      <h2>🐛 The Two Bugs We Encountered</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <BugCard
          emoji="💾"
          title="Disk Too Small"
          problem="runpodctl ignores template's containerDiskInGb and defaults to 20GB. Large models need 50GB+ for weights alone — container crash-loops."
          fix="Use the REST API with explicit containerDiskInGb: 100."
          color="#F85149"
        />
        <BugCard
          emoji="⚡"
          title="CUDA-Compat Library Conflict"
          problem="CUDA 13.0 container ships compat libraries that shadow the host driver's libcuda.so, breaking GPU access despite compatible host drivers."
          fix="export LD_LIBRARY_PATH=/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH — forces host driver libs first."
          color="#D29922"
        />
      </div>

      <h2>🔗 Endpoint URL Pattern</h2>

      <p>
        Once a pod is running, the proxy URL follows a predictable pattern:
      </p>

      <div className="my-6 p-4 bg-[#161B22] rounded-lg border border-[#58A6FF]/30 text-center">
        <code className="text-sm text-[#58A6FF]">
          https://&lt;POD_ID&gt;-&lt;PORT&gt;.proxy.runpod.net
        </code>
        <p className="text-xs text-[#8B949E] mt-2">
          🔄 OpenAI-compatible — any OpenAI SDK works by setting <code>base_url</code>
        </p>
      </div>

      <h2>🛠️ Useful Operations Commands</h2>

      <pre><code>{`# 📋 List available GPU types and stock
runpodctl gpu list

# 🖥️ List your running pods
runpodctl pod list

# 🗑️ Delete a pod
runpodctl pod remove <ID>

# 🔑 SSH connection details
runpodctl ssh info <ID>`}</code></pre>

      <h2>📊 Monitoring via GraphQL</h2>

      <p>
        For programmatic monitoring, RunPod&apos;s GraphQL API provides GPU utilization and uptime:
      </p>

      <pre><code>{`curl -H "Authorization: Bearer $KEY" \\
  https://api.runpod.io/graphql \\
  -d '{"query":"{ pod(input:{podId:\\"<ID>\\"}) { 
    runtime { 
      uptimeInSeconds 
      gpus { memoryUtilPercent } 
    } 
  } }"}'`}</code></pre>

      <h2>⚠️ Critical Limitation: No Log API</h2>

      <div className="my-6 p-5 bg-[#F85149]/10 rounded-lg border border-[#F85149]/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🚫</span>
          <span className="text-sm font-mono text-[#F85149] font-bold">No Container Log API</span>
        </div>
        <p className="text-xs text-[#E6EDF3]">
          RunPod has <strong>no API for container logs</strong>. Logs are only available via the web
          console. Plan your logging strategy to push to an external service rather than relying
          on container stdout.
        </p>
      </div>

      <h2>🎓 Key Takeaways</h2>

      <ul>
        <li>🌐 Always use the <strong>REST API</strong> for production — the CLI has known bugs with parameter passing.</li>
        <li>💾 Set <code>containerDiskInGb</code> explicitly — never rely on defaults for large models.</li>
        <li>📦 Mount the HuggingFace cache to a <strong>persistent volume</strong> to avoid re-downloading models on restart.</li>
        <li>⚡ Watch for <strong>CUDA-compat library shadowing</strong> — use <code>LD_LIBRARY_PATH</code> overrides when needed.</li>
        <li>🔄 The OpenAI-compatible endpoint pattern makes RunPod pods <strong>drop-in replacements</strong> for any OpenAI SDK workflow.</li>
      </ul>
    </>
  );
}
