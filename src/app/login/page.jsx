"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: wire up your auth logic here
  };

  return (
    <>
      <main className="min-h-screen font-display overflow-x-hidden">

        {/* HERO */}
        <section className="relative bg-ollie-purple py-16 px-6 text-center overflow-hidden">
          <div className="absolute -top-8 -left-8 w-36 h-36 bg-star-yellow rounded-full border-4 border-deep-dark opacity-25" />
          <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-pico-orange rounded-full border-4 border-deep-dark opacity-15" />
          <div className="absolute top-4 right-24 w-16 h-16 bg-star-yellow rounded-full border-4 border-deep-dark opacity-20" />

          <h1 className="relative z-10 text-5xl md:text-6xl font-black text-white mb-3">
            Welcome Back!
          </h1>
          <p className="relative z-10 text-white font-bold text-xl max-w-md mx-auto opacity-80">
            Log in to continue your bilingual adventure.
          </p>
        </section>

        {/* LOGIN CARD */}
        <section className="bg-warm-white py-20 px-6 flex justify-center">
          <div className="w-full max-w-md">

            <div className="bg-white border-4 border-deep-dark rounded-3xl p-8 shadow-comic-xl">

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-star-yellow border-4 border-deep-dark shadow-comic flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                      fill="#1C1917"
                    />
                  </svg>
                </div>
              </div>

              <h2 className="text-deep-dark font-black text-3xl text-center mb-8">
                Log In
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* EMAIL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-deep-dark font-black text-sm uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-4 border-deep-dark rounded-xl px-4 py-3 font-bold bg-warm-white focus:outline-none focus:border-ollie-purple shadow-comic"
                  />
                </div>

                {/* PASSWORD */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-deep-dark font-black text-sm uppercase">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border-4 border-deep-dark rounded-xl px-4 py-3 pr-14 font-bold bg-warm-white focus:outline-none focus:border-ollie-purple shadow-comic"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-deep-dark/50 hover:text-deep-dark text-xs font-black"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {/* FORGOT PASSWORD */}
                  <div className="flex justify-end mt-1">
                    <Link
                      href="/auth/register"
                      className="text-ollie-purple font-black text-sm hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full bg-ollie-purple text-white font-black text-xl rounded-2xl px-6 py-4 border-4 border-deep-dark shadow-comic-lg hover:translate-y-1 hover:shadow-comic transition-all"
                >
                  Log In →
                </button>

              </form>
            </div>

            {/* SIGN UP */}
            <p className="text-center text-deep-dark font-bold mt-6 opacity-70">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-ollie-purple font-black hover:underline"
              >
                Sign up free →
              </Link>
            </p>

          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="bg-star-yellow border-t-4 border-deep-dark py-10 px-6">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-center gap-8 text-center">
            {[
              "No ads, ever",
              "Built for families",
              "Both languages celebrated",
            ].map((label) => (
              <div key={label}>
                <span className="text-deep-dark font-black text-lg">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  );
}