import { trpc } from '@/config/trpc';

export const useCreateTransaction = () => {
  const utils = trpc.useContext();
  const { isLoading, mutate } = trpc.transactions.createTransaction.useMutation(
    {
      onSuccess() {
        utils.accounts.getAccountBalance.invalidate();
        utils.transactions.invalidate();
      },
    }
  );

  return {
    isCreatingTransaction: isLoading,
    createTransaction: mutate,
  };
};
