import { useState } from 'react';
import { DialogFormContent } from '@/ui/dialog-form-content';
import { TableDropdown } from '@/ui/table-dropdown';
import { DeleteTransaction } from './DeleteTransaction';
import { DialogDropdownItem } from '@/ui/dialog';
import { UpdateTransactionForm } from '@/features/transactions/forms/UpdateTransactionForm';

interface ITransactionDropdownProps {
  transactionId: string;
}

export const TransactionsDropdown: React.FC<ITransactionDropdownProps> = ({
  transactionId,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <TableDropdown open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DialogDropdownItem
        triggerChildren='✏️ Edit'
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      >
        <DialogFormContent
          formToRender={UpdateTransactionForm}
          formProps={{
            setDialogOpen: setEditDialogOpen,
            setDropdownOpen,
            transactionId,
          }}
          dialogTitle='Edit Transaction'
          dialogDescription='Edit the transaction details.'
          actionBtnText='Edit Transaction'
        />
      </DialogDropdownItem>
      <DialogDropdownItem
        triggerChildren='🗑️ Delete'
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <DeleteTransaction
          onClose={() => {
            setDeleteDialogOpen(false);
            setDropdownOpen(false);
          }}
          transactionId={transactionId}
        />
      </DialogDropdownItem>
    </TableDropdown>
  );
};
