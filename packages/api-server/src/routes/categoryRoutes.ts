import { router } from '@/config/trpc';
import categoryController from '@/controllers/categoryController';

export const categoryRoutes = router({ ...categoryController });
