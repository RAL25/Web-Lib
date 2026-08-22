import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma";
import { seedConfiguracoes } from "./seeds/Configuracaos";
import { seedUsuarios } from "./seeds/Usuarios";
import { seedLivros } from "./seeds/Livros";
import { seedExemplarLivros } from "./seeds/ExemplarLivros";
import { seedEmprestimos } from "./seeds/Emprestimos";
import { seedItemEmprestimos } from "./seeds/ItemEmprestimos";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🧹 Limpando dados antigos...");

  // Limpeza em ordem reversa de dependência
  await prisma.itemEmprestimo.deleteMany();
  await prisma.emprestimo.deleteMany();
  await prisma.exemplarLivro.deleteMany();
  await prisma.livro.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.configuracao.deleteMany();

  console.log("🚀 Iniciando execução das seeds...");

  // 1. Configurações
  await seedConfiguracoes(prisma);

  // 2. Usuários (Admin e Cliente)
  const usuarios = await seedUsuarios(prisma);

  // 3. Catálogo e acervo
  const livros = await seedLivros(prisma);
  const exemplares = await seedExemplarLivros(prisma, {
    livro1Id: livros.livro1.id,
    livro2Id: livros.livro2.id,
  });

  // 4. Circulação (Empréstimos e Itens)
  const emprestimo = await seedEmprestimos(prisma, usuarios.cliente.id);
  await seedItemEmprestimos(prisma, emprestimo.id, exemplares.exemplar1.id);

  console.log("✨ Povoamento concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro na execução das seeds:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
