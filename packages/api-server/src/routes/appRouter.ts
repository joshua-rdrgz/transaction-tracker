import { z } from 'zod';

import { router, publicProcedure, mergeRouters } from '../config/trpc';
import { authProcedure } from '@/procedures/authProcedure';
import { authRoutes } from '@/routes/authRoutes';
import { accountRoutes } from '@/routes/accountRoutes';
import User from '@/models/userModel';

export const baseAppRoutes = router({
  accounts: accountRoutes,
});

export const appRouter = mergeRouters(baseAppRoutes, authRoutes);
export type AppRouter = typeof appRouter;
