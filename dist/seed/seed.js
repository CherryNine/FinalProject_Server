"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
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
            role: client_1.Role.ADMIN,
            status: 'UNBLOCKED',
        },
    });
    const regularUser = await prisma.user.create({
        data: {
            email: 'user@user.com',
            password: hashedUserPassword,
            first_name: 'Regular',
            last_name: 'User',
            role: client_1.Role.USER,
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
//# sourceMappingURL=seed.js.map