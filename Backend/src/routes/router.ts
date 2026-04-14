import { Router, type Request, type Response } from "express";
import Usuario from "./usuario";
import Cliente from "./cliente";
import Funcionario from "./funcionario";
import Livro from "./livro";
const router = Router();

router.get("/", (request: Request, response: Response) => {
  response.json("index do router");
});

// Outras rotas
router.use("/usuario", Usuario);
router.use("/cliente", Cliente);
router.use("/funcionario", Funcionario);
router.use("/livro", Livro);

export default router;
