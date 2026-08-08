import { PrismaClient } from "../generated/prisma/client";

export async function seedFuncionarios(
  prisma: PrismaClient,
  funcionarioUsuarioId: number,
) {
  await prisma.funcionario.upsert({
    where: { id: funcionarioUsuarioId },
    update: {},
    create: {
      id: funcionarioUsuarioId,
      salario: 3000.0,
      data_contratacao: new Date("2024-01-15"),
    },
  });
  console.log("🌱 Seed: Funcionários criados");
}
