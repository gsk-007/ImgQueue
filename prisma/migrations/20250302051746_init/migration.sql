-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "ProcessingRequest" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "webhookUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "serialNumber" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "inputImageURls" TEXT[],
    "outputImageUrls" TEXT[],
    "requestId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_serialNumber_requestId_key" ON "Product"("serialNumber", "requestId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "ProcessingRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
