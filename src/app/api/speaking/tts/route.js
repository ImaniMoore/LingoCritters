import { generateSpeech } from "../../../../lib/huggingface";

export async function POST(request) {
  try {
    const { text, language = "en", speed = 1 } = await request.json();

    if (!text) {
      return Response.json({ error: "Text is required" }, { status: 400 });
    }

    // pass speed through to huggingface wrapper
    const audioBuffer = await generateSpeech(
      text,
      language,
      Number(speed) || 1,
    );

    // Return audio as base64 for easy transmission
    const base64Audio = audioBuffer.toString("base64");

    return Response.json({
      success: true,
      audio: base64Audio,
      mimeType: "audio/wav",
      duration: estimateDuration(text, Number(speed) || 1),
      speed: Number(speed) || 1,
    });
  } catch (error) {
    console.error("TTS Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// Helper: estimate audio duration from text and speed multiplier
function estimateDuration(text, speed = 1) {
  // baseline words per second at normal speed
  const avgWordsPerSecond = 2.5;
  const wordCount = text.trim().length === 0 ? 0 : text.split(/\s+/).length;

  // if speed > 1, audio is faster -> shorter duration
  // if speed < 1, audio is slower -> longer duration
  const wordsPerSecond = avgWordsPerSecond * (speed || 1);
  const secs =
    wordsPerSecond > 0
      ? wordCount / wordsPerSecond
      : Math.ceil(wordCount / avgWordsPerSecond);
  return Math.max(1, Math.ceil(secs));
}
