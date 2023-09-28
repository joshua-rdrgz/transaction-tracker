import { QueryClient } from '@tanstack/react-query';
import { trpcVanillaClient } from '@/config/trpc';

const query = {
  queryKey: [['accounts', 'readAccounts'], { type: 'query' }],
  queryFn: async () => await trpcVanillaClient.accounts.readAccounts.query(),
};

export const readAccountsLoader = (queryClient: QueryClient) => async () => {
  return (
    queryClient.getQueryData<ReturnType<typeof query.queryFn>>(
      query.queryKey
    ) ?? (await queryClient.fetchQuery<ReturnType<typeof query.queryFn>>(query))
  );
};
