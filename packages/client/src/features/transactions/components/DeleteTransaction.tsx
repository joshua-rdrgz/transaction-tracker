import { useDeleteTransaction } from '@/features/transactions/hooks/useDeleteTransaction';
import { DialogDeleteContent } from '@/ui/dialog-delete-content';

interface IDeleteTransactionProps {
  onClose(): void;
  transactionId: string;
}

export const DeleteTransaction: React.FC<IDeleteTransactionProps> = ({
  onClose,
  transactionId,
}) => {
  const { deleteTransaction } = useDeleteTransaction();

  return (
    <DialogDeleteContent
      handleDelete={() => {
        deleteTransaction(transactionId);
        onClose();
      }}
      dialogDescription='This action cannot be undone.  This will permanently delete this transaction and all of its data.'
    />
  );
};
