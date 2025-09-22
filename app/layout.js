import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider"; // <-- Impor provider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Arunika Kasir",
  description: "Aplikasi kasir oleh Ali Sultons Palilati",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider> {/* <-- Bungkus children dengan provider */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

