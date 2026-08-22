import { type Request, type Response } from "express";
import { prisma } from "../config/prisma-configDB";
import { buscarLivroPorIsbn } from "../services/googleBooksService";

/**
 * Recalcula e atualiza a média das avaliações na tabela Livro.
 */
export async function recalcularMediaAvaliacoes(livroId: number): Promise<number> {
  try {
    const agregacao = await prisma.avaliacao.aggregate({
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
  } catch (error) {
    console.error(`Erro ao recalcular média de avaliações do livro ${livroId}:`, error);
    return 0.0;
  }
}

/**
 * POST /avaliacao ou POST /livro/:id/avaliacoes
 * Cria ou atualiza a avaliação de um livro feita pelo usuário logado.
 */
export async function criarOuAtualizarAvaliacao(
  request: Request,
  response: Response,
): Promise<void> {
  const usuarioId = request.usuarioId || request.usuarioLogado?.id;
  if (!usuarioId) {
    response.status(401).json({ erro: "Usuário não autenticado." });
    return;
  }

  try {
    const livroIdParam = request.params.id ? Number(request.params.id) : undefined;
    const { livroId: livroIdBody, nota, comentario } = request.body;
    const livroId = livroIdParam ?? Number(livroIdBody);

    if (!livroId || isNaN(livroId)) {
      response.status(400).json({ erro: "ID do livro é obrigatório e deve ser numérico." });
      return;
    }

    const notaNum = Number(nota);
    if (isNaN(notaNum) || notaNum < 1 || notaNum > 5) {
      response.status(400).json({ erro: "A nota deve ser um número inteiro entre 1 e 5." });
      return;
    }

    // Verifica se o livro existe
    const livroExiste = await prisma.livro.findUnique({
      where: { id: livroId },
    });

    if (!livroExiste) {
      response.status(404).json({ erro: "Livro não encontrado." });
      return;
    }

    const avaliacao = await prisma.avaliacao.upsert({
      where: {
        usuarioId_livroId: {
          usuarioId,
          livroId,
        },
      },
      update: {
        nota: Math.round(notaNum),
        comentario: typeof comentario === "string" ? comentario.trim() : null,
      },
      create: {
        usuarioId,
        livroId,
        nota: Math.round(notaNum),
        comentario: typeof comentario === "string" ? comentario.trim() : null,
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });

    // Recalcula média do livro
    const novaMedia = await recalcularMediaAvaliacoes(livroId);

    response.status(201).json({
      message: "Avaliação registrada com sucesso!",
      avaliacao,
      novaMedia,
    });
  } catch (error) {
    console.error("Erro ao registrar avaliação:", error);
    response.status(500).json({ erro: "Erro ao registrar avaliação." });
  }
}

/**
 * GET /livro/:id/avaliacoes ou GET /avaliacao/livro/:id
 * Retorna todas as avaliações de um livro específico com o nome de quem avaliou.
 */
export async function listarPorLivro(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const livroId = Number(request.params.id);
    if (isNaN(livroId)) {
      response.status(400).json({ erro: "ID do livro inválido." });
      return;
    }

    const avaliacoes = await prisma.avaliacao.findMany({
      where: { livroId },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
      orderBy: {
        criadoEm: "desc",
      },
    });

    response.status(200).json(avaliacoes);
  } catch (error) {
    console.error("Erro ao listar avaliações do livro:", error);
    response.status(500).json({ erro: "Erro ao listar avaliações do livro." });
  }
}

/**
 * GET /usuario/minhas-avaliacoes ou GET /avaliacao/minhas-avaliacoes
 * Retorna as avaliações feitas pelo usuário logado enriquecidas com os dados do livro.
 */
export async function listarPorUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  const usuarioId = request.usuarioId || request.usuarioLogado?.id;
  if (!usuarioId) {
    response.status(401).json({ erro: "Usuário não autenticado." });
    return;
  }

  try {
    const avaliacoes = await prisma.avaliacao.findMany({
      where: { usuarioId },
      include: {
        livro: true,
      },
      orderBy: {
        criadoEm: "desc",
      },
    });

    const avaliacoesEnriquecidas = await Promise.all(
      avaliacoes.map(async (av) => {
        const meta = await buscarLivroPorIsbn(av.livro.isbn);
        return {
          id: av.id,
          nota: av.nota,
          comentario: av.comentario,
          criadoEm: av.criadoEm,
          atualizadoEm: av.atualizadoEm,
          livroId: av.livroId,
          livro: {
            id: av.livro.id,
            isbn: av.livro.isbn,
            mediaAvaliacoes: av.livro.mediaAvaliacoes,
            titulo: meta?.titulo || "Título Desconhecido",
            autor: meta?.autor || "Autor Desconhecido",
            capa: meta?.capa || "",
            editora: meta?.editora || "Editora não informada",
            categoria: meta?.categoria || "Geral",
          },
        };
      }),
    );

    response.status(200).json(avaliacoesEnriquecidas);
  } catch (error) {
    console.error("Erro ao listar avaliações do usuário:", error);
    response.status(500).json({ erro: "Erro ao listar avaliações do usuário." });
  }
}

/**
 * DELETE /avaliacao/:id
 * Remove uma avaliação. Apenas o autor da avaliação ou um Administrador tem permissão.
 */
export async function deletarAvaliacao(
  request: Request,
  response: Response,
): Promise<void> {
  const usuarioId = request.usuarioId || request.usuarioLogado?.id;
  const userRole = request.usuarioLogado?.role;

  if (!usuarioId) {
    response.status(401).json({ erro: "Usuário não autenticado." });
    return;
  }

  try {
    const avaliacaoId = Number(request.params.id);
    if (isNaN(avaliacaoId)) {
      response.status(400).json({ erro: "ID de avaliação inválido." });
      return;
    }

    const avaliacao = await prisma.avaliacao.findUnique({
      where: { id: avaliacaoId },
    });

    if (!avaliacao) {
      response.status(404).json({ erro: "Avaliação não encontrada." });
      return;
    }

    // Apenas o dono ou um ADMINISTRADOR pode deletar
    if (avaliacao.usuarioId !== usuarioId && userRole !== "ADMINISTRADOR") {
      response.status(403).json({
        erro: "Permissão negada. Você só pode excluir suas próprias avaliações.",
      });
      return;
    }

    const livroId = avaliacao.livroId;

    await prisma.avaliacao.delete({
      where: { id: avaliacaoId },
    });

    // Recalcula média
    const novaMedia = await recalcularMediaAvaliacoes(livroId);

    response.status(200).json({
      message: "Avaliação removida com sucesso.",
      novaMedia,
    });
  } catch (error) {
    console.error("Erro ao deletar avaliação:", error);
    response.status(500).json({ erro: "Erro ao deletar avaliação." });
  }
}
