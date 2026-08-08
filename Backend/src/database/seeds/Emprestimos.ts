import { PrismaClient } from "../generated/prisma/client";

export async function seedEmprestimos(prisma: PrismaClient, clienteId: number) {
  const emprestimo = await prisma.emprestimo.create({
    data: {
      id_cliente: clienteId,
      data_saida: new Date(),
    },
  });

  console.log("🌱 Seed: Empréstimos criados");
  return emprestimo;
}
