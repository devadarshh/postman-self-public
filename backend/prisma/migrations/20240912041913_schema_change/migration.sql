/*
  Warnings:

  - The primary key for the `Request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Request` table. All the data in the column will be lost.
  - The required column `reqId` was added to the `Request` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Request" DROP CONSTRAINT "Request_pkey",
DROP COLUMN "id",
ADD COLUMN     "reqId" TEXT NOT NULL,
ADD CONSTRAINT "Request_pkey" PRIMARY KEY ("reqId");

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_reqId_fkey" FOREIGN KEY ("reqId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
