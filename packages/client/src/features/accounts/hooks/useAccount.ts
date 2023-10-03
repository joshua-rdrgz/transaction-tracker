import { trpc } from '@/config/trpc';
import { useLoaderData } from 'react-router-dom';

export const useAccount = (accountId: string) => {
  const initialData = useLoaderData();

  const { data: account } = trpc.accounts.readAccount.useQuery(accountId, {
    // @ts-ignore (initialData will never be null)
    initialData,
  });

  return { account };
};
