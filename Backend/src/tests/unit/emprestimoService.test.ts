import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renovarEmprestimo } from "../../services/emprestimoService";

// 1. Criamos os mocks das operações do Prisma
const mocks = vi.hoisted(() => ({
  findFirst: vi.fn(),
  findUnique: vi.fn(),
  update: vi.fn(),
  transaction: vi.fn(),
}));

// 2. Substituímos o Prisma real por uma implementação simulada
vi.mock("../../config/prisma-configDB", () => ({
  prisma: {
    $transaction: mocks.transaction,
  },
}));

// 3. Simulamos o objeto de transação do Prisma
const tx = {
  configuracao: {
    findFirst: mocks.findFirst,
  },

  itemEmprestimo: {
    findUnique: mocks.findUnique,
    update: mocks.update,
  },
};

describe("EmprestimoService - Renovação", () => {
  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    vi.resetAllMocks();

    // Define uma data fixa para os testes
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-19T12:00:00Z"));

    // Simula o funcionamento da transação do Prisma
    mocks.transaction.mockImplementation(async (callback) => callback(tx));

    // Configurações padrão da biblioteca
    mocks.findFirst.mockResolvedValue({
      prazo_padrao_dias: 7,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // TESTE 1
  it("deve impedir a renovação de um empréstimo inexistente", async () => {
    // Simula um empréstimo que não foi encontrado
    mocks.findUnique.mockResolvedValue(null);

    await expect(renovarEmprestimo(15, "usuario-1")).rejects.toThrow(
      "Empréstimo não encontrado.",
    );

    // Verifica que nenhuma atualização ocorreu
    expect(mocks.update).not.toHaveBeenCalled();
  });

  // TESTE 2
  it("deve impedir a renovação de um empréstimo de outro usuário", async () => {
    mocks.findUnique.mockResolvedValue({
      id: 15,
      emprestimo: {
        usuarioId: "usuario-2",
      },
      data_devolucao: null,
      data_prazo: new Date("2026-11-22T12:00:00Z"),
      count_adiar: 3,
    });

    await expect(renovarEmprestimo(15, "usuario-1")).rejects.toThrow(
      "Você não tem permissão para renovar este empréstimo.",
    );

    expect(mocks.update).not.toHaveBeenCalled();
  });

  // TESTE 3
  it("deve renovar um empréstimo válido", async () => {
    // Simula um empréstimo existente
    mocks.findUnique.mockResolvedValue({
      id: 15,
      emprestimo: {
        usuarioId: "usuario-1",
      },
      data_devolucao: null,
      data_prazo: new Date("2026-11-22T12:00:00Z"),
      count_adiar: 3,
    });

    // Simula o resultado da atualização
    mocks.update.mockResolvedValue({
      id: 15,
      data_prazo: new Date("2026-11-26T12:00:00Z"),
      count_adiar: 2,
    });

    const resultado = await renovarEmprestimo(15, "usuario-1");

    // Verifica se o contador foi decrementado
    expect(resultado.count_adiar).toBe(2);

    // Verifica se o Prisma recebeu os dados corretos
    expect(mocks.update).toHaveBeenCalledWith({
      where: {
        id: 15,
      },

      data: {
        data_prazo: new Date("2026-11-26T12:00:00Z"),
        count_adiar: 2,
      },
    });
  });

  // TESTE 4
  it("deve impedir a renovação de um empréstimo já devolvido", async () => {
    mocks.findUnique.mockResolvedValue({
      id: 15,
      emprestimo: {
        usuarioId: "usuario-1",
      },
      data_devolucao: new Date("2026-11-18T12:00:00Z"),
      data_prazo: new Date("2026-11-22T12:00:00Z"),
      count_adiar: 3,
    });

    await expect(renovarEmprestimo(15, "usuario-1")).rejects.toThrow(
      "Empréstimo finalizado, livro já devolvido.",
    );

    expect(mocks.update).not.toHaveBeenCalled();
  });

  // TESTE 5
  it("deve impedir a renovação de um empréstimo atrasado", async () => {
    mocks.findUnique.mockResolvedValue({
      id: 15,
      emprestimo: {
        usuarioId: "usuario-1",
      },
      data_devolucao: null,
      data_prazo: new Date("2026-11-18T12:00:00Z"),
      count_adiar: 3,
    });

    await expect(renovarEmprestimo(15, "usuario-1")).rejects.toThrow(
      "Não é possível renovar um empréstimo em atraso.",
    );

    expect(mocks.update).not.toHaveBeenCalled();
  });

  // TESTE 6
  it("deve impedir renovação quando não existem renovações disponíveis", async () => {
    mocks.findUnique.mockResolvedValue({
      id: 15,
      emprestimo: {
        usuarioId: "usuario-1",
      },
      data_devolucao: null,
      data_prazo: new Date("2026-11-22T12:00:00Z"),
      count_adiar: 0,
    });

    await expect(renovarEmprestimo(15, "usuario-1")).rejects.toThrow(
      "Limite de renovações esgotado.",
    );

    expect(mocks.update).not.toHaveBeenCalled();
  });

  // TESTE 7
  it("deve impedir renovação antes do intervalo mínimo de três dias", async () => {
    mocks.findUnique.mockResolvedValue({
      id: 15,
      emprestimo: {
        usuarioId: "usuario-1",
      },
      data_devolucao: null,
      data_prazo: new Date("2026-11-25T12:00:00Z"),
      count_adiar: 3,
    });

    await expect(renovarEmprestimo(15, "usuario-1")).rejects.toThrow(
      "É necessário aguardar pelo menos 3 dias para renovar.",
    );

    expect(mocks.update).not.toHaveBeenCalled();
  });

  // TESTE 8
});
