import { router, mergeRouters } from '../config/trpc';
import { authRoutes } from '@/routes/authRoutes';
import { accountRoutes } from '@/routes/accountRoutes';
import { categoryRoutes } from '@/routes/categoryRoutes';
import { targetRoutes } from '@/routes/targetRoutes';
import { transactionRoutes } from '@/routes/transactionRoutes';

export const baseAppRoutes = router({
  accounts: accountRoutes,
  categories: categoryRoutes,
  targets: targetRoutes,
  transactions: transactionRoutes,
});

export const appRouter = mergeRouters(baseAppRoutes, authRoutes);
export type AppRouter = typeof appRouter;
