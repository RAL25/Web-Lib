import { Request, Response } from "express";
import { prisma } from "../config/prisma-configDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    // 1. Verificar se o e-mail foi enviado
    if (!email || !senha) {
      throw new Error("E-mail e senha são obrigatórios.");
    }

    // 2. Buscar o usuário no banco de dados pelo e-mail
    const usuario = await prisma.usuario.findUnique({
      where: { email: email },
      // Trazendo as relações para saber se ele é funcionário ou cliente
      include: {
        cliente: true,
        funcionario: true,
      },
    });

    // 3. Se o usuário não existir, retornamos erro genérico (por segurança)
    if (!usuario) {
      throw new Error("Credenciais inválidas.");
    }

    // 4. Comparar a senha digitada com a senha embaralhada (hash) do banco
    // OBS: Quando você for criar novos usuários, lembre-se de usar bcrypt.hash() para salvar a senha!
    const senhaValida = await bcrypt.compare(senha, usuario.senha!);

    if (!senhaValida) {
      throw new Error("Credenciais inválidas.");
    }

    // 5. Descobrir qual é o "perfil" da pessoa logada
    let role = "usuario";
    if (usuario.funcionario) role = "Funcionario";
    if (usuario.cliente) role = "Cliente";

    // Verificar se o cliente já confirmou o seu email
    if (role === "Cliente") {
      if (!usuario.cliente!.emailVerificado) {
        return res.status(403).json({
          erro: "Você precisa confirmar seu e-mail antes de fazer login.",
        });
      }
    }

    // 6. Gerar o Token JWT (O "crachá" de acesso)
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("Erro interno: JWT_SECRET não configurado.");
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        role: role,
      },
      secret,
      { expiresIn: "1d" }, // O token expira em 1 dia
    );

    // 7. Retornar os dados (sem a senha, obviamente) e o token
    res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        // tipo: role,
      },
      token: token,
    });
  } catch (error: any) {
    // Usamos 401 (Unauthorized) para falhas de autenticação
    res.status(401).json({ erro: error.message });
  }
}
