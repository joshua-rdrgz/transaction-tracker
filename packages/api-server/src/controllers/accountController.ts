import { TRPCError } from '@trpc/server';
import zodSchemas from 'shared-zod-schemas';

import { accountErrors } from '@/errorMessages';
import { authProcedure } from '@/procedures/authProcedure';
import User from '@/models/userModel';
import Account, { AccountDoc } from '@/models/accountModel';

const createAccount = authProcedure
  .input(zodSchemas.accountRouteSchemas.createAccount)
  .mutation(async (opts) => {
    const { ctx, input } = opts;
    const account = await Account.create({ user: ctx.user.id, ...input });

    return {
      status: 'success',
      userId: ctx.user.id,
      data: {
        account,
      },
    };
  });

const readAccounts = authProcedure.query(async ({ ctx }) => {
  const accounts = await Account.find({ user: ctx.user.id });

  return {
    status: 'success',
    userId: ctx.user.id,
    data: {
      accounts,
    },
  };
});

const readAccount = authProcedure
  .input(zodSchemas.accountRouteSchemas.readAccount)
  .query(async (opts) => {
    const { ctx, input: accountId } = opts;
    const account = await Account.findById(accountId);

    if (!account)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: accountErrors.noAccountFound,
      });

    if (account.user.toString() !== ctx.user.id)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: accountErrors.notAllowedAccess,
      });

    return {
      status: 'success',
      userId: ctx.user.id,
      data: {
        account,
      },
    };
  });

const updateAccount = authProcedure
  .input(zodSchemas.accountRouteSchemas.updateAccount)
  .mutation(async (opts) => {
    const {
      ctx,
      input: { accountId, data },
    } = opts;
    const accountProvided = await Account.findById(accountId);

    if (!accountProvided)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: accountErrors.noAccountFound,
      });

    if (accountProvided.user.toString() !== ctx.user.id)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: accountErrors.notAllowedAccess,
      });

    const account = await Account.findByIdAndUpdate(accountProvided._id, data, {
      new: true,
      runValidators: true,
    });

    return {
      status: 'success',
      userId: ctx.user.id,
      data: { account },
    };
  });

const deleteAccount = authProcedure
  .input(zodSchemas.accountRouteSchemas.deleteAccount)
  .mutation(async (opts) => {
    const { ctx, input } = opts;
    const account = await Account.findById(input);

    if (!account)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: accountErrors.noAccountFound,
      });

    if (account.user.toString() !== ctx.user.id)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: accountErrors.notAllowedAccess,
      });

    await Account.findByIdAndDelete(account._id);

    return {
      status: 'success',
      userId: ctx.user.id,
      data: {
        account: null,
      },
    };
  });

export default {
  createAccount,
  readAccounts,
  readAccount,
  updateAccount,
  deleteAccount,
};
