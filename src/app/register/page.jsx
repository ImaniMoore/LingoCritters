"use client";

import { useState } from "react";
import Link from "next/link";

const languages = ["English", "Spanish", "Vietnamese"];

export default function Register() {
  const [step, setStep] = useState(1);

  // Step 1 fields
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 2 fields
  const [childName, setChildName] = useState("");
  const [lang1, setLang1] = useState("English");
  const [lang2, setLang2] = useState("Spanish");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateStep1 = () => {
    if (!parentName.trim()) return "Please enter your name!";
    if (!email.trim()) return "Please enter your email!";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "That email doesn't look right!";
    if (password.length < 8) return "Password must be at least 8 characters!";
    if (password !== confirmPassword) return "Passwords don't match!";
    return "";
  };

  const validateStep2 = () => {
    if (!childName.trim()) return "Please enter your child's name!";
    if (lang1 === lang2) return "Please pick two different languages!";
    return "";
  };

  const handleNext = () => {
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateStep2();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setIsLoading(true);
    // TODO: wire up registration logic
    await new Promise((r) => setTimeout(r, 1400));
    setIsLoading(false);
  };

  const strength =
    password.length === 0
      ? 0
      : password.length < 6
        ? 1
        : password.length < 10
          ? 2
          : 3;
  const strengthLabel = ["", "Weak 😬", "Good 👍", "Strong 💪"][strength];
  const strengthColor = [
    "",
    "bg-pico-orange",
    "bg-star-yellow",
    "bg-green-400",
  ][strength];

  return (
    <main className="min-h-screen font-display bg-warm-white flex flex-col items-center justify-center px-4 py-16 overflow-hidden relative">
      <div className="absolute -top-16 -right-16 w-60 h-60 bg-star-yellow rounded-full border-4 border-deep-dark opacity-20 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-ollie-purple rounded-full border-4 border-deep-dark opacity-10 pointer-events-none" />
      <div className="absolute top-10 left-16 w-14 h-14 bg-pico-orange rounded-full border-4 border-deep-dark opacity-30 pointer-events-none" />

      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-deep-dark font-black text-2xl hover:opacity-80 transition-opacity"
      >
        <span>🦉</span>
        <span>LingoCritters</span>
      </Link>

      <div className="w-full max-w-md bg-white border-4 border-deep-dark rounded-3xl shadow-comic-xl overflow-hidden">
        {/* Card header */}
        <div className="bg-star-yellow px-8 py-7 text-center border-b-4 border-deep-dark">
          <div className="text-5xl mb-2">{step === 1 ? "🎉" : "🦜"}</div>
          <h1 className="text-deep-dark font-black text-3xl">
            {step === 1 ? "Create Your Account" : "Set Up Your Child's Profile"}
          </h1>
          <p className="text-deep-dark font-semibold text-sm opacity-70 mt-1">
            {step === 1
              ? "Parent / guardian info"
              : "Almost there — just two more things!"}
          </p>
          <div className="flex justify-center gap-3 mt-4">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full border-4 border-deep-dark font-black text-sm flex items-center justify-center transition-colors ${
                  s === step
                    ? "bg-ollie-purple text-white"
                    : s < step
                      ? "bg-green-400 text-white"
                      : "bg-white text-deep-dark opacity-50"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 pt-6">
          {error && (
            <div className="bg-pico-orange text-white font-black text-sm px-4 py-3 rounded-2xl border-4 border-deep-dark flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="px-8 pb-8 pt-4 space-y-5">
            <div className="space-y-1">
              <label className="block text-deep-dark font-black text-sm uppercase tracking-wide">
                Your Name
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full border-4 border-deep-dark rounded-2xl px-4 py-3 text-deep-dark font-bold text-base bg-warm-white placeholder:text-deep-dark/40 focus:outline-none focus:border-ollie-purple focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-deep-dark font-black text-sm uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-4 border-deep-dark rounded-2xl px-4 py-3 text-deep-dark font-bold text-base bg-warm-white placeholder:text-deep-dark/40 focus:outline-none focus:border-ollie-purple focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-deep-dark font-black text-sm uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full border-4 border-deep-dark rounded-2xl px-4 py-3 pr-14 text-deep-dark font-bold text-base bg-warm-white placeholder:text-deep-dark/40 focus:outline-none focus:border-ollie-purple focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-deep-dark/50 hover:text-deep-dark text-lg transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {password.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-2 bg-deep-dark/10 rounded-full overflow-hidden border-2 border-deep-dark/20">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strengthColor}`}
                      style={{ width: `${(strength / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-deep-dark font-black text-xs">
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-deep-dark font-black text-sm uppercase tracking-wide">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full border-4 rounded-2xl px-4 py-3 text-deep-dark font-bold text-base bg-warm-white placeholder:text-deep-dark/40 focus:outline-none focus:bg-white transition-colors ${
                  confirmPassword && password !== confirmPassword
                    ? "border-pico-orange"
                    : confirmPassword && password === confirmPassword
                      ? "border-green-400"
                      : "border-deep-dark"
                }`}
              />
              {confirmPassword && password === confirmPassword && (
                <p className="text-green-600 font-black text-xs">
                  ✓ Passwords match!
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-ollie-purple text-white font-black text-xl rounded-2xl px-6 py-4 border-4 border-deep-dark shadow-comic-lg hover:translate-y-1 hover:shadow-comic transition-all duration-150"
            >
              Next Step →
            </button>

            <p className="text-center text-deep-dark font-bold text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-pico-orange font-black hover:underline"
              >
                Log in here!
              </Link>
            </p>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="px-8 pb-8 pt-4 space-y-5">
            <div className="space-y-1">
              <label className="block text-deep-dark font-black text-sm uppercase tracking-wide">
                Child's Name
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="e.g. Sofia"
                className="w-full border-4 border-deep-dark rounded-2xl px-4 py-3 text-deep-dark font-bold text-base bg-warm-white placeholder:text-deep-dark/40 focus:outline-none focus:border-ollie-purple focus:bg-white transition-colors"
              />
            </div>

            <div className="bg-ollie-purple/10 border-4 border-deep-dark rounded-2xl p-4 space-y-4">
              <p className="text-deep-dark font-black text-sm uppercase tracking-wide text-center">
                Languages to Learn
              </p>
              <div className="flex gap-3 items-center">
                <div className="flex-1 space-y-1">
                  <label className="block text-deep-dark font-black text-xs uppercase tracking-wide">
                    First Language
                  </label>
                  <select
                    value={lang1}
                    onChange={(e) => setLang1(e.target.value)}
                    className="w-full border-4 border-deep-dark rounded-xl px-3 py-2 text-deep-dark font-bold text-sm bg-white focus:outline-none"
                  >
                    {languages.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="text-2xl font-black text-deep-dark mt-4 select-none">
                  ⇄
                </span>
                <div className="flex-1 space-y-1">
                  <label className="block text-deep-dark font-black text-xs uppercase tracking-wide">
                    Second Language
                  </label>
                  <select
                    value={lang2}
                    onChange={(e) => setLang2(e.target.value)}
                    className="w-full border-4 border-deep-dark rounded-xl px-3 py-2 text-deep-dark font-bold text-sm bg-white focus:outline-none"
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
                <p className="text-pico-orange font-black text-xs text-center">
                  ⚠️ Please pick two different languages!
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <div className="flex-1 bg-ollie-purple/10 border-4 border-deep-dark rounded-2xl p-3 text-center">
                <div className="text-3xl">🦉</div>
                <p className="text-deep-dark font-black text-xs mt-1">Ollie</p>
                <p className="text-deep-dark/60 font-semibold text-xs">
                  Reading
                </p>
              </div>
              <div className="flex-1 bg-pico-orange/10 border-4 border-deep-dark rounded-2xl p-3 text-center">
                <div className="text-3xl">🦜</div>
                <p className="text-deep-dark font-black text-xs mt-1">Pico</p>
                <p className="text-deep-dark/60 font-semibold text-xs">
                  Speaking
                </p>
              </div>
            </div>
            <p className="text-center text-deep-dark/60 font-bold text-xs -mt-2">
              These guides will lead {childName || "your child"}'s lessons!
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError("");
                }}
                className="flex-1 bg-white text-deep-dark font-black text-base rounded-2xl px-4 py-4 border-4 border-deep-dark shadow-comic hover:translate-y-1 transition-all duration-150"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-[2] bg-star-yellow text-deep-dark font-black text-xl rounded-2xl px-6 py-4 border-4 border-deep-dark shadow-comic-lg hover:translate-y-1 hover:shadow-comic transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin inline-block">🌀</span>{" "}
                    Creating…
                  </>
                ) : (
                  "Start Learning! 🎉"
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      <p className="mt-8 text-deep-dark/50 font-semibold text-xs text-center max-w-xs">
        By registering you agree to our{" "}
        <Link href="/terms" className="underline hover:text-deep-dark">
          Terms
        </Link>{" "}
        &amp;{" "}
        <Link href="/privacy" className="underline hover:text-deep-dark">
          Privacy Policy
        </Link>
        .
      </p>
    </main>
  );
}
