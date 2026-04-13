-- AlterTable
ALTER TABLE `Usuario` MODIFY `email` VARCHAR(191) NULL,
    MODIFY `senha` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` INTEGER NOT NULL,
    `cpf` VARCHAR(11) NULL,
    `telefone` VARCHAR(11) NULL,

    UNIQUE INDEX `Cliente_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_id_fkey` FOREIGN KEY (`id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
