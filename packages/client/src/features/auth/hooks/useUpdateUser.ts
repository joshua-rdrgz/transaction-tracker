import { trpc } from '@/config/trpc';
import { toast } from 'react-hot-toast';

export const useUpdateUser = () => {
  const utils = trpc.useContext();

  const {
    isLoading: isUpdatingUser,
    mutate: updateUser,
  } = trpc.updateCurrentUser.useMutation({
    onSuccess: () => {
      utils.getCurrentUser.invalidate();
      toast.success('Successfully updated user.');
    },
  });

  return {
    isUpdatingUser,
    updateUser,
  };
};
