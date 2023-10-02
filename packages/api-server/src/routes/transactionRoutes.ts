import { router } from '@/config/trpc';
import transactionController from '@/controllers/transactionController';

export const transactionRoutes = router({ ...transactionController });
