/*
  Warnings:

  - The `vipTicketPrice` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `standardTicketPrice` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `vipTicketCapacity` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `standardTicketCapacity` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "vipTicketPrice",
ADD COLUMN     "vipTicketPrice" DOUBLE PRECISION,
DROP COLUMN "standardTicketPrice",
ADD COLUMN     "standardTicketPrice" DOUBLE PRECISION,
DROP COLUMN "vipTicketCapacity",
ADD COLUMN     "vipTicketCapacity" DOUBLE PRECISION,
DROP COLUMN "standardTicketCapacity",
ADD COLUMN     "standardTicketCapacity" DOUBLE PRECISION NOT NULL;
