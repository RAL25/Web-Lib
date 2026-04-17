import { type Request, type Response } from "express";
import { prisma } from "../config/prisma-configDB";

export async function index(
  request: Request,
  response: Response,
): Promise<void> {
  const funcionarios = await prisma.funcionario.findMany();
  try {
    response.status(200).json(funcionarios);
  } catch (error) {
    response.status(204).end();
  }
}

export async function findFuncionario(
  request: Request,
  response: Response,
): Promise<void> {
  const funcionario_id = Number(request.params.id);
  const funcionario = await prisma.funcionario.findUnique({
    where: {
      id: funcionario_id,
    },
  });
  try {
    response.status(200).json(funcionario);
  } catch (error) {
    response.status(404).end();
  }
}

export async function createFuncionario(
  request: Request,
  response: Response,
): Promise<void> {
  const body = request.body;
  const funcionario = await prisma.funcionario.create({
    data: {
      id: body.id,
      salario: body.salario,
      data_contratacao: body.data,
    },
  });
  try {
    response.status(201).json(funcionario);
  } catch (error) {
    response.status(400).end();
  }
}

export async function updateFuncionario(
  request: Request,
  response: Response,
): Promise<void> {
  const funcionario_id = Number(request.params.id);
  const body = request.body;
  const funcionario = await prisma.funcionario.update({
    where: { id: funcionario_id },
    data: { salario: body.salario },
  });
  try {
    response.status(200).json(funcionario);
  } catch (error) {
    response.status(400).end();
  }
}

export async function deleteFuncionario(
  request: Request,
  response: Response,
): Promise<void> {
  const funcionario_id = Number(request.params.id);
  await prisma.funcionario.delete({
    where: { id: funcionario_id },
  });
  try {
    response.status(204).end();
  } catch (error) {
    response.status(400).end();
  }
}
