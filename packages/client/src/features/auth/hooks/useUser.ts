import { useLoaderData } from 'react-router-dom';
import { trpc } from '@/config/trpc';
import { currentUserLoader } from '@/features/auth/fetchers/currentUser';
import { ReturnTypeLoader } from '@/lib/utils';

export const useUser = () => {
  const initialData = useLoaderData() as ReturnTypeLoader<
    typeof currentUserLoader
  >;

  const {
    isLoading,
    data: {
      data: { user },
    },
  } = trpc.getCurrentUser.useQuery(undefined, {
    initialData,
  });

  return {
    isLoadingUser: isLoading,
    user,
    isAuthenticated: !!user,
  };
};
