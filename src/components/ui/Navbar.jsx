"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

// Links visible to everyone (logged in or not, on public pages)
const PUBLIC_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const PARENT_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const CHILD_LINKS = [
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { user, logout } = useAuth();

  const loading = user === undefined;

  const links = !user
    ? PUBLIC_LINKS
    : user.accountType === "parent"
      ? PARENT_LINKS
      : CHILD_LINKS;

  return (
    <nav className="bg-warm-white border-b-4 border-deep-dark px-6 py-4 font-display">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Wordmark — always links to correct home */}
        <Link
          href={
            !user
              ? "/"
              : user.accountType === "parent"
                ? "/dashboard"
                : "/learn"
          }
          className="font-black text-2xl"
        >
          <span className="text-deep-dark">Lingo</span>
          <span className="text-ollie-purple">Critters</span>
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          {!loading && (
            <>
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-deep-dark font-black text-sm px-4 py-2 rounded-xl hover:bg-star-yellow transition-colors duration-150"
                >
                  {label}
                </Link>
              ))}

              {user ? (
                <button
                  onClick={logout}
                  className="bg-pico-orange text-white font-black text-sm px-5 py-2 rounded-xl border-2 border-deep-dark shadow-comic hover:translate-y-0.5 hover:shadow-none transition-all duration-150 ml-2"
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-deep-dark font-black text-sm px-4 py-2 rounded-xl hover:bg-star-yellow transition-colors duration-150"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="bg-ollie-purple text-white font-black text-sm px-5 py-2 rounded-xl border-2 border-deep-dark shadow-comic hover:translate-y-0.5 hover:shadow-none transition-all duration-150 ml-2"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
