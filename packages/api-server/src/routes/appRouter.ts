import { router, mergeRouters } from '../config/trpc';
import { authRoutes } from '@/routes/authRoutes';
import { accountRoutes } from '@/routes/accountRoutes';
import { transactionRoutes } from '@/routes/transactionRoutes';

export const baseAppRoutes = router({
  accounts: accountRoutes,
  transactions: transactionRoutes,
});

export const appRouter = mergeRouters(baseAppRoutes, authRoutes);
export type AppRouter = typeof appRouter;
