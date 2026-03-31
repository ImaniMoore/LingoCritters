import { generateStory } from "../../../../lib/huggingface";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { level, language, lessonTopic } = await request.json();

    if (!level || !language) {
      return NextResponse.json(
        { error: "Level and language are required" },
        { status: 400 },
      );
    }

    // Map level to prompt complexity and word count
    const levelConfig = {
      1: {
        description: "very simple alphabet and letter sounds",
        wordCount: 15,
        maxTokens: 100,
      },
      2: {
        description: "simple 40-word lesson with basic vocabulary",
        wordCount: 40,
        maxTokens: 150,
      },
      3: {
        description: "60-word lesson with short phrases and sentences",
        wordCount: 60,
        maxTokens: 200,
      },
      4: {
        description: "80-word lesson with complete sentences",
        wordCount: 80,
        maxTokens: 250,
      },
      5: {
        description: "120-word lesson with connected ideas and variety",
        wordCount: 120,
        maxTokens: 300,
      },
    };

    const config = levelConfig[level] || levelConfig[3];

    // Craft prompt based on language and lesson topic
    const languageNote =
      language === "spanish" ? "Write in Spanish." : "Write in English.";

    const prompt = `Create ${config.description} lesson content for children learning ${language}.
Topic: ${lessonTopic || "daily activities"}.

Requirements:
- Approximately ${config.wordCount} words
- Age-appropriate for children ages 5-7
- Use simple, clear language
- Make it engaging and fun
- Focus on teaching the topic, not telling a story
${languageNote}

Just provide the lesson content directly, without any preamble or explanation.`;

    const story = await generateStory(prompt, config.maxTokens);

    // Extract text from response
    const content =
      typeof story === "string"
        ? story
        : story.generated_text || JSON.stringify(story);

    // Clean up any extra whitespace
    const cleanedContent = content
      .trim()
      .replace(/^(Write|Create|Here's|Here is).*/i, "")
      .trim();

    return NextResponse.json({
      success: true,
      story: cleanedContent || content,
      level,
      language,
      topic: lessonTopic,
    });
  } catch (error) {
    console.error("Story Generation Error:", error);
    return NextResponse.json(
      {
        error: error.message,
        message: "Failed to generate lesson content",
      },
      { status: 500 },
    );
  }
}
