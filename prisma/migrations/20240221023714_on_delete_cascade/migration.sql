-- DropForeignKey
ALTER TABLE `deliveries` DROP FOREIGN KEY `deliveries_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `payments` DROP FOREIGN KEY `payments_order_id_fkey`;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deliveries` ADD CONSTRAINT `deliveries_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
