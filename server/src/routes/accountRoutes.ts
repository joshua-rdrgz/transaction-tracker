import { router } from '@/config/trpc';
import accountController from '@/controllers/accountController';

export const accountRoutes = router({ ...accountController });
