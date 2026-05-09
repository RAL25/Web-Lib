import { type Request, type Response } from "express";
import { prisma } from "../config/prisma-configDB";
import { PrismaClient, LivroStatus } from "../database/generated/prisma/client";

/*
    Para o index: mostra todos os emprestimos feitos
    Para realizar um emprestimo;
    Para adiar o prazo de entrega: soma mais 7 dias para a próxima data de entrega
    Para a devolução:   adiciona a data da devolução no emprestimo;
                        atualiza o status do livro para disponível;
                        verifica se a data da entrega foi maior do que o prazo:
                            se for, então bloqueia o cliente para não poder pegar um novo livro por 7 dias.
*/

export async function index(
  request: Request,
  response: Response,
): Promise<void> {
  const id_cliente = (request as any).usuarioLogado.id; //Pega o id do cliente no token para buscar todos os seus emprestimos
  const emprestimos = await prisma.emprestimo.findMany({
    where: {
      id_cliente: id_cliente,
    },
  });
  try {
    response.status(200).json(emprestimos);
  } catch (error) {
    response.status(404).end();
  }
}

export async function listarItens(
  request: Request,
  response: Response,
): Promise<void> {
  const id_emprestimo = Number(request.params.id);

  const itens = await prisma.itemEmprestimo.findMany({
    where: { emprestimoId: id_emprestimo },
  });
  try {
    response.status(200).json(itens);
  } catch (error) {
    console.error(error);
    response.status(404).json({ error: "Erro ao listar os itens." });
  }
}

export async function realizarEmprestimo(req: Request, res: Response) {
  const { id_exemplares } = req.body; // id_exemplares é um array [10, 22, 45]
  const id_cliente = (req as any).usuarioLogado.id; // Pegando o id do token

  try {
    const resultado = await prisma.$transaction(async (tx) => {
      // Carregar as regras salvas do banco de dados
      const config = await tx.configuracao.findFirst();

      // Valores de segurança
      const limiteGlobal = config?.limite_global ?? 5;
      const limitePorTitulo = config?.limite_por_titulo ?? 2;
      const prazoDias = config?.prazo_padrao_dias ?? 7;

      // Verifica se o cliente existe
      const cliente = await tx.cliente.findUnique({
        where: { id: id_cliente },
      });
      if (!cliente) {
        throw new Error("Cliente não encontrado.");
      }

      // Verificar se o cliente está penalizado
      if (cliente.data_penalidade) {
        const data_atual = new Date();
        if (cliente.data_penalidade > data_atual) {
          const dataFormatada =
            cliente.data_penalidade.toLocaleDateString("pt-Br");
          throw new Error(
            `Não é possível realizar emprestimo. Conta bloqueada até o dia ${dataFormatada}`,
          );
        } else {
          await tx.cliente.update({
            where: { id: id_cliente },
            data: { data_penalidade: null },
          });
        }
      }

      // Verfica quais livros já foram emprestados
      let exemplaresSolicitados = await tx.exemplarLivro.findMany({
        where: { id: { in: id_exemplares } },
      });

      const indisponiveis = exemplaresSolicitados.filter(
        (e) => e.status === "Emprestado",
      );

      if (indisponiveis.length > 0) {
        const titulos = indisponiveis.map((e) => e.id).join(", ");
        throw new Error(
          `Os seguintes exemplares já estão emprestados ou indisponíveis: ${titulos}`,
        );
      }

      // Verifica se a quantidade é maior que definida nas configurações padrão
      if (id_exemplares.length > limiteGlobal) {
        throw new Error(
          `Você só pode pegar até ${limiteGlobal} livros por vez.`,
        );
      }

      // Verificar quantos livros o cliente já tem em mãos
      const itens = await tx.itemEmprestimo.count({
        where: {
          emprestimo: { id_cliente: id_cliente },
          data_devolucao: null,
        },
      });

      if (itens + id_exemplares.length > limiteGlobal) {
        throw new Error(`Não é possível pegar mais de ${limiteGlobal} livros.`);
      }

      // Verificar quantos exemplares do mesmo livro o cliente pode pegar
      // Buscar detalhes e agrupar o pedido atual
      exemplaresSolicitados = await tx.exemplarLivro.findMany({
        where: { id: { in: id_exemplares } },
        include: { livro: true },
      });

      const contagemSolicitada: Record<number, { qtdSendoPedida: number }> = {};

      for (const exemplar of exemplaresSolicitados) {
        if (!contagemSolicitada[exemplar.livroId]) {
          contagemSolicitada[exemplar.livroId] = {
            qtdSendoPedida: 0,
          };
        }
      }

      if (contagemSolicitada) {
        for (const exemplar of exemplaresSolicitados) {
          // 1. Tenta pegar a contagem atual
          let contagem = contagemSolicitada[exemplar.livroId];

          // 2. Se não existir, inicializa e guarda de volta no dicionário
          if (!contagem) {
            contagem = { qtdSendoPedida: 0 };
            contagemSolicitada[exemplar.livroId] = contagem;
          }

          // 3. Incrementa com segurança (o TS agora tem certeza que 'contagem' existe)
          contagem.qtdSendoPedida++;
        }
      }

      // Aplicar o limite fixo
      for (const livroIdStr in contagemSolicitada) {
        const livroId = Number(livroIdStr);
        const contagem = contagemSolicitada[livroId];

        // A) Quantos exemplares desta obra o cliente JÁ TEM em casa?
        const exemplaresJaEmprestados = await tx.itemEmprestimo.count({
          where: {
            emprestimo: { id_cliente: id_cliente },
            exemplarLivro: { livroId: livroId },
            data_devolucao: null,
          },
        });

        // B) Somar o que ele já tem com o que ele quer pegar agora
        let totalAposEmprestimo = exemplaresJaEmprestados + 0;
        if (contagem) {
          totalAposEmprestimo =
            exemplaresJaEmprestados + contagem.qtdSendoPedida;
        }

        // C) Bloquear se ultrapassar o limite fixo
        if (totalAposEmprestimo > limitePorTitulo) {
          throw new Error(
            `Você não pode pegar ${totalAposEmprestimo} cópias. O limite é de ${limitePorTitulo} exemplar(es) por obra.`,
          );
        }
      }

      // Criar o empréstimo em uma única transação
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

      // Atualizar o status dos livros para emprestado
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

export async function adiarEmprestimo(request: Request, response: Response) {
  const id_itemEmprestimo = Number(request.params.id);
  try {
    const resultado = await prisma.$transaction(async (tx) => {
      // Carregar as regras salvas do banco de dados
      const config = await tx.configuracao.findFirst();

      const itemEmprestimo = await tx.itemEmprestimo.findUnique({
        where: { id: id_itemEmprestimo },
      });

      const data_atual = Number(new Date());
      const data_prazo = Number(itemEmprestimo?.data_prazo);
      const prazo_padrao = config?.prazo_padrao_dias ?? 7;

      if (!itemEmprestimo) {
        throw new Error("Emprestimo não encontrado");
      } else if (itemEmprestimo.data_devolucao !== null) {
        throw new Error("Emprestimo finalizado, livro devolvido.");
      } else if (
        (data_prazo - data_atual) / (24 * 60 * 60 * 1000) >=
        prazo_padrao
      ) {
        throw new Error("Ainda não pode aumentar o prazo. Leia mais um pouco.");
      } else if (itemEmprestimo.count_adiar === 0) {
        throw new Error("Não é possível adiar mais.");
      }

      //Adiando a data de devolução (prazo)
      const adiaEmprestimo = await tx.itemEmprestimo.update({
        where: { id: id_itemEmprestimo },
        data: {
          data_prazo: new Date(Date.now() + prazo_padrao * 24 * 60 * 60 * 1000), // Atualiza a data para os próximos dias conforme a configuração
          count_adiar: itemEmprestimo.count_adiar - 1, // Decrementa o contador de adiamentos em 1
        },
      });

      return adiaEmprestimo;
    });

    response.status(200).json(resultado);
  } catch (error: any) {
    response.status(404).json({ erro: error.message });
  }
}

export async function devolverLivro(request: Request, response: Response) {
  const id_itemEmprestimo = Number(request.params.id);

  try {
    const resultado = await prisma.$transaction(async (tx) => {
      const emprestimo = await tx.itemEmprestimo.findUnique({
        where: { id: id_itemEmprestimo },
      });

      if (!emprestimo) {
        throw new Error("Emprestimo não encontrado.");
      } else if (emprestimo.data_devolucao) {
        throw new Error("Emprestimo já devolvido.");
      }

      // Atualizando a data de devolução do livro
      const atualizaEmprestimo = await tx.itemEmprestimo.update({
        where: { id: id_itemEmprestimo },
        data: { data_devolucao: new Date() },
      });

      // Tornando o livro disponível novamente
      await tx.exemplarLivro.update({
        where: { id: emprestimo.exemplarId },
        data: { status: LivroStatus.Disponivel },
      });

      return atualizaEmprestimo;
    });

    response.status(200).json(resultado);
  } catch (error: any) {
    response.status(400).json({ erro: error.message });
  }
}
