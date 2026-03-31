"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import languageLevels from "../../../data/readingContent";

export default function SpeakingPage() {
  const user = useRequireAuth("child");
  const router = useRouter();

  const [view, setView] = useState("levels"); // "levels" | "lessons" | "playing"
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonContent, setLessonContent] = useState("");
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem(`speaking_progress_${user.id}`);
    if (saved) {
      try {
        setCompletedLessons(JSON.parse(saved));
      } catch (e) {
        console.warn("Failed to parse saved speaking progress", e);
      }
    }
  }, [user]);

  const saveProgress = (lessonId) => {
    if (!lessonId) return;
    if (completedLessons.includes(lessonId)) return;
    const updated = [...completedLessons, lessonId];
    setCompletedLessons(updated);
    localStorage.setItem(
      `speaking_progress_${user.id}`,
      JSON.stringify(updated),
    );
  };

  const audioRef = useRef(null);

  if (!user) return null;

  const langKey = (user.secondaryLang || "english").toLowerCase();
  const langData = languageLevels[langKey] ?? languageLevels["english"];
  const userLevel = user.speakingLevel ?? 1;

  // Generate content based on level and lesson type
  const generateLessonContent = async (lesson, level) => {
    let content = "";

    // For Level 1 (Alphabet), extract from activities
    if (level === 1) {
      const firstActivity = lesson.activities[0];
      if (firstActivity.type === "alphabet" && firstActivity.items) {
        // Just list the letters with examples
        // Keep the punctuation so the TTS backend can use pacing hints
        content = firstActivity.items
          .map((item) => `${item.letter} - ${item.example}`)
          .join(". ");
        // request slower audio for letters
        setLessonContent(content);
        await generateAudio(content, 0.8);
        return;
      }
    }

    // Levels 2-5: use AI to generate content based on lesson context
    try {
      const instruction = lesson.activities[0]?.instruction || lesson.title;
      const prompt = `Create a short, simple ${
        level === 2
          ? "20-word"
          : level === 3
            ? "30-word"
            : level === 4
              ? "50-word"
              : "80-word"
      } lesson in English for children about "${lesson.title}". 
Keep it age-appropriate and fun. Start teaching the topic directly.`;

      const response = await fetch("/api/speaking/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level,
          language: langKey,
          lessonTopic: lesson.title,
        }),
      });

      const data = await response.json();
      if (data.success) {
        content = data.story;
      } else {
        content = lesson.title;
      }
    } catch (error) {
      console.error("Content generation failed:", error);
      content = lesson.title; // Fallback to title
    }

    setLessonContent(content);
    // normal speed for generated stories
    await generateAudio(content, 1.0);
  };

  // Generate TTS audio
  // speed: 1 = normal, <1 = slower, >1 = faster
  const generateAudio = async (text, speed = 1.0) => {
    setIsGeneratingAudio(true);
    try {
      const response = await fetch("/api/speaking/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          language: langKey,
          speed: Number(speed) || 1,
        }),
      });

      const data = await response.json();
      if (data.success) {
        const audioBlob = base64ToBlob(data.audio, data.mimeType);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      } else {
        console.error("TTS API returned failure:", data);
      }
    } catch (error) {
      console.error("Audio generation failed:", error);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  // Level Selection View
  if (view === "levels") {
    return (
      <div className="min-h-screen bg-warm-white font-display">
        <div className="bg-pico-orange border-b-4 border-deep-dark px-6 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <button
              onClick={() => router.push("/learn")}
              className="text-white font-black text-sm px-4 py-2 rounded-xl border-2 border-white/40 hover:border-white transition-all"
            >
              ← Back
            </button>
            <span className="text-white font-black text-lg">
              🦜 Speaking with Pico
            </span>
            <div className="bg-star-yellow border-2 border-deep-dark rounded-xl px-3 py-1">
              <p className="font-black text-deep-dark">Level {userLevel}</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-5xl">🦜</span>
            <div>
              <h1 className="text-4xl font-black text-deep-dark">
                Speaking Practice
              </h1>
              <p className="font-bold text-deep-dark opacity-70">
                Listen and learn with Pico!
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-deep-dark mb-6">
            Choose a Level
          </h2>

          <div className="space-y-3">
            {langData.levels.map((lvl) => {
              const isUnlocked = lvl.level <= userLevel;
              return (
                <button
                  key={lvl.level}
                  onClick={() => {
                    setSelectedLevel(lvl);
                    setView("lessons");
                  }}
                  disabled={!isUnlocked}
                  className={`w-full p-6 rounded-3xl border-4 border-deep-dark text-left flex items-center gap-4 transition-all ${
                    !isUnlocked
                      ? "opacity-40 bg-gray-100 cursor-not-allowed"
                      : "bg-white shadow-comic-xl hover:-translate-y-1"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl border-4 border-deep-dark flex items-center justify-center text-2xl font-black flex-shrink-0 ${
                      !isUnlocked
                        ? "bg-gray-300 text-gray-500"
                        : "bg-pico-orange text-white"
                    }`}
                  >
                    {!isUnlocked ? "🔒" : lvl.level}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-deep-dark text-xl">
                      {lvl.title}
                    </p>
                    <p className="font-bold text-sm opacity-60">
                      {lvl.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Lessons View
  if (view === "lessons" && selectedLevel) {
    return (
      <div className="min-h-screen bg-warm-white font-display">
        <div className="bg-pico-orange border-b-4 border-deep-dark px-6 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <button
              onClick={() => {
                setSelectedLevel(null);
                setView("levels");
              }}
              className="text-white font-black text-sm px-4 py-2 rounded-xl border-2 border-white/40 hover:border-white transition-all"
            >
              ← Levels
            </button>
            <span className="text-white font-black text-lg">
              🦜 {selectedLevel.title}
            </span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-black text-deep-dark mb-6">
            Choose a Lesson
          </h2>

          <div className="space-y-4">
            {selectedLevel.lessons.map((lesson, i) => (
              <button
                key={lesson.id}
                onClick={() => {
                  setSelectedLesson(lesson);
                  generateLessonContent(lesson, selectedLevel.level);
                  setView("playing");
                }}
                className="w-full p-6 rounded-3xl border-4 border-deep-dark bg-white shadow-comic-xl hover:-translate-y-1 transition-all text-left flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-pico-orange border-4 border-deep-dark flex items-center justify-center text-2xl flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-black text-deep-dark text-lg">
                    {lesson.title}
                  </p>
                  {lesson.subtitle && (
                    <p className="font-bold text-sm opacity-60">
                      {lesson.subtitle}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Playing View
  if (view === "playing" && selectedLesson) {
    return (
      <PlayingView
        lesson={selectedLesson}
        content={lessonContent}
        audioUrl={audioUrl}
        isPlaying={isPlaying}
        isGeneratingAudio={isGeneratingAudio}
        audioRef={audioRef}
        onPlayChange={setIsPlaying}
        onBack={() => {
          setSelectedLesson(null);
          setLessonContent("");
          setAudioUrl(null);
          setIsPlaying(false);
          setView("lessons");
        }}
        onNext={() => {
          // persist progress for this speaking lesson
          saveProgress(selectedLesson?.id);
          // reset UI and go back to lessons
          setSelectedLesson(null);
          setLessonContent("");
          setAudioUrl(null);
          setIsPlaying(false);
          setView("lessons");
        }}
      />
    );
  }

  return null;
}

// Playing View Component
function PlayingView({
  lesson,
  content,
  audioUrl,
  isPlaying,
  isGeneratingAudio,
  audioRef,
  onPlayChange,
  onBack,
  onNext,
}) {
  return (
    <div className="min-h-screen bg-warm-white font-display flex flex-col">
      <div className="bg-pico-orange border-b-4 border-deep-dark px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-white font-black text-sm px-4 py-2 rounded-xl border-2 border-white/40 hover:border-white transition-all"
          >
            ← Back
          </button>
          <span className="text-white font-black text-lg">🦜 Listening</span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto px-6 py-12 flex flex-col items-center justify-center gap-8 w-full">
        {/* Icon */}
        <div className="text-9xl">🦜</div>

        {/* Lesson Title */}
        <div className="text-center">
          <p className="text-4xl font-black text-deep-dark mb-2">
            {lesson.title}
          </p>
          {lesson.subtitle && (
            <p className="text-lg font-bold opacity-60">{lesson.subtitle}</p>
          )}
        </div>

        {/* Lesson Content */}
        {content && (
          <div className="bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl w-full">
            <p className="text-xl leading-relaxed text-deep-dark font-semibold text-center">
              {content}
            </p>
          </div>
        )}

        {/* Audio Player */}
        {audioUrl && (
          <div className="w-full flex flex-col items-center gap-4">
            <audio
              ref={audioRef}
              src={audioUrl}
              onPlay={() => onPlayChange(true)}
              onPause={() => onPlayChange(false)}
              onEnded={() => onPlayChange(false)}
            />
            <button
              onClick={() => {
                if (isPlaying) {
                  audioRef.current?.pause();
                } else {
                  audioRef.current?.play();
                }
              }}
              className="bg-pico-orange text-white font-black py-6 px-12 rounded-2xl border-4 border-deep-dark shadow-comic-xl hover:-translate-y-1 transition-all text-2xl"
            >
              {isPlaying ? "⏸ Pause" : "▶ Listen"}
            </button>
          </div>
        )}

        {/* Loading State */}
        {isGeneratingAudio && (
          <div className="text-center">
            <p className="text-lg font-black text-deep-dark opacity-60">
              Pico is preparing the audio...
            </p>
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={onNext}
          className="bg-star-yellow text-deep-dark font-black py-4 px-10 rounded-2xl border-4 border-deep-dark shadow-comic-xl hover:-translate-y-1 transition-all text-lg"
        >
          Next Lesson →
        </button>
      </div>
    </div>
  );
}

// Helper function
function base64ToBlob(base64, mimeType) {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}
