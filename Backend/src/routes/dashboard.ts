import { Router } from "express";
import * as dashboardController from "../controllers/dashboardController";
import { admin } from "../middleware/authMiddleware";

const router = Router();

// Rota protegida: apenas administradores têm acesso ao dashboard
router.use(admin);

router.get("/kpis", dashboardController.getKpis);
router.get("/alertas", dashboardController.getAlertas);
router.get("/estatisticas", dashboardController.getEstatisticas);

export default router;
