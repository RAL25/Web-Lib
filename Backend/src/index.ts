import app from "./app.js";

const PORT = 3001;

// No index é onde o servidor é inicializado
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

// npx tsx src/script-route.ts
// npx tsx watch src/script-route.ts  (atualiza sem precisar parar de rodar o server)
// npm run debug  (para entrar em modo debug)
