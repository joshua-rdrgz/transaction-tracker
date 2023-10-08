import { trpc } from '@/config/trpc';

export const useTransaction = (transactionId: string) => {
  const {
    isLoading: isLoadingTransaction,
    data: transaction,
  } = trpc.transactions.getTransaction.useQuery(transactionId);

  return {
    isLoadingTransaction,
    transaction,
  };
};
