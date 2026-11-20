import type { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/AppError";

export function errorMiddleware(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      erro: error.message,
    });
  }

  console.error("Erro inesperado:", error);

  return response.status(500).json({
    erro: "Erro interno do servidor.",
  });
}
