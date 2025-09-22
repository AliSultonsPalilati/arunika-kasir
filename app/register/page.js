'use client';

import { useState } from 'react';
import { UserPlus, ArrowRight, Loader2 } from 'lucide-react';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah halaman refresh saat form disubmit

    if (!fullName || !email || !password) {
      setError('Semua kolom wajib diisi.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Mengirim data ke backend API yang akan kita buat nanti
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Jika ada error dari server (misal: email sudah terdaftar)
        setError(data.message || 'Terjadi kesalahan saat mendaftar.');
        setIsLoading(false);
        return;
      }
      
      // Jika pendaftaran berhasil
      alert('Pendaftaran berhasil! Anda akan diarahkan ke halaman login.');
      window.location.href = '/login'; // Arahkan ke halaman login

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
            <div className="inline-flex items-center justify-center bg-blue-100 rounded-full p-3 mb-4">
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Buat Akun Baru</h1>
            <p className="text-gray-500 mt-1">Mulai perjalanan Anda bersama Arunika Kasir.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-100 p-2 rounded-lg">{error}</p>
            )}
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Mendaftar...
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
            <a href="/login" className="font-medium text-blue-600 hover:underline">
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

