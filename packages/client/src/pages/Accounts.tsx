import { AccountsList } from '@/features/accounts/components/AccountsList';

export default function AccountsPage() {
  return (
    <div className='flex flex-col gap-10'>
      <section className='flex flex-col gap-5'>
        <h1 className='font-display text-2xl'>Your Bank Accounts</h1>
        <AccountsList />
      </section>
    </div>
  );
}
