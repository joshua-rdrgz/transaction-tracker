import { forwardRef } from 'react';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import sharedZodSchemas from 'shared-zod-schemas';
import { useUpdateAccount } from '@/features/accounts/hooks/useUpdateAccount';
import { toast } from 'react-hot-toast';
import { IDialogAccountFormProps } from '@/features/accounts/forms/types';
import { DialogForm } from '@/ui/dialog-form';

const createAccountSchema = sharedZodSchemas.accountRouteSchemas.createAccount;
const updateAccountSchema = sharedZodSchemas.accountRouteSchemas.updateAccount;
type UpdateFormSchema = z.infer<typeof updateAccountSchema>;

const UPDATE_ACCOUNT_INPUTS = [
  {
    value: 'name' as const,
    label: 'Account Name',
  },
  {
    value: 'bank' as const,
    label: 'Account Bank',
  },
  {
    value: 'balance' as const,
    label: 'Account Balance',
    inputProps: {
      type: 'number',
    },
  },
];

export const UpdateAccountForm = forwardRef<
  HTMLButtonElement,
  IDialogAccountFormProps
>(({ accountId, setDialogOpen, setDropdownOpen }, submitBtnRef) => {
  const { isUpdatingAccount, updateAccount } = useUpdateAccount();

  const onSubmit = (values: FieldValues) => {
    updateAccount(
      {
        accountId: accountId,
        data: values,
      } as UpdateFormSchema,
      {
        onSuccess() {
          toast.success('Successfully updated account!');
          setDialogOpen?.(false);
          setDropdownOpen?.(false);
        },
      }
    );
  };

  return (
    <DialogForm
      ref={submitBtnRef}
      inputs={UPDATE_ACCOUNT_INPUTS}
      zodSchema={createAccountSchema}
      defaultValues={{
        name: '',
        bank: '',
        balance: 0,
      }}
      onSubmit={onSubmit}
      disabled={isUpdatingAccount}
    />
  );
});
