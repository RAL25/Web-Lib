/*
  Warnings:

  - You are about to drop the column `autor` on the `Livro` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Livro` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[isbn]` on the table `Livro` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isbn` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Livro` DROP COLUMN `autor`,
    DROP COLUMN `titulo`,
    ADD COLUMN `isbn` VARCHAR(191) NOT NULL,
    ADD COLUMN `media_avaliacoes` DOUBLE NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Livro_isbn_key` ON `Livro`(`isbn`);
