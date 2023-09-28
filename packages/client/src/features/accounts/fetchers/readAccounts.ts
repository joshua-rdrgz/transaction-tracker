import { QueryClient } from '@tanstack/react-query';
import { trpcVanillaClient } from '@/config/trpc';

const query = {
  queryKey: [['accounts', 'readAccounts'], { type: 'query' }],
  queryFn: async () => await trpcVanillaClient.accounts.readAccounts.query(),
};

type ReturnTypeQueryFn = ReturnType<typeof query.queryFn>;

export const readAccountsLoader = (queryClient: QueryClient) => async () => {
  return (
    queryClient.getQueryData<ReturnTypeQueryFn>(query.queryKey) ??
    (await queryClient.fetchQuery<ReturnTypeQueryFn>(query))
  );
};
