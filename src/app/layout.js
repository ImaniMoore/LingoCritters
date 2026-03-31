import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { AuthProvider } from "../context/AuthContext";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
