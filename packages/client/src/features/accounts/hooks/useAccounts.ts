import { trpc } from '@/config/trpc';
import { readAccountsLoader } from '@/features/accounts/fetchers/readAccounts';
import { useLoaderData } from 'react-router-dom';

export const useAccounts = () => {
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof readAccountsLoader>>
  >;

  const {
    data: {
      data: { accounts },
    },
  } = trpc.accounts.readAccounts.useQuery(undefined, {
    initialData,
  });

  return accounts;
};
