import { Context } from '@/config/trpc';
import { PrismaClient, Target } from '@prisma/client';
import sharedZodSchemas from 'shared-zod-schemas';
import { z } from 'zod';

type GetTargetsInput = z.infer<
  typeof sharedZodSchemas.targetRouteSchemas.getTargets
>;

class PrismaTarget {
  constructor(private readonly prismaTarget: PrismaClient['target']) {}

  // ****
  // ROUTE FUNCTIONS
  async getTargets(input: GetTargetsInput, ctx: Context) {
    const targets = await this.prismaTarget.findMany({
      where: {
        userId: ctx.user.id,
        categoryId: input,
      },
    });

    return targets;
  }
}

export default PrismaTarget;
