import { FieldPath, FieldValues } from 'react-hook-form';
import { ICustomFormComponentProps } from '@/lib/types';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from '@/ui/select';
import { useFormatBudgetData } from '@/features/budget-overview/hooks/useFormatBudgetData';
import { ICategoryData } from '@/features/budget-overview/components/BudgetOverviewTable';

export const SelectCategory = <T extends FieldValues, U extends FieldPath<T>>({
  field,
}: ICustomFormComponentProps<T, U>) => {
  const { isLoadingBudgetData, budgetData } = useFormatBudgetData();

  if (isLoadingBudgetData) return;

  return (
    <Select defaultValue={field?.value} onValueChange={field?.onChange}>
      <SelectTrigger>
        <SelectValue placeholder='Pick a category....' />
      </SelectTrigger>
      <SelectContent className='flex flex-col gap-10 overflow-y-auto max-h-72'>
        {renderCategoryOptions(budgetData)}
      </SelectContent>
    </Select>
  );
};

function renderCategoryOptions(categories: ICategoryData[]): React.ReactNode {
  return categories.map((category: ICategoryData) => {
    const isRootCategory =
      category.name === 'Income' || category.name === 'Expenses';
    const hasSubcategories =
      category.subcategories && category.subcategories.length > 0;
    const subcategoriesAreParents =
      hasSubcategories &&
      category.subcategories?.some(
        (subcategory) =>
          subcategory.subcategories && subcategory.subcategories.length > 0
      );

    if (isRootCategory) {
      return (
        <SelectGroup className='mb-5'>
          <SelectLabel className='text-2xl text-secondary'>
            {category.name}
          </SelectLabel>
          <SelectSeparator />
          {subcategoriesAreParents ? (
            <SelectGroup className='flex flex-col gap-3'>
              {renderCategoryOptions(category.subcategories!)}
            </SelectGroup>
          ) : (
            renderCategoryOptions(category.subcategories!)
          )}
        </SelectGroup>
      );
    }

    return hasSubcategories ? (
      <>
        <SelectGroup>
          <SelectLabel className='text-muted'>{category.name}</SelectLabel>
          {renderCategoryOptions(category.subcategories!)}
        </SelectGroup>
      </>
    ) : (
      <SelectItem key={category.id} value={category.id}>
        {category.name}
      </SelectItem>
    );
  });
}
