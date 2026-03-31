"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRequireAuth } from "../../hooks/useRequireAuth";

export default function Learn() {
  const user = useRequireAuth("child");
  const [hovered, setHovered] = useState(null);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-warm-white font-display overflow-x-hidden">
      {/* ── HEADER ── */}
      <section className="relative bg-star-yellow py-16 px-6 text-center overflow-hidden border-b-4 border-deep-dark">
        <div className="absolute -top-8 -left-8 w-36 h-36 bg-pico-orange rounded-full border-4 border-deep-dark opacity-20 pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-ollie-purple rounded-full border-4 border-deep-dark opacity-15 pointer-events-none" />
        <div className="absolute top-4 right-28 w-14 h-14 bg-white rounded-full border-4 border-deep-dark opacity-40 pointer-events-none" />

        <p className="relative z-10 text-deep-dark font-black text-lg opacity-60 mb-1 uppercase tracking-widest">
          Welcome back,
        </p>
        <h1 className="relative z-10 text-5xl md:text-6xl font-black text-deep-dark leading-tight mb-3">
          {user.name ?? user.username}! 👋
        </h1>
        <p className="relative z-10 text-deep-dark font-bold text-xl max-w-md mx-auto opacity-70">
          What do you want to practice today?
        </p>
      </section>

      {/* ── CHOICE CARDS ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* READING */}
          <Link
            href="/learn/reading"
            onMouseEnter={() => setHovered("reading")}
            onMouseLeave={() => setHovered(null)}
            className="group relative bg-ollie-purple border-4 border-deep-dark rounded-3xl p-10 shadow-comic-xl flex flex-col items-center text-center transition-transform duration-150 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#1a1a2e] active:translate-y-0"
          >
            {/* Decorative blob */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full opacity-10 border-4 border-deep-dark pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-10 h-10 bg-star-yellow rounded-full opacity-20 border-2 border-deep-dark pointer-events-none" />

            {/* Critter */}
            <div
              className="text-8xl mb-6 transition-transform duration-200 select-none"
              style={{
                transform:
                  hovered === "reading"
                    ? "rotate(-8deg) scale(1.15)"
                    : "rotate(0deg) scale(1)",
              }}
            >
              🦉
            </div>

            <span className="inline-block bg-star-yellow text-deep-dark text-sm font-black px-4 py-1 rounded-full border-2 border-deep-dark mb-4">
              Reading
            </span>

            <h2 className="text-4xl font-black text-white mb-3">
              Read with Ollie
            </h2>

            <p className="text-white font-semibold text-base leading-relaxed opacity-80 max-w-xs">
              Explore words, letters, and stories. Build your reading skills one
              adventure at a time!
            </p>

            <div className="mt-8 bg-white text-ollie-purple font-black text-lg px-8 py-3 rounded-2xl border-4 border-deep-dark shadow-comic group-hover:shadow-none group-hover:translate-y-1 transition-all duration-150">
              Let's Read! →
            </div>
          </Link>

          {/* SPEAKING */}
          <Link
            href="/learn/speaking"
            onMouseEnter={() => setHovered("speaking")}
            onMouseLeave={() => setHovered(null)}
            className="group relative bg-pico-orange border-4 border-deep-dark rounded-3xl p-10 shadow-comic-xl flex flex-col items-center text-center transition-transform duration-150 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#1a1a2e] active:translate-y-0"
          >
            {/* Decorative blobs */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full opacity-10 border-4 border-deep-dark pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-10 h-10 bg-star-yellow rounded-full opacity-20 border-2 border-deep-dark pointer-events-none" />

            {/* Critter */}
            <div
              className="text-8xl mb-6 transition-transform duration-200 select-none"
              style={{
                transform:
                  hovered === "speaking"
                    ? "rotate(8deg) scale(1.15)"
                    : "rotate(0deg) scale(1)",
              }}
            >
              🦜
            </div>

            <span className="inline-block bg-star-yellow text-deep-dark text-sm font-black px-4 py-1 rounded-full border-2 border-deep-dark mb-4">
              Speaking
            </span>

            <h2 className="text-4xl font-black text-white mb-3">
              Speak with Pico
            </h2>

            <p className="text-white font-semibold text-base leading-relaxed opacity-80 max-w-xs">
              Practice sounds, words, and phrases. Sing songs and speak with
              confidence!
            </p>

            <div className="mt-8 bg-white text-pico-orange font-black text-lg px-8 py-3 rounded-2xl border-4 border-deep-dark shadow-comic group-hover:shadow-none group-hover:translate-y-1 transition-all duration-150">
              Let's Speak! →
            </div>
          </Link>
        </div>
      </section>

      {/* ── PROGRESS STRIP ── */}
      <section className="bg-ollie-purple border-t-4 border-deep-dark py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-white font-black text-2xl">Your Progress</p>
            <p className="text-white font-semibold opacity-70 text-sm mt-1">
              Keep going — you're doing great!
            </p>
          </div>

          <div className="flex gap-6">
            <div className="bg-white border-4 border-deep-dark rounded-2xl px-6 py-4 text-center shadow-comic min-w-[100px]">
              <p className="text-xs font-black opacity-50 uppercase tracking-wide mb-1">
                Reading
              </p>
              <p className="text-3xl font-black text-ollie-purple">
                Lv {user.readingLevel ?? 1}
              </p>
            </div>
            <div className="bg-white border-4 border-deep-dark rounded-2xl px-6 py-4 text-center shadow-comic min-w-[100px]">
              <p className="text-xs font-black opacity-50 uppercase tracking-wide mb-1">
                Speaking
              </p>
              <p className="text-3xl font-black text-pico-orange">
                Lv {user.speakingLevel ?? 1}
              </p>
            </div>
            <div className="bg-star-yellow border-4 border-deep-dark rounded-2xl px-6 py-4 text-center shadow-comic min-w-[100px]">
              <p className="text-xs font-black opacity-50 uppercase tracking-wide mb-1">
                Progress
              </p>
              <p className="text-3xl font-black text-deep-dark">
                {user.progress ?? 0}%
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
