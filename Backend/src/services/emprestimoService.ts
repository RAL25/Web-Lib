import { prisma } from "../config/prisma-configDB";
import { validarRenovacao } from "../rules/renovacaoRules";

export async function renovarEmprestimo(
  idItemEmprestimo: number,
  usuarioId: string,
) {
  return await prisma.$transaction(async (tx) => {
    // Busca as configurações da biblioteca
    const config = await tx.configuracao.findFirst();

    // Busca o empréstimo e seu proprietário
    const itemEmprestimo = await tx.itemEmprestimo.findUnique({
      where: { id: idItemEmprestimo },
      include: {
        emprestimo: {
          select: {
            usuarioId: true,
          },
        },
      },
    });

    // Verifica se o empréstimo existe
    if (!itemEmprestimo) {
      throw new Error("Empréstimo não encontrado.");
    }

    // Verifica se o empréstimo pertence ao usuário
    if (itemEmprestimo.emprestimo.usuarioId !== usuarioId) {
      throw new Error("Você não tem permissão para renovar este empréstimo.");
    }

    // Verifica se o livro já foi devolvido
    if (itemEmprestimo.data_devolucao !== null) {
      throw new Error("Empréstimo finalizado, livro já devolvido.");
    }

    const dataAtual = new Date();
    const prazoPadrao = config?.prazo_padrao_dias ?? 7;

    // Executa as regras de renovação
    const validacao = validarRenovacao({
      dataPrazo: new Date(itemEmprestimo.data_prazo),
      dataAtual,
      renovacoesDisponiveis: itemEmprestimo.count_adiar,
      prazoPadraoDias: prazoPadrao,
    });

    if (!validacao.permitido) {
      throw new Error(validacao.motivo ?? "Renovação não permitida.");
    }

    // Calcula o novo prazo
    const novoPrazo = new Date(
      dataAtual.getTime() + prazoPadrao * 24 * 60 * 60 * 1000,
    );

    // Atualiza o empréstimo
    const emprestimoAtualizado = await tx.itemEmprestimo.update({
      where: { id: idItemEmprestimo },
      data: {
        data_prazo: novoPrazo,
        count_adiar: itemEmprestimo.count_adiar - 1,
      },
    });

    return emprestimoAtualizado;
  });
}
