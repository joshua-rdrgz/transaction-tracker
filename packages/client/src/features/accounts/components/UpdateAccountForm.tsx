import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import sharedZodSchemas from 'shared-zod-schemas';
import { Form } from '@/ui/form';
import { FormItem } from '@/ui/form-item';

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

export const UpdateAccountForm = forwardRef<HTMLButtonElement>(
  (_, submitBtnRef) => {
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
      })();
    };

    return (
      <Form form={updateAccountForm}>
        <form onSubmit={onSubmit}>
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
        </form>
      </Form>
    );
  }
);
