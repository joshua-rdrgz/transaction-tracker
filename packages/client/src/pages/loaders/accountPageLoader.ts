import { QueryClient } from '@tanstack/react-query';
import { trpcVanillaClient } from '@/config/trpc';
import { LoaderFunction } from 'react-router-dom';

const getQuery = (accountId: string) => ({
  queryKey: [['accounts', 'readAccounts'], { input: accountId, type: 'query' }],
  queryFn: async () =>
    await trpcVanillaClient.accounts.readAccount.query(accountId),
});

type ReturnTypeQueryFn = ReturnType<typeof getQuery>['queryFn'];

export const accountPageLoader = (
  queryClient: QueryClient
): LoaderFunction<ReturnTypeQueryFn> => async ({ params }) => {
  const query = getQuery(params.accountId as string);

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
