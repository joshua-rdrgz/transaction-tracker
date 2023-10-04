import { useLoaderData } from 'react-router-dom';
import { trpc } from '@/config/trpc';
import { AccountsPageLoader } from '@/pages/loaders/accountsPageLoader';
import { IHookOptions } from '@/lib/types';

export const useAccounts = (
  options: IHookOptions = {
    useReactRouterLoader: true,
  }
) => {
  const initialData = useLoaderData() as AccountsPageLoader;

  const {
    isLoading: isGettingAccounts,
    data,
  } = trpc.accounts.readAccounts.useQuery(undefined, {
    // @ts-ignore
    initialData: options.useReactRouterLoader ? initialData : null,
  });

  return {
    isGettingAccounts,
    accounts: data?.data?.accounts,
  };
};
