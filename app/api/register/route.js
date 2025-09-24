import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // pastikan file prisma client sudah ada

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Nama, email, dan password wajib diisi." },
        { status: 400 }
      );
    }

    // cek apakah email sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email sudah terdaftar." },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // simpan user baru ke DB
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CASHIER", // default role
      },
    });

    return NextResponse.json({ message: "Registrasi berhasil!" }, { status: 201 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
