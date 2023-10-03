import { trpc } from '@/config/trpc';

export const useAccountBalance = (accountId: string) => {
  const {
    isLoading: isCalculatingBalance,
    data: accountBalance,
  } = trpc.accounts.getAccountBalance.useQuery(accountId);

  return {
    isCalculatingBalance,
    accountBalance,
  };
};
