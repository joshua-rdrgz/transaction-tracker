import { trpc } from '@/config/trpc';

export const useUser = () => {
  const { isLoading, data: response } = trpc.getCurrentUser.useQuery();

  return {
    isLoadingUser: isLoading,
    user: response?.data?.user,
    isAuthenticated: !!response?.data?.user,
  };
};
