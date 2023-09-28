import { useAccounts } from '@/features/accounts/hooks/useAccounts';
import { DataTable } from '@/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Prisma } from '@prisma/client';

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
    header: () => <div className='text-right'>Account Balance</div>,
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue('balance'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(balance);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
];

export function AccountsList() {
  const accounts = useAccounts();
  console.log('accounts: ', accounts);
  return (
    <div>
      <DataTable columns={accountColumns} data={accounts} />
    </div>
  );
}
