"use client";

export default function About() {
  return (
    <>
      <main className="min-h-screen font-display overflow-x-hidden">
        {/* ── HERO ── */}
        <section className="relative bg-star-yellow py-24 px-6 text-center overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pico-orange rounded-full border-4 border-deep-dark opacity-20" />
          <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-ollie-purple rounded-full border-4 border-deep-dark opacity-15" />
          <h1 className="relative z-10 text-5xl md:text-6xl font-black text-deep-dark leading-tight mb-4">
            Our Story
          </h1>
          <p className="relative z-10 text-deep-dark font-bold text-xl max-w-xl mx-auto opacity-80">
            Why LingoCritters exists and who it was made for.
          </p>
        </section>

        {/* ── THE PROBLEM ── */}
        <section className="bg-warm-white py-20 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-deep-dark font-black text-4xl mb-6">
              The Challenge of Growing Up Bilingual
            </h2>
            <p className="text-deep-dark font-semibold text-lg leading-relaxed opacity-70">
              Research shows that young children learning two languages
              simultaneously face unique challenges that most learning tools
              simply aren't built for. They're not behind they're doing
              something extraordinary. But they deserve resources that
              understand that, and meet them exactly where they are.
            </p>
          </div>
        </section>

        {/* ── THE CREATOR ── */}
        <section className="bg-ollie-purple py-20 px-6 text-center">
          <h2 className="text-white font-black text-4xl mb-12">
            Meet the Creator
          </h2>

          <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
            <div className="w-40 h-40 rounded-full border-4 border-white shadow-comic-xl overflow-hidden bg-warm-white">
              <img
                src="/images/creator.jpg"
                alt="Creator photo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl text-left">
              <p className="text-deep-dark font-semibold text-lg leading-relaxed opacity-80">
                I'm a parent first. My daughter is bilingual, growing up
                speaking both English and her home language and watching her
                navigate that journey inspired everything you see here. I saw
                how hard it was for her to switch between two worlds, and how
                few tools truly supported that experience.
              </p>
              <p className="text-deep-dark font-semibold text-lg leading-relaxed opacity-80 mt-4">
                I'm passionate about this because I've lived it. Bilingualism is
                a gift, but it comes with real challenges especially for kids
                ages 5 to 7 who are still building confidence in both languages
                at once. LingoCritters is my answer to that. Built with love,
                built for families like mine.
              </p>
            </div>
          </div>
        </section>

        {/* ── OUR VALUES ── */}
        <section className="bg-star-yellow py-20 px-6 text-center">
          <h2 className="text-deep-dark font-black text-4xl mb-12">
            What We Stand For
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            <div className="flex-1 bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-lg text-left">
              <h3 className="text-xl font-black text-ollie-purple mb-2">
                Joyful Learning
              </h3>
              <p className="text-deep-dark font-semibold text-sm opacity-70 leading-relaxed">
                Kids learn best when they're having fun. Every lesson is
                designed to feel like play, not work.
              </p>
            </div>

            <div className="flex-1 bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-lg text-left">
              <h3 className="text-xl font-black text-ollie-purple mb-2">
                Family First
              </h3>
              <p className="text-deep-dark font-semibold text-sm opacity-70 leading-relaxed">
                Parents are partners, not bystanders. We build tools that keep
                families involved and informed every step of the way.
              </p>
            </div>

            <div className="flex-1 bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-lg text-left">
              <h3 className="text-xl font-black text-ollie-purple mb-2">
                Both Languages Matter
              </h3>
              <p className="text-deep-dark font-semibold text-sm opacity-70 leading-relaxed">
                We celebrate every language equally. No language is treated as
                secondary both are worthy of pride and practice.
              </p>
            </div>
          </div>
        </section>

        {/* ── SAFE & TRUSTED ── */}
        <section className="bg-warm-white py-20 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-deep-dark font-black text-4xl mb-6">
              Safe, Simple & Trusted
            </h2>
            <p className="text-deep-dark font-semibold text-lg leading-relaxed opacity-70">
              LingoCritters is designed to be used together parent and child,
              side by side. There are no ads, no distractions, and no dark
              patterns. Just focused, guided learning in a space families can
              trust.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
