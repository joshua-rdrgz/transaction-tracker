import prisma from '@/config/prisma';
import sharedZodSchemas from 'shared-zod-schemas';
import { authProcedure } from '@/procedures/authProcedure';

const getCategory = authProcedure
  .input(sharedZodSchemas.categoryRouteSchemas.getCategory)
  .query(async ({ input, ctx }) => {
    const category = await prisma.category.findUnique({
      where: {
        userId: ctx.user.id,
        id: input,
      },
    });

    return category;
  });

const getCategories = authProcedure
  .input(sharedZodSchemas.categoryRouteSchemas.getCategories)
  .query(async ({ input, ctx }) => {
    if (input?.transactionIds) {
      const categories = await prisma.transaction.findMany({
        where: {
          id: {
            in: input.transactionIds,
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
    }
    const categories = await prisma.category.findMany({
      where: {
        userId: ctx.user.id,
        bucketId: input?.categoryBucket,
      },
    });

    return categories;
  });

export default {
  getCategory,
  getCategories,
};
