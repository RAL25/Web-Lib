import { Router, type Request, type Response } from "express";
import * as funcionarioController from "../controllers/funcionarioController";
const router = Router();

router.get("/", funcionarioController.index);

router.get("/:id", funcionarioController.findFuncionario);

router.post("/", funcionarioController.createFuncionario);

router.put("/:id", funcionarioController.updateFuncionario);

router.delete("/:id", funcionarioController.deleteFuncionario);

export default router;
