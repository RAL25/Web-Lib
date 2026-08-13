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
router.get("/verifica_email/:token", usuarioController.verificarEmail);

// Somente o próprio usuário pode acessar a sua conta ou o administrador
router.get("/perfil", autorizar, usuarioOuAdmin, usuarioController.findUsuario);

// O usuário altera os seus próprios dados
router.put("/alterar", autorizar, usuarioController.updateUsuario);

// Administrador pode criar qualquer usuário
router.post(
  "/adicionar_usuario",
  autorizar,
  usuarioOuAdmin,
  usuarioController.createUsuarioAdmin,
);

router.get("/:id", autorizar, usuarioOuAdmin, usuarioController.buscarUsuario);

router.put(
  "/alterar/:id",
  autorizar,
  usuarioOuAdmin,
  usuarioController.updateUsuarioAdmin,
);

router.delete(
  "/deletar/:id",
  autorizar,
  usuarioOuAdmin,
  usuarioController.deleteUsuario,
);

// Apenas administradores ou funcionários podem listar todos os usuários
router.get("/", autorizar, funcionario, usuarioController.index);

export default router;
