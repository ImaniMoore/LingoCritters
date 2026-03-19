import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/learn">Learn</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
