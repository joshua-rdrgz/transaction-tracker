import { PrismaClient } from '@prisma/client';
import PrismaUser from '@/models/userModel';

declare global {
  var prisma: PrismaClient | undefined;
  var prismaUser: PrismaUser | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

export const prismaUser = globalThis.prismaUser || new PrismaUser(prisma.user);

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
if (process.env.NODE_ENV !== 'production') globalThis.prismaUser = prismaUser;

export default prisma;
