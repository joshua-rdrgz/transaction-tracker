import { QueryClient } from '@tanstack/react-query';
import { trpcVanillaClient } from '@/config/trpc';
import { LoaderFunction } from 'react-router-dom';

const readAccountQuery = (accountId: string) => ({
  queryKey: [['accounts', 'readAccounts'], { input: accountId, type: 'query' }],
  queryFn: async () =>
    await trpcVanillaClient.accounts.readAccount.query(accountId),
});

type ReturnTypeQueryFn = ReturnType<typeof readAccountQuery>['queryFn'];

export const accountPageLoader = (
  queryClient: QueryClient
): LoaderFunction<ReturnTypeQueryFn> => async ({ params }) => {
  const accountQuery = readAccountQuery(params.accountId as string);
  return queryClient.ensureQueryData(accountQuery);
};
