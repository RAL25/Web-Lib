import { Router } from "express";
import * as emprestimoController from "../controllers/emprestimoController";

const router = Router();

// Lista apenas os itens ATIVOS (não devolvidos) do cliente logado
router.get("/listar_itens", emprestimoController.index);

// Lista TODOS os itens de empréstimos já finalizados/devolvidos do cliente logado
router.get("/historico_emprestimo", emprestimoController.HistoricoEmprestimo);

// Realiza o empréstimo (recebe vetor de exemplarIds)
router.post("/realizar", emprestimoController.realizarEmprestimo);

// Renovação/Adiamento do item por id_itemEmprestimo
router.put("/adiar/:id", emprestimoController.adiarEmprestimo);

// Devolução do item por id_itemEmprestimo
router.put("/devolver/:id", emprestimoController.devolverLivro);

export default router;
