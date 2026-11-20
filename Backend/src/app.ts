import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import { errorMiddleware } from "./middleware/errorMiddleware";

// No app é onde o express é inicializado e configurado
const app = express();

// Middlewares
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

// Rotas da API
app.use("/api/lib", router);

// Middleware global de erros
app.use(errorMiddleware);

export default app;
