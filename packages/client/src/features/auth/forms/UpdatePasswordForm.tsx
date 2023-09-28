import { z } from 'zod';
import { useForm } from 'react-hook-form';
import sharedZodSchemas from 'shared-zod-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateUserPassword } from '@/features/auth/hooks/useUpdateUserPassword';
import { Form } from '@/ui/form';
import { useCallback } from 'react';
import { FormItem } from '@/ui/form-item';
import { Button } from '@/ui/button';
import { toast } from 'react-hot-toast';

const updateUserPasswordSchema =
  sharedZodSchemas.authRouteSchemas.updateCurUserPassword;
type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>;

const INPUTS = [
  {
    value: 'curPassword' as const,
    label: 'Current Password',
  },
  {
    value: 'newPassword' as const,
    label: 'New Password',
  },
  {
    value: 'newPasswordConfirm' as const,
    label: 'Confirm New Password',
  },
];

export const UpdatePasswordForm = () => {
  const {
    isUpdatingUserPassword,
    updateUserPassword,
  } = useUpdateUserPassword();

  const updatePasswordForm = useForm<UpdateUserPasswordSchema>({
    resolver: zodResolver(updateUserPasswordSchema),
    defaultValues: {
      curPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  const onSubmit = useCallback(async (values: UpdateUserPasswordSchema) => {
    updateUserPassword(values, {
      onSuccess: () => toast.success('Password updated!'),
      onSettled: () => updatePasswordForm.reset(),
    });
  }, []);

  return (
    <Form form={updatePasswordForm}>
      <form
        onSubmit={updatePasswordForm.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <div className='bg-muted p-6 rounded shadow-lg dark:shadow-secondary flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            {INPUTS.map((input) => (
              <Form.Field
                key={input.value}
                control={updatePasswordForm.control}
                name={input.value}
                render={({ field }) => {
                  return (
                    <FormItem
                      label={input.label}
                      field={field}
                      inputProps={{ type: 'password' }}
                    />
                  );
                }}
              />
            ))}
          </div>
          <div className='flex gap-2 justify-end'>
            <Button
              variant='outline'
              type='button'
              className='hover:bg-primary hover:text-primary-foreground'
              onClick={() => updatePasswordForm.reset()}
              disabled={isUpdatingUserPassword}
            >
              Cancel
            </Button>
            <Button disabled={isUpdatingUserPassword}>Update Password</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
