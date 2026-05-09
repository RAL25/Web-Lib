import { Router, type Request, type Response } from "express";
import * as funcionarioController from "../controllers/funcionarioController";
import { funcionario, admin } from "../middleware/authMiddleware";
const router = Router();

router.use(funcionario);

router.get("/:id", funcionarioController.findFuncionario);

// Apenas Admin
router.use(admin);

router.get("/", funcionarioController.index);
router.post("/", funcionarioController.createFuncionario);
router.put("/:id", funcionarioController.updateFuncionario);
router.delete("/:id", funcionarioController.deleteFuncionario);

export default router;
