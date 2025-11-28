// server.js
import express from "express";
import bodyParser from "body-parser";
import { spawn } from "child_process";
import fs from "fs";

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

const PORT = process.env.PORT || 3001;
const LLAMA_BIN = "/path/to/llama.cpp/main";      // replace with your built llama.cpp binary
const LLAMA_MODEL = "/path/to/ggml-model-q4_0.bin";

const WHISPER_BIN = "/path/to/whisper.cpp/main";  // replace with your whisper.cpp binary
const WHISPER_MODEL = "/path/to/ggml-large.bin";  // if used

// Utility to run a binary with args and capture stdout
function runProcess(cmd, args = [], input = null) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args);
    let out = "", err = "";

    if (input) p.stdin.write(input);
    if (input) p.stdin.end();

    p.stdout.on("data", (d) => (out += d.toString()));
    p.stderr.on("data", (d) => (err += d.toString()));
    p.on("close", (code) => {
      if (code === 0) resolve(out.trim());
      else reject(new Error(`Exit ${code}: ${err}`));
    });
  });
}

// Endpoint: transcribe audio (POST with base64 audio or path)
app.post("/api/transcribe", async (req, res) => {
  try {
    const { audioBase64 } = req.body;
    if (!audioBase64) return res.status(400).json({ error: "audioBase64 missing" });

    // Save temp file
    const tmpPath = "./tmp_audio.wav";
    const buffer = Buffer.from(audioBase64, "base64");
    fs.writeFileSync(tmpPath, buffer);

    // Call whisper.cpp (example args - adjust to your build)
    // whisper.cpp usage varies; many builds accept: ./main -m model.bin -f audio.wav
    const out = await runProcess(WHISPER_BIN, ["-m", WHISPER_MODEL, "-f", tmpPath, "-otxt"]);
    // `out` is transcripts — you may need to parse

    fs.unlinkSync(tmpPath);
    return res.json({ transcript: out });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint: generate text from prompt using llama.cpp
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, max_tokens = 128 } = req.body;
    if (!prompt) return res.status(400).json({ error: "prompt missing" });

    // Example llama.cpp usage (non-interactive)
    // Many builds support: ./main -m model.bin -p "Prompt here" -n 128
    const args = ["-m", LLAMA_MODEL, "-p", prompt, "-n", String(max_tokens)];
    const out = await runProcess(LLAMA_BIN, args);
    // Parse output (llama.cpp prints responses to stdout)
    return res.json({ result: out });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`AI backend listening on http://localhost:${PORT}`);
});
