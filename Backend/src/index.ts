// import express from "express";
// import routers from "./routes/userRoutes.js";
// const app = express();

// app.use(express.static("build"));
// app.use(express.json());

// app.use("/api/lib", routers);

// const PORT = 3001;
// app.listen(PORT, () =>
//   console.log(`Server started at http://localhost:${PORT}`),
// );

// Adicionar depois:
import express from "express";
import cors from "cors"; // 1. Importe o cors
// ... outros imports

const app = express();

// 2. Coloque isso ANTES de todas as suas rotas!
app.use(cors());

app.use(express.json());
// ... suas rotas (app.use("/", router), etc)
