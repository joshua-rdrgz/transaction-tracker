import { useLoaderData } from 'react-router-dom';
import { trpc } from '@/config/trpc';
import { accountsPageLoader } from '@/pages/loaders/accountsPageLoader';
import { ReturnTypeLoader } from '@/lib/utils';

interface IUseAccountOptions {
  useReactRouterLoader: boolean;
}

export const useAccounts = (
  options: IUseAccountOptions = {
    useReactRouterLoader: true,
  }
) => {
  const initialData = useLoaderData() as ReturnTypeLoader<
    typeof accountsPageLoader
  >;

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
