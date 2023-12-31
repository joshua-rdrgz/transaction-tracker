import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import zodSchemas from 'shared-zod-schemas';

import { useLogin } from '@/features/auth/hooks/useLogin';

import { Form } from '@/ui/form';
import { FormItem } from '@/ui/form-item';
import { Button } from '@/ui/button';

const loginFormSchema = zodSchemas.authRouteSchemas.login;
type LoginFormSchema = z.infer<typeof loginFormSchema>;

const loginInputs = [
  {
    value: 'email' as const,
    label: 'Email',
  },
  {
    value: 'password' as const,
    label: 'Password',
    props: {
      type: 'password',
    },
  },
];

export const LoginForm = () => {
  const { isLoggingIn, login } = useLogin();
  const loginForm = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    async (values: LoginFormSchema) => {
      login(values, {
        onSettled: () => loginForm.reset(),
      });
    },
    [login]
  );

  return (
    <Form form={loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className='space-y-3'>
        {loginInputs.map((input) => (
          <Form.Field
            key={input.value}
            control={loginForm.control}
            name={input.value}
            disabled={isLoggingIn}
            render={({ field }) => {
              return (
                <FormItem
                  label={input.label}
                  field={field}
                  inputProps={input.props}
                />
              );
            }}
          />
        ))}

        <Button>Log in</Button>
      </form>
    </Form>
  );
};
