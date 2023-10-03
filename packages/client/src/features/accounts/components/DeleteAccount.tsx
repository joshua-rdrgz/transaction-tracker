import { useDeleteAccount } from '@/features/accounts/hooks/useDeleteAccount';
import { DialogDeleteContent } from '@/ui/dialog-delete-content';

interface IDeleteAccountProps {
  onClose(): void;
  accountId: string;
}

export const DeleteAccount: React.FC<IDeleteAccountProps> = ({
  onClose,
  accountId,
}) => {
  const { deleteAccount } = useDeleteAccount();
  return (
    <DialogDeleteContent
      handleDelete={() => {
        deleteAccount(accountId);
        onClose();
      }}
      dialogDescription='This action cannot be undone. This will permanently delete your bank account and all associated transactions.'
    />
  );
};
