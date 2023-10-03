import { AccountDetails } from '@/features/accounts/components/AccountDetails';
import { useAccount } from '@/features/accounts/hooks/useAccount';
import { TransactionsList } from '@/features/transactions/components/TransactionsList';
import { useParams } from 'react-router-dom';

export default function AccountPage() {
  const { accountId } = useParams();
  const { account } = useAccount(accountId as string);

  return (
    <section className='flex flex-col gap-5'>
      <h1 className='font-display text-3xl'>Account Information</h1>
      <div className='flex flex-col gap-10'>
        <AccountDetails account={account} />
        <section>
          <h2 className='font-display text-2xl'>Account Transactions</h2>
          <TransactionsList filters={{ accountId: account.id }} />
        </section>
      </div>
    </section>
  );
}
