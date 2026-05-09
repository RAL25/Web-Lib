import { Router, type Request, type Response } from "express";
import Usuario from "./usuario";
import Cliente from "./cliente";
import Funcionario from "./funcionario";
import Livro from "./livro";
import Emprestimo from "./emprestimo";
import Configuracao from "./config";
import { login } from "../controllers/authController";
import { autorizar, admin } from "../middleware/authMiddleware";
const router = Router();

router.get("/", (request: Request, response: Response) => {
  response.json("index do router");
});

// Rotas públicas
router.post("/login", login);
router.use("/livro", Livro);
router.use("/usuario", Usuario);
router.use("/cliente", Cliente);

// Rotas para usuários logados
router.use(autorizar);
router.use("/emprestimo", Emprestimo);

// Rota só para funcionario e admin
router.use("/funcionario", Funcionario);

// Rota para usuários com role admin
router.use(admin);
router.use("/configuracao", Configuracao);

export default router;
