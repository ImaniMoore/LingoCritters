"use client";
export default function Footer() {
  return (
    <footer className="bg-warm-white border-t-4 border-deep-dark px-6 py-10 font-display">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Social media links */}
        <div className="flex gap-3 flex-wrap justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-deep-dark font-black text-sm hover:text-ollie-purple transition-colors duration-150"
          >
            Instagram
          </a>
          <span className="text-deep-dark opacity-30 font-bold">·</span>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-deep-dark font-black text-sm hover:text-ollie-purple transition-colors duration-150"
          >
            Twitter
          </a>
          <span className="text-deep-dark opacity-30 font-bold">·</span>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-deep-dark font-black text-sm hover:text-ollie-purple transition-colors duration-150"
          >
            Facebook
          </a>
        </div>

        {/* Copyright */}
        <p className="text-deep-dark font-semibold text-sm opacity-50 text-center">
          © {new Date().getFullYear()} LingoCritters. This is a fictitious site
          created for educational purposes only.
        </p>
      </div>
    </footer>
  );
}
