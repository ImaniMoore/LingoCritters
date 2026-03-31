"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function Login() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user !== undefined && user !== null) {
      router.replace(user.accountType === "parent" ? "/dashboard" : "/learn");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        setLoading(false);
        return;
      }

      // Update auth context with user data
      setUser(data.user);

      // Redirect based on account type
      const redirectUrl =
        data.user.accountType === "parent" ? "/dashboard" : "/learn";
      router.push(redirectUrl);
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-white">
        <p className="text-deep-dark font-black text-2xl">Loading...</p>
      </div>
    );
  }

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
              <h2 className="text-deep-dark font-black text-3xl text-center mb-8">
                Log In
              </h2>

              {error && (
                <div className="bg-pico-orange text-white font-black text-sm px-4 py-3 rounded-2xl border-4 border-deep-dark mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* USERNAME OR EMAIL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-deep-dark font-black text-sm uppercase">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="you@example.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    disabled={loading}
                    className="w-full border-4 border-deep-dark rounded-xl px-4 py-3 font-bold bg-warm-white focus:outline-none focus:border-ollie-purple shadow-comic disabled:opacity-50"
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
                      disabled={loading}
                      className="w-full border-4 border-deep-dark rounded-xl px-4 py-3 pr-14 font-bold bg-warm-white focus:outline-none focus:border-ollie-purple shadow-comic disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-deep-dark/50 hover:text-deep-dark text-xs font-black disabled:opacity-50"
                    >
                      {showPassword ? "hide" : "show"}
                    </button>
                  </div>

                  <div className="flex justify-end mt-1">
                    <Link
                      href="/forgot-password"
                      className="text-ollie-purple font-black text-sm hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-ollie-purple text-white font-black text-xl rounded-2xl px-6 py-4 border-4 border-deep-dark shadow-comic-lg hover:translate-y-1 hover:shadow-comic transition-all disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </form>
            </div>

            {/* SIGN UP */}
            <p className="text-center text-deep-dark font-bold mt-6 opacity-70">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-ollie-purple font-black hover:underline"
              >
                Sign up free
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
