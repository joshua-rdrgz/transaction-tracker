import { forwardRef } from 'react';
import { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import sharedZodSchemas from 'shared-zod-schemas';
import { useCreateTransaction } from '@/features/transactions/hooks/useCreateTransaction';
import { IDialogFormPropsReceivesAccount } from '@/lib/types';
import { DialogForm } from '@/ui/dialog-form';
import { DatePicker } from '@/ui/date-picker';
import { SelectCategory } from '@/features/categories/components/SelectCategory';

const createTransactionSchema =
  sharedZodSchemas.transactionRouteSchemas.createTransaction;
type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;

const CREATE_TRANSACTION_INPUTS = [
  {
    value: 'date' as const,
    label: 'Transaction Date',
    component: DatePicker,
  },
  {
    value: 'category' as const,
    label: 'Transaction Category',
    component: SelectCategory,
  },
  {
    value: 'description' as const,
    label: 'Transaction Description',
  },
  {
    value: 'contact' as const,
    label: 'Transaction Contact',
  },
  {
    value: 'amount' as const,
    label: 'Transaction Amount',
    inputProps: {
      type: 'number',
      step: '.01',
    },
  },
];

export const CreateTransactionForm = forwardRef<
  HTMLButtonElement,
  IDialogFormPropsReceivesAccount
>(({ setDialogOpen, accountId }, submitBtnRef) => {
  const { isCreatingTransaction, createTransaction } = useCreateTransaction();

  const onSubmit = (values: FieldValues) => {
    createTransaction(values as CreateTransactionSchema, {
      onSuccess() {
        toast.success('Successfully created transaction!');
        console.log('setDialogOpen: ', setDialogOpen);
        setDialogOpen?.(false);
      },
    });
  };

  return (
    <DialogForm
      ref={submitBtnRef}
      inputs={CREATE_TRANSACTION_INPUTS}
      zodSchema={createTransactionSchema}
      defaultValues={{
        date: '',
        contact: '',
        description: '',
        category: '',
        account: accountId,
        amount: 0,
      }}
      onSubmit={onSubmit}
      disabled={isCreatingTransaction}
    />
  );
});
