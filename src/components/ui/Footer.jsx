export default function Footer() {
  return (
    <footer>
      {/* Animal characters */}
      <div>
        <span>🦉 Ollie</span>
        <span>🐢 Teo</span>
        <span>🦜 Pico</span>
      </div>

      {/* Social media links */}
      <div>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>

      {/* Copyright */}
      <p>
        © {new Date().getFullYear()} LingoCritters. This is a fictitious site
        created for educational purposes only.
      </p>
    </footer>
  );
}