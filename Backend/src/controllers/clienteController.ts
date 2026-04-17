import { type Request, type Response } from "express";
import { prisma } from "../config/prisma-configDB";

export async function index(
  request: Request,
  response: Response,
): Promise<void> {
  const clientes = await prisma.cliente.findMany();
  try {
    response.status(200).json(clientes);
  } catch (error) {
    response.status(204).end();
  }
}

export async function findCliente(
  request: Request,
  response: Response,
): Promise<void> {
  const cliente_id = Number(request.params.id);
  const cliente = await prisma.cliente.findUnique({
    where: {
      id: cliente_id,
    },
  });
  try {
    response.status(200).json(cliente);
  } catch (error) {
    response.status(404).end();
  }
}

export async function createCliente(
  request: Request,
  response: Response,
): Promise<void> {
  const body = request.body;
  const cliente = await prisma.cliente.create({
    data: {
      id: body.id,
      cpf: body.cpf,
      telefone: body.telefone,
    },
  });
  try {
    response.status(201).json(cliente);
  } catch (error) {
    response.status(400).end();
  }
}

export async function updateCliente(
  request: Request,
  response: Response,
): Promise<void> {
  const cliente_id = Number(request.params.id);
  const body = request.body;
  const cliente = await prisma.cliente.update({
    where: { id: cliente_id },
    data: { telefone: body.telefone },
  });
  try {
    response.status(200).json(cliente);
  } catch (error) {
    response.status(400).end();
  }
}

export async function deleteCliente(
  request: Request,
  response: Response,
): Promise<void> {
  const cliente_id = Number(request.params.id);
  await prisma.cliente.delete({
    where: { id: cliente_id },
  });
  try {
    response.status(204).end();
  } catch (error) {
    response.status(400).end();
  }
}
