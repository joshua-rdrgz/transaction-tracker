import { trpc } from '@/config/trpc';
import { toast } from 'react-hot-toast';

export const useDeleteTransaction = () => {
  const utils = trpc.useContext();
  const {
    isLoading: isDeletingTransaction,
    mutate: deleteTransaction,
  } = trpc.transactions.deleteTransaction.useMutation({
    onSuccess: () => {
      toast.success('Transaction successfully deleted.');
      utils.transactions.invalidate();
    },
  });

  return {
    isDeletingTransaction,
    deleteTransaction,
  };
};
