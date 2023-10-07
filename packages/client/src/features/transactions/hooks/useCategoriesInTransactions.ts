import { trpc } from '@/config/trpc';
import sharedZodSchemas from 'shared-zod-schemas';
import { z } from 'zod';

type TransactionIds = z.infer<
  typeof sharedZodSchemas.transactionRouteSchemas.getCategoriesFromTransactions
>;

export type CategoriesInTransactions = ReturnType<
  typeof useCategoriesInTransactions
>['categories'];

export const useCategoriesInTransactions = (transactionIds: TransactionIds) => {
  const {
    isLoading: isLoadingCategories,
    data: categories,
  } = trpc.transactions.getCategoriesFromTransactions.useQuery(transactionIds);

  return {
    isLoadingCategories,
    categories,
  };
};
