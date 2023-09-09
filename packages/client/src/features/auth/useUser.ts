import { trpc } from '@/config/trpc';

export const useUser = () => {
  const { isLoading, data: response, error } = trpc.getUser.useQuery();

  return {
    isLoadingUser: isLoading,
    user: response?.data?.user,
    isAuthenticated: !!response?.data?.user,
    error,
  };
};
