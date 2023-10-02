import { PrismaClient } from '@prisma/client';
import PrismaUser from '@/models/userModel';
import PrismaTransaction from '@/models/transactionModel';

declare global {
  var prisma: PrismaClient | undefined;
  var prismaUser: PrismaUser | undefined;
  var prismaTransaction: PrismaTransaction | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

export const prismaUser = globalThis.prismaUser || new PrismaUser(prisma.user);
export const prismaTransaction =
  globalThis.prismaTransaction || new PrismaTransaction(prisma.transaction);

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
if (process.env.NODE_ENV !== 'production') globalThis.prismaUser = prismaUser;
if (process.env.NODE_ENV !== 'production')
  globalThis.prismaTransaction = prismaTransaction;

export default prisma;
