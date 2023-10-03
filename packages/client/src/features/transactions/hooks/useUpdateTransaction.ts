import { trpc } from '@/config/trpc';

export const useUpdateTransaction = () => {
  const utils = trpc.useContext();
  const {
    isLoading: isUpdatingTransaction,
    mutate: updateTransaction,
  } = trpc.transactions.updateTransaction.useMutation({
    onSuccess: () => utils.transactions.invalidate(),
  });

  return {
    isUpdatingTransaction,
    updateTransaction,
  };
};
