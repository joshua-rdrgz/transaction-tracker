import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import zodSchemas from 'shared-zod-schemas';
import { trpc } from '@/config/trpc';
import { signupWithAvatar } from '@/services/apiAuth';

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
  {
    value: 'avatar' as const,
    label: 'Profile Picture',
    props: {
      type: 'file',
      // Setting default value for function -- will change when we have access to the field's onChange
      // @ts-ignore
      onChange: (event: any) => {},
      value: '',
    },
  },
];

export const SignupForm = () => {
  const signupMutation = trpc.signup.useMutation();
  const form = useForm<SignupFormSchema>({
    resolver: async (values, context, options) => {
      console.log(
        'result: ',
        await zodResolver(signupFormSchema)(values, context, options)
      );
      return zodResolver(signupFormSchema)(values, context, options);
    },
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      avatar: '',
    },
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const onSubmit = useCallback(async (values: SignupFormSchema) => {
    if (values.avatar) {
      await signupWithAvatar(values.avatar, (avatarWasUploaded, avatarFile) =>
        signupMutation.mutate({
          ...values,
          avatar: avatarWasUploaded && avatarFile,
        })
      );
      // LOG USER IN (GET USER SESSION POPULATED)

      // NAVIGATE TO HOME PAGE
      // navigate('/');
    } else {
      signupMutation.mutate(values);
      // LOG USER IN (GET USER SESSION POPULATED)

      // NAVIGATE TO HOME PAGE
      // navigate('/');
    }
  }, []);

  return (
    <Form form={form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-3'
        encType='multipart/form-data'
      >
        {signupInputs.map((input) => (
          <Form.Field
            key={input.value}
            control={form.control}
            name={input.value}
            render={({ field }) => {
              if (input.value === 'avatar') {
                field.onChange;
                input.props.onChange = (event: any) =>
                  field.onChange(event.target.files[0]);
                input.props.value = field.value?.fileName;
              }
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
