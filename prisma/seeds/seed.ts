import { prisma } from "../../src/shared/infraestructure/prisma";

async function seed() {
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      {
        email: "nacho@hotmail.com",
        name: "Nacho",
      },
      {
        email: "maria@hotmail.com",
        name: "Maria",
      },
      {
        email: "hugo@hotmail.com",
        name: "Hugo",
      },
    ],
  });
}

seed();
