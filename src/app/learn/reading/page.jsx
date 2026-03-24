"use client";

import { useState } from "react";

export default function ReadingPage() {
  const [points, setPoints] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <main className="min-h-screen bg-warm-white px-6 py-12 font-display">

  
      <h1 className="text-5xl font-black text-center mb-2">
        Reading with Ollie the Owl 🦉
      </h1>

      <p className="text-center font-bold opacity-60 mb-8">
        Read, choose the correct answer, and earn points!
      </p>


      <div className="text-center mb-8">
        <div className="inline-block bg-star-yellow border-4 border-deep-dark rounded-2xl px-6 py-3 shadow-comic-xl">
          <p className="text-2xl font-black">⭐ Points: {points}</p>
        </div>
      </div>

 
      <h2 className="text-3xl font-black text-center mb-4">
        Story Title Goes Here
      </h2>


      <div className="max-w-3xl mx-auto bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl">

    
        <div className="bg-warm-white border-4 border-deep-dark rounded-2xl p-6 mb-6">
          <p className="font-bold leading-relaxed">
            Story text here
          </p>
        </div>

     
        <p className="font-black mb-4 text-lg">
          Who did Ollie see in the forest?
        </p>

     
        <div className="flex flex-col gap-4 mb-6">

          <button
            onClick={() => setSelected("Mia")}
            className={`border-4 rounded-xl px-4 py-3 font-black transition-all ${
              selected === "Mia"
                ? "bg-ollie-purple text-white border-deep-dark"
                : "bg-white border-deep-dark"
            }`}
          >
            A. Mia
          </button>

          <button
            onClick={() => setSelected("Tom")}
            className={`border-4 rounded-xl px-4 py-3 font-black transition-all ${
              selected === "Tom"
                ? "bg-ollie-purple text-white border-deep-dark"
                : "bg-white border-deep-dark"
            }`}
          >
            B. Tom
          </button>

          <button
            onClick={() => setSelected("Rabbit")}
            className={`border-4 rounded-xl px-4 py-3 font-black transition-all ${
              selected === "Rabbit"
                ? "bg-ollie-purple text-white border-deep-dark"
                : "bg-white border-deep-dark"
            }`}
          >
            C. Rabbit
          </button>

        </div>

  
        <button
          onClick={() => {
            if (selected === "Mia") {
              setPoints((p) => p + 10);
              setFeedback("Correct! +10 points ⭐");
            } else {
              setFeedback("Try again! 🦉");
            }
          }}
          className="w-full bg-ollie-purple text-white font-black px-6 py-3 rounded-xl border-4 border-deep-dark shadow-comic mb-4"
        >
          Check Answer
        </button>

    
        <button
          className="w-full bg-star-yellow text-deep-dark font-black px-6 py-3 rounded-xl border-4 border-deep-dark shadow-comic"
        >
          Next ➜
        </button>

     
        {feedback && (
          <p className="text-center font-black mt-4">
            {feedback}
          </p>
        )}

      </div>
    </main>
  );
}