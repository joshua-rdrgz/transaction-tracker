import { useLoaderData } from 'react-router-dom';
import { trpc } from '@/config/trpc';
import { readAccountsLoader } from '@/features/accounts/fetchers/readAccounts';
import { ReturnTypeLoader } from '@/lib/utils';

export const useAccounts = () => {
  const initialData = useLoaderData() as ReturnTypeLoader<
    typeof readAccountsLoader
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
