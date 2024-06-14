-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "affiliateId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "influencerName" TEXT,
ADD COLUMN     "isInfluencer" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Affiliate" (
    "id" TEXT NOT NULL,
    "influencerId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "signups" INTEGER NOT NULL DEFAULT 0,
    "sales" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Affiliate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_affiliateId_key" ON "Affiliate"("affiliateId");

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "Affiliate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affiliate" ADD CONSTRAINT "Affiliate_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affiliate" ADD CONSTRAINT "Affiliate_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
