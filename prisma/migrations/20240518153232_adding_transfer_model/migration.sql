-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipientAcc" TEXT NOT NULL,
    "recipientUserId" TEXT NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_recipientUserId_fkey" FOREIGN KEY ("recipientUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
