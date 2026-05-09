import "dotenv/config";
import * as seeds from "../../BD/seeds";
import { prisma } from "../config/prisma-configDB";

const connectionString = `${process.env.DATABASE_URL}`;

async function main() {
  // populando a tabela livros
  for (const livro of seeds.livros) {
    await prisma.livro.create({
      data: {
        titulo: livro.titulo,
        autor: livro.autor,
        exemplares: {
          create: Array.from({ length: livro.qtd_exemplar }).map(() => ({})),
        },
      },
    });
  }

  // Populando a tabela exemplares
  // // populando a tabela usuários
  // await prisma.usuario.createMany({
  //   data: usuarios,
  // });
  // // populando a tabela clientes
  // await prisma.cliente.createMany({
  //   data: clientes,
  // });
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
// Para resetar as seeds (e o banco também): npx prisma migrate reset
