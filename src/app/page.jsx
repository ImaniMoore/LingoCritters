"use client";

import { useState } from "react";
import Link from "next/link";

const languages = [
  "English",
  "Spanish",
  "Mandarin",
  "Hindi",
  "Arabic",
  "Portuguese",
  "Bengali",
  "Russian",
  "Japanese",
  "French",
  "Vietnamese",
];

export default function Home() {
  const [lang1, setLang1] = useState("English");
  const [lang2, setLang2] = useState("Spanish");

  return (
    <main className="bg-warm-white min-h-screen font-sans">
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-mint-bg via-white to-violet-50 py-24 px-6 text-center overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-teo-mint opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-ollie-purple opacity-10 rounded-full translate-x-1/3 translate-y-1/3" />

        <p className="inline-block bg-star-yellow text-amber-900 text-sm font-bold px-4 py-1 rounded-full mb-4 shadow">
          11 Languages Available
        </p>
        <h1 className="text-5xl md:text-6xl font-extrabold text-deep-dark leading-tight mb-4">
          Learn Two Languages <br />
          <span className="text-critter-green">the Fun Way!</span>
        </h1>
        <p className="text-body-text text-lg max-w-xl mx-auto mb-8">
          Where every word opens a new world. Animal-guided lessons built for
          bilingual kids.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/register"
            className="bg-pico-orange hover:bg-orange-600 text-white font-bold rounded-2xl px-8 py-4 text-lg shadow-lg transition-all duration-200 hover:scale-105"
          >
            Get Started Free
          </Link>
          <Link
            href="/login"
            className="bg-white border-2 border-critter-green text-critter-green font-bold rounded-2xl px-8 py-4 text-lg hover:bg-mint-bg transition-all duration-200"
          >
            Login
          </Link>
        </div>
      </section>

      {/* ── MEET THE CRITTERS ── */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-deep-dark font-bold text-3xl mb-2">
          Meet Your Guides
        </h2>
        <p className="text-body-text mb-12">
          Three friendly critters, one for each skill.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
          {/* Ollie - Reading */}
          <div className="bg-violet-50 border-2 border-ollie-purple rounded-3xl p-8 flex-1 shadow-md hover:shadow-xl transition-shadow duration-200 hover:-translate-y-1 transform">
            <div className="text-6xl mb-4">🦉</div>
            <h3 className="text-2xl font-extrabold text-ollie-purple mb-1">
              Ollie
            </h3>
            <span className="inline-block bg-ollie-purple text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              Reading
            </span>
            <p className="text-body-text text-sm">
              Ollie helps kids discover new words and build strong reading
              skills one story at a time.
            </p>
          </div>

          {/* Teo - Writing */}
          <div className="bg-emerald-50 border-2 border-teo-mint rounded-3xl p-8 flex-1 shadow-md hover:shadow-xl transition-shadow duration-200 hover:-translate-y-1 transform">
            <div className="text-6xl mb-4">🐢</div>
            <h3 className="text-2xl font-extrabold text-teo-mint mb-1">Teo</h3>
            <span className="inline-block bg-teo-mint text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              Writing
            </span>
            <p className="text-body-text text-sm">
              Teo guides kids through letters, words, and sentences with steady,
              patient lessons.
            </p>
          </div>

          {/* Pico - Speaking */}
          <div className="bg-orange-50 border-2 border-pico-orange rounded-3xl p-8 flex-1 shadow-md hover:shadow-xl transition-shadow duration-200 hover:-translate-y-1 transform">
            <div className="text-6xl mb-4">🦜</div>
            <h3 className="text-2xl font-extrabold text-pico-orange mb-1">
              Pico
            </h3>
            <span className="inline-block bg-pico-orange text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              Speaking
            </span>
            <p className="text-body-text text-sm">
              Pico makes pronunciation fun with games, songs, and speaking
              challenges.
            </p>
          </div>
        </div>
      </section>

      {/* ── LANGUAGE SELECTOR ── */}
      <section className="py-20 px-6 bg-mint-bg text-center">
        <h2 className="text-deep-dark font-bold text-3xl mb-2">
          Choose Your Languages
        </h2>
        <p className="text-body-text mb-10">
          Pick the two languages your child will learn together.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 max-w-2xl mx-auto">
          <div className="flex-1 bg-white rounded-2xl p-6 shadow border-2 border-critter-green">
            <label
              htmlFor="lang1"
              className="block text-critter-green font-bold mb-2 text-sm uppercase tracking-wide"
            >
              First Language
            </label>
            <select
              id="lang1"
              value={lang1}
              onChange={(e) => setLang1(e.target.value)}
              className="w-full border-2 border-critter-green rounded-xl px-4 py-3 text-deep-dark font-semibold focus:outline-none focus:ring-2 focus:ring-critter-green"
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center text-3xl font-black text-ollie-purple"></div>

          <div className="flex-1 bg-white rounded-2xl p-6 shadow border-2 border-sky-teal">
            <label
              htmlFor="lang2"
              className="block text-sky-teal font-bold mb-2 text-sm uppercase tracking-wide"
            >
              Second Language
            </label>
            <select
              id="lang2"
              value={lang2}
              onChange={(e) => setLang2(e.target.value)}
              className="w-full border-2 border-sky-teal rounded-xl px-4 py-3 text-deep-dark font-semibold focus:outline-none focus:ring-2 focus:ring-sky-teal"
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        {lang1 === lang2 && (
          <p className="mt-4 text-pico-red font-semibold">
            Please select two different languages.
          </p>
        )}
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-deep-dark font-bold text-3xl mb-2">How It Works</h2>
        <p className="text-body-text mb-12">
          Three simple steps to start learning today.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
          <div className="flex-1 bg-warm-white rounded-3xl p-8 border-2 border-star-yellow shadow">
            <div className="text-4xl mb-4"></div>
            <h3 className="text-xl font-extrabold text-deep-dark mb-2">
              1. Pick Your Languages
            </h3>
            <p className="text-body-text text-sm">
              Choose the two languages your child will explore together.
            </p>
          </div>
          <div className="flex-1 bg-warm-white rounded-3xl p-8 border-2 border-teo-mint shadow">
            <div className="text-4xl mb-4"></div>
            <h3 className="text-xl font-extrabold text-deep-dark mb-2">
              2. Meet Your Critter
            </h3>
            <p className="text-body-text text-sm">
              Your animal guide leads every reading, writing, and speaking
              lesson.
            </p>
          </div>
          <div className="flex-1 bg-warm-white rounded-3xl p-8 border-2 border-ollie-purple shadow">
            <div className="text-4xl mb-4"></div>
            <h3 className="text-xl font-extrabold text-deep-dark mb-2">
              3. Learn and Earn Stars
            </h3>
            <p className="text-body-text text-sm">
              Complete lessons and collect stars to track your progress.
            </p>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-20 px-6 bg-gradient-to-r from-ollie-purple to-sky-teal text-white text-center">
        <h2 className="text-3xl font-extrabold mb-4">Our Mission</h2>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          At LingoCritters we believe bilingual children deserve tools built for
          the way they actually learn — natural, joyful, and guided by friends
          every step of the way.
        </p>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="py-24 px-6 bg-warm-white text-center">
        <h2 className="text-deep-dark font-extrabold text-4xl mb-4">
          Ready to begin?
        </h2>
        <p className="text-body-text text-lg mb-8 max-w-lg mx-auto">
          Join families helping their children discover the world in two
          languages.
        </p>
        <Link
          href="/register"
          className="bg-critter-green hover:bg-green-700 text-white font-bold rounded-2xl px-10 py-4 text-xl shadow-lg transition-all duration-200 hover:scale-105 inline-block"
        >
          Create a Free Account
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-deep-dark text-white py-10 px-6 text-center">
        <div className="flex justify-center gap-6 text-2xl mb-4">
          <span>🦉 Ollie</span>
          <span>🐢 Teo</span>
          <span>🦜 Pico</span>
        </div>
        <div className="flex justify-center gap-6 mb-4 text-sm">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pico-orange transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-teal transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ollie-purple transition-colors"
          >
            Facebook
          </a>
        </div>
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} LingoCritters. This is a fictitious site
          created for educational purposes only.
        </p>
      </footer>
    </main>
  );
}
