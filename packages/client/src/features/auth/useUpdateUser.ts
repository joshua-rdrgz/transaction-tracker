import { trpc } from '@/config/trpc';
import { toast } from 'react-hot-toast';

export const useUpdateUser = () => {
  const { isLoading, mutate } = trpc.updateCurrentUser.useMutation({
    onSuccess: () => {
      toast.success('Successfully updated user.');
    },
  });

  return {
    isUpdatingUser: isLoading,
    updateUser: mutate,
  };
};
