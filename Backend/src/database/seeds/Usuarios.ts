import { PrismaClient, Role } from "../generated/prisma";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

export async function seedUsuarios(prisma: PrismaClient) {
  const jsonPath = path.join(__dirname, "jsons", "usuarios.json");
  let usersData: Array<{
    id?: string;
    nome: string;
    email: string;
    senha_hash?: string;
    senha?: string;
    cpf: string;
    telefone: string;
    bloqueado: boolean | string;
    role: string;
  }> = [];

  if (fs.existsSync(jsonPath)) {
    const rawData = fs.readFileSync(jsonPath, "utf-8");
    usersData = JSON.parse(rawData);
  }

  let adminUser: any = null;
  let clienteUser: any = null;

  for (const user of usersData) {
    const senhaHash =
      user.senha_hash ||
      (user.senha ? await bcrypt.hash(user.senha, 10) : await bcrypt.hash("123456", 10));
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

  // Se não encontrou no JSON, garante criação de admin e cliente básicos
  if (!adminUser) {
    const senhaHash = await bcrypt.hash("123456", 10);
    adminUser = await prisma.usuario.upsert({
      where: { email: "admin@biblioteca.com" },
      update: {},
      create: {
        nome: "Administrador do Sistema",
        email: "admin@biblioteca.com",
        senhaHash,
        cpf: "00000000001",
        telefone: "11999999999",
        bloqueado: false,
        role: Role.ADMINISTRADOR,
      },
    });
  }

  if (!clienteUser) {
    const senhaHash = await bcrypt.hash("123456", 10);
    clienteUser = await prisma.usuario.upsert({
      where: { email: "cliente@email.com" },
      update: {},
      create: {
        nome: "Maria Silva (Leitora)",
        email: "cliente@email.com",
        senhaHash,
        cpf: "00000000002",
        telefone: "11988888888",
        bloqueado: false,
        role: Role.CLIENTE,
      },
    });
  }

  console.log("🌱 Seed: Usuários criados com sucesso");
  return { admin: adminUser, cliente: clienteUser };
}
