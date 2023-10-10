import { QueryClient } from '@tanstack/react-query';
import { trpcVanillaClient } from '@/config/trpc';
import { LoaderFunction } from 'react-router-dom';

const query = {
  queryKey: [['getCurrentUser'], { type: 'query' }],
  queryFn: async () => await trpcVanillaClient.getCurrentUser.query(),
};

export type CurrentUserLoader = ReturnType<typeof query.queryFn>;

export const currentUserLoader = (
  queryClient: QueryClient
): LoaderFunction<CurrentUserLoader> => async () => {
  return (
    queryClient.getQueryData<CurrentUserLoader>(query.queryKey) ??
    (await queryClient.fetchQuery<CurrentUserLoader>(query))
  );
};
