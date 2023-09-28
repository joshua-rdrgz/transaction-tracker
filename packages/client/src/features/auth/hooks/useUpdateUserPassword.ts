import { trpc } from '@/config/trpc';

export const useUpdateUserPassword = () => {
  const {
    isLoading: isUpdatingUserPassword,
    mutate: updateUserPassword,
  } = trpc.updateCurrentUserPassword.useMutation();

  return {
    isUpdatingUserPassword,
    updateUserPassword,
  };
};
