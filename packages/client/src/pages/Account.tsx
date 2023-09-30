import { useAccount } from '@/features/accounts/hooks/useAccount';
import { useParams } from 'react-router-dom';

export default function AccountPage() {
  const { accountId } = useParams();
  const { account } = useAccount(accountId as string);

  console.log('account: ', account);

  return (
    <section>
      <div>Account Page</div>
      <div>Account: {accountId}</div>
    </section>
  );
}
