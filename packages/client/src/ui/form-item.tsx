import { Form } from '@/ui/form';
import { Input } from '@/ui/input';
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form';

type ComponentWithProps<TProps> = (props: TProps) => JSX.Element;

interface IFormItemProps<T extends FieldValues, U extends FieldPath<T>> {
  label: string;
  field: ControllerRenderProps<T, U>;
  inputProps?: { [key: string]: any };
  itemClassName?: string;
  inputComponent?: ComponentWithProps<any>;
}

/**
 * Must be used inside Form AND Form.Field UI components.
 */
export function FormItem<T extends FieldValues, U extends FieldPath<T>>({
  label,
  field,
  inputProps = {},
  itemClassName,
  inputComponent: InputComponent,
}: IFormItemProps<T, U>) {
  return (
    <Form.Item className={itemClassName}>
      <div className='flex justify-between'>
        <Form.Label className='text-[0.75rem]'>{label}</Form.Label>
        <Form.Message className='text-[0.75rem]' />
      </div>
      <Form.Control>
        {InputComponent ? (
          <InputComponent field={field} {...inputProps} />
        ) : (
          <Input {...field} {...inputProps} />
        )}
      </Form.Control>
    </Form.Item>
  );
}
