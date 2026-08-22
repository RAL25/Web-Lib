import "dotenv/config";
import { prisma } from "../config/prisma-configDB";
import { seedConfiguracoes } from "./seeds/Configuracaos";
import { seedUsuarios } from "./seeds/Usuarios";
import { seedLivros } from "./seeds/Livros";
import { seedEmprestimos } from "./seeds/Emprestimos";
import { seedItemEmprestimos } from "./seeds/ItemEmprestimos";

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
  const catalogo = await seedLivros(prisma);

  // 4. Circulação (Empréstimos e Itens)
  if (usuarios.cliente && catalogo.exemplares.length > 0) {
    const exemplarEmprestado =
      catalogo.exemplares.find((e) => e.status === "Emprestado") ||
      catalogo.exemplares[0];

    if (exemplarEmprestado) {
      const emprestimo = await seedEmprestimos(prisma, usuarios.cliente.id);
      await seedItemEmprestimos(prisma, emprestimo.id, exemplarEmprestado.id);
    }
  }

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
