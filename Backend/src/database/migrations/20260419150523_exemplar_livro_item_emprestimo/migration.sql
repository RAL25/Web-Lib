/*
  Warnings:

  - You are about to drop the column `data_devolucao` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `data_prazo` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `id_livro` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Livro` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Emprestimo` DROP FOREIGN KEY `Emprestimo_id_livro_fkey`;

-- DropIndex
DROP INDEX `Emprestimo_id_livro_fkey` ON `Emprestimo`;

-- AlterTable
ALTER TABLE `Emprestimo` DROP COLUMN `data_devolucao`,
    DROP COLUMN `data_prazo`,
    DROP COLUMN `id_livro`,
    MODIFY `data_saida` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Livro` DROP COLUMN `status`;

-- CreateTable
CREATE TABLE `ExemplarLivro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `livroId` INTEGER NOT NULL,
    `status` ENUM('Disponivel', 'Emprestado') NOT NULL DEFAULT 'Disponivel',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemEmprestimo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `emprestimoId` INTEGER NOT NULL,
    `exemplarId` INTEGER NOT NULL,
    `count_adiar` INTEGER NOT NULL DEFAULT 5,
    `data_prazo` DATETIME(3) NOT NULL,
    `data_devolucao` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExemplarLivro` ADD CONSTRAINT `ExemplarLivro_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `Livro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemEmprestimo` ADD CONSTRAINT `ItemEmprestimo_emprestimoId_fkey` FOREIGN KEY (`emprestimoId`) REFERENCES `Emprestimo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemEmprestimo` ADD CONSTRAINT `ItemEmprestimo_exemplarId_fkey` FOREIGN KEY (`exemplarId`) REFERENCES `ExemplarLivro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
