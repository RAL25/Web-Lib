import { describe, it, expect } from "vitest";
import { validarRenovacao } from "../../rules/renovacaoRules";

describe("Regras de renovação de empréstimos", () => {
  it("deve permitir renovação após três dias", () => {
    const resultado = validarRenovacao({
      dataPrazo: new Date("2026-11-17T12:00:00Z"),
      dataAtual: new Date("2026-11-14T12:00:00Z"),
      renovacoesDisponiveis: 3,
      prazoPadraoDias: 7,
    });

    expect(resultado.permitido).toBe(true);
  });

  it("deve impedir renovação de empréstimo atrasado", () => {
    const resultado = validarRenovacao({
      dataPrazo: new Date("2026-11-10T12:00:00Z"),
      dataAtual: new Date("2026-11-14T12:00:00Z"),
      renovacoesDisponiveis: 3,
      prazoPadraoDias: 7,
    });

    expect(resultado.permitido).toBe(false);
    expect(resultado.motivo).toBe(
      "Não é possível renovar um empréstimo em atraso.",
    );
  });

  it("deve impedir renovação sem tentativas disponíveis", () => {
    const resultado = validarRenovacao({
      dataPrazo: new Date("2026-11-17T12:00:00Z"),
      dataAtual: new Date("2026-11-14T12:00:00Z"),
      renovacoesDisponiveis: 0,
      prazoPadraoDias: 7,
    });

    expect(resultado.permitido).toBe(false);
    expect(resultado.motivo).toBe("Limite de renovações esgotado.");
  });

  it("deve impedir renovação antes de três dias", () => {
    const resultado = validarRenovacao({
      dataPrazo: new Date("2026-11-20T12:00:00Z"),
      dataAtual: new Date("2026-11-14T12:00:00Z"),
      renovacoesDisponiveis: 3,
      prazoPadraoDias: 7,
    });

    expect(resultado.permitido).toBe(false);
    expect(resultado.motivo).toBe(
      "É necessário aguardar pelo menos 3 dias para renovar.",
    );
  });
});
