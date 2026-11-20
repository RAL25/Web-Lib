import { type Request, type Response } from "express";
import { prisma } from "../config/prisma-configDB";
import { LivroStatus } from "../database/generated/prisma/client";
import { buscarLivroPorIsbn } from "../services/googleBooksService";
import { renovarEmprestimo } from "../services/emprestimoService";

/**
 * GET /listar_itens
 * Retorna apenas os itens em posse do usuário (que ainda não foram devolvidos).
 * Calcula as regras de bloqueio de botão de renovar para o frontend.
 */
export async function index(
  request: Request,
  response: Response,
): Promise<void> {
  const usuarioId = request.usuarioId || request.usuarioLogado?.id;
  if (!usuarioId) {
    response.status(401).json({ erro: "Usuário não autenticado." });
    return;
  }

  const dataAtual = new Date();

  try {
    const config = await prisma.configuracao.findFirst();
    const prazoPadrao = config?.prazo_padrao_dias ?? 7;

    const itensEmprestados = await prisma.itemEmprestimo.findMany({
      where: {
        emprestimo: { usuarioId: usuarioId },
        data_devolucao: null,
      },
      include: {
        emprestimo: {
          select: { data_saida: true },
        },
        exemplarLivro: {
          include: {
            livro: true,
          },
        },
      },
      orderBy: {
        data_prazo: "asc",
      },
    });

    const resultado = await Promise.all(
      itensEmprestados.map(async (item) => {
        const dataPrazo = new Date(item.data_prazo);
        const atrasado = dataPrazo < dataAtual;

        // Cálculo de dias decorridos desde a última renovação/empréstimo
        const diffTempoMs = dataPrazo.getTime() - dataAtual.getTime();
        const diasRestantes = diffTempoMs / (1000 * 60 * 60 * 24);
        const diasPassados = prazoPadrao - diasRestantes;

        // Regra 1: Bloqueia se a última renovação ocorreu há menos de 3 dias
        const bloqueadoPorIntervalo = diasPassados < 3;

        // Regra 2 & Definição do status de renovação
        let pode_renovar = true;
        let motivo_bloqueio = "";

        if (atrasado) {
          pode_renovar = false;
          motivo_bloqueio = "Empréstimo em atraso";
        } else if (item.count_adiar === 0) {
          pode_renovar = false;
          motivo_bloqueio = "Sem renovações restantes";
        } else if (bloqueadoPorIntervalo) {
          pode_renovar = false;
          const diasFaltantes = Math.ceil(3 - diasPassados);
          motivo_bloqueio = `Aguarde ${diasFaltantes} dia(s) para renovar novamente`;
        }

        const meta = await buscarLivroPorIsbn(item.exemplarLivro.livro.isbn);

        return {
          id: item.id,
          exemplarId: item.exemplarId,
          isbn: item.exemplarLivro.livro.isbn,
          titulo: meta?.titulo || "Título Desconhecido",
          autor: meta?.autor || "Autor Desconhecido",
          capa: meta?.capa || "",
          data_emprestimo: item.emprestimo.data_saida,
          data_prazo: item.data_prazo,
          renovacoes_disponiveis: item.count_adiar,
          atrasado: atrasado,
          status_prazo: atrasado ? "Atrasado" : "Em dia",
          pode_renovar: pode_renovar,
          motivo_bloqueio: motivo_bloqueio,
        };
      }),
    );

    response.status(200).json(resultado);
  } catch (error) {
    console.error("Erro ao listar empréstimos ativos:", error);
    response
      .status(500)
      .json({ error: "Erro ao listar os itens dos empréstimos ativos." });
  }
}

/**
 * GET /historico_emprestimo
 */
export async function HistoricoEmprestimo(
  request: Request,
  response: Response,
): Promise<void> {
  const usuarioId = request.usuarioId || request.usuarioLogado?.id;
  if (!usuarioId) {
    response.status(401).json({ erro: "Usuário não autenticado." });
    return;
  }

  try {
    const historicoItens = await prisma.itemEmprestimo.findMany({
      where: {
        emprestimo: { usuarioId: usuarioId },
        data_devolucao: { not: null },
      },
      include: {
        emprestimo: {
          select: { data_saida: true },
        },
        exemplarLivro: {
          include: {
            livro: true,
          },
        },
      },
      orderBy: {
        data_devolucao: "desc",
      },
    });

    const resultado = await Promise.all(
      historicoItens.map(async (item) => {
        const meta = await buscarLivroPorIsbn(item.exemplarLivro.livro.isbn);
        return {
          id: item.id,
          exemplarId: item.exemplarId,
          isbn: item.exemplarLivro.livro.isbn,
          titulo: meta?.titulo || "Título Desconhecido",
          autor: meta?.autor || "Autor Desconhecido",
          capa: meta?.capa || "",
          data_emprestimo: item.emprestimo.data_saida,
          data_devolucao: item.data_devolucao,
        };
      }),
    );

    response.status(200).json(resultado);
  } catch (error) {
    console.error("Erro ao listar histórico de empréstimos:", error);
    response
      .status(500)
      .json({ error: "Erro ao listar o histórico de empréstimos." });
  }
}

/**
 * POST /realizar
 */
export async function realizarEmprestimo(req: Request, res: Response) {
  const { id_exemplares } = req.body;
  const usuarioId = req.usuarioId || req.usuarioLogado?.id;

  if (!usuarioId) {
    res.status(401).json({ erro: "Usuário não autenticado." });
    return;
  }

  try {
    const resultado = await prisma.$transaction(async (tx) => {
      const config = await tx.configuracao.findFirst();

      const limiteGlobal = config?.limite_global ?? 5;
      const limitePorTitulo = config?.limite_por_titulo ?? 2;
      const prazoDias = config?.prazo_padrao_dias ?? 7;

      const usuario = await tx.usuario.findUnique({
        where: { id: usuarioId },
      });
      if (!usuario) {
        throw new Error("Usuário não encontrado.");
      }

      // Verifica se o usuário está bloqueado
      if (usuario.bloqueado) {
        throw new Error(
          "Não é possível realizar empréstimo. Sua conta está bloqueada.",
        );
      }

      let exemplaresSolicitados = await tx.exemplarLivro.findMany({
        where: { id: { in: id_exemplares } },
      });

      const indisponiveis = exemplaresSolicitados.filter(
        (e) => e.status === "Emprestado",
      );

      if (indisponiveis.length > 0) {
        const titulos = indisponiveis.map((e) => e.id).join(", ");
        throw new Error(
          `Os seguintes exemplares já estão emprestados: ${titulos}`,
        );
      }

      if (id_exemplares.length > limiteGlobal) {
        throw new Error(
          `Você só pode pegar até ${limiteGlobal} livros por vez.`,
        );
      }

      const itens = await tx.itemEmprestimo.count({
        where: {
          emprestimo: { usuarioId: usuarioId },
          data_devolucao: null,
        },
      });

      if (itens + id_exemplares.length > limiteGlobal) {
        throw new Error(`Não é possível pegar mais de ${limiteGlobal} livros.`);
      }

      exemplaresSolicitados = await tx.exemplarLivro.findMany({
        where: { id: { in: id_exemplares } },
        include: { livro: true },
      });

      const contagemSolicitada: Record<number, { qtdSendoPedida: number }> = {};

      for (const exemplar of exemplaresSolicitados) {
        if (!contagemSolicitada[exemplar.livroId]) {
          contagemSolicitada[exemplar.livroId] = { qtdSendoPedida: 0 };
        }
        contagemSolicitada[exemplar.livroId]!.qtdSendoPedida++;
      }

      for (const livroIdStr in contagemSolicitada) {
        const livroId = Number(livroIdStr);
        const contagem = contagemSolicitada[livroId];

        const exemplaresJaEmprestados = await tx.itemEmprestimo.count({
          where: {
            emprestimo: { usuarioId: usuarioId },
            exemplarLivro: { livroId: livroId },
            data_devolucao: null,
          },
        });

        const totalAposEmprestimo =
          exemplaresJaEmprestados + contagem!.qtdSendoPedida;

        if (totalAposEmprestimo > limitePorTitulo) {
          throw new Error(
            `Limite de ${limitePorTitulo} exemplar(es) por obra excedido.`,
          );
        }
      }

      const dataPrazo = new Date();
      dataPrazo.setDate(dataPrazo.getDate() + prazoDias);

      const novoEmprestimo = await tx.emprestimo.create({
        data: {
          usuarioId: usuarioId,
          itens: {
            create: id_exemplares.map((id: number) => ({
              exemplarId: id,
              data_prazo: dataPrazo,
            })),
          },
        },
      });

      await tx.exemplarLivro.updateMany({
        where: { id: { in: id_exemplares } },
        data: { status: "Emprestado" },
      });

      return novoEmprestimo;
    });

    res.status(201).json(resultado);
  } catch (error: any) {
    console.error("Erro ao realizar empréstimo:", error);
    res.status(400).json({ erro: error.message });
  }
}

/**
 * PUT /adiar/:id
 */
export async function adiarEmprestimo(request: Request, response: Response) {
  const idItemEmprestimo = Number(request.params.id);

  if (!Number.isInteger(idItemEmprestimo) || idItemEmprestimo <= 0) {
    response.status(400).json({
      erro: "ID do empréstimo inválido.",
    });

    return;
  }

  const usuarioId = request.usuarioId || request.usuarioLogado?.id;

  if (!usuarioId) {
    response.status(401).json({
      erro: "Usuário não autenticado.",
    });

    return;
  }

  const resultado = await renovarEmprestimo(idItemEmprestimo, usuarioId);

  response.status(200).json(resultado);
}

/**
 * PUT /devolver/:id
 */
export async function devolverLivro(request: Request, response: Response) {
  const id_itemEmprestimo = Number(request.params.id);

  try {
    const resultado = await prisma.$transaction(async (tx) => {
      const itemEmprestimo = await tx.itemEmprestimo.findUnique({
        where: { id: id_itemEmprestimo },
        include: { emprestimo: true }, // Inclui a relação para pegar o usuarioId
      });

      if (!itemEmprestimo) {
        throw new Error("Empréstimo não encontrado.");
      } else if (itemEmprestimo.data_devolucao) {
        throw new Error("Empréstimo já devolvido.");
      }

      const dataAtual = new Date();

      // Atualiza data de devolução do item
      const atualizaEmprestimo = await tx.itemEmprestimo.update({
        where: { id: id_itemEmprestimo },
        data: { data_devolucao: dataAtual },
      });

      // Libera o exemplar
      await tx.exemplarLivro.update({
        where: { id: itemEmprestimo.exemplarId },
        data: { status: LivroStatus.Disponivel },
      });

      return atualizaEmprestimo;
    });

    response.status(200).json(resultado);
  } catch (error: any) {
    response.status(400).json({ erro: error.message });
  }
}
