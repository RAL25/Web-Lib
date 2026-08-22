import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Interface para o payload do Token JWT
export interface TokenPayload {
  id: string; // UUID
  role: "ADMINISTRADOR" | "CLIENTE";
  nome?: string;
  iat?: number;
  exp?: number;
}

// Extensão da tipagem do Express Request para conter usuarioId e usuarioLogado
declare global {
  namespace Express {
    interface Request {
      usuarioId?: string;
      usuarioLogado?: {
        id: string;
        role: "ADMINISTRADOR" | "CLIENTE";
        nome?: string;
      };
    }
  }
}

export function autorizar(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  // 1. Verificar se o cabeçalho de autorização foi enviado
  if (!authorization) {
    return res.status(401).json({ erro: "Token não fornecido." });
  }

  // O padrão do token é "Bearer <TOKEN>", então precisamos separar
  const token = authorization.replace("Bearer", "").trim();

  try {
    const secret = process.env.JWT_SECRET || "";

    // 2. Validar o token
    const dados = jwt.verify(token, secret) as TokenPayload;

    // 3. Colocar os dados do usuário dentro da 'req'
    req.usuarioId = dados.id;
    req.usuarioLogado = {
      id: dados.id,
      role: dados.role,
      nome: dados.nome,
    };

    // 4. Prosseguir
    return next();
  } catch {
    return res.status(401).json({ erro: "Token inválido ou expirado." });
  }
}

// Verifica se é Administrador
export function admin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const usuario = req.usuarioLogado;
  if (usuario?.role !== "ADMINISTRADOR") {
    return res
      .status(403)
      .json({ erro: "Acesso negado. Apenas administradores podem acessar." });
  }
  next();
}

// Verificar se é o próprio usuário ou o Administrador
export function usuarioOuAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const usuarioLogado = req.usuarioLogado;
  if (!usuarioLogado) {
    return res.status(401).json({ erro: "Usuário não autenticado." });
  }

  const idAlvo = req.params.id || usuarioLogado.id;

  // 1. Se for Administrador, pode acessar/alterar qualquer usuário
  if (usuarioLogado.role === "ADMINISTRADOR") {
    return next();
  }

  // 2. Se for Cliente, só pode acessar/alterar se o ID for o dele mesmo
  if (usuarioLogado.id === idAlvo) {
    return next();
  }

  // 3. Caso contrário, barramos
  return res.status(403).json({
    erro: "Acesso negado. Você não tem permissão para acessar ou alterar dados de outro usuário.",
  });
}
