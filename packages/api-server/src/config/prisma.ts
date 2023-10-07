import { PrismaClient } from '@prisma/client';
import PrismaUser from '@/models/userModel';
import PrismaTransaction from '@/models/transactionModel';
import PrismaAccount from '@/models/accountModel';
import PrismaTarget from '@/models/targetModel';

declare global {
  var prisma: PrismaClient | undefined;
  var prismaUser: PrismaUser | undefined;
  var prismaTransaction: PrismaTransaction | undefined;
  var prismaAccount: PrismaAccount | undefined;
  var prismaTarget: PrismaTarget | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

export const prismaUser = globalThis.prismaUser || new PrismaUser(prisma.user);
export const prismaTransaction =
  globalThis.prismaTransaction || new PrismaTransaction(prisma.transaction);
export const prismaAccount =
  globalThis.prismaAccount || new PrismaAccount(prisma.account);
export const prismaTarget =
  globalThis.prismaTarget || new PrismaTarget(prisma.target);

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
  globalThis.prismaUser = prismaUser;
  globalThis.prismaTransaction = prismaTransaction;
  globalThis.prismaAccount = prismaAccount;
  globalThis.prismaTarget = prismaTarget;
}

export default prisma;
