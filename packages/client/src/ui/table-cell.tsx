import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { ArrowUpDown } from 'lucide-react';

interface ITableCellProps {
  children: React.ReactNode;
  className?: string;
  isHeader?: boolean;
  isSortable?: boolean;
  onClickHeader?(): void;
}

export const TableCell: React.FC<ITableCellProps> = ({
  children,
  className,
  isHeader,
  isSortable,
  onClickHeader,
}) => {
  if (isHeader)
    return (
      <Button
        variant='ghost'
        className={cn('hover:bg-muted', className)}
        onClick={onClickHeader}
      >
        {children}
        {isSortable && <ArrowUpDown className='ml-2 h-4 w-4' />}
      </Button>
    );
  return <div className={cn('text-center', className)}>{children}</div>;
};
