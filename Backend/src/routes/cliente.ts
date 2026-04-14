import { Router, type Request, type Response } from "express";
const router = Router();

router.get("/", (request: Request, response: Response) => {
  response.json("index cliente");
});

router.get("/:id", (request: Request, response: Response) => {
  response.json(`buscando cliente com id: ${request.params.id}`);
});
router.post("/", (request: Request, response: Response) => {
  response.json("criando cliente");
});
router.put("/", (request: Request, response: Response) => {
  response.json("alterando cliente");
});
router.delete("/", (request: Request, response: Response) => {
  response.json("deletando cliente");
});

export default router;
