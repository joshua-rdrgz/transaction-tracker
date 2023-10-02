import { FieldPath, FieldValues } from 'react-hook-form';
import { ICustomFormComponentProps } from '@/lib/types';
import {
  ICategories,
  useCategories,
} from '@/features/categories/hooks/useCategories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';

export const SelectCategory = <T extends FieldValues, U extends FieldPath<T>>({
  field,
}: ICustomFormComponentProps<T, U>) => {
  const { categories } = useCategories();

  return (
    <Select defaultValue={field?.value} onValueChange={field?.onChange}>
      <SelectTrigger>
        <SelectValue placeholder='Pick a category....' />
      </SelectTrigger>
      <SelectContent>
        {(categories as ICategories)?.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
