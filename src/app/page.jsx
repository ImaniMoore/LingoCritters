"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const languages = ["English", "Spanish"];

export default function Home() {
  const [lang1, setLang1] = useState("English");
  const [lang2, setLang2] = useState("Spanish");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace(user.accountType === "parent" ? "/dashboard" : "/learn");
    }
  }, [user, router]);

  return (
    <>
      <main className="min-h-screen font-display overflow-x-hidden">
        {/* ── HERO ── warm white bg, purple + orange accent blobs */}
        {/* ── HERO ── warm white bg, purple + orange accent blobs */}
        <section className="relative bg-warm-white py-24 px-6 text-center overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pico-orange rounded-full border-4 border-deep-dark opacity-20" />
          <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-ollie-purple rounded-full border-4 border-deep-dark opacity-15" />
          <div className="absolute top-8 right-16 w-20 h-20 bg-star-yellow rounded-full border-4 border-deep-dark opacity-60" />
          <div className="absolute bottom-16 left-20 w-14 h-14 bg-pico-orange rounded-full border-4 border-deep-dark opacity-25" />

          <h1 className="relative z-10 text-5xl md:text-7xl font-black text-deep-dark leading-tight mb-4">
            Learn Two Languages <br />
            <span className="text-ollie-purple">the Fun Way!</span>
          </h1>

          <p className="relative z-10 text-deep-dark text-xl font-bold max-w-xl mx-auto mb-10">
            Animal guided lessons built for bilingual kids ages 5–7
          </p>

          <div className="relative z-10 flex justify-center gap-4 flex-wrap">
            <Link
              href="/register"
              className="bg-ollie-purple text-white font-black text-xl rounded-2xl px-10 py-4 border-4 border-deep-dark shadow-comic-lg hover:translate-y-1 hover:shadow-comic transition-all duration-150"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="bg-white text-deep-dark font-black text-xl rounded-2xl px-10 py-4 border-4 border-deep-dark shadow-comic-lg hover:translate-y-1 hover:shadow-comic transition-all duration-150"
            >
              Log In
            </Link>
          </div>
        </section>

        {/* ── MEET THE CRITTERS ── star yellow background */}
        <section className="bg-star-yellow py-20 px-6 text-center">
          <h2 className="text-deep-dark font-black text-4xl mb-2">
            Meet Your Guides
          </h2>
          <p className="text-deep-dark font-bold text-lg mb-12 opacity-70">
            Two friendly critters, one for each skill.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            <div className="bg-ollie-purple border-4 border-deep-dark rounded-3xl p-8 flex-1 shadow-comic-xl hover:-translate-y-2 transition-transform duration-200">
              <div className="text-7xl mb-4">🦉</div>
              <h3 className="text-3xl font-black text-white mb-2">Ollie</h3>
              <span className="inline-block bg-star-yellow text-deep-dark text-sm font-black px-4 py-1 rounded-full border-2 border-deep-dark mb-4">
                Reading
              </span>
              <p className="text-white font-semibold text-sm leading-relaxed opacity-95">
                Ollie helps kids discover new words and build strong reading
                skills one story at a time.
              </p>
            </div>

            <div className="bg-pico-orange border-4 border-deep-dark rounded-3xl p-8 flex-1 shadow-comic-xl hover:-translate-y-2 transition-transform duration-200">
              <div className="text-7xl mb-4">🦜</div>
              <h3 className="text-3xl font-black text-white mb-2">Pico</h3>
              <span className="inline-block bg-star-yellow text-deep-dark text-sm font-black px-4 py-1 rounded-full border-2 border-deep-dark mb-4">
                Speaking
              </span>
              <p className="text-white font-semibold text-sm leading-relaxed opacity-95">
                Pico makes pronunciation fun with songs and speaking challenges.
                Speaking activities are designed to be done with a parent or
                guardian present.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHAT THEY'LL LEARN ── warm white, white cards */}
        <section className="bg-warm-white py-20 px-6 text-center">
          <h2 className="text-deep-dark font-black text-4xl mb-2">
            What Your Child Will Learn
          </h2>
          <p className="text-deep-dark font-bold mb-12 text-lg opacity-70">
            Every lesson covers core skills.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1 bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-lg">
              <div className="text-5xl mb-4">🦉</div>
              <h3 className="text-2xl font-black text-ollie-purple mb-4">
                Reading
              </h3>
              <ul className="text-deep-dark font-semibold text-sm space-y-3 text-left list-disc list-inside">
                <li>Learn the alphabet &amp; letter sounds</li>
                <li>Build simple words (cat, dog, sun)</li>
                <li>Read short 3–4 word phrases</li>
                <li>Form complete sentences</li>
                <li>Read structured sentences</li>
                <li>Understand short paragraphs</li>
              </ul>
            </div>

            <div className="flex-1 bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-lg">
              <div className="text-5xl mb-4">🦜</div>
              <h3 className="text-2xl font-black text-pico-orange mb-4">
                Speaking
              </h3>
              <ul className="text-deep-dark font-semibold text-sm space-y-3 text-left list-disc list-inside">
                <li>Practice alphabet sounds</li>
                <li>Say and repeat basic words</li>
                <li>Speak short phrases</li>
                <li>Form simple sentences</li>
                <li>Learn through songs (ABC, Wheels on the Bus)</li>
                <li>Guided speaking with parent support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── CHOOSE LANGUAGES ── ollie purple background */}
        <section className="bg-ollie-purple py-20 px-6 text-center">
          <h2 className="text-white font-black text-4xl mb-2">
            Choose Your Languages
          </h2>
          <p className="text-white font-bold text-lg mb-10 opacity-80">
            Children are expected to have proficiency in one language and be in
            the process of learning a second. Please indicate the two languages
            your child will learn.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-2xl mx-auto items-center">
            <div className="flex-1 bg-star-yellow rounded-2xl p-6 border-4 border-deep-dark shadow-comic-lg">
              <label className="block text-deep-dark font-black mb-2 text-sm uppercase tracking-wide">
                First Language
              </label>
              <select
                value={lang1}
                onChange={(e) => setLang1(e.target.value)}
                className="w-full border-4 border-deep-dark rounded-xl px-4 py-3 text-deep-dark font-bold text-lg bg-white focus:outline-none"
              >
                {languages.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-5xl font-black text-white select-none">⇄</div>

            <div className="flex-1 bg-white rounded-2xl p-6 border-4 border-deep-dark shadow-comic-lg">
              <label className="block text-deep-dark font-black mb-2 text-sm uppercase tracking-wide">
                Second Language
              </label>
              <select
                value={lang2}
                onChange={(e) => setLang2(e.target.value)}
                className="w-full border-4 border-deep-dark rounded-xl px-4 py-3 text-deep-dark font-bold text-lg bg-white focus:outline-none"
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
            <p className="mt-6 inline-block bg-pico-orange text-white font-black px-6 py-3 rounded-full border-4 border-deep-dark shadow-comic">
              Please pick two different languages!
            </p>
          )}
        </section>

        {/* ── HOW IT WORKS ── star yellow */}
        <section className="bg-star-yellow py-20 px-6 text-center">
          <h2 className="text-deep-dark font-black text-4xl mb-2">
            How It Works
          </h2>
          <p className="text-deep-dark font-bold mb-12 text-lg opacity-70">
            Three simple steps to start learning today.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1 bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl hover:-translate-y-1 transition-transform duration-150">
              <div className="text-4xl font-black text-deep-dark mb-3">1</div>
              <h3 className="text-xl font-black text-deep-dark mb-2">
                Pick Your Languages
              </h3>
              <p className="text-deep-dark font-semibold text-sm opacity-70">
                Choose two languages your child will explore together.
              </p>
            </div>

            <div className="flex-1 bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl hover:-translate-y-1 transition-transform duration-150">
              <div className="text-4xl font-black text-deep-dark mb-3">2</div>
              <h3 className="text-xl font-black text-deep-dark mb-2">
                Meet Your Critter
              </h3>
              <p className="text-deep-dark font-semibold text-sm opacity-70">
                Your animal guide leads every reading and speaking lesson.
              </p>
            </div>

            <div className="flex-1 bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl hover:-translate-y-1 transition-transform duration-150">
              <div className="text-4xl font-black text-deep-dark mb-3">3</div>
              <h3 className="text-xl font-black text-deep-dark mb-2">
                Track Progress
              </h3>
              <p className="text-deep-dark font-semibold text-sm opacity-70">
                Complete lessons and track your progress.
              </p>
            </div>
          </div>
        </section>

        {/* ── MISSION ── warm white */}
        <section className="bg-warm-white py-20 px-6 text-center">
          <h2 className="text-deep-dark font-black text-4xl mb-4">
            Our Mission
          </h2>
          <p className="max-w-2xl mx-auto text-deep-dark font-bold text-lg leading-relaxed opacity-70">
            At LingoCritters we believe bilingual children deserve tools built
            for the way they actually learn, natural, joyful, and guided by
            friends every step of the way.
          </p>
        </section>

        {/* ── CALL TO ACTION ── ollie purple, big and loud */}
        <section className="bg-ollie-purple py-24 px-6 text-center">
          <h2 className="text-white font-black text-5xl mb-4">
            Ready to begin?
          </h2>
          <p className="text-white font-bold text-xl mb-10 max-w-lg mx-auto opacity-80">
            Join families helping their children discover the world in two
            languages.
          </p>
          <Link
            href="/register"
            className="inline-block bg-star-yellow text-deep-dark font-black text-2xl rounded-2xl px-12 py-5 border-4 border-deep-dark shadow-comic-xl hover:translate-y-1 hover:shadow-comic-lg transition-all duration-150"
          >
            Create a Free Account
          </Link>
        </section>
      </main>
    </>
  );
}
