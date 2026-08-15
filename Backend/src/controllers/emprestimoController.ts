import { type Request, type Response } from "express";
import { prisma } from "../config/prisma-configDB";
import { LivroStatus } from "../database/generated/prisma/client";

/**
 * GET /listar_itens
 * Retorna apenas os itens em posse do cliente (que ainda não foram devolvidos).
 * Calcula as regras de bloqueio de botão de renovar para o frontend.
 */
export async function index(
  request: Request,
  response: Response,
): Promise<void> {
  const id_cliente = (request as any).usuarioLogado.id;
  const dataAtual = new Date();

  try {
    const config = await prisma.configuracao.findFirst();
    const prazoPadrao = config?.prazo_padrao_dias ?? 7;

    const itensEmprestados = await prisma.itemEmprestimo.findMany({
      where: {
        emprestimo: { id_cliente: id_cliente },
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

    const resultado = itensEmprestados.map((item) => {
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
        // REGRA 2: Bloqueia renovação se estiver em atraso
        pode_renovar = false;
        motivo_bloqueio = "Empréstimo em atraso";
      } else if (item.count_adiar === 0) {
        pode_renovar = false;
        motivo_bloqueio = "Sem renovações restantes";
      } else if (bloqueadoPorIntervalo) {
        // REGRA 1: Bloqueia por pelo menos 3 dias
        pode_renovar = false;
        const diasFaltantes = Math.ceil(3 - diasPassados);
        motivo_bloqueio = `Aguarde ${diasFaltantes} dia(s) para renovar novamente`;
      }

      return {
        id: item.id,
        exemplarId: item.exemplarId,
        titulo: item.exemplarLivro.livro.titulo,
        autor: item.exemplarLivro.livro.autor,
        data_emprestimo: item.emprestimo.data_saida,
        data_prazo: item.data_prazo,
        renovacoes_disponiveis: item.count_adiar,
        atrasado: atrasado,
        status_prazo: atrasado ? "Atrasado" : "Em dia",
        pode_renovar: pode_renovar,
        motivo_bloqueio: motivo_bloqueio,
      };
    });

    response.status(200).json(resultado);
  } catch (error) {
    console.error(error);
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
  const id_cliente = (request as any).usuarioLogado.id;

  try {
    const historicoItens = await prisma.itemEmprestimo.findMany({
      where: {
        emprestimo: { id_cliente: id_cliente },
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

    const resultado = historicoItens.map((item) => ({
      id: item.id,
      exemplarId: item.exemplarId,
      titulo: item.exemplarLivro.livro.titulo,
      autor: item.exemplarLivro.livro.autor,
      data_emprestimo: item.emprestimo.data_saida,
      data_devolucao: item.data_devolucao,
    }));

    response.status(200).json(resultado);
  } catch (error) {
    console.error(error);
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
  const id_cliente = (req as any).usuarioLogado.id;

  try {
    const resultado = await prisma.$transaction(async (tx) => {
      const config = await tx.configuracao.findFirst();

      const limiteGlobal = config?.limite_global ?? 5;
      const limitePorTitulo = config?.limite_por_titulo ?? 2;
      const prazoDias = config?.prazo_padrao_dias ?? 7;

      const cliente = await tx.cliente.findUnique({
        where: { id: id_cliente },
      });
      if (!cliente) {
        throw new Error("Cliente não encontrado.");
      }

      // Verifica se o cliente possui penalidade por atraso ativa
      if (cliente.data_penalidade) {
        const data_atual = new Date();
        if (cliente.data_penalidade > data_atual) {
          const dataFormatada =
            cliente.data_penalidade.toLocaleDateString("pt-BR");
          throw new Error(
            `Não é possível realizar empréstimo. Conta bloqueada por atraso até ${dataFormatada}`,
          );
        } else {
          await tx.cliente.update({
            where: { id: id_cliente },
            data: { data_penalidade: null },
          });
        }
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
          `Os seguintes exemplares já estão empréstados: ${titulos}`,
        );
      }

      if (id_exemplares.length > limiteGlobal) {
        throw new Error(
          `Você só pode pegar até ${limiteGlobal} livros por vez.`,
        );
      }

      const itens = await tx.itemEmprestimo.count({
        where: {
          emprestimo: { id_cliente: id_cliente },
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
            emprestimo: { id_cliente: id_cliente },
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
          id_cliente,
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
    console.error(error);
    res.status(400).json({ erro: error.message });
  }
}

/**
 * PUT /adiar/:id
 */
export async function adiarEmprestimo(request: Request, response: Response) {
  const id_itemEmprestimo = Number(request.params.id);
  try {
    const resultado = await prisma.$transaction(async (tx) => {
      const config = await tx.configuracao.findFirst();

      const itemEmprestimo = await tx.itemEmprestimo.findUnique({
        where: { id: id_itemEmprestimo },
      });

      if (!itemEmprestimo) {
        throw new Error("Empréstimo não encontrado.");
      } else if (itemEmprestimo.data_devolucao !== null) {
        throw new Error("Empréstimo finalizado, livro já devolvido.");
      }

      const data_atual = new Date();
      const data_prazo = new Date(itemEmprestimo.data_prazo);
      const prazo_padrao = config?.prazo_padrao_dias ?? 7;

      // REGRA 2: Bloqueio caso esteja atrasado
      if (data_atual > data_prazo) {
        throw new Error(
          "Não é possível renovar um empréstimo em atraso. Por favor, faça a devolução.",
        );
      }

      if (itemEmprestimo.count_adiar === 0) {
        throw new Error("Limite de renovações para este item esgotado.");
      }

      // REGRA 1: Bloqueia a renovação se foi feita há menos de 3 dias
      const diffTempoMs = data_prazo.getTime() - data_atual.getTime();
      const diasRestantes = diffTempoMs / (1000 * 60 * 60 * 24);
      const diasPassados = prazo_padrao - diasRestantes;

      if (diasPassados < 3) {
        const diasFaltantes = Math.ceil(3 - diasPassados);
        throw new Error(
          `Você deve aguardar pelo menos 3 dias após a renovação para adiar novamente. Tente em ${diasFaltantes} dia(s).`,
        );
      }

      // Estendendo a data de entrega e decrementando o contador
      const novoPrazo = new Date(
        Date.now() + prazo_padrao * 24 * 60 * 60 * 1000,
      );

      const adiaEmprestimo = await tx.itemEmprestimo.update({
        where: { id: id_itemEmprestimo },
        data: {
          data_prazo: novoPrazo,
          count_adiar: itemEmprestimo.count_adiar - 1,
        },
      });

      return adiaEmprestimo;
    });

    response.status(200).json(resultado);
  } catch (error: any) {
    response.status(400).json({ erro: error.message });
  }
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
        include: { emprestimo: true }, // Inclui a relação para pegar o id_cliente
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

      // REGRA 3: Devolução com atraso gera penalidade de 7 dias
      if (dataAtual > itemEmprestimo.data_prazo) {
        const config = await tx.configuracao.findFirst();
        const diasPenalidade = config?.dias_penalidade ?? 7;

        const dataPenalidade = new Date();
        dataPenalidade.setDate(dataPenalidade.getDate() + diasPenalidade);

        await tx.cliente.update({
          where: { id: itemEmprestimo.emprestimo.id_cliente },
          data: { data_penalidade: dataPenalidade },
        });
      }

      return atualizaEmprestimo;
    });

    response.status(200).json(resultado);
  } catch (error: any) {
    response.status(400).json({ erro: error.message });
  }
}
