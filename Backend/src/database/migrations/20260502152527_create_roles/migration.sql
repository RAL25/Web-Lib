-- DropForeignKey
ALTER TABLE `ItemEmprestimo` DROP FOREIGN KEY `ItemEmprestimo_emprestimoId_fkey`;

-- DropIndex
DROP INDEX `ItemEmprestimo_emprestimoId_fkey` ON `ItemEmprestimo`;

-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `role` ENUM('Cliente', 'Funcionario', 'Admin') NOT NULL DEFAULT 'Cliente';

-- AddForeignKey
ALTER TABLE `ItemEmprestimo` ADD CONSTRAINT `ItemEmprestimo_emprestimoId_fkey` FOREIGN KEY (`emprestimoId`) REFERENCES `Emprestimo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
