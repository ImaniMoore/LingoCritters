import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <html lang="en">
        <body className={nunito.className}>{children}</body>
      </html>
      <Footer />
    </>
  );
}
