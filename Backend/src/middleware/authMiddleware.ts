import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Interface para dizer ao TypeScript o que tem dentro do Token
interface TokenPayload {
  id: number;
  role: string;
  iat: number;
  exp: number;
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
    const dados = jwt.verify(token, secret);

    // 3. Colocar os dados do usuário dentro da 'req' para que os
    // próximos controllers saibam quem está logado
    const { id, role } = dados as TokenPayload;

    // Para isso funcionar sem erro de tipo, você pode usar: (req as any).usuarioId = id;
    (req as any).usuarioLogado = { id, role };

    // 4. "Pode passar!" - Chama a próxima função (o seu Controller)
    return next();
  } catch {
    return res.status(401).json({ erro: "Token inválido ou expirado." });
  }
}

// Verifica se é funcionário
export function funcionario(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const usuario = (request as any).usuarioLogado;
  if (usuario?.role === "Cliente") {
    return response.status(403).json({ erro: "Acesso negado." });
  }
}

// Verifica se é Administrador
export function admin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const usuario = (request as any).usuarioLogado;
  if (usuario?.role !== "Admin") {
    return response
      .status(403)
      .json({ erro: "Acesso negado. Apenas administradores podem acessar." });
  }
  next();
}

// Verificar se é o próprio usuário ou o Administrador
export function usuarioOuAdmin(req: any, res: any, next: any) {
  const usuarioLogado = req.usuarioLogado; // Dados do Token
  const idToken = Number((req as any).usuarioLogado.id); // ID que ele quer alterar/deletar

  // 1. Se for Admin ou Funcionário, ele pode alterar qualquer um
  if (usuarioLogado.role === "ADMIN" || usuarioLogado.role === "FUNCIONARIO") {
    return next();
  }

  // 2. Se for Cliente, ele SÓ pode passar se o ID for dele mesmo
  if (usuarioLogado.id === idToken) {
    return next();
  }

  // 3. Se não for nenhum dos dois, barramos
  return res.status(403).json({
    erro: "Acesso negado. Você não tem permissão para alterar os dados de outra pessoa.",
  });
}
