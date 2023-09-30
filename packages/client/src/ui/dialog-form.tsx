import { Form } from '@/ui/form';
import { FormItem } from '@/ui/form-item';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface IInput {
  value: string;
  label: string;
  inputProps?: { [key: string]: any };
}

interface IAccountFormProps {
  inputs: IInput[];
  zodSchema: any;
  defaultValues: { [key: string]: any };
  onSubmit: SubmitHandler<FieldValues>;
  disabled: boolean;
}

export const DialogForm = forwardRef<HTMLButtonElement, IAccountFormProps>(
  ({ inputs, zodSchema, defaultValues, onSubmit, disabled }, submitBtnRef) => {
    const accountForm = useForm({
      resolver: zodResolver(zodSchema),
      defaultValues,
    });

    return (
      <Form form={accountForm}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await accountForm.handleSubmit(onSubmit)();
          }}
        >
          <fieldset disabled={disabled} className='flex flex-col gap-4'>
            {inputs.map((input) => (
              <Form.Field
                key={input.value}
                control={accountForm.control}
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
  }
);
