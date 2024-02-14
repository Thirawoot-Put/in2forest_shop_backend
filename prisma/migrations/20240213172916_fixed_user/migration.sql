/*
  Warnings:

  - Made the column `last_name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mobile` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `last_name` VARCHAR(40) NOT NULL,
    MODIFY `role` ENUM('CUSTOMER', 'ADMIN') NOT NULL DEFAULT 'CUSTOMER',
    MODIFY `mobile` VARCHAR(40) NOT NULL;
