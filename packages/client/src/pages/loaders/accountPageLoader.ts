import { LoaderFunction } from 'react-router-dom';
import { startOfMonth } from 'date-fns';
import { QueryClient } from '@tanstack/react-query';
import { trpcVanillaClient } from '@/config/trpc';
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
    { input: { accountId }, type: 'query' },
  ],
  queryFn: async () =>
    await trpcVanillaClient.accounts.getAccountBalance.query({ accountId }),
});

const readAcctBalBegMonthQuery = (accountId: string) => {
  const toDate = new Date(startOfMonth(Date.now()));

  return {
    queryKey: [
      ['accounts', 'getAccountBalance'],
      {
        input: { accountId, toDate },
        type: 'query',
      },
    ],
    queryFn: async () =>
      await trpcVanillaClient.accounts.getAccountBalance.query({
        accountId,
        toDate,
      }),
  };
};

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
  const acctBalBegOfMonth = readAcctBalBegMonthQuery(
    params.accountId as string
  );

  return await Promise.all([
    queryClient.ensureQueryData(accountQuery),
    queryClient.ensureQueryData(accountBalanceQuery),
    queryClient.ensureQueryData(acctBalBegOfMonth),
  ]);
};
