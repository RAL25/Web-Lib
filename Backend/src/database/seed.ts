import "dotenv/config";
import { livros } from "../../BD/seeds-livros";
import { usuarios } from "../../BD/seeds-usuarios";
import { clientes } from "../../BD/seeds-clientes";
import { emprestimo } from "../../BD/seeds-emprestimo";
import { prisma } from "../config/prisma-configDB";

const connectionString = `${process.env.DATABASE_URL}`;

async function main() {
  // // populando a tabela livros
  // await prisma.livro.createMany({
  //   data: livros,
  // });

  // // populando a tabela usuários
  // await prisma.usuario.createMany({
  //   data: usuarios,
  // });

  // // populando a tabela clientes
  // await prisma.cliente.createMany({
  //   data: clientes,
  // });

  // populando a tabela emprestimo
  await prisma.emprestimo.create({
    data: emprestimo,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// Para rodar as seeds: npx prisma db seed
