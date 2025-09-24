"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      router.push("/register"); // Redirect ke halaman daftar
    }, 3000); // 3 detik

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      {showSplash && (
        <h1 className="text-4xl font-bold text-gray-800 animate-pulse">
          Arunika
        </h1>
      )}
    </div>
  );
}
