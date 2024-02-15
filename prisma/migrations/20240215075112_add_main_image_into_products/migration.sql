/*
  Warnings:

  - Added the required column `main_image` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `main_image` VARCHAR(255) NOT NULL;
