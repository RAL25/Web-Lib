import { type Request, type Response } from "express";
import { prisma } from "../config/prisma-configDB";
import { enviarEmailVerificacao } from "../utils/mailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function index(
  request: Request,
  response: Response,
): Promise<void> {
  const usuarios = await prisma.usuario.findMany();
  try {
    response.status(200).json(usuarios);
  } catch (error) {
    response.status(404).end();
  }
}

export async function findUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  const token = (request as any).usuarioLogado;
  const usuario_id = Number(token.id);
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: usuario_id,
    },
    include: { cliente: true, funcionario: true },
  });
  try {
    response.status(200).json(usuario);
  } catch (error) {
    response.status(404).end();
  }
}

export async function buscarUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  const usuario_id = Number(request.params.id);
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: usuario_id,
    },
    include: { cliente: true, funcionario: true },
  });
  try {
    response.status(200).json(usuario);
  } catch (error) {
    response.status(404).end();
  }
}

export async function createUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  const body = request.body;
  const senhaHash = await bcrypt.hash(body.senha, 10);
  const usuario = await prisma.usuario.create({
    data: {
      nome: body.nome,
      email: body.email,
      senha: senhaHash,
    },
  });
  try {
    response.status(201).json(usuario);
  } catch (error) {
    response.status(400).end();
  }
}

export async function createUsuarioPublico(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const body = request.body; // Nesse create será preciso também o cpf e telefone
    const senhaHash = await bcrypt.hash(body.senha, 10);
    const usuario = await prisma.usuario.create({
      data: {
        nome: body.nome,
        email: body.email,
        senha: senhaHash,
        cliente: {
          create: {
            cpf: body.cpf,
            telefone: body.telefone,
            emailVerificado: false,
          },
        },
      },
    });

    const tokenVerificacao = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    const link = `http://localhost:3001/api/lib/usuario/verifica_email/${tokenVerificacao}`;

    if (usuario.email) {
      await enviarEmailVerificacao(usuario.email, link);
    }

    response.status(201).json({
      mensagem:
        "Usuário criado! Por favor, verifique sua caixa de entrada para confirmar o e-mail.",
    });
  } catch (error) {
    response.status(400).end();
  }
}

// Nessa função só o administrador poderá criar um novo usuário
export async function createUsuarioAdmin(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const body = request.body;
    const senhaHash = await bcrypt.hash(body.senha, 10);
    let usuario!: any;

    if (body.role === "Cliente") {
      usuario = await prisma.usuario.create({
        data: {
          nome: body.nome,
          email: body.email,
          senha: senhaHash,
          cliente: {
            create: {
              cpf: body.cpf,
              telefone: body.telefone,
              emailVerificado: false,
            },
          },
        },
      });

      const tokenVerificacao = jwt.sign(
        { id: usuario.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" },
      );

      const link = `http://localhost:3001/api/lib/usuario/verifica_email/${tokenVerificacao}`;

      if (usuario.email) {
        await enviarEmailVerificacao(usuario.email, link);
      }
    } else if (body.role === "Funcionario") {
      const dataContratacao = new Date();
      dataContratacao.setDate(dataContratacao.getDate());

      usuario = await prisma.usuario.create({
        data: {
          nome: body.nome,
          email: body.email,
          senha: senhaHash,
          role: "Funcionario",
          funcionario: {
            create: {
              salario: body.salario,
              data_contratacao: dataContratacao,
            },
          },
        },
      });
    } else {
      usuario = await prisma.usuario.create({
        data: {
          nome: body.nome,
          email: body.email,
          senha: senhaHash,
          role: "Admin",
        },
      });
    }

    response.status(201).json("Usuario cadastrado com sucesso!");
  } catch (error) {
    response.status(400).end();
  }
}

export async function updateUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const token = (request as any).usuarioLogado;
    const temp = await prisma.usuario.findUnique({
      where: {
        id: token.id,
      },
    });

    let usuario: any;
    const body = request.body;
    const senhaHash = await bcrypt.hash(body.senha, 10);

    // Verificar qual é a role do usuário
    if (temp?.role === "Cliente") {
      usuario = await prisma.usuario.update({
        where: { id: token.id },
        data: {
          nome: body.nome,
          email: body.email,
          senha: senhaHash,
          cliente: {
            update: {
              cpf: body.cpf,
              telefone: body.telefone,
            },
          },
        },
      });
    } else {
      usuario = await prisma.usuario.update({
        where: { id: token.id },
        data: {
          nome: body.nome,
          email: body.email,
          senha: senhaHash,
        },
      });
    }

    response.status(200).json(usuario);
  } catch (error) {
    response.status(400).end();
  }
}

export async function updateUsuarioAdmin(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const usuario_id = Number(request.params.id);
    const temp = await prisma.usuario.findUnique({
      where: {
        id: usuario_id,
      },
    });

    let usuario: any;
    const body = request.body;
    const senhaHash = await bcrypt.hash(body.senha, 10);

    // Verificar qual é a role do usuário
    if (temp?.role === "Cliente") {
      usuario = await prisma.usuario.update({
        where: { id: usuario_id },
        data: {
          nome: body.nome,
          email: body.email,
          senha: senhaHash,
          cliente: {
            update: {
              cpf: body.cpf,
              telefone: body.telefone,
            },
          },
        },
      });
    } else if (temp!.role === "Funcionario") {
      usuario = await prisma.usuario.update({
        where: { id: usuario_id },
        data: {
          nome: body.nome,
          email: body.email,
          senha: senhaHash,
          funcionario: {
            update: {
              salario: body.salario,
            },
          },
        },
      });
    } else {
      usuario = await prisma.usuario.update({
        where: { id: usuario_id },
        data: {
          nome: body.nome,
          email: body.email,
          senha: senhaHash,
          role: body.role,
        },
      });
    }

    response.status(200).json(usuario);
  } catch (error) {
    response.status(400).end();
  }
}

export async function deleteUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  try {
    const usuario_id = Number(request.params.id);
    await prisma.usuario.delete({
      where: { id: usuario_id },
    });

    response.status(204).end();
  } catch (error) {
    response.status(400).end();
  }
}

export async function verificarEmail(request: Request, response: Response) {
  const { token } = request.params;

  try {
    const dados = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
    ) as any;

    await prisma.cliente.update({
      where: { id: dados.id },
      data: { emailVerificado: true },
    });

    return response.status(200).json({
      mensagem: "E-mail verificado com sucesso! Você já pode fazer login.",
    });
  } catch (error) {
    return response.status(400).json({ erro: "Link inválido ou expirado." });
  }
}
