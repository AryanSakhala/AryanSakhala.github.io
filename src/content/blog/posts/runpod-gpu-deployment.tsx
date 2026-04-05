"use client";

export default function RunpodGpuDeployment() {
  return (
    <>
      <p>
        When deploying large language models on GPU cloud infrastructure, understanding the mental
        model of how services like RunPod work is essential. This guide captures the architecture,
        the APIs, the pitfalls, and the debugging patterns from deploying a 27B parameter model
        on GPU cloud.
      </p>

      <h2>Architecture: Template → Pod → Endpoint</h2>

      <p>
        RunPod follows a three-layer abstraction model. A <strong>Template</strong> is a reusable
        configuration blueprint — it defines the Docker image, environment variables, ports, and
        disk sizes. A <strong>Pod</strong> is a running GPU instance created from a template. An{" "}
        <strong>Endpoint</strong> is the proxy URL that lets you access your service from the outside.
      </p>

      <pre><code>{`Template (reusable config blueprint)
   └── Pod (running GPU instance from template)
        └── Endpoint (proxy URL to access your service)`}</code></pre>

      <h2>The Two APIs</h2>

      <p>
        RunPod exposes two ways to interact: a <strong>CLI</strong> (<code>runpodctl</code>) that wraps
        GraphQL, and a <strong>REST API</strong> at <code>https://rest.runpod.io/v1/pods</code> with
        full control. The CLI has known bugs — for instance, it doesn't pass disk sizes from templates.
        The REST API is more reliable for production use.
      </p>

      <h2>The REST API Pod Create Call</h2>

      <p>
        The key fields in a pod creation request and what they mean:
      </p>

      <pre><code>{`POST https://rest.runpod.io/v1/pods
Authorization: Bearer <API_KEY>
Content-Type: application/json

{
  "name": "model-deployment",
  "imageName": "vllm/vllm-openai:latest",
  "gpuTypeIds": ["NVIDIA B200"],
  "gpuCount": 1,
  "containerDiskInGb": 100,
  "volumeInGb": 100,
  "volumeMountPath": "/root/.cache/huggingface",
  "ports": ["8000/http", "22/tcp"],
  "cloudType": "SECURE"
}`}</code></pre>

      <ul>
        <li><strong>containerDiskInGb</strong> — Ephemeral disk (wiped on restart). Must fit the Docker image + model weights during download. Default is only 20-50GB — this was the first critical bug we hit.</li>
        <li><strong>volumeInGb</strong> — Persistent disk (survives restarts). Mounted at <code>volumeMountPath</code>.</li>
        <li><strong>volumeMountPath</strong> — Set to <code>/root/.cache/huggingface</code> so model downloads persist across restarts.</li>
        <li><strong>ports</strong> — <code>http</code> ports are accessible via RunPod proxy URL. <code>tcp</code> ports provide direct IP access (SSH).</li>
        <li><strong>gpuTypeIds</strong> — Array of GPU type strings. Can list fallbacks.</li>
      </ul>

      <h2>Docker Entrypoint vs CMD — Key Concept</h2>

      <p>
        Understanding Docker's ENTRYPOINT and CMD interaction is critical when deploying custom
        configurations. The final command a container runs is <code>ENTRYPOINT + CMD</code>.
      </p>

      <pre><code>{`# Normal vLLM image:
ENTRYPOINT: ["python3", "-m", "vllm.entrypoints.openai.api_server"]
CMD: (args from dockerStartCmd)
Final: python3 -m vllm.entrypoints.openai.api_server --model ...

# Override pattern (for injecting env fixes):
ENTRYPOINT: ["bash", "-c"]           ← override
CMD: ["export LD_LIBRARY_PATH=... && python3 -m vllm..."]
Final: bash -c "export LD_LIBRARY_PATH=... && python3 -m vllm..."`}</code></pre>

      <h2>The Two Bugs We Encountered</h2>

      <h3>Bug 1: Disk Too Small</h3>

      <p>
        <code>runpodctl pod create --template-id=X</code> ignores the template's{" "}
        <code>containerDiskInGb</code> and defaults to 20GB. A 27B parameter model needs ~50GB
        for weights alone. The container filled up and crash-looped.
      </p>

      <p>
        <strong>Fix:</strong> Use the REST API with explicit <code>containerDiskInGb: 100</code>.
      </p>

      <h3>Bug 2: CUDA-Compat Library Conflict</h3>

      <p>
        The CUDA 13.0 container image ships cuda-compat libraries that shadow the host driver's{" "}
        <code>libcuda.so</code>. Even though the host driver (580) and CUDA 13.0 are compatible,
        the container's <code>/usr/local/cuda/compat/libcuda.so</code> takes priority in the linker
        search path and breaks things.
      </p>

      <p>
        <strong>Fix:</strong>
      </p>

      <pre><code>{`export LD_LIBRARY_PATH=/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH`}</code></pre>

      <p>
        This forces the dynamic linker to find the host's real driver libraries first before
        falling back to the container's compat libraries.
      </p>

      <h2>Endpoint URL Pattern</h2>

      <p>
        Once a pod is running, the proxy URL follows a predictable pattern:
      </p>

      <pre><code>{`https://<POD_ID>-<PORT>.proxy.runpod.net`}</code></pre>

      <p>
        This URL is OpenAI-compatible, so any OpenAI SDK can use it by setting <code>base_url</code>.
        This makes integration with existing LLM pipelines seamless.
      </p>

      <h2>Useful Operations Commands</h2>

      <pre><code>{`# List available GPU types and stock
runpodctl gpu list

# List your running pods
runpodctl pod list

# Delete a pod
runpodctl pod remove <ID>

# SSH connection details
runpodctl ssh info <ID>`}</code></pre>

      <h2>Monitoring via GraphQL</h2>

      <p>
        For programmatic monitoring, RunPod's GraphQL API provides GPU utilization and uptime:
      </p>

      <pre><code>{`curl -H "Authorization: Bearer $KEY" \\
  https://api.runpod.io/graphql \\
  -d '{"query":"{ pod(input:{podId:\\"<ID>\\"}) { 
    runtime { 
      uptimeInSeconds 
      gpus { memoryUtilPercent } 
    } 
  } }"}'`}</code></pre>

      <h2>Critical Limitation: No Log API</h2>

      <p>
        RunPod has <strong>no API for container logs</strong>. Logs are only available via the web
        console. This is a significant limitation for automated debugging and monitoring. Plan
        your logging strategy to push logs to an external service (e.g., a logging endpoint
        within your application) rather than relying on container stdout.
      </p>

      <h2>Key Takeaways</h2>

      <ul>
        <li>Always use the REST API for production deployments — the CLI has known bugs with parameter passing.</li>
        <li>Set <code>containerDiskInGb</code> explicitly — never rely on defaults for large models.</li>
        <li>Mount the HuggingFace cache to a persistent volume to avoid re-downloading models on restart.</li>
        <li>Watch for CUDA-compat library shadowing — use <code>LD_LIBRARY_PATH</code> overrides when needed.</li>
        <li>The OpenAI-compatible endpoint pattern makes RunPod pods drop-in replacements for any OpenAI SDK-based workflow.</li>
      </ul>
    </>
  );
}
