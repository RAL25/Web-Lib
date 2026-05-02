import { Router, type Request, type Response } from "express";
import * as emprestimoController from "../controllers/emprestimoController";
const router = Router();

router.get("/", emprestimoController.index);

router.get("/itens/:id", emprestimoController.listarItens); // Lista os itens de um emprestimo

router.post("/realizar", emprestimoController.realizarEmprestimo);

router.put("/adiar/:id", emprestimoController.adiarEmprestimo);

router.put("/devolver/:id", emprestimoController.devolverLivro);

export default router;
