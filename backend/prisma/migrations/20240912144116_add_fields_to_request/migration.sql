/*
  Warnings:

  - Added the required column `reqHeaders` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reqParams` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "reqHeaders" TEXT NOT NULL,
ADD COLUMN     "reqParams" TEXT NOT NULL;
