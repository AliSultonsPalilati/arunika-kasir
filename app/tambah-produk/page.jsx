"use client";

import { useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function TambahProduk() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [loading, setLoading] = useState(false);
  const [pesan, setPesan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPesan("");

    try {
      await addDoc(collection(db, "produk"), {
        nama: nama,
        harga: parseFloat(harga),
        dibuat: new Date(),
      });

      setPesan("✅ Produk berhasil ditambahkan!");
      setNama("");
      setHarga("");
    } catch (error) {
      setPesan("❌ Gagal menambahkan produk: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nama Produk</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Harga</label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>

      {pesan && <p className="mt-4 text-center">{pesan}</p>}
    </div>
  );
}
