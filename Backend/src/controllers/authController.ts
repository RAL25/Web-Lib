import { Request, Response } from "express";
import { prisma } from "../config/prisma-configDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    // 1. Verificar se o e-mail e senha foram enviados
    if (!email || !senha) {
      return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
    }

    // 2. Buscar o usuário no banco de dados pelo e-mail
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    // 3. Se o usuário não existir, retornamos erro genérico por segurança
    if (!usuario) {
      return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    // 4. Verificar se a conta está bloqueada
    if (usuario.bloqueado) {
      return res.status(403).json({
        erro: "Sua conta está temporariamente bloqueada. Entre em contato com o suporte/administração.",
      });
    }

    // 5. Comparar a senha digitada com o hash do banco
    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);

    if (!senhaValida) {
      return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    // 6. Gerar o Token JWT
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res
        .status(500)
        .json({ erro: "Erro interno: JWT_SECRET não configurado." });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        role: usuario.role,
      },
      secret,
      { expiresIn: "1d" },
    );

    // 7. Retornar os dados do usuário e token
    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
        telefone: usuario.telefone,
        bloqueado: usuario.bloqueado,
        role: usuario.role,
      },
      token: token,
    });
  } catch (error: any) {
    console.error("Erro no login:", error);
    return res.status(500).json({ erro: "Erro interno ao processar login." });
  }
}
