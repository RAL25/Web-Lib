import { Router, type Request, type Response } from "express";
import * as configController from "../controllers/configController";
const router = Router();

router.get("/", configController.mostrarConfiguracoes);
router.put("/", configController.atualizarConfiguracoes);

export default router;
