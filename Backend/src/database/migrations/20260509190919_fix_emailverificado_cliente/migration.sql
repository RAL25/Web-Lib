/*
  Warnings:

  - You are about to drop the column `emailVerificado` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Cliente` ADD COLUMN `emailVerificado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Usuario` DROP COLUMN `emailVerificado`;
