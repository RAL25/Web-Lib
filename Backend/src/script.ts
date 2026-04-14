import { prisma } from "./config/prisma-configDB";

async function main() {
  const user = await prisma.cliente.create({
    data: {
      id: 2,
      cpf: "32165487609",
      telefone: "99999999999",
    },
  });
  console.log("Cliente criado:", user);

  // Fetch all users
  const allUsers = await prisma.cliente.findMany();
  // const allUsers = await prisma.usuario.findMany({});
  //   const allUsers = await prisma.$queryRaw`SELECT * FROM Usuario`;
  console.log("Todos os clientes:", JSON.stringify(allUsers, null, 2));
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

// npx tsx src/script.ts
