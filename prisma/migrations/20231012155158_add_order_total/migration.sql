/*
  Warnings:

  - Added the required column `total` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `total` DOUBLE NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'pending_payment';
