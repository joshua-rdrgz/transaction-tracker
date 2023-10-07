import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';
import { useTransactions } from '@/features/transactions/hooks/useTransactions';
import {
  CategoriesInTransactions,
  useCategoriesInTransactions,
} from '@/features/transactions/hooks/useCategoriesInTransactions';
import { CreateTransaction } from '@/features/transactions/components/CreateTransaction';
import { TransactionsDropdown } from '@/features/transactions/components/TransactionsDropdown';
import { DataTable } from '@/ui/data-table';
import { TableCell } from '@/ui/table-cell';
import { currency } from '@/lib/utils';
import { ReceivedTransaction } from '@/lib/types';

const getTransactionColumns = (
  categories: CategoriesInTransactions
): ColumnDef<ReceivedTransaction>[] => [
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
      const displayDate = format(new Date(row.getValue('date')), 'P');
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
      const category = categories?.find(
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
      return (
        <TableCell>
          <TransactionsDropdown transactionId={row.original.id as string} />
        </TableCell>
      );
    },
  },
];

interface ITransactionsTableProps {
  filters?: { accountId?: string; categoryId?: string };
}

export function TransactionsTable({ filters }: ITransactionsTableProps) {
  const { isLoadingTransactions, transactions } = useTransactions(filters);
  const { isLoadingCategories, categories } = useCategoriesInTransactions(
    transactions?.map((transaction) => transaction.id) || []
  );

  return (
    <div className='flex flex-col gap-6'>
      <DataTable
        columns={getTransactionColumns(categories)}
        data={transactions || []}
        isLoading={isLoadingTransactions || isLoadingCategories}
        noResultsText='No transactions.  Add one to get started!'
        defaultPageSize={5}
        columnVisibility={{
          description: false,
          categoryId: false,
        }}
      />
      <div className='ml-auto'>
        <CreateTransaction page='account' id={filters?.accountId as string} />
      </div>
    </div>
  );
}
