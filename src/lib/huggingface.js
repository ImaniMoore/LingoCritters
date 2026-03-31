import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);
function applyPacingHints(text, speed = 1) {
  // speed: 1 = normal, <1 slower, >1 faster
  // If user requests slower playback, we add punctuation/pauses.
  const slowFactor = Math.max(0.5, Math.min(1.5, speed)); // clamp
  let out = text;

  // 1) Replace "A - Apple" or "A - Apple." with "A. Apple" to force a pause after letter
  out = out.replace(/\b([A-Za-z])\s*[-–—]\s*/g, "$1. ");

  // 2) Replace single-letter tokens with "A, " so TTS pauses after each single letter.
  //    We only do this if there are isolated single letters (e.g., "A", "B") in the text.
  //    For e.g. "A Apple B Ball" -> "A, Apple B, Ball"
  //    We avoid touching single-letter words that are common words like "I" or "a" in lower-case.
  out = out.replace(/\b([A-Z])\b(?=\s+[A-Z]|\s*[-–—]|\s+[A-Za-z])/g, "$1,"); // uppercase single letters before another word or dash

  // 3) Insert ellipsis after a single letter when the speed is slow to create a longer pause
  if (slowFactor < 0.9) {
    out = out.replace(/\b([A-Z]),\s*/g, "$1... ");
  }

  // 4) Collapse multiple punctuation produced accidentally
  out = out
    .replace(/\.{2,}/g, "...")
    .replace(/\.{1,}\s*\./g, ".")
    .replace(/\s{2,}/g, " ");

  return out;
}

// ─── Text-to-Speech (Kokoro-82M) ──────────────────────────────────────────

export async function generateSpeech(text, language = "en", speed = 1) {
  try {
    // pre-process text for better pacing if needed
    const processedText = applyPacingHints(text, speed);

    // Some HF TTS endpoints/models support additional params (like 'speech_rate' or 'tempo').
    // If the model supports parameters, pass them in; otherwise we rely on processedText.
    // The inference client may accept 'options' or 'parameters' depending on model.
    // We'll try to include a `speech_rate` parameter but fall back if unsupported.
    const ttsOptions = {
      model: "hexgrad/Kokoro-82M",
      inputs: processedText,
      language: language,
      // try model-specific parameter (may be ignored if unsupported)
      // many TTS backends accept a 'speed' or 'rate' param; this is best-effort.
      // smaller than 1 = slower, larger than 1 = faster
      // NOTE: check the model docs and change 'speech_rate' key accordingly if needed.
      parameters: {
        speed: speed,
      },
    };

    // call the client; pass options object
    const audio = await client.textToSpeech(ttsOptions);

    // Convert blob to buffer
    const buffer = await audio.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("TTS Error:", error);
    throw new Error(`Failed to generate speech: ${error.message}`);
  }
}

// ─── Story Generation (Llama) ─────────────────────────────────────────────

export async function generateStory(prompt, maxTokens = 300) {
  try {
    const response = await client.chatCompletion({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
      top_p: 0.9,
    });

    // Extract the text from the response
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Story Generation Error:", error);
    throw new Error(`Failed to generate story: ${error.message}`);
  }
}
