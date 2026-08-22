-- DropForeignKey
ALTER TABLE `Cliente` DROP FOREIGN KEY `Cliente_id_fkey`;

-- DropForeignKey
ALTER TABLE `Emprestimo` DROP FOREIGN KEY `Emprestimo_id_cliente_fkey`;

-- DropForeignKey
ALTER TABLE `Funcionario` DROP FOREIGN KEY `Funcionario_id_fkey`;

-- DropIndex
DROP INDEX `Emprestimo_id_cliente_fkey` ON `Emprestimo`;

-- AlterTable
ALTER TABLE `Emprestimo` DROP COLUMN `id_cliente`,
    ADD COLUMN `usuario_id` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `Usuario` DROP PRIMARY KEY,
    DROP COLUMN `senha`,
    ADD COLUMN `bloqueado` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `cpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `senha_hash` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefone` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(36) NOT NULL,
    MODIFY `nome` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('ADMINISTRADOR', 'CLIENTE') NOT NULL DEFAULT 'CLIENTE',
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Cliente`;

-- DropTable
DROP TABLE `Funcionario`;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_cpf_key` ON `Usuario`(`cpf`);

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
