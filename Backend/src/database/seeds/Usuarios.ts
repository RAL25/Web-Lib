// import { PrismaClient } from "../generated/prisma";
import { PrismaClient, Role } from "../generated/prisma/client";
import bcrypt from "bcryptjs";

export async function seedUsuarios(prisma: PrismaClient) {
  const senhaHash = await bcrypt.hash("123456", 10);

  // TODO: Resolver problema do administrador estar com ROle de usuário ao invés de Admin
  const admin = await prisma.usuario.upsert({
    where: { email: "admin@biblioteca.com" },
    update: {},
    create: {
      nome: "Administrador do Sistema",
      email: "admin@biblioteca.com",
      senha: senhaHash,
      role: Role.Admin,
    },
  });

  const funcionario = await prisma.usuario.upsert({
    where: { email: "funcionario@biblioteca.com" },
    update: {},
    create: {
      nome: "Carlos Funcionário",
      email: "funcionario@biblioteca.com",
      senha: senhaHash,
      role: Role.Funcionario,
    },
  });

  const cliente = await prisma.usuario.upsert({
    where: { email: "cliente@email.com" },
    update: {},
    create: {
      nome: "Maria Silva (Leitora)",
      email: "cliente@email.com",
      senha: senhaHash,
      role: Role.Cliente,
    },
  });

  console.log("🌱 Seed: Usuários criados");
  return { admin, funcionario, cliente };
}
