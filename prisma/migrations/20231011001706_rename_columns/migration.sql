/*
  Warnings:

  - You are about to drop the column `createdAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `order_product` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `order_product` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `order_product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `order_product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `order_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `order_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `order_product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `order_userId_idx` ON `order`;

-- DropIndex
DROP INDEX `order_product_orderId_idx` ON `order_product`;

-- DropIndex
DROP INDEX `order_product_productId_idx` ON `order_product`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order_product` DROP COLUMN `createdAt`,
    DROP COLUMN `orderId`,
    DROP COLUMN `productId`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `order_id` INTEGER NOT NULL,
    ADD COLUMN `product_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `order_user_id_idx` ON `order`(`user_id`);

-- CreateIndex
CREATE INDEX `order_product_order_id_idx` ON `order_product`(`order_id`);

-- CreateIndex
CREATE INDEX `order_product_product_id_idx` ON `order_product`(`product_id`);
