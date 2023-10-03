import { FieldPath, FieldValues } from 'react-hook-form';
import { ICustomFormComponentProps } from '@/lib/types';
import { useAccounts } from '@/features/accounts/hooks/useAccounts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';

export const SelectAccount = <T extends FieldValues, U extends FieldPath<T>>({
  field,
}: ICustomFormComponentProps<T, U>) => {
  const { accounts } = useAccounts({ useReactRouterLoader: false });

  return (
    <Select defaultValue={field?.value} onValueChange={field?.onChange}>
      <SelectTrigger>
        <SelectValue placeholder='Pick an account....' />
      </SelectTrigger>
      <SelectContent>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
