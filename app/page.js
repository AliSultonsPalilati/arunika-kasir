import { PlusCircle, ShoppingCart, FileText, BarChart3 } from "lucide-react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100 flex">
      {/* Sidebar kiri */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-4">
        <h1 className="text-xl font-bold mb-6">Dashboard Kasir Arunika</h1>

        <button className="flex items-center gap-2 bg-blue-200/70 hover:bg-blue-300/80 text-blue-900 p-3 rounded-lg shadow backdrop-blur-sm">
          <ShoppingCart size={18} />
          Bayar Pesanan
        </button>
        <button className="flex items-center gap-2 bg-blue-200/70 hover:bg-blue-300/80 text-blue-900 p-3 rounded-lg shadow backdrop-blur-sm">
          <PlusCircle size={18} />
          Tambah Produk
        </button>
        <button className="flex items-center gap-2 bg-blue-200/70 hover:bg-blue-300/80 text-blue-900 p-3 rounded-lg shadow backdrop-blur-sm">
          <FileText size={18} />
          Riwayat Transaksi
        </button>
        <button className="flex items-center gap-2 bg-blue-200/70 hover:bg-blue-300/80 text-blue-900 p-3 rounded-lg shadow backdrop-blur-sm">
          <BarChart3 size={18} />
          Laporan Penjualan
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
