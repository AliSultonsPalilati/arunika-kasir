import { PrismaClient } from "@prisma/client";

let prisma;

// Gunakan singleton supaya tidak membuat banyak instance di development
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalThis._prisma) {
    globalThis._prisma = new PrismaClient();
  }
  prisma = globalThis._prisma;
}

export default prisma;
