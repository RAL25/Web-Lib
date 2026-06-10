import express from "express";
import cors from "cors"; // 1. Importe o cors
import router from "./routes/router.js";
const app = express();

app.use(cors()); // Para poder usar o front e o back juntos

app.use(express.static("build"));
app.use(express.json());

app.use("/api/lib", router);

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`),
);

// npx tsx src/script-route.ts
// npx tsx watch src/script-route.ts  (atualiza sem precisar parar de rodar o server)

// Adicionar depois:
/*
import express from "express";
import cors from "cors"; // 1. Importe o cors
// ... outros imports

const app = express();

// 2. Coloque isso ANTES de todas as suas rotas!
app.use(cors()); 

app.use(express.json());
// ... suas rotas (app.use("/", router), etc)
*/
