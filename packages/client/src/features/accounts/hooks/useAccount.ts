import { useLoaderData } from 'react-router-dom';
import { trpc } from '@/config/trpc';
import { IHookOptions } from '@/lib/types';
import { AccountPageLoader } from '@/pages/loaders/accountPageLoader';

export type ReturnTypeUseAccount = ReturnType<typeof useAccount>['account'];

export const useAccount = (
  accountId: string,
  options: IHookOptions = {
    useReactRouterLoader: true,
  }
) => {
  const [accountData, accountBalance] = useLoaderData() as AccountPageLoader;

  const { data: account } = trpc.accounts.readAccount.useQuery(accountId, {
    // @ts-ignore
    initialData: options.useReactRouterLoader ? accountData : null,
  });

  return {
    account: {
      ...account,
      balance: accountBalance,
      initialBalance: account.balance,
    },
  };
};
