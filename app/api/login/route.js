import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan password wajib diisi.' },
        { status: 400 } // Bad Request
      );
    }

    // 2. Cari pengguna berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Email atau password salah.' },
        { status: 401 } // Unauthorized
      );
    }

    // 3. Bandingkan password yang dikirim dengan hash di database
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Email atau password salah.' },
        { status: 401 } // Unauthorized
      );
    }

    // Jangan kirim kembali password hash di respons
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: 'Login berhasil!', user: userWithoutPassword },
      { status: 200 } // OK
    );

  } catch (error) {
    console.error('Error saat login:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan pada server.' },
      { status: 500 } // Internal Server Error
    );
  }
}

