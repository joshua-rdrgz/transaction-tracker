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

const getCategories = authProcedure.query(async ({ input, ctx }) => {
  const categories = await prisma.category.findMany({
    where: {
      userId: ctx.user.id,
    },
  });

  return categories;
});

export default {
  getCategory,
  getCategories,
};
