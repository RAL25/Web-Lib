import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController";
import {
  autorizar,
  admin,
  usuarioOuAdmin,
} from "../middleware/authMiddleware";

const router = Router();

// 1. Rotas Públicas
// Cadastro público de novo usuário (Cliente)
router.post("/", usuarioController.createUsuarioPublico);

// 2. Rotas do Usuário Autenticado (Própria Conta)
// Visualizar o próprio perfil
router.get("/perfil", autorizar, usuarioController.findUsuario);

// Alterar os próprios dados
router.put("/alterar", autorizar, usuarioController.updateUsuario);

// 3. Rotas Administrativas (Gestão de Usuários)
// Listar todos os usuários (com suporte a ?role= e ?busca=)
router.get("/", autorizar, admin, usuarioController.index);

// Administrador cria um novo usuário
router.post(
  "/adicionar_usuario",
  autorizar,
  admin,
  usuarioController.createUsuarioAdmin,
);

// Bloquear / Desbloquear usuário
router.put(
  "/bloquear/:id",
  autorizar,
  admin,
  usuarioController.toggleBloqueioUsuario,
);
router.patch(
  "/bloquear/:id",
  autorizar,
  admin,
  usuarioController.toggleBloqueioUsuario,
);

// Deletar usuário (apenas admin)
router.delete(
  "/deletar/:id",
  autorizar,
  admin,
  usuarioController.deleteUsuario,
);

// 4. Rotas de Usuário ou Admin
// Buscar usuário específico por ID
router.get("/:id", autorizar, usuarioOuAdmin, usuarioController.buscarUsuario);

// Atualizar usuário por ID
router.put(
  "/alterar/:id",
  autorizar,
  usuarioOuAdmin,
  usuarioController.updateUsuarioAdmin,
);

export default router;
