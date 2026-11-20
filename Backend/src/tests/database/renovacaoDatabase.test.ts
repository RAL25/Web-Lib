import { randomUUID, randomInt } from "node:crypto";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

import { prisma } from "../../config/prisma-configDB";
import { renovarEmprestimo } from "../../services/emprestimoService";

describe("Integração com MySQL - Renovação de empréstimos", () => {
  beforeAll(() => {
    // Impede que o teste acesse acidentalmente outro banco.
    const url = new URL(process.env.DATABASE_URL ?? "");

    if (
      process.env.DATABASE_NAME !== "web_lib_test_db" ||
      process.env.DATABASE_HOST !== "127.0.0.1" ||
      process.env.DATABASE_PORT !== "3308" ||
      url.hostname !== "127.0.0.1" ||
      url.port !== "3308" ||
      url.pathname !== "/web_lib_test_db"
    ) {
      throw new Error("Ambiente de testes inválido. Operação cancelada.");
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("deve renovar um empréstimo e persistir as alterações", async () => {
    // IDs utilizados na limpeza
    let usuarioId: string | undefined;
    let livroId: number | undefined;
    let exemplarId: number | undefined;
    let emprestimoId: number | undefined;

    try {
      // ========================================
      // ARRANGE - Preparação dos dados
      // ========================================

      const identificador = randomUUID();

      // 1. Cria um usuário fictício
      const usuario = await prisma.usuario.create({
        data: {
          nome: "Usuário Teste",
          email: `teste-${identificador}@example.com`,
          senhaHash: "hash-ficticio",
          cpf: String(randomInt(0, 100_000_000_000)).padStart(11, "0"),
          telefone: "38999999999",
          role: "CLIENTE",
        },
      });

      usuarioId = usuario.id;

      // 2. Cria um livro fictício
      const livro = await prisma.livro.create({
        data: {
          isbn: `TEST-${identificador}`,
        },
      });

      livroId = livro.id;

      // 3. Cria um exemplar
      const exemplar = await prisma.exemplarLivro.create({
        data: {
          livroId: livro.id,
          status: "Emprestado",
        },
      });

      exemplarId = exemplar.id;

      // 4. Cria o empréstimo
      const emprestimo = await prisma.emprestimo.create({
        data: {
          usuarioId: usuario.id,
        },
      });

      emprestimoId = emprestimo.id;

      // 5. Define um prazo que permita renovação
      const dataAtual = new Date();

      // O prazo original termina daqui a 3 dias.
      // Considerando prazo padrão de 7 dias,
      // já transcorreram aproximadamente 4 dias.
      const dataPrazoOriginal = new Date(
        dataAtual.getTime() + 3 * 24 * 60 * 60 * 1000,
      );

      // 6. Cria o item do empréstimo
      const item = await prisma.itemEmprestimo.create({
        data: {
          emprestimoId: emprestimo.id,
          exemplarId: exemplar.id,
          data_prazo: dataPrazoOriginal,
          count_adiar: 3,
        },
      });

      // ========================================
      // ACT - Executa a operação real
      // ========================================

      await renovarEmprestimo(item.id, usuario.id);

      // ========================================
      // ASSERT - Verifica os dados persistidos
      // ========================================

      const itemAtualizado = await prisma.itemEmprestimo.findUnique({
        where: {
          id: item.id,
        },
      });

      // O registro deve continuar existindo
      expect(itemAtualizado).not.toBeNull();

      // O contador deve diminuir de 3 para 2
      expect(itemAtualizado?.count_adiar).toBe(2);

      // O novo prazo deve ser posterior ao original
      expect(itemAtualizado!.data_prazo.getTime()).toBeGreaterThan(
        dataPrazoOriginal.getTime(),
      );

      // O prazo deve ser aproximadamente 7 dias
      // após a execução da renovação
      const diferencaMs =
        itemAtualizado!.data_prazo.getTime() - dataAtual.getTime();

      const seteDiasMs = 7 * 24 * 60 * 60 * 1000;

      expect(diferencaMs).toBeGreaterThanOrEqual(seteDiasMs);

      expect(diferencaMs).toBeLessThan(seteDiasMs + 5000);
    } finally {
      // ========================================
      // CLEANUP - Remove os dados criados
      // ========================================

      if (emprestimoId !== undefined) {
        await prisma.itemEmprestimo.deleteMany({
          where: { emprestimoId },
        });

        await prisma.emprestimo.delete({
          where: { id: emprestimoId },
        });
      }

      if (exemplarId !== undefined) {
        await prisma.exemplarLivro.delete({
          where: { id: exemplarId },
        });
      }

      if (livroId !== undefined) {
        await prisma.livro.delete({
          where: { id: livroId },
        });
      }

      if (usuarioId !== undefined) {
        await prisma.usuario.delete({
          where: { id: usuarioId },
        });
      }
    }
  }, 20000);
});
