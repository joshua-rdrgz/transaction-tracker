import { useLoaderData } from 'react-router-dom';
import { trpc } from '@/config/trpc';
import { CurrentUserLoader } from '@/pages/loaders/currentUserLoader';

export const useUser = () => {
  const initialData = useLoaderData() as CurrentUserLoader;

  const {
    isLoading,
    data: {
      data: { user },
    },
  } = trpc.getCurrentUser.useQuery(undefined, {
    // @ts-ignore (initialData will never be null)
    initialData,
  });

  return {
    isLoadingUser: isLoading,
    user,
    isAuthenticated: !!user,
  };
};
