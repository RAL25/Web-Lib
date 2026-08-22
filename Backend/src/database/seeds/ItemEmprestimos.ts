import { PrismaClient } from "../generated/prisma";

export async function seedItemEmprestimos(
  prisma: PrismaClient,
  emprestimoId: number,
  exemplarId: number,
) {
  const dataPrazo = new Date();
  dataPrazo.setDate(dataPrazo.getDate() + 7);

  await prisma.itemEmprestimo.create({
    data: {
      emprestimoId: emprestimoId,
      exemplarId: exemplarId,
      count_adiar: 5,
      data_prazo: dataPrazo,
    },
  });

  console.log("🌱 Seed: Itens de Empréstimo criados");
}
