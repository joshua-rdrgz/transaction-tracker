import { useSearchParams } from 'react-router-dom';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface IFilterProps {
  filterField: string;
  filterOptions: {
    label: string;
    value: string;
  }[];
  defaultOptionIndex?: number;
}

export const Filter: React.FC<IFilterProps> = ({
  filterField,
  filterOptions,
  defaultOptionIndex = 0,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter =
    searchParams.get(filterField) ||
    (filterOptions.at(defaultOptionIndex) as typeof filterOptions[number])
      .value;

  const handleFilterChange = (value: string) => {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  };
  return (
    <ToggleGroup.Root
      type='single'
      value={currentFilter}
      onValueChange={handleFilterChange}
      className='flex rounded ml-auto w-min p-0.5 bg-muted'
    >
      {filterOptions.map((filterOption) => (
        <ToggleGroup.Item
          key={filterOption.value}
          value={filterOption.value}
          className='text-xs p-1 rounded bg-muted hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground disabled:cursor-not-allowed'
          disabled={filterOption.value === currentFilter}
        >
          {filterOption.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
};
