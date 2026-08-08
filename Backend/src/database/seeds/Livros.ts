import { PrismaClient } from "../generated/prisma/client";

export async function seedLivros(prisma: PrismaClient) {
  const livro1 = await prisma.livro.create({
    data: {
      titulo: "Dom Casmurro",
      autor: "Machado de Assis",
    },
  });

  const livro2 = await prisma.livro.create({
    data: {
      titulo: "O Cortiço",
      autor: "Aluísio Azevedo",
    },
  });

  console.log("🌱 Seed: Livros criados");
  return { livro1, livro2 };
}
