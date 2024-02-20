-- AlterTable
ALTER TABLE `orders` ADD COLUMN `status` ENUM('PENDING', 'CONCEL', 'SHIPPED', 'COMPLETE') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `payments` MODIFY `payment_detail` VARCHAR(100) NULL,
    MODIFY `proof_of_payment` VARCHAR(255) NULL,
    MODIFY `payment_type_id` INTEGER NOT NULL DEFAULT 1;
