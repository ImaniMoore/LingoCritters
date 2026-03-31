import { generateStory } from "../../../../lib/huggingface";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { level, language, lessonTopic } = body;

    const languageNote = language === "spanish" ? "Spanish" : "English";

    // Constraint mapping based on your UI screenshot
    const constraints = {
      1: "Alphabet sounds (e.g., A is for Apple. B is for Ball.)",
      2: "A simple list of 10 basic words separated by periods.",
      3: "5 short phrases of 2-3 words each.",
      4: "3 simple, full sentences for a child to repeat.",
      5: "A single, cohesive story paragraph of 50-60 words.",
    };

    // THE FIX: Provide a "Good" example and a "Bad" example to the AI
    const systemInstruction = `You are a children's teacher. 
    CRITICAL RULE: Write ONLY the content. 
    NO headers like "Vocabulary" or "Questions". 
    NO bullet points. 
    NO bold text (**). 
    NO intro/outro. 
    
    Example of GOOD Level 5 output:
    "Today we are visiting a sunny farm. Look at the big red tractor in the field! The fluffy sheep are eating green grass while the pink pigs play in the mud. The farmer is happy because the sun is shining. It is a very busy and fun day for all the animals."
    
    Example of BAD Level 5 output:
    "**A Day on the Farm** **Vocabulary** - Farm: a place..."`;

    const userPrompt = `Level: ${level}. Topic: ${lessonTopic}. Language: ${languageNote}. 
    Goal: ${constraints[level] || constraints[5]}. 
    Write ONLY the lesson text now:`;

    // Combine them for the model
    const finalPrompt = `${systemInstruction}\n\nUser: ${userPrompt}\nAssistant:`;

    const storyText = await generateStory(finalPrompt);

    // Final scrub to remove any bolding or headers the AI might have snuck in
    const cleanedStory = storyText
      .replace(/\*\*.*?\*\*/g, "") // Remove anything inside double asterisks (headers)
      .replace(/^[A-Z][a-z]+:\s*/gm, "") // Remove "Vocabulary:", "Topic:", etc.
      .replace(/[\#\-\•]/g, "") // Remove markdown headers, dashes, or bullets
      .trim();

    return NextResponse.json({ success: true, story: cleanedStory });
  } catch (error) {
    console.error("Route Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
