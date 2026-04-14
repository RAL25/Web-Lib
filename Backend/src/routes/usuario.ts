import { Router, type Request, type Response } from "express";
import * as usuarioController from "../controllers/usuarioController";
const router = Router();

router.get("/", usuarioController.index);

router.get("/:id", usuarioController.findUsuario);

router.post("/", usuarioController.createUsuario);

router.put("/:id", usuarioController.updateUsuario);

router.delete("/:id", usuarioController.deleteUsuario);

export default router;
