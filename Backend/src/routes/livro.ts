import { Router, type Request, type Response } from "express";
import * as livroController from "../controllers/livroController";
import { autorizar, admin } from "../middleware/authMiddleware";
const router = Router();

// Rotas públicas
router.get("/", livroController.index);
router.get("/exemplar/", livroController.indexExemplar);

// Apenas usuários logados
router.use(autorizar);

router.get("/:id", livroController.findLivro);

// Rota para buscar exemplares disponíveis diretamente por busca
router.get(
  "/exemplares/disponiveis",
  livroController.buscarExemplaresDisponiveis,
);

// Apenas administradores podem cadastrar, alterar ou deletar livros
router.use(admin);

router.post("/", livroController.cadastrarLivro);
router.put("/:id", livroController.updateLivro);
router.delete("/:id", livroController.deleteLivro);

export default router;
