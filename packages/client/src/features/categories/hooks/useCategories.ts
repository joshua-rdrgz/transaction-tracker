import { trpc } from '@/config/trpc';
import { z } from 'zod';
import sharedZodSchemas from 'shared-zod-schemas';

type CategoryFilters = z.infer<
  typeof sharedZodSchemas.categoryRouteSchemas.getCategories
>;

export type ICategoriesInTransactions = {
  categoryId: string;
  category: {
    name: string;
  };
}[];

export type ICategories = {
  name: string;
  id: string;
  userId: string;
  bucketId: string;
}[];

export const useCategories = (filters: CategoryFilters = {}) => {
  const {
    isLoading: isLoadingCategories,
    data: categories,
  } = trpc.categories.getCategories.useQuery(filters);

  return {
    isLoadingCategories,
    categories,
  };
};
