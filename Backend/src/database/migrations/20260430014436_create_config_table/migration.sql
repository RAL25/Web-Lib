-- CreateTable
CREATE TABLE `Configuracao` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `limite_global` INTEGER NOT NULL DEFAULT 5,
    `limite_por_titulo` INTEGER NOT NULL DEFAULT 2,
    `prazo_padrao_dias` INTEGER NOT NULL DEFAULT 7,
    `dias_penalidade` INTEGER NOT NULL DEFAULT 7,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
