import { Router, type Request, type Response } from "express";
import * as clienteController from "../controllers/clienteController";
const router = Router();

router.get("/", clienteController.index);

router.get("/:id", clienteController.findCliente);

router.post("/", clienteController.createCliente);

router.put("/:id", clienteController.updateCliente);

router.delete("/:id", clienteController.deleteCliente);

export default router;
