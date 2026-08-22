import { PrismaClient } from "../generated/prisma";

export async function seedLivros(prisma: PrismaClient) {
  const livro1 = await prisma.livro.upsert({
    where: { isbn: "9788572328753" },
    update: {},
    create: {
      isbn: "9788572328753",
      mediaAvaliacoes: 4.5,
    },
  });

  const livro2 = await prisma.livro.upsert({
    where: { isbn: "9788535914849" },
    update: {},
    create: {
      isbn: "9788535914849",
      mediaAvaliacoes: 4.8,
    },
  });

  console.log("🌱 Seed: Livros criados");
  return { livro1, livro2 };
}
