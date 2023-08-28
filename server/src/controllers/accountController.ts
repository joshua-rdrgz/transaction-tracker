import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { accountErrors } from '@/errorMessages';
import { authProcedure } from '@/procedures/authProcedure';
import User from '@/models/userModel';
import Account, { AccountDoc } from '@/models/accountModel';

const createAccount = authProcedure
  .input(
    z.object({
      name: z.string(),
      bank: z.string(),
      balance: z.number(),
    })
  )
  .mutation(async (opts) => {
    const { ctx, input } = opts;
    const user = await User.findById(ctx.user.id);
    const account = await Account.create(input);

    if (user) {
      if (user?.accounts) {
        user.accounts.push(account._id);
        await user.save({ validateModifiedOnly: true });
      } else {
        user.accounts = [account._id];
        user.netWorth = undefined;
        await user.save({ validateModifiedOnly: true });
      }
    }

    return {
      status: 'success',
      userId: ctx.user.id,
      data: {
        account,
      },
    };
  });

const readAccounts = authProcedure.query(async ({ ctx }) => {
  const user = await User.findById(ctx.user.id);
  const accounts: AccountDoc[] = [];

  user?.accounts.forEach(async (accountId) => {
    const account = await Account.findById(accountId);
    if (account) accounts.push(account);
  });

  return {
    status: 'success',
    userId: ctx.user.id,
    data: {
      accounts,
    },
  };
});

const readAccount = authProcedure.input(z.string()).query(async (opts) => {
  const { ctx, input: accountId } = opts;
  const user = await User.findById(ctx.user.id);
  const account = await Account.findById(accountId);

  if (!account)
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: accountErrors.noAccountFound,
    });

  if (!user?.accounts.includes(account._id))
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
  .input(
    z.object({
      accountId: z.string(),
      data: z.object({
        name: z.string().optional(),
        bank: z.string().optional(),
        balance: z.number().optional(),
      }),
    })
  )
  .mutation(async (opts) => {
    const {
      ctx,
      input: { accountId, data },
    } = opts;

    const user = await User.findById(ctx.user.id);
    const accountProvided = await Account.findById(accountId);

    if (!accountProvided)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: accountErrors.noAccountFound,
      });

    if (!user?.accounts.includes(accountProvided._id))
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

const deleteAccount = authProcedure.input(z.string()).mutation(async (opts) => {
  const { ctx, input } = opts;

  const user = await User.findById(ctx.user.id);
  const accountProvided = await Account.findById(input);

  if (!accountProvided)
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: accountErrors.noAccountFound,
    });

  if (!user?.accounts.includes(accountProvided._id))
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: accountErrors.notAllowedAccess,
    });

  if (user.accounts.length === 1) {
    console.log('FROM ROUTE: user only has 1 account!');
    user.netWorth = accountProvided.balance;
    await user.save({ validateModifiedOnly: true });
  }

  await Account.findByIdAndDelete(accountProvided._id);
  user.accounts = user.accounts.filter(
    (accountId) => accountId.toString() !== accountProvided._id.toString()
  );
  await user.save({ validateModifiedOnly: true });

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
