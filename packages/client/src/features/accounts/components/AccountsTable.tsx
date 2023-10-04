import { useAccounts } from '@/features/accounts/hooks/useAccounts';
import { DataTable } from '@/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Prisma } from '@prisma/client';
import { AccountsDropdown } from '@/features/accounts/components/AccountsDropdown';
import { CreateAccount } from '@/features/accounts/components/CreateAccount';
import { TableCell } from '@/ui/table-cell';
import { currency } from '@/lib/utils';

const accountColumns: ColumnDef<Prisma.AccountCreateManyInput>[] = [
  {
    accessorKey: 'name',
    header: () => <TableCell>Account Name</TableCell>,
    cell: ({ row }) => <TableCell>{row.getValue('name')}</TableCell>,
  },
  {
    accessorKey: 'bank',
    header: () => <TableCell>Account Bank</TableCell>,
    cell: ({ row }) => <TableCell>{row.getValue('bank')}</TableCell>,
  },
  {
    accessorKey: 'balance',
    header: () => <TableCell>INITIAL Balance</TableCell>,
    cell: ({ row }) => {
      const balance = currency(row.getValue('balance'));
      return <div className='text-right font-medium'>{balance}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <TableCell>
          <AccountsDropdown accountId={row.original.id as string} />
        </TableCell>
      );
    },
  },
];

export function AccountsTable() {
  const { accounts } = useAccounts();

  return (
    <div className='flex flex-col gap-6'>
      <DataTable
        columns={accountColumns}
        data={accounts}
        noResultsText='No accounts.  Please add one!'
        defaultPageSize={5}
      />
      <div className='ml-auto'>
        <CreateAccount />
      </div>
    </div>
  );
}
