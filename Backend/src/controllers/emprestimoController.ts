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
  const emprestimos = await prisma.emprestimo.findMany();
  try {
    response.status(200).json(emprestimos);
  } catch (error) {
    response.status(204).end();
  }
}

export async function realizarEmprestimo(req: Request, res: Response) {
  const { id_livro, id_cliente } = req.body;

  try {
    const resultado = await prisma.$transaction(async (tx) => {
      // 1. Verificar se o livro está disponível
      const livro = await tx.livro.findUnique({ where: { id: id_livro } });

      if (!livro || livro.status !== "Disponivel") {
        throw new Error("Livro não disponível.");
      }

      // 2. Criar o empréstimo
      const novoEmprestimo = await tx.emprestimo.create({
        data: {
          id_livro,
          id_cliente,
          data_saida: new Date(),
          data_prazo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 dias
        },
      });

      // 3. Atualizar o status do livro
      await tx.livro.update({
        where: { id: id_livro },
        data: { status: "Emprestado" },
      });

      return novoEmprestimo;
    });

    res.status(201).json(resultado);
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
}

export async function adiarEmprestimo(request: Request, response: Response) {
  const id_emprestimo = Number(request.params.id);
  try {
    const resultado = await prisma.$transaction(async (tx) => {
      const emprestimo = await tx.emprestimo.findUnique({
        where: { id: id_emprestimo },
      });

      const data_atual = Number(new Date());
      const data_prazo = Number(emprestimo?.data_prazo);

      if (!emprestimo) {
        throw new Error("Emprestimo não encontrado");
      } else if (emprestimo.data_devolucao !== null) {
        throw new Error("Emprestimo finalizado, livro devolvido.");
      } else if ((data_prazo - data_atual) / (24 * 60 * 60 * 1000) >= 4) {
        throw new Error("Ainda não pode aumentar o prazo. Leia mais um pouco");
      }

      //Adiando a data de devolução (prazo)
      const adiaEmprestimo = await tx.emprestimo.update({
        where: { id: id_emprestimo },
        data: { data_prazo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
      });

      return adiaEmprestimo;
    });

    response.status(200).json(resultado);
  } catch (error: any) {
    response.status(404).json({ erro: error.message });
  }
}

export async function devolverLivro(request: Request, response: Response) {
  const id_emprestimo = Number(request.params.id);

  try {
    const resultado = await prisma.$transaction(async (tx) => {
      const emprestimo = await tx.emprestimo.findUnique({
        where: { id: id_emprestimo },
      });

      if (!emprestimo) {
        throw new Error("Emprestimo não encontrado");
      }

      // Atualizando a data de devolução do livro
      const atualizaEmprestimo = await tx.emprestimo.update({
        where: { id: id_emprestimo },
        data: { data_devolucao: new Date() },
      });

      // Tornando o livro disponível novamente
      await tx.livro.update({
        where: { id: emprestimo.id_livro },
        data: { status: LivroStatus.Disponivel },
      });

      return atualizaEmprestimo;
    });

    response.status(200).json(resultado);
  } catch (error: any) {
    response.status(400).json({ erro: error.message });
  }
}
