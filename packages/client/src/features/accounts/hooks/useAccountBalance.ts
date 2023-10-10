import sharedZodSchemas from 'shared-zod-schemas';
import { z } from 'zod';
import { trpc } from '@/config/trpc';

type AccountBalanceOptions = z.infer<
  typeof sharedZodSchemas.accountRouteSchemas.getAccountBalance
>;

export const useAccountBalance = (opts: AccountBalanceOptions) => {
  const {
    isLoading: isCalculatingBalance,
    data: accountBalance,
  } = trpc.accounts.getAccountBalance.useQuery(opts);

  return {
    isCalculatingBalance,
    accountBalance,
  };
};
