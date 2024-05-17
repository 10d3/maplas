/*
  Warnings:

  - Added the required column `method` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "method" TEXT NOT NULL;
