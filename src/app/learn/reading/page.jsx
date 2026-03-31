"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import readingContent from "../../../data/readingContent";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ─── Activity Renderers ───────────────────────────────────────────────────────

// Type: alphabet — flip card for each letter
function AlphabetActivity({ activity, onComplete }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const items = activity.items;
  const current = items[index];

  const next = () => {
    setFlipped(false);
    setTimeout(() => {
      if (index + 1 >= items.length) onComplete();
      else setIndex(index + 1);
    }, 200);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="font-black text-deep-dark opacity-60 text-sm uppercase tracking-widest">
        {index + 1} of {items.length}
      </p>
      <button
        onClick={() => setFlipped(!flipped)}
        className="w-72 h-72 relative"
        style={{ perspective: "800px" }}
      >
        <div
          className="w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-ollie-purple border-4 border-deep-dark rounded-3xl shadow-comic-xl flex flex-col items-center justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-9xl font-black text-white leading-none">
              {current.letter}
            </span>
            <span className="text-white font-bold opacity-60 text-sm mt-3">
              tap to flip
            </span>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 bg-star-yellow border-4 border-deep-dark rounded-3xl shadow-comic-xl flex flex-col items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <span className="text-7xl mb-2">{current.emoji}</span>
            <span className="text-3xl font-black text-deep-dark">
              {current.example}
            </span>
            <span className="text-deep-dark font-bold opacity-60 mt-1 text-sm">
              sounds like "{current.sound}"
            </span>
            {current.note && (
              <span className="text-deep-dark opacity-40 text-xs mt-1 px-4 text-center">
                {current.note}
              </span>
            )}
          </div>
        </div>
      </button>
      <button
        onClick={next}
        className="bg-ollie-purple text-white font-black px-10 py-4 rounded-2xl border-4 border-deep-dark shadow-comic hover:translate-y-1 hover:shadow-none transition-all text-lg"
      >
        {index + 1 >= items.length ? "Done! ✅" : "Next →"}
      </button>
    </div>
  );
}

// Type: alphabet_match — tap uppercase then its lowercase
function AlphabetMatchActivity({ activity, onComplete }) {
  const items = activity.items;
  const [selected, setSelected] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrong, setWrong] = useState(null);
  const [lowercaseList] = useState(() =>
    shuffle(items.map((i) => i.lowercase)),
  );

  const isMatchedUpper = (l) => matched.includes(l);
  const isMatchedLower = (l) => {
    const pair = items.find((i) => i.lowercase === l);
    return pair && matched.includes(pair.uppercase);
  };

  const handleUpper = (letter) => {
    if (isMatchedUpper(letter)) return;
    setSelected({ letter });
  };

  const handleLower = (letter) => {
    if (!selected || isMatchedLower(letter)) return;
    const pair = items.find((i) => i.uppercase === selected.letter);
    if (pair && pair.lowercase === letter) {
      const newMatched = [...matched, selected.letter];
      setMatched(newMatched);
      setSelected(null);
      if (newMatched.length === items.length) setTimeout(onComplete, 600);
    } else {
      setWrong(letter);
      setTimeout(() => {
        setWrong(null);
        setSelected(null);
      }, 700);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
      <p className="font-black text-deep-dark text-center opacity-70 text-sm">
        Tap a BIG letter, then tap its small match!
      </p>
      <div className="grid grid-cols-2 gap-5 w-full">
        <div className="flex flex-col gap-3">
          <p className="text-center font-black text-xs uppercase tracking-widest opacity-40">
            Big
          </p>
          {items.map(({ uppercase: l }) => (
            <button
              key={l}
              onClick={() => handleUpper(l)}
              disabled={isMatchedUpper(l)}
              className={`py-4 text-3xl font-black rounded-2xl border-4 transition-all duration-150
                ${
                  isMatchedUpper(l)
                    ? "bg-green-100 border-green-400 opacity-50"
                    : selected?.letter === l
                      ? "bg-star-yellow border-deep-dark scale-105 shadow-comic"
                      : "bg-white border-deep-dark hover:bg-star-yellow shadow-comic"
                }`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-center font-black text-xs uppercase tracking-widest opacity-40">
            Small
          </p>
          {lowercaseList.map((l) => (
            <button
              key={l}
              onClick={() => handleLower(l)}
              disabled={isMatchedLower(l)}
              className={`py-4 text-3xl font-black rounded-2xl border-4 transition-all duration-150
                ${
                  isMatchedLower(l)
                    ? "bg-green-100 border-green-400 opacity-50"
                    : wrong === l
                      ? "bg-pico-orange border-deep-dark scale-95"
                      : "bg-white border-deep-dark hover:bg-star-yellow shadow-comic"
                }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      {matched.length === items.length && (
        <div className="text-4xl font-black text-green-500 animate-bounce">
          Perfect! 🎉
        </div>
      )}
    </div>
  );
}

function ToneIntroActivity({ activity, onComplete }) {
  const [index, setIndex] = useState(0);
  const items = activity.items;
  const current = items[index];

  return (
    <div className="flex flex-col items-center gap-6 max-w-sm mx-auto">
      {activity.note && (
        <p className="font-bold text-deep-dark opacity-60 text-center text-sm">
          {activity.note}
        </p>
      )}
      <p className="font-black text-xs uppercase tracking-widest opacity-40">
        {index + 1} of {items.length}
      </p>
      <div className="w-full bg-ollie-purple border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl flex flex-col items-center gap-3 text-center">
        <span className="text-6xl">{current.emoji}</span>
        <span className="text-7xl font-black text-white">
          {current.example}
        </span>
        <span className="text-white font-black text-xl">{current.tone}</span>
        <span className="text-white font-semibold opacity-70">
          means: "{current.meaning}"
        </span>
      </div>
      <button
        onClick={() => {
          if (index + 1 >= items.length) onComplete();
          else setIndex(index + 1);
        }}
        className="bg-ollie-purple text-white font-black px-10 py-4 rounded-2xl border-4 border-deep-dark shadow-comic hover:translate-y-1 hover:shadow-none transition-all text-lg"
      >
        {index + 1 >= items.length ? "Got it! ✅" : "Next →"}
      </button>
    </div>
  );
}

// Type: word — word flashcards
function WordActivity({ activity, onComplete }) {
  const [index, setIndex] = useState(0);
  const items = activity.items;
  const current = items[index];

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="font-black text-deep-dark opacity-60 text-sm uppercase tracking-widest">
        {index + 1} of {items.length}
      </p>
      <div className="w-72 h-72 bg-star-yellow border-4 border-deep-dark rounded-3xl shadow-comic-xl flex flex-col items-center justify-center gap-3">
        <span className="text-8xl">{current.emoji}</span>
        <span className="text-5xl font-black text-deep-dark">
          {current.word}
        </span>
        {current.syllables && current.syllables !== current.word && (
          <span className="text-deep-dark font-bold opacity-50 text-lg">
            {current.syllables}
          </span>
        )}
      </div>
      <button
        onClick={() => {
          if (index + 1 >= items.length) onComplete();
          else setIndex(index + 1);
        }}
        className="bg-ollie-purple text-white font-black px-10 py-4 rounded-2xl border-4 border-deep-dark shadow-comic hover:translate-y-1 hover:shadow-none transition-all text-lg"
      >
        {index + 1 >= items.length ? "Done! ✅" : "Next →"}
      </button>
    </div>
  );
}

// Type: word_select — pick the word that matches the picture
function WordSelectActivity({ activity, onComplete }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);
  const items = activity.items;
  const current = items[index];

  const choose = (choice) => {
    if (selected) return;
    const isCorrect = choice === current.answer;
    setSelected(choice);
    setCorrect(isCorrect);
    setTimeout(() => {
      setSelected(null);
      setCorrect(null);
      if (index + 1 >= items.length) onComplete();
      else setIndex(index + 1);
    }, 900);
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-sm mx-auto">
      <p className="font-black text-xs uppercase tracking-widest opacity-40">
        {index + 1} of {items.length}
      </p>
      <div className="text-9xl">{current.emoji}</div>
      <p className="font-black text-deep-dark text-xl">Which word is it?</p>
      <div className="flex flex-col gap-3 w-full">
        {current.choices.map((choice) => (
          <button
            key={choice}
            onClick={() => choose(choice)}
            className={`w-full py-4 text-2xl font-black rounded-2xl border-4 transition-all duration-150
              ${
                selected === choice && correct
                  ? "bg-green-400 border-green-600 scale-105"
                  : selected === choice && !correct
                    ? "bg-pico-orange border-deep-dark scale-95"
                    : selected && choice === current.answer
                      ? "bg-green-200 border-green-500"
                      : "bg-white border-deep-dark hover:bg-star-yellow shadow-comic hover:-translate-y-1"
              }`}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

// Type: phrase — phrase display with highlighted words
function PhraseActivity({ activity, onComplete }) {
  const [index, setIndex] = useState(0);
  const items = activity.items;
  const current = items[index];

  return (
    <div className="flex flex-col items-center gap-8 max-w-sm mx-auto">
      <p className="font-black text-xs uppercase tracking-widest opacity-40">
        {index + 1} of {items.length}
      </p>
      <div className="w-full bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl flex flex-col items-center gap-5">
        <span className="text-7xl">{current.emoji}</span>
        <div className="flex gap-3 flex-wrap justify-center">
          {current.highlight.map((word, i) => (
            <span
              key={i}
              className={`text-3xl font-black px-4 py-2 rounded-xl border-4 border-deep-dark ${
                i === 0
                  ? "bg-star-yellow text-deep-dark"
                  : "bg-ollie-purple text-white"
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          if (index + 1 >= items.length) onComplete();
          else setIndex(index + 1);
        }}
        className="bg-ollie-purple text-white font-black px-10 py-4 rounded-2xl border-4 border-deep-dark shadow-comic hover:translate-y-1 hover:shadow-none transition-all text-lg"
      >
        {index + 1 >= items.length ? "Done! ✅" : "Next →"}
      </button>
    </div>
  );
}

// Type: phrase_build / sentence_build — tap words in order (shared logic)
function BuildActivity({ activity, onComplete }) {
  const [index, setIndex] = useState(0);
  const items = activity.items;
  const current = items[index];

  const [built, setBuilt] = useState([]);
  const [available, setAvailable] = useState([]);
  const [status, setStatus] = useState(null);

  const reset = useCallback((item) => {
    setBuilt([]);
    setAvailable(shuffle(item.scrambled ?? item.answer));
    setStatus(null);
  }, []);

  useEffect(() => {
    reset(current);
  }, [index, current, reset]);

  const tap = (word, i) => {
    if (status) return;
    const newBuilt = [...built, word];
    const newAvail = available.filter((_, idx) => idx !== i);
    setBuilt(newBuilt);
    setAvailable(newAvail);

    if (newBuilt.length === current.answer.length) {
      const isCorrect = newBuilt.join(" ") === current.answer.join(" ");
      setStatus(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        setTimeout(() => {
          if (index + 1 >= items.length) onComplete();
          else setIndex(index + 1);
        }, 900);
      } else {
        setTimeout(() => reset(current), 1000);
      }
    }
  };

  const untap = (word, i) => {
    if (status) return;
    setBuilt(built.filter((_, idx) => idx !== i));
    setAvailable([...available, word]);
  };

  return (
    <div className="flex flex-col items-center gap-6 max-w-lg mx-auto w-full">
      <p className="font-black text-xs uppercase tracking-widest opacity-40">
        {index + 1} of {items.length}
      </p>
      <span className="text-8xl">{current.emoji}</span>

      {/* Build zone */}
      <div
        className={`w-full min-h-16 border-4 rounded-2xl p-3 flex gap-2 flex-wrap items-center transition-colors duration-200
        ${
          status === "correct"
            ? "border-green-500 bg-green-50"
            : status === "wrong"
              ? "border-pico-orange bg-orange-50"
              : "border-deep-dark bg-warm-white"
        }`}
      >
        {built.length === 0 && (
          <span className="text-deep-dark opacity-30 font-black text-sm">
            Tap words below to build here...
          </span>
        )}
        {built.map((word, i) => (
          <button
            key={i}
            onClick={() => untap(word, i)}
            className="bg-ollie-purple text-white font-black px-3 py-2 rounded-xl border-2 border-deep-dark text-base hover:opacity-80 transition-opacity"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Word bank */}
      <div className="flex gap-2 flex-wrap justify-center">
        {available.map((word, i) => (
          <button
            key={i}
            onClick={() => tap(word, i)}
            className="bg-star-yellow text-deep-dark font-black px-4 py-3 rounded-xl border-4 border-deep-dark shadow-comic text-base hover:-translate-y-1 transition-all"
          >
            {word}
          </button>
        ))}
      </div>

      {status === "correct" && (
        <p className="text-green-600 font-black text-2xl animate-bounce">
          Correct! 🎉
        </p>
      )}
      {status === "wrong" && (
        <p className="text-pico-orange font-black text-xl">Try again! 💪</p>
      )}
    </div>
  );
}

// Type: sentence — sentence reading cards
function SentenceActivity({ activity, onComplete }) {
  const [index, setIndex] = useState(0);
  const items = activity.items;
  const current = items[index];

  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto">
      <p className="font-black text-xs uppercase tracking-widest opacity-40">
        {index + 1} of {items.length}
      </p>
      <div className="w-full bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl flex flex-col items-center gap-5 text-center">
        <span className="text-7xl">{current.emoji}</span>
        <p className="text-3xl font-black text-deep-dark leading-snug">
          {current.sentence}
        </p>
        {current.focus && (
          <span className="bg-star-yellow border-2 border-deep-dark text-deep-dark font-black text-xs px-3 py-1 rounded-full uppercase tracking-wide">
            {current.focus}
          </span>
        )}
      </div>
      <button
        onClick={() => {
          if (index + 1 >= items.length) onComplete();
          else setIndex(index + 1);
        }}
        className="bg-ollie-purple text-white font-black px-10 py-4 rounded-2xl border-4 border-deep-dark shadow-comic hover:translate-y-1 hover:shadow-none transition-all text-lg"
      >
        {index + 1 >= items.length ? "Done! ✅" : "Next →"}
      </button>
    </div>
  );
}

// Type: paragraph — story + comprehension questions
// Type: paragraph — story + comprehension questions
function ParagraphActivity({ activity, onComplete }) {
  const [storyIndex, setStoryIndex] = useState(0);
  const [phase, setPhase] = useState("read"); // "read" | "question"
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);

  const story = activity.items[storyIndex];
  const question = story?.comprehension?.[qIndex];

  const choose = (choice) => {
    if (selected) return;
    if (!question) return;

    const isCorrect = choice === question.answer;
    setSelected(choice);
    setCorrect(isCorrect);

    if (isCorrect) {
      // correct -> advance after brief feedback
      setTimeout(() => {
        setSelected(null);
        setCorrect(null);

        // move to next question or next story or finish
        if (qIndex + 1 >= (story.comprehension?.length || 0)) {
          if (storyIndex + 1 >= activity.items.length) {
            onComplete();
          } else {
            setStoryIndex((s) => s + 1);
            setPhase("read");
            setQIndex(0);
          }
        } else {
          setQIndex((n) => n + 1);
        }
      }, 900);
    } else {
      // wrong -> show feedback but do NOT advance; allow retry
      setTimeout(() => {
        setSelected(null);
        setCorrect(null);
      }, 900);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-lg mx-auto">
      {phase === "read" ? (
        <>
          <div className="w-full bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl">{story.emoji}</span>
              <h3 className="text-2xl font-black text-deep-dark">
                {story.title}
              </h3>
            </div>
            <p className="text-deep-dark font-semibold text-lg leading-relaxed">
              {story.text}
            </p>
          </div>
          <button
            onClick={() => setPhase("question")}
            className="bg-ollie-purple text-white font-black px-10 py-4 rounded-2xl border-4 border-deep-dark shadow-comic hover:translate-y-1 hover:shadow-none transition-all text-lg"
          >
            Answer Questions →
          </button>
        </>
      ) : (
        <>
          <p className="font-black text-xs uppercase tracking-widest opacity-40">
            Question {qIndex + 1} of {story.comprehension.length}
          </p>
          <div className="w-full bg-star-yellow border-4 border-deep-dark rounded-3xl p-6 shadow-comic-xl text-center">
            <p className="text-2xl font-black text-deep-dark">
              {question.question}
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            {question.choices.map((choice) => (
              <button
                key={choice}
                onClick={() => choose(choice)}
                className={`w-full py-4 text-lg font-black rounded-2xl border-4 transition-all duration-150
                  ${
                    selected === choice && correct
                      ? "bg-green-400 border-green-600 scale-105"
                      : selected === choice && correct === false
                        ? "bg-pico-orange border-deep-dark scale-95"
                        : selected && choice === question.answer
                          ? "bg-green-200 border-green-500"
                          : "bg-white border-deep-dark hover:bg-star-yellow shadow-comic hover:-translate-y-1"
                  }`}
              >
                {choice}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Activity Router ──────────────────────────────────────────────────────────

function ActivityRenderer({ activity, onComplete }) {
  switch (activity.type) {
    case "alphabet":
      return <AlphabetActivity activity={activity} onComplete={onComplete} />;
    case "alphabet_match":
      return (
        <AlphabetMatchActivity activity={activity} onComplete={onComplete} />
      );
    case "tone_intro":
      return <ToneIntroActivity activity={activity} onComplete={onComplete} />;
    case "word":
      return <WordActivity activity={activity} onComplete={onComplete} />;
    case "word_select":
      return <WordSelectActivity activity={activity} onComplete={onComplete} />;
    case "phrase":
      return <PhraseActivity activity={activity} onComplete={onComplete} />;
    case "phrase_build":
      return <BuildActivity activity={activity} onComplete={onComplete} />;
    case "sentence":
      return <SentenceActivity activity={activity} onComplete={onComplete} />;
    case "sentence_build":
      return <BuildActivity activity={activity} onComplete={onComplete} />;
    case "paragraph":
      return <ParagraphActivity activity={activity} onComplete={onComplete} />;
    default:
      return (
        <div className="text-center">
          <p className="font-bold opacity-60">Unknown type: {activity.type}</p>
          <button
            onClick={onComplete}
            className="mt-4 bg-ollie-purple text-white font-black px-6 py-3 rounded-xl border-4 border-deep-dark"
          >
            Skip →
          </button>
        </div>
      );
  }
}

// ─── Lesson View ──────────────────────────────────────────────────────────────

function LessonView({ lesson, levelData, onLessonComplete, onBack }) {
  const [activityIndex, setActivityIndex] = useState(0);
  const activities = lesson.activities;
  const current = activities[activityIndex];

  const handleComplete = () => {
    if (activityIndex + 1 >= activities.length) onLessonComplete();
    else setActivityIndex(activityIndex + 1);
  };

  return (
    <div className="min-h-screen bg-warm-white font-display">
      {/* Header */}
      <div className="bg-ollie-purple border-b-4 border-deep-dark px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-white font-black text-sm px-4 py-2 rounded-xl border-2 border-white/40 hover:border-white transition-all"
          >
            ← Back
          </button>
          <div className="text-center">
            <p className="text-white font-black text-lg">{lesson.title}</p>
            <p className="text-white opacity-60 text-xs font-bold">
              {levelData.title}
            </p>
          </div>
          <div className="bg-star-yellow border-2 border-deep-dark rounded-xl px-3 py-1 text-center">
            <p className="text-xs font-black opacity-60">Step</p>
            <p className="font-black text-deep-dark">
              {activityIndex + 1}/{activities.length}
            </p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-3">
          <div className="w-full bg-white/20 rounded-full h-3 border-2 border-white/30 overflow-hidden">
            <div
              className="h-full bg-star-yellow transition-all duration-500"
              style={{ width: `${(activityIndex / activities.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Ollie speech bubble + activity */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-start gap-3 mb-8">
          <span className="text-5xl mt-1">🦉</span>
          <div className="relative bg-white border-4 border-deep-dark rounded-2xl px-5 py-3 shadow-comic">
            <div className="absolute -left-3 top-5 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-deep-dark" />
            <p className="font-black text-deep-dark text-base">
              {current.instruction}
            </p>
          </div>
        </div>
        <ActivityRenderer activity={current} onComplete={handleComplete} />
      </div>
    </div>
  );
}

// ─── Lesson Complete Screen ───────────────────────────────────────────────────

function LessonComplete({ lesson, onContinue }) {
  return (
    <div className="min-h-screen bg-star-yellow font-display flex flex-col items-center justify-center px-6 text-center gap-8">
      <div className="text-9xl animate-bounce">🎉</div>
      <div className="bg-white border-4 border-deep-dark rounded-3xl p-10 shadow-comic-xl max-w-sm w-full">
        <h2 className="text-4xl font-black text-deep-dark mb-2">
          Lesson Done!
        </h2>
        <p className="font-black text-ollie-purple text-xl mb-2">
          {lesson.title}
        </p>
        <p className="font-semibold opacity-60">
          Great job! You finished all the activities.
        </p>
      </div>
      <button
        onClick={onContinue}
        className="bg-ollie-purple text-white font-black text-xl px-12 py-5 rounded-2xl border-4 border-deep-dark shadow-comic-xl hover:translate-y-1 hover:shadow-comic transition-all"
      >
        Keep Going! →
      </button>
    </div>
  );
}

// ─── Level Overview (lesson list) ────────────────────────────────────────────

function LevelOverview({
  levelData,
  completedLessons,
  onSelectLesson,
  onBack,
}) {
  return (
    <div className="min-h-screen bg-warm-white font-display">
      <div className="bg-star-yellow border-b-4 border-deep-dark px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-1">
          <span className="text-4xl">🦉</span>
          <h1 className="text-4xl font-black text-deep-dark">
            {levelData.title}
          </h1>
        </div>
        <p className="text-deep-dark font-bold opacity-70">
          {levelData.description}
        </p>
        <div className="mt-3 inline-block bg-ollie-purple text-white font-black text-sm px-4 py-1 rounded-full border-2 border-deep-dark">
          Level {levelData.level}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-5">
        <h2 className="text-2xl font-black text-deep-dark">Choose a Lesson</h2>
        {levelData.lessons.map((lesson, i) => {
          const done = completedLessons.includes(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson)}
              className={`w-full flex items-center gap-5 p-6 rounded-3xl border-4 border-deep-dark text-left transition-all hover:-translate-y-1
                ${done ? "bg-green-50 shadow-comic" : "bg-white shadow-comic-xl hover:shadow-comic"}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl border-4 border-deep-dark flex items-center justify-center text-2xl font-black flex-shrink-0
                ${done ? "bg-green-400 text-white" : "bg-star-yellow text-deep-dark"}`}
              >
                {done ? "✓" : i + 1}
              </div>
              <div className="flex-1">
                <p className="font-black text-deep-dark text-xl">
                  {lesson.title}
                </p>
                {lesson.subtitle && (
                  <p className="font-bold text-sm opacity-50">
                    {lesson.subtitle}
                  </p>
                )}
                <p className="font-bold text-sm opacity-40 mt-0.5">
                  {lesson.activities.length}{" "}
                  {lesson.activities.length === 1 ? "activity" : "activities"}
                </p>
              </div>
              {done && (
                <span className="text-green-500 font-black text-sm">
                  Done ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Level Select ─────────────────────────────────────────────────────────────

function LevelSelect({ langData, userLevel, completedLessons, onSelectLevel }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-5">
      <h2 className="text-3xl font-black text-deep-dark">Choose a Level</h2>
      {langData.levels.map((lvl) => {
        const isUnlocked = lvl.level <= userLevel;
        const totalLessons = lvl.lessons.length;
        const doneLessons = lvl.lessons.filter((l) =>
          completedLessons.includes(l.id),
        ).length;
        const allDone = doneLessons === totalLessons && totalLessons > 0;

        return (
          <button
            key={lvl.level}
            onClick={() => isUnlocked && onSelectLevel(lvl)}
            disabled={!isUnlocked}
            className={`w-full flex items-center gap-5 p-6 rounded-3xl border-4 border-deep-dark text-left transition-all
              ${
                !isUnlocked
                  ? "opacity-40 bg-gray-100 cursor-not-allowed"
                  : allDone
                    ? "bg-green-50 shadow-comic hover:-translate-y-1"
                    : "bg-white shadow-comic-xl hover:-translate-y-1 hover:shadow-comic"
              }`}
          >
            <div
              className={`w-16 h-16 rounded-2xl border-4 border-deep-dark flex items-center justify-center text-3xl font-black flex-shrink-0
              ${
                !isUnlocked
                  ? "bg-gray-300 text-gray-500"
                  : allDone
                    ? "bg-green-400 text-white"
                    : lvl.level === userLevel
                      ? "bg-ollie-purple text-white"
                      : "bg-star-yellow text-deep-dark"
              }`}
            >
              {!isUnlocked ? "🔒" : allDone ? "✓" : lvl.level}
            </div>
            <div className="flex-1">
              <p className="font-black text-deep-dark text-xl">{lvl.title}</p>
              <p className="font-bold text-sm opacity-60">{lvl.description}</p>
              {isUnlocked && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-warm-white border-2 border-deep-dark rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-ollie-purple transition-all"
                      style={{
                        width: `${totalLessons > 0 ? (doneLessons / totalLessons) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-black opacity-50">
                    {doneLessons}/{totalLessons}
                  </span>
                </div>
              )}
            </div>
            {lvl.level === userLevel && !allDone && (
              <span className="bg-ollie-purple text-white font-black text-xs px-3 py-1 rounded-full border-2 border-deep-dark whitespace-nowrap">
                Current
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ReadingPage() {
  const user = useRequireAuth("child");
  const router = useRouter();

  const [view, setView] = useState("levels"); // "levels" | "lessons" | "lesson" | "complete"
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    if (!user) return;
    const saved = localStorage.getItem(`reading_progress_${user.id}`);
    if (saved) {
      try {
        setCompletedLessons(JSON.parse(saved));
      } catch {}
    }
  }, [user]);

  if (!user) return null;

  function resolveLanguageKey(rawLang) {
    if (!rawLang) return "english";
    const s = String(rawLang).toLowerCase().trim();

    // direct exact key present in the JSON
    if (readingContent[s]) return s;

    // common alias map
    const aliases = {
      english: ["english", "en", "eng", "en-us", "en-gb"],
      spanish: [
        "spanish",
        "es",
        "es-es",
        "es-mx",
        "español",
        "es_mx",
        "es-419",
      ],
    };

    // exact alias matches
    for (const [key, arr] of Object.entries(aliases)) {
      if (arr.includes(s)) return key;
    }

    // includes / startsWith matches for cases like "es-ES", "Spanish (Mexico)" etc.
    for (const [key, arr] of Object.entries(aliases)) {
      for (const a of arr) {
        if (s.includes(a)) return key;
      }
    }

    // fallback
    return "english";
  }
  const rawLang = user.secondaryLang || "english";
  const langKey = resolveLanguageKey(rawLang);
  const langData = readingContent[langKey] ?? readingContent["english"];
  const userLevel = user.readingLevel ?? 1;

  const totalLessons = langData.levels.reduce(
    (acc, l) => acc + l.lessons.length,
    0,
  );
  const pct =
    totalLessons > 0
      ? Math.round((completedLessons.length / totalLessons) * 100)
      : 0;

  const saveProgress = (lessonId) => {
    if (completedLessons.includes(lessonId)) return;
    const updated = [...completedLessons, lessonId];
    setCompletedLessons(updated);
    localStorage.setItem(
      `reading_progress_${user.id}`,
      JSON.stringify(updated),
    );
  };

  // Handle back button navigation
  const handleBackClick = () => {
    if (view === "lesson" || view === "complete") {
      setView("lessons");
    } else if (view === "lessons") {
      setView("levels");
    } else {
      router.push("/learn");
    }
  };

  // Full-screen views
  if (view === "lesson" && selectedLesson && selectedLevel) {
    return (
      <LessonView
        lesson={selectedLesson}
        levelData={selectedLevel}
        onLessonComplete={() => {
          saveProgress(selectedLesson.id);
          setView("complete");
        }}
        onBack={() => setView("lessons")}
      />
    );
  }

  if (view === "complete" && selectedLesson) {
    return (
      <LessonComplete
        lesson={selectedLesson}
        onContinue={() => setView("lessons")}
      />
    );
  }

  // Determine back button label
  const getBackLabel = () => {
    if (view === "lessons") return "Levels";
    return "Back";
  };

  return (
    <div className="min-h-screen bg-warm-white font-display">
      {/* Top nav */}
      <div className="bg-ollie-purple border-b-4 border-deep-dark px-6 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBackClick}
            className="text-white font-black text-sm px-4 py-2 rounded-xl border-2 border-white/40 hover:border-white transition-all"
          >
            ← {getBackLabel()}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦉</span>
            <span className="text-white font-black text-lg">
              Reading with Ollie
            </span>
          </div>
          <div className="bg-star-yellow border-2 border-deep-dark rounded-xl px-3 py-1 text-center">
            <p className="text-xs font-black opacity-60">Level</p>
            <p className="font-black text-deep-dark">{userLevel}</p>
          </div>
        </div>
      </div>

      {/* Progress strip */}
      <div className="bg-star-yellow border-b-4 border-deep-dark px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <div className="flex-1">
            <p className="font-black text-deep-dark text-sm mb-1">
              {langData.language} Progress
            </p>
            <div className="w-full bg-white border-4 border-deep-dark rounded-xl h-5 overflow-hidden">
              <div
                className="h-full bg-ollie-purple transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <div className="bg-white border-4 border-deep-dark rounded-2xl px-4 py-2 text-center shadow-comic min-w-[64px]">
            <p className="text-xs font-black opacity-50">Done</p>
            <p className="text-2xl font-black text-ollie-purple">{pct}%</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      {view === "levels" ? (
        <LevelSelect
          langData={langData}
          userLevel={userLevel}
          completedLessons={completedLessons}
          onSelectLevel={(lvl) => {
            setSelectedLevel(lvl);
            setView("lessons");
          }}
        />
      ) : (
        <LevelOverview
          levelData={selectedLevel}
          completedLessons={completedLessons}
          onSelectLesson={(lesson) => {
            setSelectedLesson(lesson);
            setView("lesson");
          }}
          onBack={() => setView("levels")}
        />
      )}
    </div>
  );
}
