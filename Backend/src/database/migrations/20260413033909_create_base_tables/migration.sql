/*
  Warnings:

  - You are about to alter the column `nome` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `senha` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE `Usuario` MODIFY `nome` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(20) NULL,
    MODIFY `senha` VARCHAR(20) NULL;

-- CreateTable
CREATE TABLE `Funcionario` (
    `id` INTEGER NOT NULL,
    `salario` DECIMAL(10, 2) NOT NULL,
    `data_contratacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Livro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(50) NOT NULL,
    `autor` VARCHAR(50) NULL,
    `status` ENUM('Disponivel', 'Emprestado') NOT NULL DEFAULT 'Disponivel',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emprestimo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_livro` INTEGER NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `data_saida` DATETIME(3) NOT NULL,
    `data_devolucao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Funcionario` ADD CONSTRAINT `Funcionario_id_fkey` FOREIGN KEY (`id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_id_livro_fkey` FOREIGN KEY (`id_livro`) REFERENCES `Livro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
