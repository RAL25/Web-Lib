import { describe, it, expect } from "vitest";
import { prisma } from "../../config/prisma-configDB";

describe("Conexão com banco de dados de testes", () => {
  it("deve conectar ao MySQL de testes", async () => {
    // Proteção contra execução no banco incorreto
    expect(process.env.DATABASE_NAME).toBe("web_lib_test_db");

    expect(process.env.DATABASE_PORT).toBe("3308");

    expect(process.env.DATABASE_HOST).toBe("127.0.0.1");

    // Executa uma consulta SQL simples
    const resultado = await prisma.$queryRaw`
      SELECT 1 AS conectado
    `;

    expect(resultado).toBeDefined();
  });
});
