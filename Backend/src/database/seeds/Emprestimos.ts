import { PrismaClient } from "../generated/prisma";

export async function seedEmprestimos(prisma: PrismaClient, usuarioId: string) {
  const emprestimo = await prisma.emprestimo.create({
    data: {
      usuarioId: usuarioId,
      data_saida: new Date(),
    },
  });

  console.log("🌱 Seed: Empréstimos criados");
  return emprestimo;
}
