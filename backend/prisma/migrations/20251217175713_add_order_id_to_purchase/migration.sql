-- AlterTable
ALTER TABLE `purchase` ADD COLUMN `order_id` VARCHAR(100) NULL;

-- CreateIndex
CREATE INDEX `purchase_order_id_idx` ON `purchase`(`order_id`);

-- AddForeignKey
ALTER TABLE `analytics_events` ADD CONSTRAINT `analytics_events_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase` ADD CONSTRAINT `purchase_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase` ADD CONSTRAINT `purchase_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
