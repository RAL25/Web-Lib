-- DropForeignKey
ALTER TABLE `Cliente` DROP FOREIGN KEY `Cliente_id_fkey`;

-- DropForeignKey
ALTER TABLE `Funcionario` DROP FOREIGN KEY `Funcionario_id_fkey`;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_id_fkey` FOREIGN KEY (`id`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Funcionario` ADD CONSTRAINT `Funcionario_id_fkey` FOREIGN KEY (`id`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
