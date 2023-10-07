import { prismaTarget } from '@/config/prisma';
import { authProcedure } from '@/procedures/authProcedure';
import sharedZodSchemas from 'shared-zod-schemas';

const getTargets = authProcedure
  .input(sharedZodSchemas.targetRouteSchemas.getTargets)
  .query(async ({ input, ctx }) => {
    return await prismaTarget.getTargets(input, ctx);
  });

export default {
  getTargets,
};
