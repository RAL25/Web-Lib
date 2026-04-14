import { Router, type Request, type Response } from "express";
const router = Router();

router.get("/", (request: Request, response: Response) => {
  response.json("index funcionário");
});

router.get("/:id", (request: Request, response: Response) => {
  response.json(`buscando funcionário com id: ${request.params.id}`);
});
router.post("/", (request: Request, response: Response) => {
  response.json("criando funcionário");
});
router.put("/", (request: Request, response: Response) => {
  response.json("alterando funcionário");
});
router.delete("/", (request: Request, response: Response) => {
  response.json("deletando funcionário");
});

export default router;
