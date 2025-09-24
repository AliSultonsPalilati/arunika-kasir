'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlusCircle, ShoppingCart, FileText, BarChart3, LogOut, Loader2 } from "lucide-react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="ml-4 text-lg">Memuat...</p>
      </main>
    );
  }

  if (status === 'authenticated') {
    return (
      <main className="min-h-screen bg-gray-100 flex">
        {/* Sidebar kiri */}
        <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
          <h1 className="text-xl font-bold mb-2">Dashboard Kasir</h1>
          <p className="text-sm text-gray-500 mb-6 truncate">
            Login sebagai: {session.user.name}
          </p>

          <nav className="flex flex-col gap-4 flex-grow">
            <Link href="/bayar" className="flex items-center gap-2 bg-blue-200/70 hover:bg-blue-300/80 text-blue-900 p-3 rounded-lg shadow transition-all">
              <ShoppingCart size={18} />
              Bayar Pesanan
            </Link>
            <Link href="/produk" className="flex items-center gap-2 bg-blue-200/70 hover:bg-blue-300/80 text-blue-900 p-3 rounded-lg shadow transition-all">
              <PlusCircle size={18} />
              Tambah Produk
            </Link>
            <Link href="/riwayat" className="flex items-center gap-2 bg-blue-200/70 hover:bg-blue-300/80 text-blue-900 p-3 rounded-lg shadow transition-all">
              <FileText size={18} />
              Riwayat Transaksi
            </Link>
            <Link href="/laporan" className="flex items-center gap-2 bg-blue-200/70 hover:bg-blue-300/80 text-blue-900 p-3 rounded-lg shadow transition-all">
              <BarChart3 size={18} />
              Laporan Penjualan
            </Link>
          </nav>

          <button 
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-800 p-3 rounded-lg shadow mt-4 transition-all"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </aside>

        {/* Konten kanan */}
        <section className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-6">Ringkasan Statistik</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-gray-500 text-sm">Total Penjualan Hari Ini</h3>
              <p className="text-xl font-semibold">Rp 0</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-gray-500 text-sm">Jumlah Transaksi</h3>
              <p className="text-xl font-semibold">0</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="text-gray-500 text-sm">Produk Terlaris</h3>
              <p className="text-xl font-semibold">-</p>
            </div>
          </div>
        </section>
      </main>
    );
  }
  return null;
}