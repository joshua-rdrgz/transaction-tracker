import { trpc } from '@/config/trpc';

export const useDeleteAccount = () => {
  const utils = trpc.useContext();
  const { isLoading, mutate } = trpc.accounts.deleteAccount.useMutation({
    onSuccess() {
      utils.accounts.readAccounts.invalidate();
    },
  });

  return {
    isUpdatingAccount: isLoading,
    deleteAccount: mutate,
  };
};
