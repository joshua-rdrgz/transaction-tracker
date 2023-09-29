import { QueryClient } from '@tanstack/react-query';
import { trpcVanillaClient } from '@/config/trpc';
import { LoaderFunction } from 'react-router-dom';

const query = {
  queryKey: [['getCurrentUser'], { type: 'query' }],
  queryFn: async () => await trpcVanillaClient.getCurrentUser.query(),
};

type ReturnTypeQueryFn = ReturnType<typeof query.queryFn>;

export const currentUserLoader = (
  queryClient: QueryClient
): LoaderFunction<ReturnTypeQueryFn> => async () => {
  return (
    queryClient.getQueryData<ReturnTypeQueryFn>(query.queryKey) ??
    (await queryClient.fetchQuery<ReturnTypeQueryFn>(query))
  );
};
