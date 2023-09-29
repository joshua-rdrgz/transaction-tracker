import { trpc } from '@/config/trpc';

export const useUpdateAccount = () => {
  const utils = trpc.useContext();
  const { isLoading, mutate } = trpc.accounts.updateAccount.useMutation({
    onSuccess() {
      utils.accounts.readAccounts.invalidate();
    },
  });

  return {
    isUpdatingAccount: isLoading,
    updateAccount: mutate,
  };
};
