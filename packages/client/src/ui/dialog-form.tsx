import { Form } from '@/ui/form';
import { FormItem } from '@/ui/form-item';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type ComponentWithProps<TProps> = (props: TProps) => JSX.Element;

interface IInput {
  value: string;
  label: string;
  component?: ComponentWithProps<any>;
  inputProps?: { [key: string]: any };
}

interface IFormProps {
  inputs: IInput[];
  zodSchema: any;
  defaultValues: { [key: string]: any };
  onSubmit: SubmitHandler<FieldValues>;
  disabled: boolean;
}

export const DialogForm = forwardRef<HTMLButtonElement, IFormProps>(
  ({ inputs, zodSchema, defaultValues, onSubmit, disabled }, submitBtnRef) => {
    const form = useForm({
      resolver: zodResolver(zodSchema),
      defaultValues,
    });

    return (
      <Form form={form}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await form.handleSubmit(onSubmit, (err) => console.error(err))();
          }}
        >
          <fieldset disabled={disabled} className='flex flex-col gap-4'>
            {inputs.map((input) => {
              return (
                <Form.Field
                  key={input.value}
                  control={form.control}
                  name={input.value}
                  render={({ field }) => (
                    <FormItem
                      label={input.label}
                      field={field}
                      inputProps={input.inputProps}
                      inputComponent={input.component}
                    />
                  )}
                />
              );
            })}
            <button ref={submitBtnRef} type='submit' className='hidden' />
          </fieldset>
        </form>
      </Form>
    );
  }
);
