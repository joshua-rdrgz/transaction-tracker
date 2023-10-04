import { QueryClient } from '@tanstack/react-query';
import { trpcVanillaClient } from '@/config/trpc';
import { LoaderFunction } from 'react-router-dom';
import { QueryFnTypecast } from '@/lib/types';

// ****
// QUERIES

export type ReadAccountQueryFn = ReturnType<typeof readAccountQuery>['queryFn'];

const readAccountQuery = (accountId: string) => ({
  queryKey: [['accounts', 'readAccounts'], { input: accountId, type: 'query' }],
  queryFn: async () =>
    await trpcVanillaClient.accounts.readAccount.query(accountId),
});

export type ReadAccountBalanceQueryFn = ReturnType<
  typeof readAccountBalanceQuery
>['queryFn'];

const readAccountBalanceQuery = (accountId: string) => ({
  queryKey: [
    ['accounts', 'getAccountBalance'],
    { input: accountId, type: 'query' },
  ],
  queryFn: async () =>
    await trpcVanillaClient.accounts.getAccountBalance.query(accountId),
});

// ****
// PAGE LOADER

export type AccountPageLoader = QueryFnTypecast<
  [ReadAccountQueryFn, ReadAccountBalanceQueryFn]
>;

export const accountPageLoader = (
  queryClient: QueryClient
): LoaderFunction<[ReadAccountQueryFn, ReadAccountBalanceQueryFn]> => async ({
  params,
}) => {
  const accountQuery = readAccountQuery(params.accountId as string);
  const accountBalanceQuery = readAccountBalanceQuery(
    params.accountId as string
  );

  return await Promise.all([
    queryClient.ensureQueryData(accountQuery),
    queryClient.ensureQueryData(accountBalanceQuery),
  ]);
};
