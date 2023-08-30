import { z } from 'zod';

import { router, publicProcedure, mergeRouters } from '@/config/trpc';
import { authProcedure } from '@/procedures/authProcedure';
import { authRoutes } from '@/routes/authRoutes';
import { accountRoutes } from '@/routes/accountRoutes';
import User from '@/models/userModel';

export const baseAppRoutes = router({
  testing: publicProcedure.query(() => {
    return 'Testing Testing 1-2-3';
  }),
  testingLog: publicProcedure.input(z.string()).query((opts) => {
    return `Client says: ${opts.input}`;
  }),
  getUser: authProcedure.query(async (opts) => {
    const { ctx } = opts;
    const user = await User.findById(ctx.user.id);
    return {
      status: 'success',
      data: { user },
    };
  }),
  accounts: accountRoutes,
});

export const appRouter = mergeRouters(baseAppRoutes, authRoutes);
export type AppRouter = typeof appRouter;
