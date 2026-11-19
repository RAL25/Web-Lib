import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../../app";
import jwt from "jsonwebtoken";

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
  it("deve impedir renovação sem autenticação", async () => {
    const response = await request(app).put("/api/lib/emprestimo/adiar/15");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      erro: "Token não fornecido.",
    });
  });

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

  it("deve impedir devolução sem autenticação", async () => {
    const response = await request(app).put("/api/lib/emprestimo/devolver/15");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      erro: "Token não fornecido.",
    });
  });

  it("deve impedir acesso com token inválido", async () => {
    const response = await request(app)
      .put("/api/lib/emprestimo/adiar/15")
      .set("Authorization", "Bearer token-invalido");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      erro: "Token inválido ou expirado.",
    });
  });

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
});
