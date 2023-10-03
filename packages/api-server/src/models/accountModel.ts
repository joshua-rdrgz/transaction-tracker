import prisma from '@/config/prisma';
import { accountErrors } from '@/errorMessages';
import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

class PrismaAccount {
  constructor(private readonly prismaAccount: PrismaClient['account']) {}

  // ****
  // ROUTE FUNCTIONS
  async readAccount(accountId: string, userId: string) {
    const account = await this.prismaAccount.findUnique({
      where: {
        id: accountId,
        userId: userId,
      },
    });

    if (!account)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: accountErrors.noAccountOrNoAccess,
      });

    return account;
  }

  async getAccountBalance(accountId: string, userId: string) {
    const { balance: initialBalance } = await this.readAccount(
      accountId,
      userId
    );

    const transactions = await prisma.transaction.findMany({
      where: { userId, accountId },
    });

    const balance = transactions.reduce(
      (acc, transaction) => (acc += transaction.amount),
      Number(initialBalance)
    );

    return balance;
  }
}

export default PrismaAccount;
