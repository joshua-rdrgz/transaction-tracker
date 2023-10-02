import { trpc } from '@/config/trpc';

export const useCategory = (categoryId: string) => {
  const { data: category } = trpc.categories.getCategory.useQuery(categoryId);
  return category;
};
