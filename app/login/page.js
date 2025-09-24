'use client';

import { useState } from 'react';
import { LogIn, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Terjadi kesalahan saat login.');
        setIsLoading(false);
        return;
      }
      
      router.push('/dashboard');
    } catch (fetchError) {
      console.error('Gagal terhubung ke server:', fetchError);
      setError('Gagal terhubung ke server. Silakan coba lagi nanti.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-indigo-100 rounded-full p-3 mb-4">
              <LogIn className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Selamat Datang Kembali</h1>
            <p className="text-gray-500 mt-1">Masuk untuk melanjutkan ke dashboard kasir.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contoh@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-100 p-2 rounded-lg">{error}</p>
            )}
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 flex items-center justify-center gap-2 disabled:bg-indigo-400 disabled:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Masuk...
                </>
              ) : (
                <>
                  Masuk
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Belum punya akun?{' '}
            <a href="/register" className="font-medium text-indigo-600 hover:underline">
              Daftar di sini
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
