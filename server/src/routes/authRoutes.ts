import { router } from '@/config/trpc';
import authController from '@/controllers/authController';

export const authRoutes = router({ ...authController });
