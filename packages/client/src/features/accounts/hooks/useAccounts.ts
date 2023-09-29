import { useLoaderData } from 'react-router-dom';
import { trpc } from '@/config/trpc';
import { accountsPageLoader } from '@/features/accounts/fetchers/accountsPage';
import { ReturnTypeLoader } from '@/lib/utils';

export const useAccounts = () => {
  const initialData = useLoaderData() as ReturnTypeLoader<
    typeof accountsPageLoader
  >;

  const {
    data: {
      data: { accounts },
    },
  } = trpc.accounts.readAccounts.useQuery(undefined, {
    // @ts-ignore (initialData will never be null)
    initialData,
  });

  return accounts;
};
