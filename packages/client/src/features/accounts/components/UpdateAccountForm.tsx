import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import sharedZodSchemas from 'shared-zod-schemas';
import { useUpdateAccount } from '@/features/accounts/hooks/useUpdateAccount';
import { Form } from '@/ui/form';
import { FormItem } from '@/ui/form-item';
import { toast } from 'react-hot-toast';

const updateAccountSchema = sharedZodSchemas.accountRouteSchemas.createAccount;

type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;

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

interface IUpdateAccountFormProps {
  /** Receives from DialogFormContent component */
  accountId?: string;

  /** Receives from DialogFormContent component */
  setUpdateDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UpdateAccountForm = forwardRef<
  HTMLButtonElement,
  IUpdateAccountFormProps
>(({ accountId, setUpdateDialogOpen }, submitBtnRef) => {
  const { isUpdatingAccount, updateAccount } = useUpdateAccount();

  const updateAccountForm = useForm<UpdateAccountSchema>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      name: '',
      bank: '',
      balance: 0,
    },
    mode: 'onChange',
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAccountForm.handleSubmit((values) => {
      console.log('values: ', values);
      updateAccount(
        {
          accountId: accountId as string,
          data: values,
        },
        {
          onSuccess: () => {
            toast.success('Successfully updated account!');
            setUpdateDialogOpen?.(false);
          },
        }
      );
    })();
  };

  return (
    <Form form={updateAccountForm}>
      <form onSubmit={onSubmit}>
        <fieldset disabled={isUpdatingAccount}>
          {UPDATE_ACCOUNT_INPUTS.map((input) => (
            <Form.Field
              key={input.value}
              control={updateAccountForm.control}
              name={input.value}
              render={({ field }) => (
                <FormItem
                  label={input.label}
                  field={field}
                  inputProps={input.inputProps}
                />
              )}
            />
          ))}
          <button ref={submitBtnRef} type='submit' className='hidden' />
        </fieldset>
      </form>
    </Form>
  );
});
