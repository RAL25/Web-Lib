import { Router, type Request, type Response } from "express";
import * as clienteController from "../controllers/clienteController";
import {
  autorizar,
  funcionario,
  usuarioOuAdmin,
  // admin,
} from "../middleware/authMiddleware";
const router = Router();

router.post("/", clienteController.createCliente);

// Usuário logado pode acessar ou funcionario
router.get("/:id", autorizar, usuarioOuAdmin, clienteController.findCliente);
router.put("/:id", autorizar, usuarioOuAdmin, clienteController.updateCliente);
router.delete(
  "/:id",
  autorizar,
  usuarioOuAdmin,
  clienteController.deleteCliente,
);

// Apenas administradores ou funcionarios podem acessar
router.get("/", autorizar, funcionario, clienteController.index);

export default router;
