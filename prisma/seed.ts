import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
    {
        email : "admin@bpcsaloone.lk",
        firstName : "Admin",
        lastName : "Bpc",
        password : "$2a$12$1VQ47HF3aMKTCZlEpwxZguHFUP1rtqnPnmjhcmlQWOMIJx1k39Xdi",
        role : "ADMIN",
        privileges : []

    }
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();