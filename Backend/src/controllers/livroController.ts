import { type Request, type Response } from "express";
import { prisma } from "../config/prisma-configDB";
import { buscarLivroPorIsbn, normalizarIsbn } from "../services/googleBooksService";

/**
 * GET /livro
 * Lista todos os livros do banco de dados enriquecidos com metadados da Google Books API.
 */
export async function index(
  _request: Request,
  response: Response,
): Promise<void> {
  try {
    const livros = await prisma.livro.findMany({
      include: {
        exemplares: true,
      },
    });

    const livrosEnriquecidos = await Promise.all(
      livros.map(async (livro) => {
        const meta = await buscarLivroPorIsbn(livro.isbn);
        return {
          id: livro.id,
          isbn: livro.isbn,
          mediaAvaliacoes: livro.mediaAvaliacoes,
          titulo: meta?.titulo || "Título Desconhecido",
          autor: meta?.autor || "Autor Desconhecido",
          editora: meta?.editora || "Editora não informada",
          categoria: meta?.categoria || "Geral",
          capa: meta?.capa || `https://covers.openlibrary.org/b/isbn/${livro.isbn}-M.jpg`,
          descricao: meta?.descricao || "",
          exemplares: livro.exemplares,
        };
      }),
    );

    response.status(200).json(livrosEnriquecidos);
  } catch (error) {
    console.error("Erro ao listar livros:", error);
    response.status(500).json({ error: "Erro ao listar livros." });
  }
}

/**
 * GET /livro/:id
 * Busca um livro pelo ID e enriquece seus dados com a Google Books API.
 */
export async function findLivro(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const livro_id = Number(request.params.id);
    if (isNaN(livro_id)) {
      response.status(400).json({ error: "ID de livro inválido." });
      return;
    }

    const livro = await prisma.livro.findUnique({
      where: { id: livro_id },
      include: { exemplares: true },
    });

    if (!livro) {
      response.status(404).json({ error: "Livro não encontrado." });
      return;
    }

    const meta = await buscarLivroPorIsbn(livro.isbn);

    response.status(200).json({
      id: livro.id,
      isbn: livro.isbn,
      mediaAvaliacoes: livro.mediaAvaliacoes,
      titulo: meta?.titulo || "Título Desconhecido",
      autor: meta?.autor || "Autor Desconhecido",
      editora: meta?.editora || "Editora não informada",
      categoria: meta?.categoria || "Geral",
      capa: meta?.capa || `https://covers.openlibrary.org/b/isbn/${livro.isbn}-M.jpg`,
      descricao: meta?.descricao || "",
      exemplares: livro.exemplares,
    });
  } catch (error) {
    console.error("Erro ao procurar livro:", error);
    response.status(500).json({ error: "Erro ao procurar livro." });
  }
}

/**
 * GET /livro/exemplares/disponiveis?busca=...
 * Retorna os exemplares disponíveis enriquecidos e filtrados por termo de busca.
 */
export async function buscarExemplaresDisponiveis(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const busca = ((request.query.busca as string) || "").toLowerCase().trim();

    const exemplares = await prisma.exemplarLivro.findMany({
      include: {
        livro: true,
      },
    });

    const exemplaresEnriquecidos = await Promise.all(
      exemplares.map(async (exemplar) => {
        const meta = await buscarLivroPorIsbn(exemplar.livro.isbn);
        return {
          id: exemplar.id,
          livroId: exemplar.livroId,
          status: exemplar.status,
          livro: {
            id: exemplar.livro.id,
            isbn: exemplar.livro.isbn,
            mediaAvaliacoes: exemplar.livro.mediaAvaliacoes,
            titulo: meta?.titulo || "Título Desconhecido",
            autor: meta?.autor || "Autor Desconhecido",
            editora: meta?.editora || "Editora não informada",
            categoria: meta?.categoria || "Geral",
            capa: meta?.capa || "",
          },
        };
      }),
    );

    const filtrados = busca
      ? exemplaresEnriquecidos.filter((ex) => {
          return (
            ex.livro.titulo.toLowerCase().includes(busca) ||
            ex.livro.autor.toLowerCase().includes(busca) ||
            ex.livro.isbn.toLowerCase().includes(busca) ||
            ex.livro.categoria.toLowerCase().includes(busca) ||
            ex.livro.editora.toLowerCase().includes(busca) ||
            String(ex.id).includes(busca)
          );
        })
      : exemplaresEnriquecidos;

    response.status(200).json(filtrados);
  } catch (error) {
    console.error("Erro ao buscar exemplares disponíveis:", error);
    response
      .status(500)
      .json({ error: "Erro ao buscar exemplares disponíveis." });
  }
}

/**
 * GET /livro/exemplar ou GET /livro/exemplar/:id
 * Lista exemplares gerais ou filtra por livroId.
 */
export async function indexExemplar(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const livroId = request.params.id ? Number(request.params.id) : undefined;
    const exemplares = await prisma.exemplarLivro.findMany({
      where: livroId ? { livroId } : undefined,
      include: { livro: true },
    });
    response.status(200).json(exemplares);
  } catch (error) {
    console.error("Erro ao listar exemplares:", error);
    response.status(500).json({ error: "Erro ao listar exemplares." });
  }
}

/**
 * GET /livro/exemplar-item/:id
 */
export async function findExemplarLivro(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const exemplarLivro_id = Number(request.params.id);
    const exemplar = await prisma.exemplarLivro.findUnique({
      where: { id: exemplarLivro_id },
      include: { livro: true },
    });

    if (!exemplar) {
      response.status(404).json({ error: "Exemplar não encontrado." });
      return;
    }

    const meta = await buscarLivroPorIsbn(exemplar.livro.isbn);
    response.status(200).json({
      ...exemplar,
      livro: {
        ...exemplar.livro,
        titulo: meta?.titulo || "Título Desconhecido",
        autor: meta?.autor || "Autor Desconhecido",
        editora: meta?.editora || "Editora não informada",
        categoria: meta?.categoria || "Geral",
        capa: meta?.capa || "",
      },
    });
  } catch (error) {
    console.error("Erro ao procurar exemplar:", error);
    response.status(500).json({ error: "Erro ao procurar exemplar." });
  }
}

/**
 * POST /livro
 * Cadastro de livro recebendo ISBN e quantidade de exemplares com validação prévia na Google Books API.
 */
export async function cadastrarLivro(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const { isbn, quantidade = 1 } = request.body;

    if (!isbn) {
      response.status(400).json({ error: "O campo ISBN é obrigatório." });
      return;
    }

    const isbnLimpo = normalizarIsbn(isbn);
    const meta = await buscarLivroPorIsbn(isbnLimpo);

    if (!meta) {
      response.status(400).json({
        error:
          "ISBN inválido ou não localizado na base da Google Books API.",
      });
      return;
    }

    // Busca ou cria o registro do livro no banco
    let livro = await prisma.livro.findUnique({
      where: { isbn: isbnLimpo },
    });

    if (!livro) {
      livro = await prisma.livro.create({
        data: {
          isbn: isbnLimpo,
          mediaAvaliacoes: 0.0,
        },
      });
    }

    // Cadastra os exemplares solicitados
    const qtdNum = Math.max(1, Number(quantidade) || 1);
    const dadosExemplares = Array.from({ length: qtdNum }).map(() => ({
      livroId: livro!.id,
    }));

    await prisma.exemplarLivro.createMany({
      data: dadosExemplares,
    });

    response.status(201).json({
      message: `${qtdNum} exemplar(es) cadastrado(s) com sucesso para o livro "${meta.titulo}".`,
      livro: {
        id: livro.id,
        mediaAvaliacoes: livro.mediaAvaliacoes,
        ...meta,
      },
    });
  } catch (error) {
    console.error("Erro ao cadastrar livro:", error);
    response
      .status(400)
      .json({ error: "Erro ao cadastrar livro e exemplares." });
  }
}

/**
 * PUT /livro/:id
 */
export async function updateLivro(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const livro_id = Number(request.params.id);
    const { isbn } = request.body;

    if (!isbn) {
      response.status(400).json({ error: "ISBN é obrigatório para atualização." });
      return;
    }

    const isbnLimpo = normalizarIsbn(isbn);
    const meta = await buscarLivroPorIsbn(isbnLimpo);
    if (!meta) {
      response.status(400).json({ error: "ISBN inválido ou não encontrado na API." });
      return;
    }

    const livro = await prisma.livro.update({
      where: { id: livro_id },
      data: { isbn: isbnLimpo },
    });

    response.status(200).json({
      ...livro,
      ...meta,
    });
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    response.status(400).json({ error: "Erro ao atualizar livro." });
  }
}

/**
 * DELETE /livro/:id
 */
export async function deleteLivro(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const livro_id = Number(request.params.id);

    // Remove itens de empréstimos vinculados aos exemplares deste livro
    const exemplares = await prisma.exemplarLivro.findMany({
      where: { livroId: livro_id },
      select: { id: true },
    });
    const exemplarIds = exemplares.map((e) => e.id);

    if (exemplarIds.length > 0) {
      await prisma.itemEmprestimo.deleteMany({
        where: { exemplarId: { in: exemplarIds } },
      });
    }

    await prisma.exemplarLivro.deleteMany({
      where: { livroId: livro_id },
    });

    await prisma.livro.delete({
      where: { id: livro_id },
    });

    response.status(200).json({
      message: "Livro e seus exemplares foram excluídos com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao excluir livro:", error);
    response.status(400).json({ error: "Erro ao deletar livro." });
  }
}

/**
 * Recalcula e atualiza o campo mediaAvaliacoes de um Livro no banco de dados.
 */
export async function recalcularMediaAvaliacoes(livroId: number): Promise<number> {
  try {
    // Compatível com expansões futuras do modelo de Avaliações
    const prismaAny = prisma as any;
    if (prismaAny.avaliacao && typeof prismaAny.avaliacao.aggregate === "function") {
      const agregacao = await prismaAny.avaliacao.aggregate({
        where: { livroId },
        _avg: { nota: true },
      });

      const media = Number(agregacao._avg?.nota ?? 0);
      const mediaArredondada = Math.round(media * 10) / 10;

      await prisma.livro.update({
        where: { id: livroId },
        data: { mediaAvaliacoes: mediaArredondada },
      });

      return mediaArredondada;
    }

    return 0.0;
  } catch (error) {
    console.error(`Erro ao recalcular média de avaliações do livro ${livroId}:`, error);
    return 0.0;
  }
}
