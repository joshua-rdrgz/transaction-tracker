import { ArrowUpDown, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { useState } from 'react';

interface ITableCellProps {
  children: React.ReactNode;
  className?: string;
  isHeader?: boolean;
  isSortable?: boolean;
  isFilterable?: boolean;
  filterValue?: string;
  sortOnClick?(): void;
  filterOnChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const TableCell: React.FC<ITableCellProps> = ({
  children,
  className,
  isHeader,
  isSortable,
  isFilterable,
  filterValue,
  sortOnClick,
  filterOnChange,
}) => {
  const [filterShow, setFilterShow] = useState(false);

  if (isHeader) {
    if (isSortable)
      return (
        <Button
          variant='ghost'
          className={cn('hover:bg-muted', className)}
          onClick={sortOnClick}
        >
          {children}
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );

    if (isFilterable) {
      return (
        <div className='m-2 flex flex-col gap-2 items-center'>
          <Button
            variant='ghost'
            className={cn('hover:bg-muted gap-2', className)}
            onClick={() => setFilterShow((prev) => !prev)}
          >
            {children}
            <Filter size={15} />
          </Button>

          {filterShow && (
            <Input
              placeholder='Filter...'
              value={filterValue}
              onChange={filterOnChange}
              className='max-w-sm'
            />
          )}
        </div>
      );
    }
  }

  return <div className={cn('text-center', className)}>{children}</div>;
};
