import { PrismaClient, LivroStatus } from "../generated/prisma";
import fs from "fs";
import path from "path";
import { buscarLivroPorIsbn } from "../../services/googleBooksService";

export interface LivroSeedItem {
  isbn: string;
  mediaAvaliacoes?: number;
  status?: string;
}

export async function seedLivros(prisma: PrismaClient) {
  const jsonPath = path.join(__dirname, "jsons", "livros.json");
  let livrosData: LivroSeedItem[] = [];

  if (fs.existsSync(jsonPath)) {
    const rawData = fs.readFileSync(jsonPath, "utf-8");
    livrosData = JSON.parse(rawData);
  }

  const livrosCriados = [];
  const exemplaresCriados = [];

  for (const item of livrosData) {
    const cleanIsbn = item.isbn.replace(/[^0-9X]/gi, "").trim();

    // Validação prévia na Google Books API
    const meta = await buscarLivroPorIsbn(cleanIsbn);
    if (!meta) {
      console.warn(
        `⚠️ Alerta: ISBN ${cleanIsbn} não retornou metadados válidos da Google Books API.`,
      );
    }

    const livro = await prisma.livro.upsert({
      where: { isbn: cleanIsbn },
      update: {
        mediaAvaliacoes: item.mediaAvaliacoes ?? 0.0,
      },
      create: {
        isbn: cleanIsbn,
        mediaAvaliacoes: item.mediaAvaliacoes ?? 0.0,
      },
    });

    livrosCriados.push(livro);

    // Geração de exemplares para cada livro (1 a 2 exemplares)
    const statusExemplar1 =
      item.status === "Emprestado"
        ? LivroStatus.Emprestado
        : LivroStatus.Disponivel;

    const exemplar1 = await prisma.exemplarLivro.create({
      data: {
        livroId: livro.id,
        status: statusExemplar1,
      },
    });
    exemplaresCriados.push(exemplar1);

    const exemplar2 = await prisma.exemplarLivro.create({
      data: {
        livroId: livro.id,
        status: LivroStatus.Disponivel,
      },
    });
    exemplaresCriados.push(exemplar2);
  }

  console.log(
    `🌱 Seed: ${livrosCriados.length} livros e ${exemplaresCriados.length} exemplares criados a partir do JSON`,
  );
  return {
    livros: livrosCriados,
    exemplares: exemplaresCriados,
    livro1: livrosCriados[0],
    livro2: livrosCriados[1],
  };
}
