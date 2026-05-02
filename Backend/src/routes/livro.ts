import { Router, type Request, type Response } from "express";
import * as livroController from "../controllers/livroController";
const router = Router();

router.get("/", livroController.index);

router.get("/exemplar/", livroController.indexExemplar);

router.get("/:id", livroController.findLivro);

router.get("/exemplar/:id", livroController.findExemplarLivro);

router.post("/", livroController.cadastrarLivro);

router.put("/:id", livroController.updateLivro);

router.delete("/:id", livroController.deleteLivro);

export default router;
