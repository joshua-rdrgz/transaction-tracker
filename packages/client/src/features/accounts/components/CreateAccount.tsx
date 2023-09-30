import { useState } from 'react';
import { Button } from '@/ui/button';
import { DialogItem } from '@/ui/dialog';
import { DialogFormContent } from '@/ui/dialog-form-content';
import { CreateAccountForm } from '@/features/accounts/forms/CreateAccountForm';

export const CreateAccount = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  return (
    <DialogItem
      open={createDialogOpen}
      onOpenChange={setCreateDialogOpen}
      triggerChildren={<Button>Add Account</Button>}
    >
      <DialogFormContent
        formToRender={CreateAccountForm}
        formProps={{ setDialogOpen: setCreateDialogOpen }}
        dialogTitle='Create a Bank Account!'
        dialogDescription='Please enter a name, bank, and initial balance for your new bank account.'
        actionBtnText='Add Account'
      />
    </DialogItem>
  );
};
