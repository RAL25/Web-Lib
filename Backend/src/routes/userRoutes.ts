import { Router, type Request, type Response } from "express";

const router = Router();
router.get("/", (request: Request, response: Response) => {
  response.json("algo");
});

export default router;
