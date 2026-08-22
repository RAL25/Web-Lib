import { Router, type Request, type Response } from "express";
import Usuario from "./usuario";
import Livro from "./livro";
import Emprestimo from "./emprestimo";
import Dashboard from "./dashboard";
import Configuracao from "./config";
import { login } from "../controllers/authController";
import { autorizar, admin } from "../middleware/authMiddleware";

const router = Router();

router.get("/", (_request: Request, response: Response) => {
  response.json("index do router");
});

// Rotas públicas
router.post("/login", login);
router.use("/livro", Livro);
router.use("/usuario", Usuario);

// Rotas para usuários logados
router.use("/emprestimo", autorizar, Emprestimo);

// Rotas exclusivas para Administradores
router.use("/dashboard", autorizar, admin, Dashboard);
router.use("/configuracao", autorizar, admin, Configuracao);

export default router;
