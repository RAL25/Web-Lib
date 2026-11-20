import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  vi,
} from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

const mocks = vi.hoisted(() => ({
  renovarEmprestimo: vi.fn(),
}));

vi.mock("../../services/emprestimoService", () => ({
  renovarEmprestimo: mocks.renovarEmprestimo,
}));

import app from "../../app";
import { AppError } from "../../errors/AppError";

const jwtSecretOriginal = process.env.JWT_SECRET;

beforeAll(() => {
  process.env.JWT_SECRET = "web-lib-secret-exclusivo-para-testes";
});

afterAll(() => {
  if (jwtSecretOriginal === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = jwtSecretOriginal;
  }
});

describe("API - Rotas de Empréstimos", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // TESTE 1
  it("deve impedir renovação sem autenticação", async () => {
    const response = await request(app).put("/api/lib/emprestimo/adiar/15");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      erro: "Token não fornecido.",
    });
  });

  // TESTE 2
  it("deve impedir realização de empréstimo sem autenticação", async () => {
    const response = await request(app)
      .post("/api/lib/emprestimo/realizar")
      .send({
        id_exemplares: [1, 2],
      });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      erro: "Token não fornecido.",
    });
  });

  // TESTE 3
  it("deve impedir devolução sem autenticação", async () => {
    const response = await request(app).put("/api/lib/emprestimo/devolver/15");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      erro: "Token não fornecido.",
    });
  });

  // TESTE 4
  it("deve impedir acesso com token inválido", async () => {
    const response = await request(app)
      .put("/api/lib/emprestimo/adiar/15")
      .set("Authorization", "Bearer token-invalido");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      erro: "Token inválido ou expirado.",
    });
  });

  // TESTE 5
  it("deve rejeitar ID inválido de empréstimo para usuário autenticado", async () => {
    // Gera um token JWT válido
    const token = jwt.sign(
      {
        id: "usuario-1",
        role: "CLIENTE",
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );

    // Envia uma requisição autenticada
    const response = await request(app)
      .put("/api/lib/emprestimo/adiar/abc")
      .set("Authorization", `Bearer ${token}`);

    // Verifica a resposta
    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      erro: "ID do empréstimo inválido.",
    });
  });

  // TESTE 6
  it("deve renovar um empréstimo com sucesso", async () => {
    // 1. Cria um token JWT válido
    const token = jwt.sign(
      {
        id: "usuario-1",
        role: "CLIENTE",
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );

    // 2. Simula o resultado do Service
    const emprestimoAtualizado = {
      id: 15,
      data_prazo: new Date("2026-11-26T12:00:00Z"),
      count_adiar: 2,
    };

    mocks.renovarEmprestimo.mockResolvedValue(emprestimoAtualizado);

    // 3. Realiza a requisição HTTP
    const response = await request(app)
      .put("/api/lib/emprestimo/adiar/15")
      .set("Authorization", `Bearer ${token}`);

    // 4. Verifica o status HTTP
    expect(response.status).toBe(200);

    // 5. Verifica se o Controller chamou o Service corretamente
    expect(mocks.renovarEmprestimo).toHaveBeenCalledWith(15, "usuario-1");

    // 6. Verifica os dados retornados pela API
    expect(response.body).toEqual({
      id: 15,
      data_prazo: "2026-11-26T12:00:00.000Z",
      count_adiar: 2,
    });
  });

  // TESTE 7
  it("deve retornar 404 para empréstimo inexistente", async () => {
    const token = jwt.sign(
      {
        id: "usuario-1",
        role: "CLIENTE",
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    mocks.renovarEmprestimo.mockRejectedValue(
      new AppError(404, "Empréstimo não encontrado."),
    );

    const response = await request(app)
      .put("/api/lib/emprestimo/adiar/999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      erro: "Empréstimo não encontrado.",
    });

    expect(mocks.renovarEmprestimo).toHaveBeenCalledWith(999, "usuario-1");
  });

  // TESTE 8
  it("deve retornar 403 ao tentar renovar empréstimo de outro usuário", async () => {
    const token = jwt.sign(
      {
        id: "usuario-1",
        role: "CLIENTE",
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    mocks.renovarEmprestimo.mockRejectedValue(
      new AppError(403, "Você não tem permissão para renovar este empréstimo."),
    );

    const response = await request(app)
      .put("/api/lib/emprestimo/adiar/15")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);

    expect(response.body).toEqual({
      erro: "Você não tem permissão para renovar este empréstimo.",
    });

    expect(mocks.renovarEmprestimo).toHaveBeenCalledWith(15, "usuario-1");
  });
});
