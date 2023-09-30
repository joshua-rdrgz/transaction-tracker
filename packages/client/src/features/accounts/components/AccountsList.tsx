import { useAccounts } from '@/features/accounts/hooks/useAccounts';
import { DataTable } from '@/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Prisma } from '@prisma/client';
import { AccountsDropdown } from '@/features/accounts/components/AccountsDropdown';
import { CreateAccount } from '@/features/accounts/components/CreateAccount';

const accountColumns: ColumnDef<Prisma.AccountCreateManyInput>[] = [
  {
    accessorKey: 'name',
    header: () => <div className='text-right'>Account Name</div>,
    cell: ({ row }) => <div className='text-right'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'bank',
    header: () => <div className='text-right'>Account Bank</div>,
    cell: ({ row }) => <div className='text-right'>{row.getValue('bank')}</div>,
  },
  {
    accessorKey: 'balance',
    header: () => <div className='text-right'>INITIAL Balance</div>,
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue('balance'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(balance);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className='text-right'>
          <AccountsDropdown accountId={row.original.id as string} />
        </div>
      );
    },
  },
];

export function AccountsList() {
  const accounts = useAccounts();

  return (
    <div className='flex flex-col gap-6'>
      <DataTable
        columns={accountColumns}
        data={accounts}
        noResultsText='No accounts.  Please add one!'
      />
      <div className='ml-auto'>
        <CreateAccount />
      </div>
    </div>
  );
}
