"use client";

import { useState } from "react";

export default function SpeakingPage() {
  const [step, setStep] = useState(0);

  const passages = [
    {
      title: "Pico Meets Mia",
      text: "Pico the parrot flew over the mountains and greeted Mia with a cheerful hello.",
    },
    {
      title: "The Magic Words",
      text: "Mia and Pico practiced saying new words together in a happy and excited voice.",
    },
  ];

  const current = passages[step];

  return (
    <main className="min-h-screen bg-warm-white px-6 py-12 font-display">
      <h1 className="text-5xl font-black text-center mb-2">
        Speaking with Pico the Parrot 🦜
      </h1>

      <p className="text-center font-bold opacity-60 mb-10">
        Read together with your child and practice speaking aloud
      </p>

      <div className="max-w-3xl mx-auto bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl">
        <h2 className="text-3xl font-black mb-6 text-center">
          {current.title}
        </h2>

        <div className="bg-warm-white border-4 border-deep-dark rounded-2xl p-6 mb-8">
          <p className="text-lg font-bold leading-relaxed">{current.text}</p>
        </div>

        <div className="bg-star-yellow border-4 border-deep-dark rounded-2xl p-6 mb-6 text-center">
          <p className="font-black text-lg mb-2">Voice Speaker Here</p>

        

          <div className="mt-4 border-4 border-deep-dark rounded-xl bg-white p-4">
            <p className="font-bold opacity-60">voice</p>
          </div>
        </div>

        <div className="mb-6 text-center">
          <p className="font-black">
            Parent & Child say the passage together aloud
          </p>
        </div>

        <button
          onClick={() => {
            if (step < passages.length - 1) {
              setStep(step + 1);
            }
          }}
          className="w-full bg-ollie-purple text-white font-black px-6 py-3 rounded-xl border-4 border-deep-dark shadow-comic"
        >
          Next ➜
        </button>
      </div>
    </main>
  );
}
