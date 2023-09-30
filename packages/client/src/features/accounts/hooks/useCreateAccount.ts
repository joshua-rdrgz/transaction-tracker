import { trpc } from '@/config/trpc';

export const useCreateAccount = () => {
  const utils = trpc.useContext();
  const { isLoading, mutate } = trpc.accounts.createAccount.useMutation({
    onSuccess() {
      console.log('hooray!  success!');
      utils.accounts.readAccounts.invalidate();
    },
  });

  return {
    isCreatingAccount: isLoading,
    createAccount: mutate,
  };
};
