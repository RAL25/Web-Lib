import { type Request, type Response } from "express";
import { prisma } from "../config/prisma-configDB";
import bcrypt from "bcryptjs";
import { Role } from "../database/generated/prisma";

// Listar todos os usuários, com suporte a filtro por role (ADMINISTRADOR ou CLIENTE) e busca
export async function index(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const roleQuery = request.query.role as string | undefined;
    const buscaQuery = request.query.busca as string | undefined;

    const whereClause: any = {};

    if (roleQuery && (roleQuery === "ADMINISTRADOR" || roleQuery === "CLIENTE")) {
      whereClause.role = roleQuery as Role;
    }

    if (buscaQuery && buscaQuery.trim() !== "") {
      const termo = buscaQuery.trim();
      whereClause.OR = [
        { nome: { contains: termo } },
        { email: { contains: termo } },
        { cpf: { contains: termo } },
        { telefone: { contains: termo } },
      ];
    }

    const usuarios = await prisma.usuario.findMany({
      where: whereClause,
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        bloqueado: true,
        role: true,
      },
      orderBy: {
        nome: "asc",
      },
    });

    response.status(200).json(usuarios);
  } catch (error: any) {
    console.error("Erro ao listar usuários:", error);
    response.status(500).json({ erro: "Erro ao listar usuários." });
  }
}

// Buscar perfil do usuário atualmente logado
export async function findUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const usuarioId = request.usuarioId || request.usuarioLogado?.id;
    if (!usuarioId) {
      response.status(401).json({ erro: "Usuário não autenticado." });
      return;
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: String(usuarioId) },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        bloqueado: true,
        role: true,
      },
    });

    if (!usuario) {
      response.status(404).json({ erro: "Usuário não encontrado." });
      return;
    }

    response.status(200).json(usuario);
  } catch (error: any) {
    console.error("Erro ao buscar perfil do usuário:", error);
    response.status(500).json({ erro: "Erro ao buscar perfil do usuário." });
  }
}

// Buscar usuário por ID (UUID)
export async function buscarUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const id = String(request.params.id);
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        bloqueado: true,
        role: true,
      },
    });

    if (!usuario) {
      response.status(404).json({ erro: "Usuário não encontrado." });
      return;
    }

    response.status(200).json(usuario);
  } catch (error: any) {
    console.error("Erro ao buscar usuário por ID:", error);
    response.status(500).json({ erro: "Erro ao buscar usuário." });
  }
}

// Cadastro público de usuário (Perfil CLIENTE por padrão)
export async function createUsuarioPublico(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const { nome, email, senha, cpf, telefone } = request.body;

    if (!nome || !email || !senha || !cpf) {
      response
        .status(400)
        .json({ erro: "Nome, e-mail, senha e CPF são obrigatórios." });
      return;
    }

    const emailExistente = await prisma.usuario.findUnique({
      where: { email },
    });
    if (emailExistente) {
      response.status(400).json({ erro: "E-mail já cadastrado no sistema." });
      return;
    }

    const cpfExistente = await prisma.usuario.findUnique({
      where: { cpf },
    });
    if (cpfExistente) {
      response.status(400).json({ erro: "CPF já cadastrado no sistema." });
      return;
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senhaHash,
        cpf,
        telefone: telefone || "",
        bloqueado: false,
        role: Role.CLIENTE,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        bloqueado: true,
        role: true,
      },
    });

    response.status(201).json({
      mensagem: "Cadastro realizado com sucesso! Você já pode fazer login.",
      usuario,
    });
  } catch (error: any) {
    console.error("Erro ao cadastrar usuário público:", error);
    response
      .status(400)
      .json({ erro: error.message || "Erro ao realizar cadastro." });
  }
}

// Criação de usuário pelo Administrador (pode definir role e status bloqueado)
export async function createUsuarioAdmin(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const { nome, email, senha, cpf, telefone, role, bloqueado } = request.body;

    if (!nome || !email || !senha || !cpf) {
      response
        .status(400)
        .json({ erro: "Nome, e-mail, senha e CPF são obrigatórios." });
      return;
    }

    const emailExistente = await prisma.usuario.findUnique({
      where: { email },
    });
    if (emailExistente) {
      response.status(400).json({ erro: "E-mail já cadastrado no sistema." });
      return;
    }

    const cpfExistente = await prisma.usuario.findUnique({
      where: { cpf },
    });
    if (cpfExistente) {
      response.status(400).json({ erro: "CPF já cadastrado no sistema." });
      return;
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const userRole =
      role === "ADMINISTRADOR" ? Role.ADMINISTRADOR : Role.CLIENTE;

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senhaHash,
        cpf,
        telefone: telefone || "",
        bloqueado: Boolean(bloqueado),
        role: userRole,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        bloqueado: true,
        role: true,
      },
    });

    response
      .status(201)
      .json({ mensagem: "Usuário cadastrado com sucesso!", usuario });
  } catch (error: any) {
    console.error("Erro ao criar usuário por admin:", error);
    response
      .status(400)
      .json({ erro: error.message || "Erro ao cadastrar usuário." });
  }
}

// Atualização dos próprios dados pelo usuário logado
export async function updateUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const usuarioId = request.usuarioId || request.usuarioLogado?.id;
    if (!usuarioId) {
      response.status(401).json({ erro: "Usuário não autenticado." });
      return;
    }

    const { nome, email, senha, cpf, telefone } = request.body;

    const dataToUpdate: any = {};
    if (nome) dataToUpdate.nome = nome;
    if (email) dataToUpdate.email = email;
    if (cpf) dataToUpdate.cpf = cpf;
    if (telefone !== undefined) dataToUpdate.telefone = telefone;
    if (senha && senha.trim() !== "") {
      dataToUpdate.senhaHash = await bcrypt.hash(senha, 10);
    }

    const usuario = await prisma.usuario.update({
      where: { id: String(usuarioId) },
      data: dataToUpdate,
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        bloqueado: true,
        role: true,
      },
    });

    response.status(200).json(usuario);
  } catch (error: any) {
    console.error("Erro ao atualizar perfil:", error);
    response
      .status(400)
      .json({ erro: error.message || "Erro ao atualizar perfil." });
  }
}

// Atualização de usuário pelo Administrador
export async function updateUsuarioAdmin(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const id = String(request.params.id);
    const { nome, email, senha, cpf, telefone, role, bloqueado } = request.body;

    const dataToUpdate: any = {};
    if (nome) dataToUpdate.nome = nome;
    if (email) dataToUpdate.email = email;
    if (cpf) dataToUpdate.cpf = cpf;
    if (telefone !== undefined) dataToUpdate.telefone = telefone;
    if (bloqueado !== undefined) dataToUpdate.bloqueado = Boolean(bloqueado);

    if (role && (role === "ADMINISTRADOR" || role === "CLIENTE")) {
      dataToUpdate.role = role as Role;
    }

    if (senha && senha.trim() !== "") {
      dataToUpdate.senhaHash = await bcrypt.hash(senha, 10);
    }

    const usuario = await prisma.usuario.update({
      where: { id },
      data: dataToUpdate,
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        bloqueado: true,
        role: true,
      },
    });

    response.status(200).json(usuario);
  } catch (error: any) {
    console.error("Erro ao atualizar usuário por admin:", error);
    response
      .status(400)
      .json({ erro: error.message || "Erro ao atualizar usuário." });
  }
}

// Alternar status de bloqueio do usuário (Bloquear / Desbloquear)
export async function toggleBloqueioUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const id = String(request.params.id);
    const { bloqueado } = request.body;

    const usuarioAtual = await prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuarioAtual) {
      response.status(404).json({ erro: "Usuário não encontrado." });
      return;
    }

    const novoStatus =
      bloqueado !== undefined ? Boolean(bloqueado) : !usuarioAtual.bloqueado;

    const usuario = await prisma.usuario.update({
      where: { id },
      data: { bloqueado: novoStatus },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        telefone: true,
        bloqueado: true,
        role: true,
      },
    });

    response.status(200).json({
      mensagem: novoStatus
        ? "Usuário bloqueado com sucesso."
        : "Usuário desbloqueado com sucesso.",
      usuario,
    });
  } catch (error: any) {
    console.error("Erro ao alternar bloqueio de usuário:", error);
    response
      .status(400)
      .json({ erro: error.message || "Erro ao alterar status do usuário." });
  }
}

// Deletar usuário
export async function deleteUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const id = String(request.params.id);

    // Verificar se o usuário possui empréstimos vinculados
    const emprestimosCount = await prisma.emprestimo.count({
      where: { usuarioId: id },
    });

    if (emprestimosCount > 0) {
      response.status(400).json({
        erro: "Não é possível excluir o usuário pois ele possui histórico de empréstimos vinculado.",
      });
      return;
    }

    await prisma.usuario.delete({
      where: { id },
    });

    response.status(204).end();
  } catch (error: any) {
    console.error("Erro ao deletar usuário:", error);
    response
      .status(400)
      .json({ erro: error.message || "Erro ao deletar usuário." });
  }
}
