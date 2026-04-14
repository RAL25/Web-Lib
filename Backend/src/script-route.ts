import express from "express";
import router from "./routes/router.js";
const app = express();

app.use(express.static("build"));
app.use(express.json());

app.use("/api/lib", router);

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`),
);

// npx tsx src/script-route.ts
