import { Router, type Request, type Response } from "express";
import * as livroController from "../controllers/livroController";
const router = Router();

router.get("/", livroController.index);

router.get("/:id", livroController.findLivro);

router.post("/", livroController.createLivro);

router.put("/:id", livroController.updateLivro);

router.delete("/:id", livroController.deleteLivro);

export default router;
