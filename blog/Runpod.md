## RunPod Mental Model

### 1. Architecture: Template → Pod → Endpoint

```
Template (reusable config blueprint)
   └── Pod (running GPU instance from template)
        └── Endpoint (proxy URL to access your service)
```

### 2. Two APIs

| Method | URL | Notes |
|--------|-----|-------|
| **CLI** (`runpodctl`) | Wraps GraphQL | Newer syntax: `runpodctl pod create`, old `runpodctl create pod` is deprecated. CLI has bugs (doesn't pass disk sizes from templates). |
| **REST API** | `https://rest.runpod.io/v1/pods` | Full control, no bugs. Use this for production. Auth via `Authorization: Bearer <API_KEY>`. |

### 3. Credentials Setup

```bash
# Install
wget https://github.com/runpod/runpodctl/releases/download/v2.1.3/runpodctl-linux-amd64.tar.gz -O /tmp/r.tar.gz
tar -xzf /tmp/r.tar.gz -C /tmp/ && sudo mv /tmp/runpodctl /usr/local/bin/

# Configure (saves to ~/.runpod/config.toml)
runpodctl config --apiKey YOUR_KEY
```

API key from: https://www.runpod.io/console/user/settings

### 4. The REST API Pod Create Call (what actually worked)

```bash
curl --request POST \
  --url https://rest.runpod.io/v1/pods \
  --header "Authorization: Bearer $API_KEY" \
  --header "Content-Type: application/json" \
  --data '{...}'
```

**Arguments explained:**

| Field | Value | Meaning |
|-------|-------|---------|
| `name` | `"vllm-qwen3.5-27b"` | Display name (cosmetic) |
| `imageName` | `"vllm/vllm-openai:qwen3_5-cu130"` | Docker image from Docker Hub. This image has `ENTRYPOINT ["python3", "-m", "vllm.entrypoints.openai.api_server"]` |
| `gpuTypeIds` | `["NVIDIA B200"]` | GPU type. Array because you can list fallbacks. Use `runpodctl gpu list` to see valid IDs. |
| `gpuCount` | `1` | Number of GPUs. Must match `--tensor-parallel-size` |
| `containerDiskInGb` | `100` | Ephemeral disk (wiped on restart). Must fit the Docker image + model weights during download. Default is only 20-50GB — **this was the first bug** |
| `volumeInGb` | `100` | Persistent disk (survives restarts). Mounted at `volumeMountPath` |
| `volumeMountPath` | `"/root/.cache/huggingface"` | Where HuggingFace caches models. Persists downloads across restarts |
| `ports` | `["8000/http", "22/tcp"]` | `http` = accessible via RunPod proxy URL. `tcp` = direct IP access (SSH) |
| `dockerEntrypoint` | `["bash", "-c"]` | **Overrides** the image's ENTRYPOINT. We needed this to inject the `LD_LIBRARY_PATH` fix |
| `dockerStartCmd` | `["export LD_LIBRARY_PATH=... && python3 -m vllm..."]` | **Overrides** the image's CMD. When entrypoint is `bash -c`, this becomes the shell command |
| `env` | `{"HUGGING_FACE_HUB_TOKEN": "..."}` | Environment variables injected into the container |
| `cloudType` | `"SECURE"` | Secure Cloud (dedicated hardware) vs `COMMUNITY` (shared, cheaper) |

### 5. Docker Entrypoint vs CMD (key concept)

```
Normal vLLM image:
  ENTRYPOINT: ["python3", "-m", "vllm.entrypoints.openai.api_server"]
  CMD: (empty — args come from dockerStartCmd)
  
  Final command = ENTRYPOINT + CMD
  = python3 -m vllm.entrypoints.openai.api_server --model Qwen/...

What we did (to inject LD_LIBRARY_PATH fix):
  ENTRYPOINT: ["bash", "-c"]          ← override
  CMD: ["export LD_LIBRARY_PATH=... && python3 -m vllm..."]  ← full command as string
  
  Final command = bash -c "export LD_LIBRARY_PATH=... && python3 -m vllm..."
```

### 6. The Two Bugs We Hit

**Bug 1 — Disk too small:** `runpodctl pod create --template-id=X` ignores the template's `containerDiskInGb` and defaults to 20GB. A 27B model needs ~50GB weights. Container filled up → crash loop. **Fix:** Use REST API with explicit `containerDiskInGb: 100`.

**Bug 2 — cuda-compat conflict:** The `cu130` image ships cuda-compat libraries that shadow the host driver's `libcuda.so`. Driver 580 + CUDA 13.0 are compatible, but the container's `/usr/local/cuda/compat/libcuda.so` takes priority and breaks things. **Fix:** `export LD_LIBRARY_PATH=/lib/x86_64-linux-gnu:$LD_LIBRARY_PATH` forces the linker to find the host's real driver libraries first.

### 7. Endpoint URL Pattern

```
https://<POD_ID>-<PORT>.proxy.runpod.net
```

For your pod:
```
https://p5bch5rg5h1xzb-8000.proxy.runpod.net/v1
```

OpenAI-compatible, so you can use it with any OpenAI SDK by setting `base_url`.

### 8. Useful Commands

```bash
runpodctl gpu list              # Available GPU types + stock
runpodctl pod list              # Your running pods
runpodctl pod remove <ID>       # Delete a pod
runpodctl ssh info <ID>         # SSH connection details

# Monitor via GraphQL API
curl -H "Authorization: Bearer $KEY" \
  https://api.runpod.io/graphql \
  -d '{"query":"{ pod(input:{podId:\"<ID>\"}) { runtime { uptimeInSeconds gpus { memoryUtilPercent } } } }"}'
```

### 9. Logs

RunPod has **no API for container logs**. Only available via the web console: https://www.runpod.io/console/pods → click pod → Logs tab. This is critical for debugging.