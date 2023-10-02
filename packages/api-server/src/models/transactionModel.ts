import { PrismaClient, Transaction } from '@prisma/client';
import prisma from '@/config/prisma';
import { Context } from '@/config/trpc';

import sharedZodSchemas from 'shared-zod-schemas';
import { z } from 'zod';

import { TRPCError } from '@trpc/server';
import { transactionErrors } from '@/errorMessages';

type CreateTransactionInput = z.infer<
  typeof sharedZodSchemas.transactionRouteSchemas.createTransaction
>;

class PrismaTransaction {
  constructor(
    private readonly prismaTransaction: PrismaClient['transaction']
  ) {}

  // ****
  // ROUTE FUNCTIONS

  async createTransaction(
    input: CreateTransactionInput,
    ctx: Context
  ): Promise<Transaction> {
    const associatedAccount = await prisma.account.findUnique({
      where: {
        id: input.account,
        userId: ctx.user.id,
      },
    });

    if (!associatedAccount)
      throw new TRPCError({
        message: transactionErrors.noAccountFound,
        code: 'BAD_REQUEST',
      });

    const associatedCategory = await prisma.category.findUnique({
      where: {
        id: input.category,
        userId: ctx.user.id,
      },
    });

    if (!associatedCategory)
      throw new TRPCError({
        message: transactionErrors.noCategoryFound,
        code: 'BAD_REQUEST',
      });

    const transaction = await this.prismaTransaction.create({
      data: {
        userId: ctx.user.id,
        accountId: associatedAccount.id,
        categoryId: associatedCategory.id,
        date: input.date,
        contact: input.contact,
        description: input.description,
        amount: input.amount,
      },
    });

    return transaction;
  }
}

export default PrismaTransaction;
