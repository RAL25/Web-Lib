import { spawnSync } from "node:child_process";

const expected = {
  DATABASE_HOST: "127.0.0.1",
  DATABASE_PORT: "3308",
  DATABASE_NAME: "web_lib_test_db",
  DATABASE_USER: "web_lib_test",
};

for (const [key, value] of Object.entries(expected)) {
  if (process.env[key] !== value) {
    throw new Error(
      `Configuração insegura: ${key} não corresponde ao ambiente de testes.`,
    );
  }
}

const url = new URL(process.env.DATABASE_URL);

if (
  url.protocol !== "mysql:" ||
  url.hostname !== "127.0.0.1" ||
  url.port !== "3308" ||
  url.pathname !== "/web_lib_test_db" ||
  decodeURIComponent(url.username) !== "web_lib_test"
) {
  throw new Error("DATABASE_URL não corresponde ao banco de testes.");
}

console.log("Ambiente de testes validado.");
console.log("Aplicando migrations no banco web_lib_test_db...");

const result = spawnSync(
  process.execPath,
  ["./node_modules/prisma/build/index.js", "migrate", "deploy"],
  {
    stdio: "inherit",
    env: process.env,
  },
);

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
