/*
  Warnings:

  - Added the required column `method` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transfer" ADD COLUMN     "method" TEXT NOT NULL;
