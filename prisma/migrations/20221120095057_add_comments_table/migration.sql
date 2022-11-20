/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `Videos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[videoFileName]` on the table `Videos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "commenterName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videoId" INTEGER,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Videos_publicId_key" ON "Videos"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "Videos_videoFileName_key" ON "Videos"("videoFileName");

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
