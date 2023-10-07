import { trpc } from '@/config/trpc';

export const useTargets = (categoryId?: string) => {
  const {
    isLoading: isLoadingTargets,
    data: targets,
  } = trpc.targets.getTargets.useQuery(categoryId);

  return {
    isLoadingTargets,
    targets,
  };
};
