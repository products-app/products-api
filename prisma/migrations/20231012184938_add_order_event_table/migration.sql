-- CreateTable
CREATE TABLE `order_event` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NULL DEFAULT 'pending_payment',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` INTEGER NULL,
    `order_id` INTEGER NULL,

    INDEX `order_event_order_id_idx`(`order_id`),
    INDEX `order_event_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
