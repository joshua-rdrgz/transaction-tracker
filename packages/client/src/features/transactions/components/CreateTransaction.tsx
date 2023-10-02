import { useState } from 'react';
import { Button } from '@/ui/button';
import { DialogItem } from '@/ui/dialog';
import { DialogFormContent } from '@/ui/dialog-form-content';
import { CreateTransactionForm } from '@/features/transactions/forms/CreateTransactionForm';

interface ICreateTransactionProps {
  page: 'account' | 'category';
  id: string;
}

export const CreateTransaction: React.FC<ICreateTransactionProps> = ({
  page,
  id,
}) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  return (
    <DialogItem
      open={createDialogOpen}
      onOpenChange={setCreateDialogOpen}
      triggerChildren={<Button>Add Transaction</Button>}
    >
      <DialogFormContent
        formToRender={CreateTransactionForm}
        formProps={{
          setDialogOpen: setCreateDialogOpen,
          accountId: page === 'account' && id,
          categoryId: page === 'category' && id,
        }}
        dialogTitle='Add a Transaction!'
        dialogDescription='Please enter your transaction details below.'
        actionBtnText='Add Transaction'
      />
    </DialogItem>
  );
};
