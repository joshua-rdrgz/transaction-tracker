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
type UpdateTransactionInput = z.infer<
  typeof sharedZodSchemas.transactionRouteSchemas.updateTransaction
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
    const associatedAccount = await this.findAssociatedAccount(
      input.account,
      ctx.user.id
    );

    const associatedCategory = await this.findAssociatedCategory(
      input.category,
      ctx.user.id
    );

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

  async updateTransaction(
    input: UpdateTransactionInput,
    ctx: Context
  ): Promise<Transaction> {
    const associatedAccount = await this.findAssociatedAccount(
      input.data.account,
      ctx.user.id
    );

    const associatedCategory = await this.findAssociatedCategory(
      input.data.category,
      ctx.user.id
    );

    const updateData = {
      ...input.data,
      category: undefined,
      account: undefined,
    };

    const transaction = await this.prismaTransaction.update({
      where: {
        userId: ctx.user.id,
        id: input.transactionId,
      },
      data: {
        ...updateData,
        accountId: associatedAccount.id,
        categoryId: associatedCategory.id,
      },
    });

    return transaction;
  }

  // ****
  // UTILITY FUNCTIONS

  private async findAssociatedAccount(accountId: string, userId: string) {
    const associatedAccount = await prisma.account.findUnique({
      where: {
        id: accountId,
        userId: userId,
      },
    });

    if (!associatedAccount)
      throw new TRPCError({
        message: transactionErrors.noAccountFound,
        code: 'BAD_REQUEST',
      });

    return associatedAccount;
  }

  private async findAssociatedCategory(categoryId: string, userId: string) {
    const associatedCategory = await prisma.category.findUnique({
      where: {
        id: categoryId,
        userId: userId,
      },
    });

    if (!associatedCategory)
      throw new TRPCError({
        message: transactionErrors.noCategoryFound,
        code: 'BAD_REQUEST',
      });

    return associatedCategory;
  }
}

export default PrismaTransaction;
