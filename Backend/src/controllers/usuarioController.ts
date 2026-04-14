import { type Request, type Response } from "express";
import { prisma } from "../config/prisma-configDB";

export async function index(
  request: Request,
  response: Response,
): Promise<void> {
  const usuarios = await prisma.usuario.findMany();
  try {
    response.status(200).json(usuarios);
  } catch (error) {
    response.status(204).end();
  }
}

export async function findUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  const usuario_id = Number(request.params.id);
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: usuario_id,
    },
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
  const usuario = await prisma.usuario.create({
    data: {
      nome: body.nome,
      email: body.email,
      senha: body.senha,
    },
  });
  try {
    response.status(201).json(usuario);
  } catch (error) {
    response.status(400).end();
  }
}

export async function updateUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  const usuario_id = Number(request.params.id);
  const body = request.body;
  const usuario = await prisma.usuario.update({
    where: { id: usuario_id },
    data: { nome: body.nome, email: body.email, senha: body.senha },
  });
  try {
    response.status(200).json(usuario);
  } catch (error) {
    response.status(400).end();
  }
}

export async function deleteUsuario(
  request: Request,
  response: Response,
): Promise<void> {
  const usuario_id = Number(request.params.id);
  await prisma.usuario.delete({
    where: { id: usuario_id },
  });
  try {
    response.status(204).end();
  } catch (error) {
    response.status(400).end();
  }
}
