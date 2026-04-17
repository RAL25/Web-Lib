/*
  Warnings:

  - Added the required column `data_prazo` to the `Emprestimo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Emprestimo` ADD COLUMN `data_prazo` DATETIME(3) NOT NULL;
