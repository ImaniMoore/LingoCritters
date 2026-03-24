"use client";

import Link from "next/link";
import { useLanguage, LANGUAGES } from "@/context/LanguageContext";
import { useTranslations } from "@/hooks/useTranslations";

export default function HomePage() {
  const { lang1, setLang1, lang2, setLang2 } = useLanguage();
  const t = useTranslations();

  // With only 2 languages, swapping is all that's needed
  function handleSwap() {
    setLang1(lang2);
    setLang2(lang1);
  }

  return (
    <div>
      {/* Hero Section */}
      <section>
        <h1>{t.hero.title}</h1>
        <p>{t.hero.subtitle}</p>
        <div>
          <Link href="/login">{t.nav.login}</Link>
          <Link href="/register">{t.nav.getStarted}</Link>
        </div>
      </section>

      {/* Meet The Critters */}
      <section>
        <h2>{t.guides.heading}</h2>
        <div>
          <div>
            <span>🦉</span>
            <h3>{t.guides.ollie.name}</h3>
            <p>{t.guides.ollie.role}</p>
          </div>
          <div>
            <span>🐢</span>
            <h3>{t.guides.teo.name}</h3>
            <p>{t.guides.teo.role}</p>
          </div>
          <div>
            <span>🦜</span>
            <h3>{t.guides.pico.name}</h3>
            <p>{t.guides.pico.role}</p>
          </div>
        </div>
      </section>

      {/* Language Selector — simple toggle since there are only 2 languages */}
      <section>
        <h2>{t.languages.heading}</h2>
        <div>
          <div>
            <p>{t.languages.first}: <strong>{lang1}</strong></p>
            <p>{t.languages.second}: <strong>{lang2}</strong></p>
          </div>
          {/* Swap button flips the two languages */}
          <button onClick={handleSwap}>{t.languages.swap}</button>
        </div>
      </section>

      {/* Mission */}
      <section>
        <h2>{t.mission.heading}</h2>
        <p>{t.mission.body}</p>
      </section>

      {/* How It Works */}
      <section>
        <h2>{t.howItWorks.heading}</h2>
        <div>
          <div>
            <h3>{t.howItWorks.step1.title}</h3>
            <p>{t.howItWorks.step1.body}</p>
          </div>
          <div>
            <h3>{t.howItWorks.step2.title}</h3>
            <p>{t.howItWorks.step2.body}</p>
          </div>
          <div>
            <h3>{t.howItWorks.step3.title}</h3>
            <p>{t.howItWorks.step3.body}</p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section>
        <h2>{t.cta.heading}</h2>
        <p>{t.cta.body}</p>
        <Link href="/register">{t.nav.createAccount}</Link>
      </section>
    </div>
  );
}