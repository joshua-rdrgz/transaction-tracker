import sharedZodSchemas from 'shared-zod-schemas';
import prisma, { prismaTransaction } from '@/config/prisma';
import { authProcedure } from '@/procedures/authProcedure';

// ****
// CRUD OPERATIONS

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

const updateTransaction = authProcedure
  .input(sharedZodSchemas.transactionRouteSchemas.updateTransaction)
  .mutation(async ({ input, ctx }) => {
    const transaction = await prismaTransaction.updateTransaction(input, ctx);

    return transaction;
  });

const deleteTransaction = authProcedure
  .input(sharedZodSchemas.transactionRouteSchemas.deleteTransaction)
  .mutation(async ({ input, ctx }) => {
    await prisma.transaction.delete({
      where: {
        userId: ctx.user.id,
        id: input,
      },
    });

    return null;
  });

// ****
// SPECIAL OPERATIONS

const getCategoriesFromTransactions = authProcedure
  .input(sharedZodSchemas.transactionRouteSchemas.getCategoriesFromTransactions)
  .query(async ({ input, ctx }) => {
    const categories = await prisma.transaction.findMany({
      where: {
        userId: ctx.user.id,
        id: {
          in: input,
        },
      },
      select: {
        categoryId: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return categories;
  });

export default {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getCategoriesFromTransactions,
};
