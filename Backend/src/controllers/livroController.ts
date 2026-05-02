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
    response.status(404).end();
  }
}

export async function indexExemplar(
  request: Request,
  response: Response,
): Promise<void> {
  const exemplares = await prisma.exemplarLivro.findMany();
  try {
    response.status(200).json(exemplares);
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

export async function findExemplarLivro(
  request: Request,
  response: Response,
): Promise<void> {
  const exemplarLivro_id = Number(request.params.id);
  const exemplar = await prisma.exemplarLivro.findUnique({
    where: {
      id: exemplarLivro_id,
    },
  });
  try {
    response.status(200).json(exemplar);
  } catch (error) {
    console.error(error);
    response.status(404).json({ error: "Erro ao procurar exemplar." });
  }
}

/*
  Para cadastrar um novo livro: {titulo, autor, quantidade}
*/
async function cadastrarExemplar(id_livro: number, quantidade: number) {
  // Criamos um array de objetos para o Prisma
  const dadosExemplares = Array.from({ length: quantidade }).map(() => ({
    livroId: id_livro,
  }));

  await prisma.exemplarLivro.createMany({
    data: dadosExemplares,
  });
}

export async function cadastrarLivro(
  request: Request,
  response: Response,
): Promise<void> {
  const body = request.body;
  let livro = await prisma.livro.findFirst({
    where: { titulo: body.titulo, autor: body.autor },
  });

  if (!livro) {
    // Cria o livro que ainda não existe no banco
    livro = await prisma.livro.create({
      data: {
        titulo: body.titulo,
        autor: body.autor,
      },
    });
  }

  // Adiciona os exemplares
  await cadastrarExemplar(livro.id, body.quantidade);

  try {
    response.status(201).json({
      message: `${body.quantidade} exemplar(es) cadastrado(s) com sucesso.`,
    });
  } catch (error) {
    console.error(error);
    response
      .status(400)
      .json({ error: "Erro ao cadastrar livro e exemplares." });
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
    data: { titulo: body.titulo, autor: body.autor },
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
  // Deleta todos os exemplares depois deleta o principal
  await prisma.exemplarLivro.deleteMany({
    where: { livroId: livro_id },
  });
  await prisma.livro.delete({
    where: { id: livro_id },
  });
  try {
    response.status(204).json({
      message: "Livros deletados.",
    });
  } catch (error) {
    response.status(400).end();
  }
}
