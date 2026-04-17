import { type Request, type Response } from "express";
import { prisma } from "../config/prisma-configDB";

export async function index(
  request: Request,
  response: Response,
): Promise<void> {
  const livros = await prisma.livro.findMany();
  try {
    response.status(200).json(livros);
  } catch (error) {
    response.status(204).end();
  }
}

export async function findLivro(
  request: Request,
  response: Response,
): Promise<void> {
  const livro_id = Number(request.params.id);
  const livro = await prisma.livro.findUnique({
    where: {
      id: livro_id,
    },
  });
  try {
    response.status(200).json(livro);
  } catch (error) {
    response.status(404).end();
  }
}

export async function createLivro(
  request: Request,
  response: Response,
): Promise<void> {
  const body = request.body;
  const livro = await prisma.livro.create({
    data: {
      titulo: body.titulo,
      autor: body.autor,
    },
  });
  try {
    response.status(201).json(livro);
  } catch (error) {
    response.status(400).end();
  }
}

export async function updateLivro(
  request: Request,
  response: Response,
): Promise<void> {
  const livro_id = Number(request.params.id);
  const body = request.body;
  const livro = await prisma.livro.update({
    where: { id: livro_id },
    data: { titulo: body.titulo, autor: body.autor, status: body.status },
  });
  try {
    response.status(200).json(livro);
  } catch (error) {
    response.status(400).end();
  }
}

export async function deleteLivro(
  request: Request,
  response: Response,
): Promise<void> {
  const livro_id = Number(request.params.id);
  await prisma.livro.delete({
    where: { id: livro_id },
  });
  try {
    response.status(204).end();
  } catch (error) {
    response.status(400).end();
  }
}
