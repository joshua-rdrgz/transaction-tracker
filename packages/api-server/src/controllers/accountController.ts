import prisma, { prismaAccount } from '@/config/prisma';
import { TRPCError } from '@trpc/server';
import zodSchemas from 'shared-zod-schemas';

import { accountErrors } from '@/errorMessages';
import { authProcedure } from '@/procedures/authProcedure';

const createAccount = authProcedure
  .input(zodSchemas.accountRouteSchemas.createAccount)
  .mutation(async (opts) => {
    const { ctx, input } = opts;
    const account = await prisma.account.create({
      data: {
        userId: ctx.user.id,
        ...input,
      },
    });

    return {
      status: 'success',
      data: { account },
    };
  });

const readAccounts = authProcedure.query(async ({ ctx }) => {
  const accounts = await prisma.account.findMany({
    where: {
      userId: ctx.user.id,
    },
  });

  return {
    status: 'success',
    data: { accounts },
  };
});

const readAccount = authProcedure
  .input(zodSchemas.accountRouteSchemas.readAccount)
  .query(async ({ input: accountId, ctx }) => {
    return prismaAccount.readAccount(accountId, ctx.user.id);
  });

const updateAccount = authProcedure
  .input(zodSchemas.accountRouteSchemas.updateAccount)
  .mutation(async (opts) => {
    const {
      ctx,
      input: { accountId, data },
    } = opts;
    const account = await prisma.account.update({
      where: {
        id: accountId,
        userId: ctx.user.id,
      },
      data,
    });

    if (!account)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: accountErrors.noAccountOrNoAccess,
      });

    return {
      status: 'success',
      data: { account },
    };
  });

const deleteAccount = authProcedure
  .input(zodSchemas.accountRouteSchemas.deleteAccount)
  .mutation(async (opts) => {
    const { ctx, input: accountId } = opts;
    const account = await prisma.account.delete({
      where: {
        id: accountId,
        userId: ctx.user.id,
      },
    });

    if (!account)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: accountErrors.noAccountOrNoAccess,
      });

    return {
      status: 'success',
      data: null,
    };
  });

const getAccountBalance = authProcedure
  .input(zodSchemas.accountRouteSchemas.getAccountBalance)
  .query(async ({ input, ctx }) => {
    const accountBalance = await prismaAccount.getAccountBalance(
      input.accountId,
      ctx.user.id,
      input.fromDate,
      input.toDate
    );

    return accountBalance;
  });

export default {
  createAccount,
  readAccounts,
  readAccount,
  updateAccount,
  deleteAccount,
  getAccountBalance,
};
