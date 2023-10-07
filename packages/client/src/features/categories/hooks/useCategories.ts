import { trpc } from '@/config/trpc';

export const useCategories = () => {
  const {
    isLoading: isLoadingCategories,
    data: categories,
  } = trpc.categories.getCategories.useQuery();

  return {
    isLoadingCategories,
    categories,
  };
};
