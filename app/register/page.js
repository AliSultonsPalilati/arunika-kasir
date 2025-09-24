'use client';

import { useState } from 'react';
import { UserPlus, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Register() {
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
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Gagal registrasi.');
        setIsLoading(false);
        return;
      }

      alert('Registrasi berhasil! Silakan login.');
      router.push('/login');
    } catch (err) {
      setError('Gagal terhubung ke server.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-green-100 rounded-full p-3 mb-4">
              <UserPlus className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Buat Akun Baru</h1>
            <p className="text-gray-500 mt-1">Daftar untuk menggunakan kasir Arunika.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contoh@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {error && <p className="text-sm text-red-600 bg-red-100 p-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 disabled:bg-green-400"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Mendaftar...
                </>
              ) : (
                <>
                  Daftar
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Sudah punya akun?{' '}
            <a href="/login" className="font-medium text-green-600 hover:underline">
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}