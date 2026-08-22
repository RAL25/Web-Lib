import { PrismaClient, LivroStatus } from "../generated/prisma";

export async function seedExemplarLivros(
  prisma: PrismaClient,
  livros: { livro1Id: number; livro2Id: number },
) {
  const exemplar1 = await prisma.exemplarLivro.create({
    data: {
      livroId: livros.livro1Id,
      status: LivroStatus.Emprestado,
    },
  });

  const exemplar2 = await prisma.exemplarLivro.create({
    data: {
      livroId: livros.livro1Id,
      status: LivroStatus.Disponivel,
    },
  });

  const exemplar3 = await prisma.exemplarLivro.create({
    data: {
      livroId: livros.livro2Id,
      status: LivroStatus.Disponivel,
    },
  });

  console.log("🌱 Seed: Exemplares de Livros criados");
  return { exemplar1, exemplar2, exemplar3 };
}
