import { useParams } from 'react-router-dom';
import { AccountDetails } from '@/features/accounts/components/AccountDetails';
import { AccountTransactionsLineChart } from '@/features/accounts/components/AccountTransactionsLineChart';
import { AccountTransactionsPieChart } from '@/features/accounts/components/AccountTransactionsPieChart';
import { useAccount } from '@/features/accounts/hooks/useAccount';
import { TransactionsTable } from '@/features/transactions/components/TransactionsTable';
import { ChartSection } from '@/ui/chart-section';

export default function AccountPage() {
  const { accountId } = useParams();
  const { account } = useAccount(accountId as string);

  return (
    <section className='flex flex-col gap-5'>
      <h1 className='font-display text-3xl'>Account Information</h1>
      <div className='flex flex-col gap-10'>
        <AccountDetails account={account} />
        <div className='flex flex-col gap-10 lg:grid lg:grid-cols-2'>
          <section className='flex flex-col gap-5 max-w-full text-center lg:col-start-2'>
            <ChartSection
              title='Transactions From Account'
              chart={<AccountTransactionsPieChart accountId={account.id} />}
            />
            <ChartSection
              title='Transactions Over Time'
              chart={<AccountTransactionsLineChart accountId={account.id} />}
            />
          </section>
          <section className='lg:col-start-1 lg:col-end-2 lg:row-start-1'>
            <h2 className='font-display text-2xl'>Posted Transactions</h2>
            <TransactionsTable filters={{ accountId: account.id }} />
          </section>
        </div>
      </div>
    </section>
  );
}
