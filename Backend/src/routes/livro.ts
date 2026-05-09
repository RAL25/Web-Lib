import { Router, type Request, type Response } from "express";
import * as livroController from "../controllers/livroController";
import { autorizar, funcionario } from "../middleware/authMiddleware";
const router = Router();

// Rotas públicas
router.get("/", livroController.index);
router.get("/exemplar/", livroController.indexExemplar);

// Apenas usuários logados
router.use(autorizar);

router.get("/:id", livroController.findLivro);
router.get("/exemplar/:id", livroController.findExemplarLivro);

// Apenas usuários logados com autorização (funcionários)
router.use(funcionario);

router.post("/", livroController.cadastrarLivro);
router.put("/:id", livroController.updateLivro);
router.delete("/:id", livroController.deleteLivro);

export default router;
