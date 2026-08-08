import { PrismaClient } from "../generated/prisma/client";

export async function seedConfiguracoes(prisma: PrismaClient) {
  await prisma.configuracao.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      limite_global: 5,
      limite_por_titulo: 2,
      prazo_padrao_dias: 7,
      dias_penalidade: 7,
    },
  });
  console.log("🌱 Seed: Configurações criadas");
}
