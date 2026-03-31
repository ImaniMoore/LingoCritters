"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!username.trim()) return "Please enter a username!";
    if (!email.trim()) return "Please enter your email!";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "That email doesn't look right!";
    if (password.length < 8) return "Password must be at least 8 characters!";
    if (password !== confirmPassword) return "Passwords don't match!";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <main className="min-h-screen font-display bg-warm-white flex flex-col items-center justify-center px-4 py-16 overflow-hidden relative">
      <div className="absolute -top-16 -right-16 w-60 h-60 bg-star-yellow rounded-full border-4 border-deep-dark opacity-20 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-ollie-purple rounded-full border-4 border-deep-dark opacity-10 pointer-events-none" />
      <div className="absolute top-10 left-16 w-14 h-14 bg-pico-orange rounded-full border-4 border-deep-dark opacity-30 pointer-events-none" />

      <Link
        href="/"
        className="mb-8 flex items-center gap-2 text-deep-dark font-black text-2xl hover:opacity-80 transition-opacity"
      >
        <span>LingoCritters</span>
      </Link>

      <div className="w-full max-w-md bg-white border-4 border-deep-dark rounded-3xl shadow-comic-xl overflow-hidden">
        <div className="bg-star-yellow px-8 py-7 text-center border-b-4 border-deep-dark">
          <h1 className="text-deep-dark font-black text-3xl">
            Create Your Account
          </h1>
          <p className="text-deep-dark font-semibold text-sm opacity-70 mt-1">
            Parent / guardian info
          </p>
        </div>

        <div className="px-8 pt-6">
          {error && (
            <div className="bg-pico-orange text-white font-black text-sm px-4 py-3 rounded-2xl border-4 border-deep-dark">
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-8 pt-4 space-y-5">
          <div className="space-y-1">
            <label className="block text-deep-dark font-black text-sm uppercase tracking-wide">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="spongebob squarepants"
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
                className="w-full border-4 border-deep-dark rounded-2xl px-4 py-3 pr-16 text-deep-dark font-bold text-base bg-warm-white placeholder:text-deep-dark/40 focus:outline-none focus:border-ollie-purple focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-deep-dark/50 hover:text-deep-dark text-xs font-black transition-colors"
              >
                {showPassword ? "hide" : "show"}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-deep-dark font-black text-sm uppercase tracking-wide">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm"
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
                Passwords match!
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-ollie-purple text-white font-black text-xl rounded-2xl px-6 py-4 border-4 border-deep-dark shadow-comic-lg hover:translate-y-1 hover:shadow-comic transition-all duration-150"
          >
            Create Account
          </button>

          <p className="text-center text-deep-dark font-bold text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-pico-orange font-black hover:underline"
            >
              Log in here
            </Link>
          </p>
        </form>
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
