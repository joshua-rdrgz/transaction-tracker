import { PrismaClient } from '@prisma/client';
import PrismaUser from '@/models/userModel';
import PrismaTransaction from '@/models/transactionModel';
import PrismaAccount from '@/models/accountModel';

declare global {
  var prisma: PrismaClient | undefined;
  var prismaUser: PrismaUser | undefined;
  var prismaTransaction: PrismaTransaction | undefined;
  var prismaAccount: PrismaAccount | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

export const prismaUser = globalThis.prismaUser || new PrismaUser(prisma.user);
export const prismaTransaction =
  globalThis.prismaTransaction || new PrismaTransaction(prisma.transaction);
export const prismaAccount =
  globalThis.prismaAccount || new PrismaAccount(prisma.account);

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
if (process.env.NODE_ENV !== 'production') globalThis.prismaUser = prismaUser;
if (process.env.NODE_ENV !== 'production')
  globalThis.prismaTransaction = prismaTransaction;
if (process.env.NODE_ENV !== 'production')
  globalThis.prismaAccount = prismaAccount;

export default prisma;
