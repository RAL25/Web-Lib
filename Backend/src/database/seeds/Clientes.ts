import { PrismaClient } from "../generated/prisma/client";

export async function seedClientes(
  prisma: PrismaClient,
  clienteUsuarioId: number,
) {
  await prisma.cliente.upsert({
    where: { id: clienteUsuarioId },
    update: {},
    create: {
      id: clienteUsuarioId,
      cpf: "12345678901",
      telefone: "38999998888",
      emailVerificado: true,
    },
  });
  console.log("🌱 Seed: Clientes criados");
}
