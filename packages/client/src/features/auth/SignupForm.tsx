import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import zodSchemas from 'shared-zod-schemas';

import { Accounts } from '@/features/accounts/Accounts';
import { Form } from '@/ui/form';
import { FormItem } from '@/ui/form-item';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';

const signupFormSchema = zodSchemas.authRouteSchemas.signup;
type SignupFormSchema = z.infer<typeof signupFormSchema>;

const NUM_STEPS = 3;
const stepOneInputs = [
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
  const [formStep, setFormStep] = useState(1);
  const [addAccounts, setAddAccounts] = useState(true);
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

  const onSubmit = useCallback((values: SignupFormSchema) => {
    console.log(values);
  }, []);

  const onBack = useCallback(() => {
    setFormStep((step) => (step === 1 ? 1 : step - 1));
  }, []);

  const onNext = useCallback(async () => {
    const formFields: Array<
      | 'name'
      | 'email'
      | 'password'
      | 'passwordConfirm'
      | 'avatar'
      | 'netWorth'
      | 'accounts'
    > = [];

    switch (formStep) {
      case 1:
        formFields.push('name');
        formFields.push('email');
        formFields.push('password');
        formFields.push('passwordConfirm');
        break;
      case 2:
        formFields.push('netWorth');
        formFields.push('accounts');
        break;
      case 3:
        formFields.push('avatar');
        break;
      default:
        console.error(
          'formStep from SignupForm only allowed to be 1, 2, or 3.'
        );
        return;
    }
    const allowedToProceed = await form.trigger(formFields);
    if (!allowedToProceed) return;

    setFormStep((step) => (step === NUM_STEPS ? step : step + 1));
  }, [formStep]);

  const backBtnContent = useMemo(() => {
    return formStep === 1 ? undefined : 'Back';
  }, [formStep]);

  const nextBtnContent = useMemo(() => {
    return formStep === NUM_STEPS ? 'Signup' : 'Next';
  }, [formStep]);

  return (
    <Form form={form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        {formStep === 1 && (
          <>
            {stepOneInputs.map((input) => (
              <Form.Field
                key={input.value}
                control={form.control}
                name={input.value}
                render={({ field }) => (
                  <FormItem
                    label={input.label}
                    field={field}
                    inputProps={input.props}
                  />
                )}
              />
            ))}

            <Button type='button' onClick={onNext}>
              {nextBtnContent}
            </Button>
          </>
        )}
        {formStep === 2 && (
          <>
            <AddAccountsOrNetWorth
              addAccounts={addAccounts}
              setAddAccounts={setAddAccounts}
            />
            <Form.Field
              control={form.control}
              name='netWorth'
              render={({ field }) => (
                <FormItem
                  label="What's your net worth?"
                  field={field}
                  inputProps={{ type: 'number' }}
                  itemClassName={addAccounts ? 'hidden' : ''}
                />
              )}
            />
            {addAccounts && <Accounts />}
            <Button type='button' onClick={onBack}>
              {backBtnContent}
            </Button>
            <Button type='button' onClick={onNext}>
              {nextBtnContent}
            </Button>
          </>
        )}
        {formStep === 3 && (
          <>
            <div>FormStep3</div>
            <Button type='button' onClick={onBack}>
              {backBtnContent}
            </Button>
            <Button>{nextBtnContent}</Button>
          </>
        )}
      </form>
    </Form>
  );
};

interface IAddAccountsOrNetWorthProps {
  addAccounts: boolean;
  setAddAccounts: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddAccountsOrNetWorth: React.FC<IAddAccountsOrNetWorthProps> = ({
  addAccounts,
  setAddAccounts,
}) => {
  return (
    <>
      <div>Add bank accounts?</div>
      <div className='flex justify-around'>
        <div className='flex items-center gap-2'>
          <Label htmlFor='yes-add-bank-accounts'>Yes</Label>
          <Input
            id='yes-add-bank-accounts'
            type='radio'
            name='add-bank-accounts'
            value='yes'
            checked={addAccounts ? true : false}
            className='w-4'
            onChange={() => setAddAccounts(true)}
          />
        </div>
        <div className='flex items-center gap-2'>
          <Label htmlFor='no-add-bank-accounts'>No</Label>
          <Input
            id='no-add-bank-accounts'
            type='radio'
            name='add-bank-accounts'
            value='no'
            checked={addAccounts ? false : true}
            className='w-4'
            onChange={() => setAddAccounts(false)}
          />
        </div>
      </div>
    </>
  );
};
