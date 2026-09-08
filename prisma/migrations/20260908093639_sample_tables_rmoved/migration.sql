/*
  Warnings:

  - You are about to drop the `Cource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teachers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cource";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "Teachers";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
