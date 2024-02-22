/*
  Warnings:

  - The values [CANCEL] on the enum `orders_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `status` ENUM('PENDING', 'CANCELED', 'APPROVED', 'SHIPPED', 'COMPLETE') NOT NULL DEFAULT 'PENDING';
