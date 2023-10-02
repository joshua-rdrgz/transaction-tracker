import { trpc } from '@/config/trpc';
import { useLoaderData } from 'react-router-dom';
import sharedZodSchemas from 'shared-zod-schemas';
import { z } from 'zod';

type TransactionFilters = z.infer<
  typeof sharedZodSchemas.transactionRouteSchemas.getTransactions
>;

export const useTransactions = (filters: TransactionFilters = {}) => {
  const {
    isLoading: isLoadingTransactions,
    data: transactions,
  } = trpc.transactions.getTransactions.useQuery(filters);

  return {
    isLoadingTransactions,
    transactions,
  };
};
