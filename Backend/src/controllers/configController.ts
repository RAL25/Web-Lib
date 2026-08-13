import { type Request, type Response } from "express";
import { prisma } from "../config/prisma-configDB";

export async function mostrarConfiguracoes(req: Request, res: Response) {
  try {
    const config = await prisma.configuracao.findMany();

    res.status(200).json(config);
  } catch (erro) {
    res.status(400).json({ error: "Erro ao mostarar configurações." });
  }
}

export async function atualizarConfiguracoes(req: Request, res: Response) {
  const {
    limite_global,
    limite_por_titulo,
    prazo_padrao_dias,
    dias_penalidade,
  } = req.body;

  try {
    const config = await prisma.configuracao.upsert({
      where: { id: 1 },
      update: {
        limite_global,
        limite_por_titulo,
        prazo_padrao_dias,
        dias_penalidade,
      },
      create: {
        id: 1,
        limite_global,
        limite_por_titulo,
        prazo_padrao_dias,
        dias_penalidade,
      },
    });

    res.json({ message: "Configurações atualizadas!", config });
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar configurações." });
  }
}
