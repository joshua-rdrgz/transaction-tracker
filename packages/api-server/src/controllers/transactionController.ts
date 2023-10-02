import sharedZodSchemas from 'shared-zod-schemas';
import prisma, { prismaTransaction } from '@/config/prisma';
import { authProcedure } from '@/procedures/authProcedure';

const createTransaction = authProcedure
  .input(sharedZodSchemas.transactionRouteSchemas.createTransaction)
  .mutation(async ({ input, ctx }) => {
    const transaction = await prismaTransaction.createTransaction(input, ctx);

    console.log('created transaction: ', transaction);

    return transaction;
  });

const getTransactions = authProcedure
  .input(sharedZodSchemas.transactionRouteSchemas.getTransactions)
  .query(async ({ ctx }) => {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: ctx.user.id,
      },
    });

    return transactions;
  });

export default {
  createTransaction,
  getTransactions,
};
