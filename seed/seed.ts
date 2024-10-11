import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const hashedAdminPassword = await bcrypt.hash('admin', 10);
  const hashedUserPassword = await bcrypt.hash('user', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password: hashedAdminPassword,
      first_name: 'Admin',
      last_name: 'User',
      role: Role.ADMIN,
      status: 'UNBLOCKED',
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      email: 'user@user.com',
      password: hashedUserPassword,
      first_name: 'Regular',
      last_name: 'User',
      role: Role.USER,
      status: 'UNBLOCKED',
    },
  });

  console.log({ adminUser, regularUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
