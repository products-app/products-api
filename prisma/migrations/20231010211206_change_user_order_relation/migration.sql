-- DropIndex
DROP INDEX `Order_userId_key` ON `Order`;

-- CreateIndex
CREATE INDEX `Order_userId_idx` ON `Order`(`userId`);
