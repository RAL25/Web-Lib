import { Router } from "express";
import * as avaliacaoController from "../controllers/avaliacaoController";
import { autorizar } from "../middleware/authMiddleware";

const router = Router();

// 1. Rota para consultar avaliações de um livro
router.get("/livro/:id", avaliacaoController.listarPorLivro);

// 2. Rotas protegidas por autenticação
router.use(autorizar);

// Criar ou atualizar avaliação
router.post("/", avaliacaoController.criarOuAtualizarAvaliacao);

// Listar avaliações do próprio usuário logado
router.get("/minhas-avaliacoes", avaliacaoController.listarPorUsuario);

// Deletar avaliação (apenas autor ou admin)
router.delete("/:id", avaliacaoController.deletarAvaliacao);

export default router;
