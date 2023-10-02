import { forwardRef } from 'react';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { useCreateAccount } from '@/features/accounts/hooks/useCreateAccount';
import { IDialogFormPropsReceivesAccount } from '@/lib/types';
import { DialogForm } from '@/ui/dialog-form';
import sharedZodSchemas from 'shared-zod-schemas';

const createAccountSchema = sharedZodSchemas.accountRouteSchemas.createAccount;
type CreateAccountSchema = z.infer<typeof createAccountSchema>;

const CREATE_ACCOUNT_INPUTS = [
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

export const CreateAccountForm = forwardRef<
  HTMLButtonElement,
  IDialogFormPropsReceivesAccount
>(({ setDialogOpen }, submitBtnRef) => {
  const { isCreatingAccount, createAccount } = useCreateAccount();

  const onSubmit = (values: FieldValues) => {
    createAccount(values as CreateAccountSchema, {
      onSuccess() {
        setDialogOpen?.(false);
      },
    });
  };
  return (
    <DialogForm
      ref={submitBtnRef}
      inputs={CREATE_ACCOUNT_INPUTS}
      zodSchema={sharedZodSchemas.accountRouteSchemas.createAccount}
      defaultValues={{
        name: '',
        bank: '',
        balance: 0,
      }}
      onSubmit={onSubmit}
      disabled={isCreatingAccount}
    />
  );
});
