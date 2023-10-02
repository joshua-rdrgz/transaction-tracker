import { cn } from '@/lib/utils';

interface ITableCellProps {
  children: React.ReactNode;
  className?: string;
}

export const TableCell: React.FC<ITableCellProps> = ({
  children,
  className,
}) => {
  return <div className={cn('text-right', className)}>{children}</div>;
};
