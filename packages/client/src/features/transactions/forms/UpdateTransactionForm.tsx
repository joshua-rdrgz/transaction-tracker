import { forwardRef } from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';
import sharedZodSchemas from 'shared-zod-schemas';
import { SelectCategory } from '@/features/categories/components/SelectCategory';
import { useTransaction } from '@/features/transactions/hooks/useTransaction';
import { useUpdateTransaction } from '@/features/transactions/hooks/useUpdateTransaction';
import { SelectAccount } from '@/features/accounts/components/SelectAccount';
import { DatePicker } from '@/ui/date-picker';
import { DialogForm } from '@/ui/dialog-form';
import { IDialogFormPropsReceivesTransaction } from '@/lib/types';
import { Spinner } from '@/ui/spinner';

const createTransactionSchema =
  sharedZodSchemas.transactionRouteSchemas.createTransaction;
const updateTransactionSchema =
  sharedZodSchemas.transactionRouteSchemas.updateTransaction;
type UpdateTransactionSchema = z.infer<typeof updateTransactionSchema>;

const UPDATE_TRANSACTION_INPUTS = [
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
    value: 'account' as const,
    label: 'Transaction Account',
    component: SelectAccount,
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

export const UpdateTransactionForm = forwardRef<
  HTMLButtonElement,
  IDialogFormPropsReceivesTransaction
>(({ setDialogOpen, setDropdownOpen, transactionId }, submitBtnRef) => {
  const { isLoadingTransaction, transaction } = useTransaction(
    transactionId || ''
  );
  const { isUpdatingTransaction, updateTransaction } = useUpdateTransaction();

  const onSubmit = (values: FieldValues) => {
    updateTransaction(
      {
        transactionId,
        data: values,
      } as UpdateTransactionSchema,
      {
        onSuccess() {
          toast.success('Successfully updated transaction!');
          setDialogOpen?.(false);
          setDropdownOpen?.(false);
        },
      }
    );
  };

  if (isLoadingTransaction)
    return (
      <div className='flex justify-center items-center h-72'>
        <Spinner size={50} />
      </div>
    );

  return (
    <DialogForm
      ref={submitBtnRef}
      inputs={UPDATE_TRANSACTION_INPUTS}
      zodSchema={createTransactionSchema}
      defaultValues={{
        date: new Date(transaction?.date || Date.now()),
        contact: transaction?.contact || '',
        description: transaction?.description || '',
        category: transaction?.categoryId,
        account: transaction?.accountId || '',
        amount: transaction?.amount || 0,
      }}
      onSubmit={onSubmit}
      disabled={isLoadingTransaction || isUpdatingTransaction}
    />
  );
});
