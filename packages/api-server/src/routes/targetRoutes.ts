import { router } from '@/config/trpc';
import targetController from '@/controllers/targetController';

export const targetRoutes = router({ ...targetController });
