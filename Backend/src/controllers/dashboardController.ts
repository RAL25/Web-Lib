import { type Request, type Response } from "express";
import { prisma } from "../config/prisma-configDB";
import { LivroStatus } from "../database/generated/prisma/client";
import { buscarLivroPorIsbn } from "../services/googleBooksService";

/**
 * GET /dashboard/kpis
 * Retorna contagens agregadas: totalTitulos, totalExemplares, emprestimosAtivos,
 * devolucoesAtrasadas, totalUsuarios (detalhado por cargo) e usuariosPenalizados.
 */
export async function getKpis(
  _request: Request,
  response: Response,
): Promise<void> {
  try {
    const dataAtual = new Date();

    const [
      totalTitulos,
      totalExemplares,
      emprestimosAtivos,
      devolucoesAtrasadas,
      totalClientes,
      totalAdmins,
      usuariosPenalizados,
    ] = await Promise.all([
      prisma.livro.count(),
      prisma.exemplarLivro.count(),
      prisma.itemEmprestimo.count({
        where: { data_devolucao: null },
      }),
      prisma.itemEmprestimo.count({
        where: {
          data_devolucao: null,
          data_prazo: { lt: dataAtual },
        },
      }),
      prisma.usuario.count({
        where: { role: "CLIENTE" },
      }),
      prisma.usuario.count({
        where: { role: "ADMINISTRADOR" },
      }),
      prisma.usuario.count({
        where: {
          bloqueado: true,
        },
      }),
    ]);

    const totalUsuariosTotal = totalClientes + totalAdmins;

    response.status(200).json({
      totalTitulos,
      totalExemplares,
      emprestimosAtivos,
      devolucoesAtrasadas,
      totalUsuarios: {
        total: totalUsuariosTotal,
        clientes: totalClientes,
        funcionarios: 0,
        admins: totalAdmins,
      },
      usuariosPenalizados,
    });
  } catch (error) {
    console.error("Erro ao buscar KPIs do dashboard:", error);
    response.status(500).json({ erro: "Erro ao buscar KPIs do dashboard." });
  }
}

/**
 * GET /dashboard/alertas
 * Retorna:
 * - devolucoesPendentes / emprestimos em atraso (com Cliente, Livro e Dias de Atraso)
 * - ultimasMovimentacoes (limite de 5 registros com tipo, usuário e horário)
 * - estoqueZerado / estoqueBaixo (livros com 0 disponíveis ou estoque baixo)
 */
export async function getAlertas(
  _request: Request,
  response: Response,
): Promise<void> {
  try {
    const dataAtual = new Date();

    // 1. Empréstimos em atraso
    const itensAtrasados = await prisma.itemEmprestimo.findMany({
      where: {
        data_devolucao: null,
        data_prazo: { lt: dataAtual },
      },
      include: {
        emprestimo: {
          include: {
            usuario: {
              select: { nome: true, email: true, cpf: true },
            },
          },
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

    const devolucoesPendentes = await Promise.all(
      itensAtrasados.map(async (item) => {
        const dataPrazo = new Date(item.data_prazo);
        const diffMs = dataAtual.getTime() - dataPrazo.getTime();
        const diasAtraso = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
        const meta = await buscarLivroPorIsbn(item.exemplarLivro.livro.isbn);

        return {
          id: item.id,
          clienteId: item.emprestimo.usuarioId,
          clienteNome: item.emprestimo.usuario.nome,
          clienteCpf: item.emprestimo.usuario.cpf || "Não informado",
          livroId: item.exemplarLivro.livro.id,
          livroTitulo: meta?.titulo || "Título Desconhecido",
          exemplarId: item.exemplarId,
          dataPrazo: item.data_prazo,
          diasAtraso,
        };
      }),
    );

    // 2. Últimas Movimentações (limite 5)
    const itensRecentes = await prisma.itemEmprestimo.findMany({
      take: 20,
      orderBy: {
        id: "desc",
      },
      include: {
        emprestimo: {
          include: {
            usuario: {
              select: { nome: true },
            },
          },
        },
        exemplarLivro: {
          include: {
            livro: true,
          },
        },
      },
    });

    interface Movimentacao {
      id: string;
      tipo: "Empréstimo" | "Devolução";
      usuarioNome: string;
      livroTitulo: string;
      data: Date;
    }

    const movimentacoes: Movimentacao[] = [];

    for (const item of itensRecentes) {
      const usuarioNome = item.emprestimo.usuario.nome;
      const meta = await buscarLivroPorIsbn(item.exemplarLivro.livro.isbn);
      const livroTitulo = meta?.titulo || "Título Desconhecido";

      if (item.emprestimo.data_saida) {
        movimentacoes.push({
          id: `emp-${item.id}`,
          tipo: "Empréstimo",
          usuarioNome,
          livroTitulo,
          data: new Date(item.emprestimo.data_saida),
        });
      }

      if (item.data_devolucao) {
        movimentacoes.push({
          id: `dev-${item.id}`,
          tipo: "Devolução",
          usuarioNome,
          livroTitulo,
          data: new Date(item.data_devolucao),
        });
      }
    }

    movimentacoes.sort((a, b) => b.data.getTime() - a.data.getTime());
    const ultimasMovimentacoes = movimentacoes.slice(0, 5);

    // 3. Livros com estoque zerado / baixo
    const todosLivros = await prisma.livro.findMany({
      include: {
        exemplares: true,
      },
    });

    const livrosEstoque = await Promise.all(
      todosLivros.map(async (livro) => {
        const totalExemplares = livro.exemplares.length;
        const disponiveis = livro.exemplares.filter(
          (ex) => ex.status === LivroStatus.Disponivel,
        ).length;
        const meta = await buscarLivroPorIsbn(livro.isbn);

        return {
          id: livro.id,
          isbn: livro.isbn,
          titulo: meta?.titulo || "Título Desconhecido",
          autor: meta?.autor || "Autor Desconhecido",
          totalExemplares,
          disponiveis,
        };
      }),
    );

    const estoqueZerado = livrosEstoque.filter((l) => l.disponiveis === 0);
    const estoqueBaixo = livrosEstoque.filter(
      (l) => l.disponiveis > 0 && l.disponiveis <= 1,
    );

    response.status(200).json({
      devolucoesPendentes,
      ultimasMovimentacoes,
      estoqueZerado,
      estoqueBaixo,
    });
  } catch (error) {
    console.error("Erro ao buscar alertas do dashboard:", error);
    response.status(500).json({ erro: "Erro ao buscar alertas do dashboard." });
  }
}

/**
 * GET /dashboard/estatisticas
 * Retorna:
 * - contagem mensal de empréstimos/devoluções dos últimos 6 meses
 * - ranking dos 5 livros mais emprestados do mês
 */
export async function getEstatisticas(
  _request: Request,
  response: Response,
): Promise<void> {
  try {
    const dataAtual = new Date();

    // 1. Calcular últimos 6 meses
    const mesesNomes = [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];

    const mesesArray: {
      mes: string;
      ano: number;
      mesNumero: number;
      emprestimos: number;
      devolucoes: number;
    }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - i, 1);
      mesesArray.push({
        mes: `${mesesNomes[d.getMonth()]}/${d.getFullYear().toString().slice(-2)}`,
        ano: d.getFullYear(),
        mesNumero: d.getMonth(),
        emprestimos: 0,
        devolucoes: 0,
      });
    }

    const dataInicio = new Date(dataAtual.getFullYear(), dataAtual.getMonth() - 5, 1);

    const itensPeriodo = await prisma.itemEmprestimo.findMany({
      where: {
        OR: [
          {
            emprestimo: {
              data_saida: { gte: dataInicio },
            },
          },
          {
            data_devolucao: { gte: dataInicio },
          },
        ],
      },
      include: {
        emprestimo: {
          select: { data_saida: true },
        },
      },
    });

    itensPeriodo.forEach((item) => {
      if (item.emprestimo?.data_saida) {
        const dataSaida = new Date(item.emprestimo.data_saida);
        const mesObj = mesesArray.find(
          (m) =>
            m.ano === dataSaida.getFullYear() &&
            m.mesNumero === dataSaida.getMonth(),
        );
        if (mesObj) {
          mesObj.emprestimos += 1;
        }
      }

      if (item.data_devolucao) {
        const dataDev = new Date(item.data_devolucao);
        const mesObj = mesesArray.find(
          (m) =>
            m.ano === dataDev.getFullYear() &&
            m.mesNumero === dataDev.getMonth(),
        );
        if (mesObj) {
          mesObj.devolucoes += 1;
        }
      }
    });

    const fluxoMensal = mesesArray.map((m) => ({
      mes: m.mes,
      emprestimos: m.emprestimos,
      devolucoes: m.devolucoes,
    }));

    // 2. Ranking dos 5 livros mais emprestados do mês atual (ou período recente)
    const inicioMesAtual = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);

    const itensMesAtual = await prisma.itemEmprestimo.findMany({
      where: {
        emprestimo: {
          data_saida: { gte: inicioMesAtual },
        },
      },
      include: {
        exemplarLivro: {
          include: {
            livro: true,
          },
        },
      },
    });

    let contagemPorLivro = new Map<number, { isbn: string; total: number }>();

    itensMesAtual.forEach((item) => {
      const livro = item.exemplarLivro.livro;
      const atual = contagemPorLivro.get(livro.id) || {
        isbn: livro.isbn,
        total: 0,
      };
      atual.total += 1;
      contagemPorLivro.set(livro.id, atual);
    });

    if (contagemPorLivro.size < 5) {
      const todosItens = await prisma.itemEmprestimo.findMany({
        include: {
          exemplarLivro: {
            include: {
              livro: true,
            },
          },
        },
      });

      const contagemGeral = new Map<number, { isbn: string; total: number }>();
      todosItens.forEach((item) => {
        const livro = item.exemplarLivro.livro;
        const atual = contagemGeral.get(livro.id) || {
          isbn: livro.isbn,
          total: 0,
        };
        atual.total += 1;
        contagemGeral.set(livro.id, atual);
      });

      if (contagemPorLivro.size === 0) {
        contagemPorLivro = contagemGeral;
      }
    }

    const topLivrosRaw = Array.from(contagemPorLivro.entries())
      .map(([id, info]) => ({
        id,
        isbn: info.isbn,
        totalEmprestimos: info.total,
      }))
      .sort((a, b) => b.totalEmprestimos - a.totalEmprestimos)
      .slice(0, 5);

    const topLivros = await Promise.all(
      topLivrosRaw.map(async (item) => {
        const meta = await buscarLivroPorIsbn(item.isbn);
        return {
          id: item.id,
          isbn: item.isbn,
          titulo: meta?.titulo || "Título Desconhecido",
          autor: meta?.autor || "Desconhecido",
          capa: meta?.capa || "",
          totalEmprestimos: item.totalEmprestimos,
        };
      }),
    );

    response.status(200).json({
      fluxoMensal,
      topLivros,
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas do dashboard:", error);
    response.status(500).json({ erro: "Erro ao buscar estatísticas do dashboard." });
  }
}
