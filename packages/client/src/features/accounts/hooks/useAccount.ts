import { trpc } from '@/config/trpc';
import { ReturnTypeLoader } from '@/lib/utils';
import { accountPageLoader } from '@/pages/loaders/accountPageLoader';
import { useLoaderData } from 'react-router-dom';

export const useAccount = (accountId: string) => {
  const initialData = useLoaderData() as ReturnTypeLoader<
    typeof accountPageLoader
  >;

  const {
    data: {
      data: { account },
    },
  } = trpc.accounts.readAccount.useQuery(accountId, {
    // @ts-ignore (initialData will never be null)
    initialData,
  });

  return { account };
};
