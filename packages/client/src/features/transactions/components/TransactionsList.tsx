import { format } from 'date-fns';
import { Prisma } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import { CreateTransaction } from '@/features/transactions/components/CreateTransaction';
import { DataTable } from '@/ui/data-table';
import { TableCell } from '@/ui/table-cell';
import { currency } from '@/lib/utils';
import {
  useCategories,
  ICategoriesInTransactions,
} from '@/features/categories/hooks/useCategories';

const getTransactionColumns = (
  categories: ICategoriesInTransactions
): ColumnDef<Prisma.TransactionCreateManyInput>[] => [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <TableCell
          isHeader
          isSortable
          sortOnClick={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        >
          Date
        </TableCell>
      );
    },
    cell: ({ row }) => {
      const displayDate = format(new Date(row.getValue('date')), 'PPP');
      return <TableCell>{displayDate}</TableCell>;
    },
  },
  {
    accessorKey: 'contact',
    header: ({ column }) => {
      return (
        <TableCell
          isHeader
          isFilterable
          filterValue={column.getFilterValue() as string}
          filterOnChange={(e) => column.setFilterValue(e.target.value)}
        >
          Contact
        </TableCell>
      );
    },
    cell: ({ row }) => <TableCell>{row.getValue('contact')}</TableCell>,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <TableCell
          isHeader
          isFilterable
          filterValue={column.getFilterValue() as string}
          filterOnChange={(e) => column.setFilterValue(e.target.value)}
        >
          Description
        </TableCell>
      );
    },
    cell: ({ row }) => <TableCell>{row.getValue('description')}</TableCell>,
  },
  {
    accessorKey: 'categoryId',
    header: () => <TableCell>Category</TableCell>,
    cell: ({ row }) => {
      const currentCategoryId = row.getValue('categoryId');
      const category = categories.find(
        (category) => category.categoryId === currentCategoryId
      );
      return <TableCell>{category?.category.name}</TableCell>;
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <TableCell
          isHeader
          isSortable
          sortOnClick={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        >
          Amount
        </TableCell>
      );
    },
    cell: ({ row }) => {
      const amount = currency(row.getValue('amount'));
      return <TableCell className='font-medium'>{amount}</TableCell>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <TableCell>...</TableCell>;
    },
  },
];

interface ITransactionsListProps {
  filters?: { accountId?: string; categoryId?: string };
}

export function TransactionsList({ filters }: ITransactionsListProps) {
  const { isLoadingTransactions, transactions } = useTransactions(filters);
  const { isLoadingCategories, categories } = useCategories({
    transactionIds: transactions?.map((transaction) => transaction.id),
  });

  return (
    <div className='flex flex-col gap-6'>
      <DataTable
        columns={getTransactionColumns(categories as ICategoriesInTransactions)}
        data={transactions || []}
        isLoading={isLoadingTransactions || isLoadingCategories}
        noResultsText='No transactions.  Add one to get started!'
        defaultPageSize={5}
      />
      <div className='ml-auto'>
        <CreateTransaction page='account' id={filters?.accountId as string} />
      </div>
    </div>
  );
}
