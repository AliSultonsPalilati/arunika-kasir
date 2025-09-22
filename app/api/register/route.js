import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, password } = body;

    // 1. Validasi input dasar
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: 'Semua kolom wajib diisi.' },
        { status: 400 } // Bad Request
      );
    }

    // 2. Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email sudah terdaftar.' },
        { status: 409 } // Conflict
      );
    }

    // 3. Hash password sebelum disimpan
    const hashedPassword = bcrypt.hashSync(password, 10); // 10 adalah salt rounds

    // 4. Buat pengguna baru di database
    const newUser = await prisma.user.create({
      data: {
        fullName: fullName,
        email: email,
        password: hashedPassword,
      },
    });

    // Jangan kirim kembali password hash di respons
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { message: 'Pendaftaran berhasil!', user: userWithoutPassword },
      { status: 201 } // Created
    );

  } catch (error) {
    console.error('Error saat pendaftaran:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan pada server.' },
      { status: 500 } // Internal Server Error
    );
  }
}

