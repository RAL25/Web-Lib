import { Router, type Request, type Response } from "express";
const router = Router();

router.get("/", (request: Request, response: Response) => {
  response.json("index livro");
});

router.get("/:id", (request: Request, response: Response) => {
  response.json(`buscando livro com id: ${request.params.id}`);
});
router.post("/", (request: Request, response: Response) => {
  response.json("criando livro");
});
router.put("/", (request: Request, response: Response) => {
  response.json("alterando livro");
});
router.delete("/", (request: Request, response: Response) => {
  response.json("deletando livro");
});

export default router;
