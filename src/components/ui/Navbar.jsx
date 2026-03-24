"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-warm-white border-b-4 border-deep-dark px-6 py-4 font-display">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Wordmark logo */}
        <Link href="/" className="font-black text-2xl">
          <span className="text-deep-dark">Lingo</span>
          <span className="text-ollie-purple">Critters</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/about"
            className="text-deep-dark font-black text-sm px-4 py-2 rounded-xl hover:bg-star-yellow transition-colors duration-150"
          >
            About Us
          </Link>
          <Link
            href="/learn"
            className="text-deep-dark font-black text-sm px-4 py-2 rounded-xl hover:bg-star-yellow transition-colors duration-150"
          >
            Learn
          </Link>
          <Link
            href="/dashboard"
            className="text-deep-dark font-black text-sm px-4 py-2 rounded-xl hover:bg-star-yellow transition-colors duration-150"
          >
            Dashboard
          </Link>
          <Link
            href="/contact"
            className="text-deep-dark font-black text-sm px-4 py-2 rounded-xl hover:bg-star-yellow transition-colors duration-150"
          >
            Contact
          </Link>
          <Link
            href="/register"
            className="bg-ollie-purple text-white font-black text-sm px-5 py-2 rounded-xl border-2 border-deep-dark shadow-comic hover:translate-y-0.5 hover:shadow-none transition-all duration-150 ml-2"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
