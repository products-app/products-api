/*
  Warnings:

  - Added the required column `productId` to the `OrderProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderProducts` ADD COLUMN `price` DOUBLE NULL,
    ADD COLUMN `productId` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX `OrderProducts_productId_idx` ON `OrderProducts`(`productId`);
