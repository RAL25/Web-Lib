import { Router, type Request, type Response } from "express";
import * as usuarioController from "../controllers/usuarioController";
import {
  autorizar,
  funcionario,
  usuarioOuAdmin,
} from "../middleware/authMiddleware";
const router = Router();

// Cadastrar novo usuário é público (e só cliente pode fazer isso)
router.post("/", usuarioController.createUsuarioPublico);

// Verificar se o cliente já confirmou o email de cadastro
router.post("/verifica-email/:token", usuarioController.verificarEmail);

// Somento o próprio usuário pode acessar a sua conta ou o administrador
router.get("/perfil", autorizar, usuarioOuAdmin, usuarioController.findUsuario);
router.put(
  "/alterar",
  autorizar,
  usuarioOuAdmin,
  usuarioController.updateUsuario,
);
router.delete(
  "/deletar",
  autorizar,
  usuarioOuAdmin,
  usuarioController.deleteUsuario,
);

// Apenas administradores ou funcionários podem listar todos os usuários
router.get("/", autorizar, funcionario, usuarioController.index);

export default router;
