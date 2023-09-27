import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import zodSchemas from 'shared-zod-schemas';
import { useSignup } from '@/features/auth/hooks/useSignup';

import { Form } from '@/ui/form';
import { FormItem } from '@/ui/form-item';
import { Button } from '@/ui/button';

const signupFormSchema = zodSchemas.authRouteSchemas.signup;
type SignupFormSchema = z.infer<typeof signupFormSchema>;

const signupInputs = [
  {
    value: 'name' as const,
    label: 'Name',
  },
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
  {
    value: 'passwordConfirm' as const,
    label: 'Confirm Password',
    props: {
      type: 'password',
    },
  },
];

export const SignupForm = () => {
  const { isSigningUp, signup } = useSignup();
  const signupForm = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    (values: SignupFormSchema) => {
      signup(values, {
        onSettled: () => signupForm.reset(),
      });
    },
    [signup]
  );

  return (
    <Form form={signupForm}>
      <form onSubmit={signupForm.handleSubmit(onSubmit)} className='space-y-3'>
        {signupInputs.map((input) => (
          <Form.Field
            key={input.value}
            control={signupForm.control}
            name={input.value}
            disabled={isSigningUp}
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

        <Button>Sign Up</Button>
      </form>
    </Form>
  );
};
