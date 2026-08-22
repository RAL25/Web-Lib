import "dotenv/config";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma-configDB";
import { Role } from "../generated/prisma";
import { seedConfiguracoes } from "./Configuracaos";
import { seedLivros } from "./Livros";
import { seedExemplarLivros } from "./ExemplarLivros";
import { seedEmprestimos } from "./Emprestimos";
import { seedItemEmprestimos } from "./ItemEmprestimos";

interface UsuarioSeed {
  id?: string;
  nome: string;
  email: string;
  senha_hash?: string;
  senha?: string;
  cpf: string;
  telefone: string;
  bloqueado: boolean | string;
  role: string;
}

export async function seedUsuariosFromJson() {
  const jsonPath = path.join(__dirname, "jsons", "usuarios.json");

  if (!fs.existsSync(jsonPath)) {
    throw new Error(`Arquivo usuarios.json não encontrado em: ${jsonPath}`);
  }

  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const usersData: UsuarioSeed[] = JSON.parse(rawData);

  let adminUser: any = null;
  let clienteUser: any = null;

  for (const user of usersData) {
    const senhaHash =
      user.senha_hash ||
      (user.senha ? await bcrypt.hash(user.senha, 10) : await bcrypt.hash("senha123", 10));

    const userRole =
      user.role === "ADMINISTRADOR" ? Role.ADMINISTRADOR : Role.CLIENTE;

    const isBloqueado =
      typeof user.bloqueado === "boolean"
        ? user.bloqueado
        : user.bloqueado === "true";

    const created = await prisma.usuario.upsert({
      where: { email: user.email },
      update: {
        nome: user.nome,
        senhaHash: senhaHash,
        cpf: user.cpf,
        telefone: user.telefone,
        bloqueado: isBloqueado,
        role: userRole,
      },
      create: {
        ...(user.id ? { id: user.id } : {}),
        nome: user.nome,
        email: user.email,
        senhaHash: senhaHash,
        cpf: user.cpf,
        telefone: user.telefone,
        bloqueado: isBloqueado,
        role: userRole,
      },
    });

    if (userRole === Role.ADMINISTRADOR && !adminUser) {
      adminUser = created;
    }
    if (userRole === Role.CLIENTE && !clienteUser) {
      clienteUser = created;
    }
  }

  console.log(`🌱 Seed: ${usersData.length} usuários processados com sucesso.`);
  return { admin: adminUser, cliente: clienteUser };
}

async function main() {
  console.log("🧹 Limpando dados antigos...");
  await prisma.itemEmprestimo.deleteMany();
  await prisma.emprestimo.deleteMany();
  await prisma.exemplarLivro.deleteMany();
  await prisma.livro.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.configuracao.deleteMany();

  console.log("🚀 Iniciando execução das seeds...");

  // 1. Configurações
  await seedConfiguracoes(prisma);

  // 2. Usuários via JSON
  const usuarios = await seedUsuariosFromJson();

  // 3. Livros e Exemplares
  const livros = await seedLivros(prisma);
  const exemplares = await seedExemplarLivros(prisma, {
    livro1Id: livros.livro1.id,
    livro2Id: livros.livro2.id,
  });

  // 4. Empréstimos
  if (usuarios.cliente) {
    const emprestimo = await seedEmprestimos(prisma, usuarios.cliente.id);
    await seedItemEmprestimos(prisma, emprestimo.id, exemplares.exemplar1.id);
  }

  console.log("✨ Povoamento concluído com sucesso!");
}

if (require.main === module) {
  main()
    .catch((error) => {
      console.error("❌ Erro durante a execução das seeds:", error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
